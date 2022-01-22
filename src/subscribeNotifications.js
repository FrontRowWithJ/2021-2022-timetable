import { urlBase64ToUint8Array } from "./util.js";
import { register } from "./serviceWorkerRegistration.js";

const askPermisson = async () => {
  const permissionResult_1 = await new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
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
      //TODO Check if this function is legit
      applicationServerKey: urlBase64ToUint8Array(
        "BPOIqd4J5rM1eXyIfPkoCq6oj1QYWG8oP7P5hsRSA1MfCrIUM20LZm8p-KCCw3nNmU-FAbj3nwUsS-K4jUgdjUU"
      ),
    };
    const pushSubscription = await registration.pushManager.subscribe(
      subscribeOptions
    );
    console.log(
      "Received PushSubscription: ",
      JSON.stringify(pushSubscription)
    );
    return pushSubscription;
  } catch (err) {
    console.log("Unable to register service worker.");
    throw new Error(err);
  }
};

const genResponse = (subscription, timetable) => {
  //TODO convert timetable to notification profile for user.
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.getKeys("p256dh"),
      auth: subscription.getKeys("auth"),
    },
  };
};

const sendSubscriptionToBackEnd = async (subscription) => {
  //TODO at this point I will also need to build a notification profile for  the user and send that as well
  const response = await fetch("/api/save-subscription/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  if (!response.ok) throw new Error("Bad status code from server.");
  const responseData = await response.json();
  if (!(responseData.data && responseData.data.success))
    throw new Error("Bad response from server.");
};

const subscribeToNotifications = async () => {
  askPermisson()
    .then(subscribeUserToPush)
    .catch((err) => console.error(err));
};

export default subscribeToNotifications;
