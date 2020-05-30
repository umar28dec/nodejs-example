const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;
console.log(JSON.stringify(subscription));
  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});


app.get("/uk", (req, res) => { 
  // Create payload
const subscription='{"endpoint":"https://fcm.googleapis.com/fcm/send/fAsX8xghB6A:APA91bGBLBDVmiN1teXqvoIE3AOFKjdu_tASkftnvH2ANpMm9akay6y2tsHpO6YdL-I1fgIb8VcxrU2IUO_qaF5ONqmf1ImT-s9megqKpHlGJwHPlly34GiS75Yu7s9P-ynx3_K11Er0","expirationTime":null,"keys":{"p256dh":"BGAnNbI7g7DDS8GbXJwc7lJmxmB73vULZpio1zfVEAs2BCMpJCYIG4uiPb12y-e2qBkasFWI96cERnPnFUbuoNI","auth":"WjRoLTpS4DlbS6GqH3M6aA"}}';
  const payload = JSON.stringify({ title: "google"});

  // Pass object into sendNotification
  webpush
    .sendNotification(JSON.parse(subscription), payload)
    .catch(err => console.error(err));
    const subscription1='{"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABe0mrUiO4NiFylZiP_X9718Y5vUTnUFFVB_-eeaDdFR5Bf2QgqqyEDf4ryZelzQ3pEjIk937D0iMw9H9XM_t-CIRYRB_2sApgGhlm420COkzXnqKuDIF8LHjKdvojoPlHRARFjnsauYZt6rC2Q1IOeCAl53I7Slj-A-vZwAo4eSnEwmJs","keys":{"auth":"bVDtHAicDaAmeGSXYnWTxg","p256dh":"BILHb5pJBCFt58Obj4AYLnDYET7wOCkeQFVGSfK-Bsgn5ALbSkRTANBAHnjypsw0vh8-yWtz5NrCz6sQfGZeVQE"}}';
  const payload1 = JSON.stringify({ title: "firefox"});

  // Pass object into sendNotification
  webpush
    .sendNotification(JSON.parse(subscription1), payload1)
    .catch(err => console.error(err));
    res.status(201).json({});
});


const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
