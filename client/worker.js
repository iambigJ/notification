console.log("server worker loaded")
self.addEventListener("push", e => {
    console.log(546)
    const data = e.data.json();
    console.log("Push recived...")
    self.registration.showNotification(
        data.title,
        {
            body: "New push notification", //the body of the push notification
            image: "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGVuc3xlbnwwfHwwfHw%3D&w=1000&q=80",
            icon: "https://www.nicepng.com/png/detail/38-385668_push-notifications-push-notification-icon-png.png", // icon 
            url: "https://images.unsplash.com/"
        }
    );
});