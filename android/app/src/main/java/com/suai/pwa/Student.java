package com.suai.pwa;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.util.Log;

import org.json.JSONException;

@CapacitorPlugin(name = "Student")
public class Student extends Plugin {
    public String TAG = "Student";
    @PluginMethod()
    public void test(PluginCall call) throws JSONException {
        Log.d(TAG, "test method activate");
        call.resolve();
    }
    @PluginMethod()
    public void test1(PluginCall call) throws JSONException {
        Log.d(TAG, "test1 method activate");
        JSObject obj = new JSObject();
        obj.put("msg", "hello world");
        call.resolve(obj);
    }
}
