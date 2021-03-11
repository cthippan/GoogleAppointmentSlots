//Creates  time-driven triggers.
 
// Trigger on edit to spreadsheet storing appointment slot data
function sheetTrigger() { 
 var ss=SpreadsheetApp.openById('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
 ScriptApp.newTrigger('timeTrigger')
  .forSpreadsheet(ss)
  .onEdit()
  .create();
  }


//  Trigger after 5 min.
function timeTrigger(){
 ScriptApp.newTrigger('sendEmail')
  .timeBased()
  .after(5 * 60 * 100)
  .create();
}

function sendEmail() 
{
// Load all the emails from the spreadsheet from the first column
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxx/edit#gid=0').getActiveSheet();
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
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit#gid=1734157181').getActiveSheet();
  var sub_lr = ss.getLastRow();
  var All_submitted_emails = [];
  for (var i = 2; i<=sub_lr;i++){
    var emailAddress = ss.getRange(i,2).getValue();
    All_submitted_emails.push(emailAddress)
  }
  var rem_email_list = [];
  for (var i = 0; i<=All_lr-1;i++){
    if (All_submitted_emails.indexOf(Alladdresses[i])===-1){
      rem_email_list.push(Alladdresses[i]);
    }
  }
  var rem_email_list = rem_email_list.filter(function (el) {
  return el != null;});
 
 //send reminder to signs up for an appointment slot
  var subject = "Sign Up";
  var message = "The College Academic Advising Hours are available for sign up";
  for (var i = 0; i<rem_email_list.length;i++){
    var emailAddress = rem_email_list[i];
    MailApp.sendEmail(emailAddress, subject, message);
    }

  
  }
  // var triggers = ScriptApp.getProjectTriggers();
  // for (var i = 1; i < triggers.length; i++) {
  // ScriptApp.deleteTrigger(triggers[i]);}

  function freeSlot() 
{
    var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit#gid=0').getActiveSheet();
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
// Load all the emails from the spreadsheet from the first column
  var ss = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/edit#gid=1734157181').getActiveSheet();
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
  //free up slot 
  var calendarId = 'c_6i25ic27u0e9b5ev3iih428560@group.calendar.google.com';
  var eventCal=CalendarApp.getCalendarById(calendarId);

  for (i=0;i <=rem_events_list.length-1;i++){
    target_event= rem_events_list[i];
    name= eventCal.getEventById(target_event).getTitle();
    startTime = eventCal.getEventById(target_event).getStartTime();
    endTime = eventCal.getEventById(target_event).getEndTime();
     try {
    //delete calender event
    eventCal.getEventById(target_event).deleteEvent();
     }
     catch(e) {
    Logger.log('Fetch threw an exception: ' + e);
  }
  }
}
