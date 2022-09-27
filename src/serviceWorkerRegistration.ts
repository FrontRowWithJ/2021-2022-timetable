// tslint:disable:no-console
// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the 'N+1' visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const register = async () => {
  if ("serviceWorker" in navigator) {
    const rej = (await navigator.serviceWorker.getRegistrations())[0];
    if (rej) return rej;
  }
  return new Promise((resolve, reject) => {
    if (
      /*process.env.NODE_ENV === "production" && */ "serviceWorker" in navigator
    ) {
      // The URL constructor is available in all browsers that support SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      if (publicUrl.origin !== window.location.origin)
        return reject(console.error("PUBLIC_URL is on a different origin"));
      window.addEventListener("load", async () => {
        const env = process.env.NODE_ENV === "development" ? "dev" : "prod";
        const swUrl = `${process.env.PUBLIC_URL}/${env}.service-worker.js`;
        // const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
        if (isLocalhost) {
          // This is running on localhost. Lets check if a service worker still exists or not.
          // const registration = await ;
          // Add some additional logging to localhost, pointing developers to the
          // service worker/PWA documentation.
          const registration = await checkValidServiceWorker(swUrl);
          if (registration)
            console.log(
              "This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ"
            );
          resolve(registration);
          // await navigator.serviceWorker.ready;
        } else resolve(registerValidSW(swUrl)); // Is not local host. Just register service worker
      });
    } else {
      console.error("Registration error: navigator.serviceWorker is undefined");
      reject(undefined);
    }
  }) as Promise<void | ServiceWorkerRegistration>;
};

const registerValidSW = async (swUrl: string) => {
  let registration: ServiceWorkerRegistration;
  try {
    registration = await navigator.serviceWorker.register(swUrl);
  } catch (e) {
    console.error("Error during service worker registration:", e);
    return;
  }
  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (installingWorker) {
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // At this point, the old content will have been purged and
            // the fresh content will have been added to the cache.
            // It's the perfect time to display a 'New content is
            // available; please refresh.' message in your web app.
            console.log(
              "New content is available and will be used when all " +
                "tabs for this page are closed. See https://cra.link/PWA."
            );
          } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // 'Content is cached for offline use.' message.
            console.log("Content is cached for offline use.");
          }
        }
      };
    }
  };
  return registration;
};

const checkValidServiceWorker = async (swUrl: string) => {
  // Check if the service worker can be found. If it can't reload the page.
  let response;
  try {
    response = await fetch(swUrl);
  } catch (err) {
    return console.log(
      "No internet connection found. App is running in offline mode."
    );
  }
  // Ensure service worker exists, and that we really are getting a JS file.
  if (
    response.status === 404 ||
    response.headers.get("content-type")!.indexOf("javascript") === -1
  ) {
    // No service worker found. Probably a different app. Reload the page.
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    window.location.reload();
  } else return registerValidSW(swUrl); // Service worker found. Proceed as normal.
};

export const unregister = () => {
  if ("serviceWorker" in navigator)
    navigator.serviceWorker.ready.then((registration) =>
      registration.unregister()
    );
};

export default register;
