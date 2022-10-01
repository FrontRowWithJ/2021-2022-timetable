/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />

self.addEventListener("push", (event) => {
  if (event.data) {
    const payload = event.data.json();
    let title = "";
    if (payload.type === "registration") title = "Registration Successful";
    if (payload.type === "college") title = "Time for Class!";
    const options = {
      body: payload.message,
      icon: "android-chrome-192x192.png",
    };
    title && self.registration.showNotification(title, options);
  }
});
