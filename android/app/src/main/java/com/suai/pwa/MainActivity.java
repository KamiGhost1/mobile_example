package com.suai.pwa;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    public String TAG = "MainActivity";

    @Override
    public void onCreate(Bundle savedInstanceState) {
//        startActivity(new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS, Uri.parse("package:" + getPackageName())));
        Log.d(TAG, "onCreate: " + getPackageName());
        super.onCreate(savedInstanceState);
        registerPlugin(Student.class);
    }
}
