// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the 'N+1' visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const register = async () => {
  if ("serviceWorker" in navigator) {
    const rej = (await navigator.serviceWorker.getRegistrations())[0];
    if (rej) return rej;
  }
  return new Promise((resolve, reject) => {
    if (!("serviceWorker" in navigator)) return reject(console.error("Registration error: navigator.serviceWorker is undefined"));
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
    if (publicUrl.origin !== window.location.origin)
      return reject(console.error("PUBLIC_URL is on a different origin"));
    const env = process.env.NODE_ENV === "development" ? "test" : "prod";
    const swUrl = `${process.env.PUBLIC_URL}/${env}.service-worker.js`;
    window.addEventListener("load", () => resolve(registerValidSW(swUrl)));
  }) as Promise<void | ServiceWorkerRegistration>;
};

const registerValidSW = async (swUrl: string) => {
  let registration: ServiceWorkerRegistration;
  try {
    registration = await navigator.serviceWorker.register(swUrl);
  } catch (e) {
    return console.error("Error during service worker registration:", e);
  }
  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (installingWorker === null) return;
    installingWorker.onstatechange = () => {
      if (installingWorker.state !== "installed") return;
      // At this point, everything has been precached.
      // It's the perfect time to display a
      // 'Content is cached for offline use.' message.
      if (navigator.serviceWorker.controller === null)
        return console.log("Content is cached for offline use.");
      // At this point, the old content will have been purged and
      // the fresh content will have been added to the cache.
      // It's the perfect time to display a 'New content is
      // available; please refresh.' message in your web app.
      console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.")
    };
  };
  return registration;
};

export const unregister = async () => {
  if (!("serviceWorker" in navigator)) return;
  const registration = await navigator.serviceWorker.ready;
  await registration.unregister();
};

export default register;
