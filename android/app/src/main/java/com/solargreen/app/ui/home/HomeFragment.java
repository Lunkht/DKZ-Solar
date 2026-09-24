package com.solargreen.app.ui.home;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.solargreen.app.MainActivity;
import com.solargreen.app.R;
import com.solargreen.app.data.ProductRepository;
import com.solargreen.app.models.Product;
import com.solargreen.app.ui.catalog.CategoryActivity;
import com.solargreen.app.ui.catalog.ProductDetailActivity;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

import java.util.ArrayList;
import java.util.List;

public class HomeFragment extends Fragment implements HeroAdapter.OnHeroClickListener {

    private ViewPager2 viewPager;
    private RecyclerView rvRecommended;
    private Handler autoScrollHandler = new Handler(Looper.getMainLooper());
    private Runnable autoScrollRunnable;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        setupHeroPager(view);
        setupRecommendedList(view);
        setupCategoryListeners(view);
    }

    private void setupCategoryListeners(View view) {
        view.findViewById(R.id.cat_panneaux).setOnClickListener(v -> openCategory("Panneaux"));
        view.findViewById(R.id.cat_onduleurs).setOnClickListener(v -> openCategory("Onduleurs"));
        view.findViewById(R.id.cat_batteries).setOnClickListener(v -> openCategory("Batteries"));
        view.findViewById(R.id.cat_services).setOnClickListener(v -> openCategory("Services"));
        view.findViewById(R.id.cat_accessoires).setOnClickListener(v -> openCategory("Accessoires"));
        
        view.findViewById(R.id.see_all_recommended).setOnClickListener(v -> {
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).goToTab(R.id.nav_catalog);
            }
        });
    }

    private void openCategory(String category) {
        Intent intent = new Intent(getContext(), CategoryActivity.class);
        intent.putExtra(CategoryActivity.EXTRA_CATEGORY, category);
        startActivity(intent);
    }

    private void setupRecommendedList(View view) {
        rvRecommended = view.findViewById(R.id.rv_recommended);
        rvRecommended.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false));
        
        List<Product> products = ProductRepository.load(requireContext());
        ProductHomeAdapter adapter = new ProductHomeAdapter(products, requireContext());
        rvRecommended.setAdapter(adapter);
    }

    private void setupHeroPager(View view) {
        viewPager = view.findViewById(R.id.hero_viewpager);
        TabLayout tabLayout = view.findViewById(R.id.hero_indicator);

        List<Product> allProducts = ProductRepository.load(requireContext());
        List<Product> heroProducts = new ArrayList<>();
        
        // Pick top 4 products for hero
        for (int i = 0; i < Math.min(4, allProducts.size()); i++) {
            heroProducts.add(allProducts.get(i));
        }

        HeroAdapter adapter = new HeroAdapter(heroProducts, this);
        viewPager.setAdapter(adapter);

        new TabLayoutMediator(tabLayout, viewPager, (tab, position) -> {}).attach();

        startAutoScroll(heroProducts.size());
    }

    private void startAutoScroll(int count) {
        if (count <= 1) return;
        
        autoScrollRunnable = new Runnable() {
            @Override
            public void run() {
                int current = viewPager.getCurrentItem();
                int next = (current + 1) % count;
                viewPager.setCurrentItem(next, true);
                autoScrollHandler.postDelayed(this, 5000); // 5 seconds
            }
        };
        autoScrollHandler.postDelayed(autoScrollRunnable, 5000);
    }

    @Override
    public void onPause() {
        super.onPause();
        if (autoScrollHandler != null && autoScrollRunnable != null) {
            autoScrollHandler.removeCallbacks(autoScrollRunnable);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (viewPager != null && viewPager.getAdapter() != null) {
            startAutoScroll(viewPager.getAdapter().getItemCount());
        }
    }

    @Override
    public void onHeroClick(Product product) {
        Intent intent = new Intent(getContext(), ProductDetailActivity.class);
        intent.putExtra(ProductDetailActivity.EXTRA_PRODUCT_ID, product.id);
        startActivity(intent);
    }
}