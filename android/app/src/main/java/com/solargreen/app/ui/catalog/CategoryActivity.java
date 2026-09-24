package com.solargreen.app.ui.catalog;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.solargreen.app.R;

public class CategoryActivity extends AppCompatActivity {

    public static final String EXTRA_CATEGORY = "extra_category";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_category);

        String category = getIntent().getStringExtra(EXTRA_CATEGORY);
        if (category == null) category = "Catalogue";

        TextView titleView = findViewById(R.id.category_title);
        titleView.setText(category);

        findViewById(R.id.btn_back).setOnClickListener(v -> finish());

        if (savedInstanceState == null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.container, CatalogFragment.newInstance(category))
                    .commit();
        }
    }
}