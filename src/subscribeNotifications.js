import { register } from "./serviceWorkerRegistration.js";

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  rawData.split("").forEach((c, i) => (outputArray[i] = c.charCodeAt(0)));
  return outputArray;
};

const timetableToNotificationProfile = (timetable = {}) => {
  const days = ["mon", "tue", "wed", "thu", "fri"];
  const DEFAULT_MINUTES = 5;
  const allLectures = [];
  const timetableCopy = JSON.parse(JSON.stringify(timetable));
  //! Populate each lecture with which day it is on
  days.forEach((day) => {
    timetableCopy[day].forEach((lecture) => {
      if (Array.isArray(lecture))
        lecture.forEach((lect) => (lect["day"] = day));
      else lecture["day"] = day;
    });
  });
  days.forEach((day) => allLectures.push(...timetableCopy[day].flat(1)));
  const notificationProfile = allLectures.map((lecture) => {
    const { module, activePeriods, classroom, day, time } = lecture;
    const timeStart = +time.split(":")[0];
    const notifyBeforeStart = DEFAULT_MINUTES;
    return {
      module,
      activePeriods,
      classroom: classroom.join("|"),
      day,
      timeStart,
      notifyBeforeStart,
    };
  });
  return notificationProfile;
};

const askPermission = async () => {
  const permissionResult_1 = await new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });
    if (permissionResult) permissionResult.then(resolve, reject);
  });
  if (permissionResult_1 !== "granted")
    throw new Error("We weren't granted permission.");
};

const subscribeUserToPush = async () => {
  try {
    const registration = await register("service-worker.js");
    // const registration = await navigator.serviceWorker.register(
    //   "/service-worker.js"
    // );
    console.log("Service worker successfully registered.");
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BPOIqd4J5rM1eXyIfPkoCq6oj1QYWG8oP7P5hsRSA1MfCrIUM20LZm8p-KCCw3nNmU-FAbj3nwUsS-K4jUgdjUU"
      ),
    };
    const pushSubscription = await registration.pushManager.subscribe(
      subscribeOptions
    );
    return pushSubscription;
  } catch (err) {
    console.log("Unable to register service worker.");
    throw new Error(err);
  }
};

const genBody = (subscription, timetable) => {
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.getKeys("p256dh"),
      auth: subscription.getKeys("auth"),
    },
    profile: timetableToNotificationProfile(timetable),
  };
};

const sendSubscriptionToBackEnd = async (subscription, timetable) => {
  const response = await fetch("/api/save-subscription/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: genBody(subscription, timetable),
  });
  if (!response.ok) throw new Error("Bad status code from server.");
  const responseData = await response.json();
  if (!(responseData.data && responseData.data.success))
    throw new Error("Bad response from server.");
};

const subscribeToNotifications = async (timetable) => {
  const subscription = await askPermission()
    .then(subscribeUserToPush)
    .catch((err) => console.error(err));
  //TODO send to backend
};

export default subscribeToNotifications;

//linear-gradient(rgb(101, 74, 134), rgb(83, 66, 146))
// linear-gradient(left bottom, rgba(159, 88, 150, 0) 0px, rgba(159, 88, 150, 0.6) 100%)
