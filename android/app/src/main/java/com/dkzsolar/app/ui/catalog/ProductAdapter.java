package com.dkzsolar.app.ui.catalog;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.dkzsolar.app.R;
import com.dkzsolar.app.models.Product;

import java.util.List;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.Holder> {

    public interface Listener {
        void onProductClick(Product product);
    }

    private final List<Product> items;
    private final Listener listener;

    public ProductAdapter(List<Product> items, Listener listener) {
        this.items = items;
        this.listener = listener;
    }

    @NonNull
    @Override
    public Holder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_product, parent, false);
        return new Holder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull Holder h, int position) {
        Product p = items.get(position);
        h.type.setText(p.type);
        h.name.setText(p.name);
        h.tagline.setText(p.tagline);
        h.price.setText(p.price);
        h.category.setText(p.category);
        h.itemView.setOnClickListener(v -> {
            if (listener != null) listener.onProductClick(p);
        });
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    static class Holder extends RecyclerView.ViewHolder {
        final TextView type;
        final TextView name;
        final TextView tagline;
        final TextView price;
        final TextView category;

        Holder(@NonNull View itemView) {
            super(itemView);
            type = itemView.findViewById(R.id.product_type);
            name = itemView.findViewById(R.id.product_name);
            tagline = itemView.findViewById(R.id.product_tagline);
            price = itemView.findViewById(R.id.product_price);
            category = itemView.findViewById(R.id.product_category);
        }
    }
}