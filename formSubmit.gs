function formSubmit(e) {
  var itemResponses = e.values;
  Logger.log(itemResponses);
  var email = itemResponses[1];
  var score = itemResponses[2];

  if (email == '') {

    var ss = SpreadsheetApp.getActive();
    var scoreSheet = getSheetbyId(PropertiesService.getScriptProperties().getProperty("Gradebook"));
    var sheetName = e.range.getSheet().getName();

    email = e.range.getValues()[0][1];
    var studentList = scoreSheet.getRange(2,1,scoreSheet.getLastRow()).getValues();

    if (!studentList.toString().includes(email)) {
      scoreSheet.getRange(scoreSheet.getLastRow()+1,1).setValue(email);
      var name = AdminDirectory.Users.get(email, {viewType:'domain_public', fields:'name'});
      scoreSheet.getRange(scoreSheet.getLastRow(), 2).setValue(name.name.fullName);
    }
    // Get Row & column in Gradebook
    var row = scoreSheet.createTextFinder(email).matchEntireCell(true).findNext().getRow();

    if (scoreSheet.createTextFinder(sheetName).matchEntireCell(true).findNext() == null) {
      scoreSheet.getRange(1, scoreSheet.getLastColumn()+1).setValue(sheetName);
    }

    var col = scoreSheet.createTextFinder(sheetName).matchEntireCell(true).findNext().getColumn();

    // Update score for student in appropriate column
    if (score != '') {
      scoreSheet.getRange(row,col).setValue(score);
    }
  }
}