package com.solargreen.app.ui.consumption;

import android.app.AlertDialog;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.solargreen.app.R;
import com.solargreen.app.data.ApplianceRepository;
import com.solargreen.app.models.Appliance;
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;

import java.util.List;

public class ConsumptionFragment extends Fragment implements ApplianceAdapter.OnApplianceListener {

    private TextView totalConsumptionText;
    private RecyclerView recyclerView;
    private ApplianceAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_consumption, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        totalConsumptionText = view.findViewById(R.id.total_consumption_value);
        recyclerView = view.findViewById(R.id.recycler_appliances);
        ExtendedFloatingActionButton fab = view.findViewById(R.id.fab_add);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        List<Appliance> list = ApplianceRepository.getAppliances(requireContext());
        adapter = new ApplianceAdapter(list, this);
        recyclerView.setAdapter(adapter);

        fab.setOnClickListener(v -> showAddDialog());

        updateTotal();
    }

    private void showAddDialog() {
        View dialogView = LayoutInflater.from(getContext()).inflate(R.layout.dialog_add_appliance, null);
        EditText nameInput = dialogView.findViewById(R.id.input_name);
        EditText quantityInput = dialogView.findViewById(R.id.input_quantity);
        EditText powerInput = dialogView.findViewById(R.id.input_power);
        EditText brandInput = dialogView.findViewById(R.id.input_brand);

        new AlertDialog.Builder(getContext(), R.style.SolarGreenDialogTheme)
                .setTitle("Ajouter un appareil")
                .setView(dialogView)
                .setPositiveButton("Ajouter", (dialog, which) -> {
                    String name = nameInput.getText().toString();
                    String qStr = quantityInput.getText().toString();
                    String pStr = powerInput.getText().toString();
                    String brand = brandInput.getText().toString();

                    if (!name.isEmpty() && !qStr.isEmpty() && !pStr.isEmpty()) {
                        int quantity = Integer.parseInt(qStr);
                        int power = Integer.parseInt(pStr);
                        Appliance appliance = new Appliance(name, quantity, power, brand);
                        ApplianceRepository.addAppliance(requireContext(), appliance);
                        refreshData();
                    } else {
                        Toast.makeText(getContext(), "Veuillez remplir les champs obligatoires", Toast.LENGTH_SHORT).show();
                    }
                })
                .setNegativeButton("Annuler", null)
                .show();
    }

    private void refreshData() {
        List<Appliance> list = ApplianceRepository.getAppliances(requireContext());
        adapter.updateList(list);
        updateTotal();
    }

    private void updateTotal() {
        int total = ApplianceRepository.getTotalConsumption(requireContext());
        totalConsumptionText.setText(String.valueOf(total));
    }

    @Override
    public void onDelete(Appliance appliance) {
        ApplianceRepository.removeAppliance(requireContext(), appliance.id);
        refreshData();
    }
}