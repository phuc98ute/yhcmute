package com.app_hcmutenotify;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
//import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import cc.creamcookie.stompws.RNStompWSPackage;
//Firebase

//import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.wix.interactable.Interactable;
//Firebase
//import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
//import com.app_hcmutenotify.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new NetInfoPackage(),
            new RNStompWSPackage(),
            //new RNFirebasePackage(),
            //new RNGoogleSigninPackage(),
            new Interactable(),
            //new RNFirebaseMessagingPackage(),
            new VectorIconsPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativePushNotificationPackage()
      
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
  }
}
