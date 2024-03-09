const express = require("express");
const bodyParser = require("body-parser");
const PatientVisitScheduler = require("./patientVisitScheduler");

const app = express();
const port = 3001;

const scheduler = new PatientVisitScheduler();

app.use(bodyParser.json());

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
  console.log(`Server is running on http://localhost:${port}`);
});
