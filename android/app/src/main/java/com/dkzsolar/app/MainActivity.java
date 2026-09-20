package com.dkzsolar.app;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.dkzsolar.app.ui.catalog.CatalogFragment;
import com.dkzsolar.app.ui.contact.ContactFragment;
import com.dkzsolar.app.ui.home.HomeFragment;
import com.dkzsolar.app.ui.quote.QuoteFragment;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {

    private static final String KEY_TAB = "tab";
    public static final String EXTRA_TAB = "extra_tab";

    private BottomNavigationView bottomNav;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bottomNav = findViewById(R.id.bottom_nav);
        bottomNav.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.nav_catalog) {
                showFragment(new CatalogFragment());
                return true;
            } else if (id == R.id.nav_quote) {
                showFragment(new QuoteFragment());
                return true;
            } else if (id == R.id.nav_contact) {
                showFragment(new ContactFragment());
                return true;
            } else {
                showFragment(new HomeFragment());
                return true;
            }
        });

        if (savedInstanceState == null) {
            bottomNav.setSelectedItemId(R.id.nav_home);
        }
        handleTab(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleTab(intent);
    }

    private void handleTab(Intent intent) {
        if (bottomNav != null && intent != null && intent.hasExtra(EXTRA_TAB)) {
            bottomNav.setSelectedItemId(intent.getIntExtra(EXTRA_TAB, R.id.nav_home));
        }
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(KEY_TAB, bottomNav.getSelectedItemId());
    }

    @Override
    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        if (savedInstanceState != null) {
            int tab = savedInstanceState.getInt(KEY_TAB, R.id.nav_home);
            bottomNav.setSelectedItemId(tab);
        }
    }

    public void goToTab(int itemId) {
        bottomNav.setSelectedItemId(itemId);
    }

    private void showFragment(Fragment fragment) {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_container, fragment)
                .commit();
    }
}