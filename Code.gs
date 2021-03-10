function export_gsheet(){

var mycal = 'xxxxxxxxxxxxx.calendar.google.com';
var cal = CalendarApp.getCalendarById(mycal);

var events = cal.getEvents(new Date("March 01, 2021 00:00:00 EST"), new Date("March 31, 2021 00:00:00 EST"));

var sheet = SpreadsheetApp.getActiveSheet();

var header = [["Email","Event Title","Event ID","Event Location", "Event Start", "Event End", "Visibility", "Date Created", "Last Updated"]]
var range = sheet.getRange(1,1,1,9);
range.setValues(header);


for (var i=0;i<events.length;i++) {
var row=2;
for (var i=0;i<events.length;i++) {

var myformula_placeholder = '';

//GET THE EMAIL AND STATUS OF EACH GUEST FOR EACH EVENT
  var guestList=events[i].getGuestList();    
  for(var d=0; guestList!=null && d<guestList.length; d++)
    {      
      var details=[[guestList[d].getEmail(),events[i].getTitle(),events[i].getId(),events[i].getLocation(), events[i].getStartTime(), events[i].getEndTime(), ('' + events[i].getVisibility()), events[i].getDateCreated(), events[i].getLastUpdated()]];
      var range=sheet.getRange(row,1,1,9);
      Logger.log(details);

        var range2 = sheet.getRange(row,1,1,9);
        range2.setValues(details);
        row++; 
    }   
}
}
}
