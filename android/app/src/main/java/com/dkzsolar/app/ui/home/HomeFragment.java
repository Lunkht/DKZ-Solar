package com.dkzsolar.app.ui.home;

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
import androidx.viewpager2.widget.ViewPager2;

import com.dkzsolar.app.MainActivity;
import com.dkzsolar.app.R;
import com.dkzsolar.app.data.ProductRepository;
import com.dkzsolar.app.models.Product;
import com.dkzsolar.app.ui.catalog.ProductDetailActivity;
import com.google.android.material.tabs.TabLayout;
import com.google.android.material.tabs.TabLayoutMediator;

import java.util.ArrayList;
import java.util.List;

public class HomeFragment extends Fragment implements HeroAdapter.OnHeroClickListener {

    private ViewPager2 viewPager;
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

        view.findViewById(R.id.btn_explore).setOnClickListener(v -> {
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).goToTab(R.id.nav_catalog);
            }
        });
        view.findViewById(R.id.btn_quote).setOnClickListener(v -> {
            if (getActivity() instanceof MainActivity) {
                ((MainActivity) getActivity()).goToTab(R.id.nav_quote);
            }
        });
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