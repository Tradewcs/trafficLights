const idDb = '1FISnspg_SY7CSznP_N3GOsQbL3sTWX84F1er34r9wo4';
const ss = SpreadsheetApp.openById(idDb);
const sheet = ss.getSheetByName('Sheet1');

function doPost(e) {
  var state = e.parameter.state;
  var isAutomatic = e.parameter.isAutomatic;
  var timestamp = new Date().toISOString();

  var lastRow = sheet.getLastRow();
  
  var lastStateChangeCount = lastRow > 0 ? sheet.getRange(lastRow, 4).getValue() : 0;
  
  var stateChangeCount = lastStateChangeCount + 1;
  sheet.appendRow([state, timestamp, isAutomatic, stateChangeCount]);

  return ContentService.createTextOutput('State updated successfully');
}

function doGet(e) {
  var data = sheet.getDataRange().getValues();
  var jsonResponse = JSON.stringify(data);
  return ContentService.createTextOutput(jsonResponse).setMimeType(ContentService.MimeType.JSON);
}
