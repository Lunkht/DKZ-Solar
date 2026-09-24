package com.solargreen.app.ui.quote;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.solargreen.app.R;

public class QuoteFragment extends Fragment {

    private EditText nameField;
    private EditText phoneField;
    private EditText locationField;
    private EditText messageField;
    private Spinner productSpinner;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater,
                             @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_quote, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        nameField = view.findViewById(R.id.quote_name);
        phoneField = view.findViewById(R.id.quote_phone);
        locationField = view.findViewById(R.id.quote_location);
        messageField = view.findViewById(R.id.quote_message);
        productSpinner = view.findViewById(R.id.quote_product);

        Button send = view.findViewById(R.id.quote_send);
        Button whatsapp = view.findViewById(R.id.quote_whatsapp);

        send.setOnClickListener(v -> saveQuote());
        whatsapp.setOnClickListener(v -> sendWhatsApp());
    }

    private void saveQuote() {
        String name = nameField.getText().toString().trim();
        String phone = phoneField.getText().toString().trim();
        String location = locationField.getText().toString().trim();

        if (name.isEmpty() || phone.isEmpty() || location.isEmpty()) {
            Toast.makeText(getContext(), "Nom, téléphone et localité sont obligatoires.", Toast.LENGTH_SHORT).show();
            return;
        }

        SharedPreferences prefs = requireContext().getSharedPreferences("quotes", Context.MODE_PRIVATE);
        long timestamp = System.currentTimeMillis();
        prefs.edit()
                .putString("name_" + timestamp, name)
                .putString("phone_" + timestamp, phone)
                .putString("location_" + timestamp, location)
                .putString("product_" + timestamp,
                        productSpinner.getSelectedItem() == null ? "" : productSpinner.getSelectedItem().toString())
                .putString("message_" + timestamp, messageField.getText().toString().trim())
                .putLong("last_timestamp", timestamp)
                .apply();

        Toast.makeText(getContext(), "Devis enregistré. Nous vous rappelons sous 24 h !", Toast.LENGTH_LONG).show();
        nameField.setText("");
        phoneField.setText("");
        locationField.setText("");
        messageField.setText("");
    }

    private void sendWhatsApp() {
        SharedPreferences prefs = requireContext().getSharedPreferences("quotes", Context.MODE_PRIVATE);
        long ts = prefs.getLong("last_timestamp", 0);
        StringBuilder body = new StringBuilder("Bonjour Solar Green, je souhaite un devis.\n");
        if (ts != 0) {
            String name = prefs.getString("name_" + ts, "");
            String phone = prefs.getString("phone_" + ts, "");
            String location = prefs.getString("location_" + ts, "");
            String product = prefs.getString("product_" + ts, "");
            String message = prefs.getString("message_" + ts, "");
            if (!name.isEmpty()) body.append("Nom : ").append(name).append('\n');
            if (!phone.isEmpty()) body.append("Tél : ").append(phone).append('\n');
            if (!location.isEmpty()) body.append("Localité : ").append(location).append('\n');
            if (!product.isEmpty()) body.append("Produit : ").append(product).append('\n');
            if (!message.isEmpty()) body.append("Projet : ").append(message).append('\n');
        }

        String url = "https://wa.me/224621000000?text=" + Uri.encode(body.toString());
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(getContext(), "WhatsApp n'est pas installé.", Toast.LENGTH_SHORT).show();
        }
    }
}