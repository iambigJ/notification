const publicVapidKey = 'BD1Zf7bN4Hyso4YXAmKJiUuIE7teESslRoEGbZhKyvEfxuPs92YDvG-Fwaig6_WZ2IjVUDv07m_VRBpm6dFrwZI';


if (!('serviceWorker' in navigator)) {
    throw new Error('No Service Worker support!')
}
// const check = () => {
//     if (!('serviceWorker' in navigator)) {
//         throw new Error('No Service Worker support!')
//     }
//     if (!('PushManager' in window)) {
//         throw new Error('No Push API Support!')
//     }
// }

// const main = () => {
//     check()
// }

// main()
async function send() {
    //register service worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    //register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //public vapid key
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("sending push...")

    //Send push notification
    await fetch("/api/subscribe", {
        // await fetch("/api/v1/notification", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    });
    console.log('push sent..')
}
send()
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