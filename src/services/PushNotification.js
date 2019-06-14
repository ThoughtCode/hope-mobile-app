import { Permissions, Notifications } from 'expo';
import {
  AsyncStorage
} from 'react-native';

export default registerForNotifications = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    alert('Hey! You might want to enable notifications to receive notifications.');
    return;
  }

  // Get the token that uniquely identifies this device
  try {
    let token = await Notifications.getExpoPushTokenAsync();
    await AsyncStorage.setItem('PushNotificationToken', token);
  } catch (err) {
    console.log(err);
  }
  
  
}
