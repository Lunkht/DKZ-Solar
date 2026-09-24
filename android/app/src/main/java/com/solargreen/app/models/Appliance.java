package com.solargreen.app.models;

import java.util.UUID;

public class Appliance {
    public String id;
    public String name;
    public int quantity;
    public int powerWatts;
    public String brand;

    public Appliance(String name, int quantity, int powerWatts, String brand) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.quantity = quantity;
        this.powerWatts = powerWatts;
        this.brand = brand;
    }

    public int getTotalConsumption() {
        return quantity * powerWatts;
    }
}