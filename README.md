# GoogleAppointmentSlots
A solution to manage workflow involving Google Calendar and Forms
1. An email is sent with a link to an intake Google Form
whenever a student signs up for an appointment slot in Google Calendar.
2. Then, if the student does not complete the Form within a 5 minutes for, their appointment is deleted (freed for others), and a second email is
sent encouraging them to sign up again.

Checkout branch CalendarToSheet for code to collect student email and appointment slot details from step 1.

Checkout branch FormToCalendar for code to implement step 2 above.

How Triggers are set up:
-	Set simple time-based trigger to run the script for every 1 minute so that the spreadsheet is up-to-date in step1.
-	Set installable trigger to run the script 5 min after a change is made to spreadsheet from step1 to finish events in step2 and also a simple time based trigger to run the installable trigger every 1 minute.
-	Optional : Set simple time-based triggers to update free slots every 30mins and send email everyday( can be modified to any interval) encouraging students who haven’t booked appointment even once.
