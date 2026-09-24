package com.solargreen.app.ui.consumption;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.solargreen.app.R;
import com.solargreen.app.models.Appliance;

import java.util.List;

public class ApplianceAdapter extends RecyclerView.Adapter<ApplianceAdapter.ViewHolder> {

    public interface OnApplianceListener {
        void onDelete(Appliance appliance);
    }

    private List<Appliance> appliances;
    private final OnApplianceListener listener;

    public ApplianceAdapter(List<Appliance> appliances, OnApplianceListener listener) {
        this.appliances = appliances;
        this.listener = listener;
    }

    public void updateList(List<Appliance> newList) {
        this.appliances = newList;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_appliance, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Appliance appliance = appliances.get(position);
        
        holder.name.setText(appliance.name);
        holder.details.setText(appliance.quantity + "x | " + appliance.brand);
        holder.consumption.setText(String.valueOf(appliance.getTotalConsumption()));
        
        holder.btnDelete.setOnClickListener(v -> {
            if (listener != null) listener.onDelete(appliance);
        });
    }

    @Override
    public int getItemCount() {
        return appliances.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView name, details, consumption;
        ImageButton btnDelete;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.appliance_name);
            details = itemView.findViewById(R.id.appliance_details);
            consumption = itemView.findViewById(R.id.appliance_consumption);
            btnDelete = itemView.findViewById(R.id.btn_delete);
        }
    }
}