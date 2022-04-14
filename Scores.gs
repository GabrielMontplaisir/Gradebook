// The tab name for your Gradebook.
var gradeBook = "Gradebook"

// The column name to identify students. This should be a unique identifier, such as an email.
var email = PropertiesService.getDocumentProperties().getProperty("IDCol");

// The column name for the student grades.
var grade = PropertiesService.getDocumentProperties().getProperty("GradeCol");

function docScores() {
  var ss = SpreadsheetApp.getActive();
  var scoreSheet = ss.getSheetByName(gradeBook);
  var range = scoreSheet.getDataRange();
  var sheets = ss.getSheets();
  var studentList = scoreSheet.getRange(2,1,scoreSheet.getLastRow()-1).getValues();

  sheets.slice().reverse().forEach(function(sheetTab) {
    var col = scoreSheet.getLastColumn() + 1;
    if (sheetTab.getName() != gradeBook){
      ss.toast("Gradebook updated with grades from "+sheetTab.getName());
      var responseExists = range.createTextFinder(sheetTab.getName());
      var occurrences = responseExists.matchEntireCell(true).findAll().map(x => x.getColumn());
      // Logger.log(occurrences);
      // Logger.log(col);
  
      var data = sheetTab.getDataRange().getValues();
      var emailIndex = data[0].indexOf(email);
      var scoreIndex = data[0].indexOf(grade);

      try {
        var studentScores = [
        sheetTab.getRange(2,emailIndex+1,sheetTab.getLastRow()-1).getValues(),
        sheetTab.getRange(2,scoreIndex+1,sheetTab.getLastRow()-1).getValues()
        ];
      } catch (err) {
      return "Identifier doesn't match or can't be found in Gradebook. Select identifiers through the hamburger icon in the top right, or make sure they're correct in the Gradebook tab."
      }
      
      // Logger.log(studentScores);
      if (occurrences.length != 0) {
        col = occurrences;
      };

      scoreSheet.getRange(1,col).setValue(sheetTab.getName());
      sortScores(col, studentScores, studentList);
    };
  });
}

function tabScores() {
  var ss = SpreadsheetApp.getActive();
  var scoreSheet = ss.getSheetByName(gradeBook);
  var range = scoreSheet.getDataRange();
  var sh = ss.getActiveSheet();
  var col = scoreSheet.getLastColumn() + 1;
  var studentList = scoreSheet.getRange(2,1,scoreSheet.getLastRow()-1).getValues();
  var notGB = true;

  if (sh.getName() != gradeBook){
    ss.toast("Gradebook updated with grades from "+sh.getName());
    var responseExists = range.createTextFinder(sh.getName());
    var occurrences = responseExists.matchEntireCell(true).findAll().map(x => x.getColumn());
    var data = sh.getDataRange().getValues();
    var emailIndex = data[0].indexOf(email);
    var scoreIndex = data[0].indexOf(grade);

    try {
      var studentScores = [
        sh.getRange(2,emailIndex+1,sh.getLastRow()-1).getValues(),
        sh.getRange(2,scoreIndex+1,sh.getLastRow()-1).getValues()
      ];
    } catch (err) {
      return "Identifier doesn't match or can't be found in Gradebook. Select identifiers through the hamburger icon in the top right, or make sure they're correct in the Gradebook tab."
    }

    // Logger.log(studentScores);
    if (occurrences.length != 0) {
      col = occurrences;
    };

    scoreSheet.getRange(1,col).setValue(sh.getName());
    sortScores(col, studentScores, studentList);
    return "Imported Tab Successfully."
  } else {
    return "Cannot Import from Gradebook Tab."
  }
}

function sortScores(col, studentScores, studentList) {
  var ss = SpreadsheetApp.getActive();
  var row = 2;
  var scoreSheet = ss.getSheetByName(gradeBook);
  for (var l in studentList) {
    // Logger.log(studentList[l]);
    for (var s in studentScores[0]){
      // Logger.log(studentScores[0][s])
      if (studentScores[0][s].toString() == studentList[l].toString()) {
        // Logger.log(studentList[l]+' - '+studentScores[0][s]+' - '+studentScores[1][s])
        scoreSheet.getRange(row,col).setValue(studentScores[1][s]);
        // Logger.log(studentScores);
        break
      };
    };
    row += 1
  };
}