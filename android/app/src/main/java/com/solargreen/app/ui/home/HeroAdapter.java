package com.solargreen.app.ui.home;

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

import java.util.List;

public class HeroAdapter extends RecyclerView.Adapter<HeroAdapter.ViewHolder> {

    public interface OnHeroClickListener {
        void onHeroClick(Product product);
    }

    private final List<Product> products;
    private final OnHeroClickListener listener;

    public HeroAdapter(List<Product> products, OnHeroClickListener listener) {
        this.products = products;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_hero_pager, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Product product = products.get(position);
        
        holder.title.setText(product.type);
        holder.subtitle.setText(product.name);
        
        Glide.with(holder.itemView.getContext())
                .load(product.imageUrl)
                .centerCrop()
                .into(holder.image);
        
        holder.button.setOnClickListener(v -> {
            if (listener != null) {
                listener.onHeroClick(product);
            }
        });
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView image;
        TextView title;
        TextView subtitle;
        Button button;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.hero_image);
            title = itemView.findViewById(R.id.hero_tag);
            subtitle = itemView.findViewById(R.id.hero_subtitle);
            button = itemView.findViewById(R.id.hero_btn);
        }
    }
}