const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());


app.get("/uk", (req, res) => {
const subscription='{"endpoint":"https://fcm.googleapis.com/fcm/send/fFXTTZlkln0:APA91bHwxyYnFDqPl2UZGj4eNi0vUF0IZWuzfRQK5DYqgQ2QXztpEwvJOHYU_R-6BrrGZyDc63PwdBGzPuJEO5MAm0Cr080SskUngicZdk-90I5E4MsAtyyCKGCt5jn_bGBgGWNMPQ3j","expirationTime":null,"keys":{"p256dh":"BGencYmZqcNkBvwyxZhC3WgzqtWQIjjzqR7_ZU8SLVE18wQOrBstrWYOkFMdPj_D9dsMG4hSvC9_K5qkilsB0Tg","auth":"wbgGfaRC8ghqlvbD2oBzSw"}}';
  const payload = JSON.stringify({ title: "fuck off "});
  webpush
    .sendNotification(JSON.parse(subscription), payload)
    .catch(err => console.error(err));
});


const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
