# GoogleAppointmentSlots
A solution to manage workflow involving Google Calendar and Forms
1. An email is sent with a link to an intake Google Form
whenever a student signs up for an appointment slot in Google Calendar.
2. Then, if the student does not complete the Form within a 5 minutes for, their appointment is deleted (freed for others), and a second email is
sent encouraging them to sign up again.

Checkout branch CalendarToForm for code to collect student email and appointment slot details from step 1.
Checkout branch FormToSheet for code to implement step 2 above.
