const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}
var subscription;
// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
console.log(JSON.stringify(subscription));
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}


async function uk(){

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify({"endpoint":"https://fcm.googleapis.com/fcm/send/fAsX8xghB6A:APA91bGBLBDVmiN1teXqvoIE3AOFKjdu_tASkftnvH2ANpMm9akay6y2tsHpO6YdL-I1fgIb8VcxrU2IUO_qaF5ONqmf1ImT-s9megqKpHlGJwHPlly34GiS75Yu7s9P-ynx3_K11Er0","expirationTime":null,"keys":{"p256dh":"BGAnNbI7g7DDS8GbXJwc7lJmxmB73vULZpio1zfVEAs2BCMpJCYIG4uiPb12y-e2qBkasFWI96cERnPnFUbuoNI","auth":"WjRoLTpS4DlbS6GqH3M6aA"}}),
    headers: {
      "content-type": "application/json"
    }
  });


}



function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
