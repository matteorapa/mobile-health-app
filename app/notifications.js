import PushNotification from 'react-native-push-notification';

function scheduleMedicationNotification(title, msg, date) {
  PushNotification.localNotificationSchedule({
    channelId: 'medication-channel',
    title: title,
    message: msg, // (required)
    date: date,
    allowWhileIdle: true,
    repeatType: 'day',
    actions: ['Taken', 'Remind Me Later'],
  });
}

function sendLocalHabitNotification(title, message) {
  PushNotification.localNotification({
    channelId: 'habit-channel',
    message: message,
    title: title,
    actions: ['Accept', 'Reject'],
    invokeApp: false,
  });
}

function getChannels() {
  PushNotification.getChannels(function (channel_ids) {
    console.log(channel_ids);
  });
}

function createMedicationChannel() {
  PushNotification.createChannel(
    {
      channelId: 'medication-channel',
      channelName: 'Medication Notifications',
      channelDescription:
        'A channel to categorise your medication notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`),
  );
}

function createHabitChannel() {
  PushNotification.createChannel(
    {
      channelId: 'habit-channel',
      channelName: 'Habit Notifications',
      channelDescription: 'A channel to categorise your habit notifications',
      soundName: 'default',
      importance: 3,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`),
  );
}

function createPriorityChannel() {
  PushNotification.createChannel(
    {
      channelId: 'priority-channel',
      channelName: 'Priority Notifications',
      channelDescription:
        'A channel to categorise your important notifications',
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 5,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`),
  );
}

function deleteChannel(channel_id) {
  PushNotification.deleteChannel(channel_id);
}

function deleteLocalNotification(notification_id) {
  PushNotification.cancelLocalNotifications({id: notification_id});
}

function initiateChannels() {
  PushNotification.channelExists('habit-channel', function (exists) {
    if (!exists) {
      createHabitChannel();
    }
  });

  PushNotification.channelExists('medication-channel', function (exists) {
    if (!exists) {
      createMedicationChannel();
    }
  });

  PushNotification.channelExists('priority-channel', function (exists) {
    if (!exists) {
      createPriorityChannel();
    }
  });
}

function getSheduledNotifications() {
  PushNotification.getScheduledLocalNotifications((data) => {
    console.log(data);
    return data;
  });
}

function getDeliveredNotifications() {
  PushNotification.getDeliveredNotifications((data) => {
    console.log(data);
    return data;
  });
}

function clearDeliveredNotifications() {
  PushNotification.removeAllDeliveredNotifications();
}

export {
  scheduleMedicationNotification,
  sendLocalHabitNotification,
  getChannels,
  createMedicationChannel,
  createHabitChannel,
  createPriorityChannel,
  deleteChannel,
  deleteLocalNotification,
  getSheduledNotifications,
  getDeliveredNotifications,
  clearDeliveredNotifications,
  initiateChannels,
};
