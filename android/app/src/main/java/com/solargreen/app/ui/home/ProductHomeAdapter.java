package com.solargreen.app.ui.home;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.solargreen.app.R;
import com.solargreen.app.models.Product;
import com.solargreen.app.ui.catalog.ProductDetailActivity;

import java.util.List;
import java.util.Locale;

public class ProductHomeAdapter extends RecyclerView.Adapter<ProductHomeAdapter.ViewHolder> {

    private final List<Product> products;
    private final Context context;

    public ProductHomeAdapter(List<Product> products, Context context) {
        this.products = products;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_product_home, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Product product = products.get(position);
        
        holder.name.setText(product.name);
        holder.price.setText(formatPrice(product.price));
        
        Glide.with(context)
                .load(product.imageUrl)
                .centerCrop()
                .placeholder(R.drawable.bg_product)
                .into(holder.image);
        
        holder.itemView.setOnClickListener(v -> {
            Intent intent = new Intent(context, ProductDetailActivity.class);
            intent.putExtra(ProductDetailActivity.EXTRA_PRODUCT_ID, product.id);
            context.startActivity(intent);
        });
    }

    private String formatPrice(String price) {
        if (price == null || price.equalsIgnoreCase("Sur devis")) return "Sur devis";
        // Simple regex to extract numbers
        String digits = price.replaceAll("[^0-9]", "");
        if (digits.length() >= 7) {
            double millions = Double.parseDouble(digits) / 1000000.0;
            return String.format(Locale.US, "%.1fM GNF", millions);
        }
        return price;
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView image;
        TextView name, price;
        Button btnAdd;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.product_image);
            name = itemView.findViewById(R.id.product_name);
            price = itemView.findViewById(R.id.product_price);
            btnAdd = itemView.findViewById(R.id.btn_add);
        }
    }
}