const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  rawData.split("").forEach((c, i) => (outputArray[i] = c.charCodeAt(0)));
  return outputArray;
};

const registerServiceWorker = async () => {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  return navigator.serviceWorker
    .register(swUrl)
    .then((registration) => registration);
};

interface PushSubscription {
  endpoint: string;
  keys: { [name in PushEncryptionKeyName]: string };
  expirationTime: EpochTimeStamp | null;
}

interface ResponseBody {
  message: string;
  success: boolean;
  data?: {
    [key: string]: boolean;
  };
}

const subscribeUserToPush = async () => {
  if (Notification.permission !== "default") return;
  const permission = (await new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission(resolve);
    if (permissionResult) permissionResult.then(resolve, reject);
  }).then((permissionResult) => permissionResult)) as NotificationPermission;
  if (permission === "granted") {
    const registration = await registerServiceWorker();
    if (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BMp3erwkDP9jouh8q19UYkYN4FjntqF8SNnCS2Zd4QB_oSw4IEc5pBbWFbyKY9yXeB7fHHELRmYBEBRKHNl863M"
        ),
      };
      const pushSubscription = await registration.pushManager.subscribe(
        subscribeOptions
      );
      const subscription = JSON.parse(
        JSON.stringify(pushSubscription)
      ) as PushSubscription;
      const storageString = localStorage.getItem("timetable");
      const serverURL = "";
      // const response = await fetch(serverURL, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ storageString, subscription }),
      // });
      // const { message, data, success } =
      //   (await response.json()) as ResponseBody;
      // if (!success) {
      //   console.error(
      //     `Registration error: ${message},  ${data ? JSON.stringify(data) : ""}`
      //   );
        // TODO tell the user that registration was unsuccesful and start
        // TODO it again
      }
      //TODO send endpoint, p256dh, auth and timetable to the Database.
    }
  }
};

export default subscribeUserToPush;
