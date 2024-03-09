const express = require("express");
const app = express();
const port = 3000;
const PatientVisitScheduler = require("./patientVisitScheduler");
const scheduler = new PatientVisitScheduler();

// Middleware to parse JSON bodies
app.use(express.json());

// GET request that returns a string
app.get("/string", (req, res) => {
  res.send("Hello, this is a string!");
});

app.post("/findNextAvailableDates", (req, res) => {
  const { startDate, endDate, count } = req.body;
  const availableDates = scheduler.findNextAvailableDates(
    startDate,
    endDate,
    count
  );
  res.json({ availableDates });
});

app.post("/reserveAppointment", (req, res) => {
  const confirmationCode = scheduler.reserveAppointment(req.body);
  res.json({ confirmationCode });
});
app.get("/test", (req, res) => {
  console.log("test");
});

app.get("/lookupUpcomingReservations/:patientIdentifier", (req, res) => {
  const { patientIdentifier } = req.params;
  console.log("test");
  const upcomingReservations =
    scheduler.lookupUpcomingReservations(patientIdentifier);
  res.json({ upcomingReservations });
});

app.post("/cancelReservation", (req, res) => {
  const { confirmationCode } = req.body;
  const success = scheduler.cancelReservation(code); //connfirmationcode
  res.json({ success });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
