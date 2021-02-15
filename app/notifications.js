import PushNotification from 'react-native-push-notification';
import React from 'react';
import {List} from 'react-native-paper';

function scheduleMedicationNotification(title, msg, date) {
  PushNotification.localNotificationSchedule({
    channelId: 'medication-channel',
    title: title,
    message: msg, 
    date: date,
    allowWhileIdle: true,
    repeatType: 'day',
    actions: ['Taken', 'Remind Me Later'],
  });
}

function scheduleHabitNotification(title, msg, date) {
  PushNotification.localNotificationSchedule({
    channelId: 'habit-channel',
    title: title,
    message: msg, 
    date: date,
    allowWhileIdle: true,
    repeatType: 'day',
    actions: ['Done', 'Missed'],
  });
}

function sendLocalHabitNotification(title, message) {
  PushNotification.localNotification({
    channelId: 'habit-channel',
    message: message,
    title: title,
    actions: ['Done', 'Missed'],
    invokeApp: false,
    allowWhileIdle: true,
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
      soundName: 'default',
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

function getScheduledNotifications(cb){
  
    PushNotification.getScheduledLocalNotifications((data) => {
      cb(data)
    });

}

function getDeliveredNotifications(cb){
  
  PushNotification.getDeliveredNotifications((data) => {
    cb(data)
   
  });

}

function clearDeliveredNotifications() {
  PushNotification.removeAllDeliveredNotifications();
  console.log("Cleared delievered notifications")
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
  clearDeliveredNotifications,
  initiateChannels,
  scheduleHabitNotification,
  getDeliveredNotifications,
  getScheduledNotifications
};
