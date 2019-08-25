import PushNotification from 'react-native-push-notification';
import {DeviceEventEmitter, } from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


const configure = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      console.log("TOKEN:", token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);

      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM (OR FCM) SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     */
    requestPermissions: true
  });
};
const localNotification = (title,message,props) => {
  PushNotification.localNotification({
    autoCancel: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    bigText: "My big text that will be shown when notification is expanded",
    subText: "This is a subText",
    color: "green",
    vibrate: true,
    vibration: 300,
    title: title,
    message: message,
    playSound: true,
    soundName: 'default',
    actions: '["Accept", "Reject"]',
  });
  // (function() {
  //   // Register all the valid actions for notifications here and add the action handler for each action
  //   PushNotification.registerNotificationActions(["Accept","Reject"]);
  //   DeviceEventEmitter.addListener('notificationActionReceived', function(action){
  //     console.log ('Notification action received: ' + action);
  //     const info = JSON.parse(action.dataJSON);
  //     if (info.action == "Accept") {
  //
  //     } else if (info.action == "Reject") {
  //
  //     }
  //     // Add all the required actions handlers
  //   });
  // })();
};



export default {
  configure,
  localNotification,
};
