//Creates  time-driven triggers.
 
// Trigger on edit to spreadsheet storing appointment slot data
function createTimeDrivenTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
for (var i = 0; i < triggers.length; i++) {
  ScriptApp.deleteTrigger(triggers[i]);
}
  ScriptApp.newTrigger('timeTrigger')
  .forSpreadsheet('XXXXXXXXXXXXXXXXXXXXXXX')
  .onChange()
  .create();
}

  // Trigger after 5 min.
function timeTrigger(){
 ScriptApp.newTrigger("sendEmail")
  .timeBased()
  .after(5 * 60 * 1000)
  .create();
}

function sendEmail() 
{
// Load all the emails from the spreadsheet from the first column


  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXX/edit#gid=0').getActiveSheet();
  var All_lr = ss.getLastRow();
  var Alladdresses = [];
  var AlleventIDs=[];
  for (var i = 2; i<=All_lr;i++){
    var emailAddress = ss.getRange(i,1).getValue();
    Alladdresses.push(emailAddress);
  }
// Load all the eventIds from the spreadsheet from the third column
  for (var i = 2; i<=All_lr;i++){
    var eventTitle = ss.getRange(i,3).getValue();
    AlleventIDs.push(eventTitle);
  }
 

  // Load emails & eventIds from the spreadsheet linked to the form
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/edit#gid=1734157181').getActiveSheet();
  var sub_lr = ss.getLastRow();
  var All_submitted_emails = [];
  for (var i = 2; i<=sub_lr;i++){
    var emailAddress = ss.getRange(i,2).getValue();
    All_submitted_emails.push(emailAddress)
  }
  var rem_email_list = [];
  var rem_events_list=[];
  for (var i = 0; i<=All_lr-1;i++){
    if (All_submitted_emails.indexOf(Alladdresses[i])===-1){
      rem_email_list.push(Alladdresses[i]);
      rem_events_list.push(AlleventIDs[i]);
    }
  }
  var rem_email_list = rem_email_list.filter(function (el) {
  return el != null;});
  var rem_events_list = rem_events_list.filter(function (el) {
  return el != null;});
 
 //send reminder to signs up for an appointment slot
  var subject = "Sign Up";
  var message = "The College Academic Advising Hours are available for sign up";
  for (var i = 0; i<rem_email_list.length;i++){
    var emailAddress = rem_email_list[i];
    MailApp.sendEmail(emailAddress, subject, message);
    }

  //free up slot 
  var calendarId = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX.calendar.google.com';
  var eventCal=CalendarApp.getCalendarById(calendarId);

  for (i=0;i <=rem_events_list.length-1;i++){
    target_event= rem_events_list[i];
    name= eventCal.getEventById(target_event).getTitle();
    startTime = eventCal.getEventById(target_event).getStartTime();
    endTime = eventCal.getEventById(target_event).getEndTime();
    
    //delete calender event
    eventCal.getEventById(target_event).deleteEvent();

  }

}
