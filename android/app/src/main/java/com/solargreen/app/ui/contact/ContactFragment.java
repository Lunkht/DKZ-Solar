package com.solargreen.app.ui.contact;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.solargreen.app.R;

public class ContactFragment extends Fragment {

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_contact, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        LinearLayout call = view.findViewById(R.id.contact_call);
        LinearLayout email = view.findViewById(R.id.contact_email);
        LinearLayout whatsapp = view.findViewById(R.id.contact_whatsapp);
        LinearLayout address = view.findViewById(R.id.contact_address);

        call.setOnClickListener(v -> dial("tel:+224621000000"));
        email.setOnClickListener(v -> dial("mailto:contact@solargreen.com"));
        whatsapp.setOnClickListener(v -> dial("https://wa.me/224621000000"));
        address.setOnClickListener(v -> {
            String geoUri = "geo:0,0?q=" + Uri.encode("Kaloum, Conakry, Guinée");
            try {
                startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(geoUri)));
            } catch (Exception e) {
                // Aucune application cartographique
            }
        });
    }

    private void dial(String uri) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(uri)));
        } catch (Exception e) {
            // Aucun gestionnaire disponible
        }
    }
}