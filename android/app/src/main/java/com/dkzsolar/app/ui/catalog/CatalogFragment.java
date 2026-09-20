package com.dkzsolar.app.ui.catalog;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.dkzsolar.app.MainActivity;
import com.dkzsolar.app.R;
import com.dkzsolar.app.data.ProductRepository;
import com.dkzsolar.app.models.Product;

import java.util.List;

public class CatalogFragment extends Fragment implements ProductAdapter.Listener {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_catalog, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        List<Product> products = ProductRepository.load(requireContext());

        RecyclerView recycler = view.findViewById(R.id.product_list);
        recycler.setLayoutManager(new GridLayoutManager(getContext(), 2));
        ProductAdapter adapter = new ProductAdapter(products, this);
        recycler.setAdapter(adapter);
    }

    @Override
    public void onProductClick(Product product) {
        Intent intent = new Intent(getContext(), ProductDetailActivity.class);
        intent.putExtra(ProductDetailActivity.EXTRA_PRODUCT_ID, product.id);
        startActivity(intent);
    }
}