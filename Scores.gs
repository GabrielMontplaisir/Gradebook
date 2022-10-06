function docScores() {
  var scoreSheet = getSheetbyId(PropertiesService.getScriptProperties().getProperty("Gradebook"));
  var ss = SpreadsheetApp.getActive();
  var sheets = ss.getSheets();

  sheets.slice().reverse().forEach(function(sh) {
    var col = scoreSheet.getLastColumn() + 1;
    if (sh.getSheetId() != scoreSheet) {
      try {
        var formResponses = FormApp.openByUrl(sh.getFormUrl()).getResponses();
        // Logger.log("Found Form")
      } catch (e) {
        // Logger.log("Did not find form")
        // var formResponses = sh.getRange(1,emailIndex+2, sh.getLastRow(), commentIndex-2).getValues();
        return "Could not find a linked Google Form. Please link a form first, then try again."
      }

      var occurrences = scoreSheet.createTextFinder(sh.getName()).matchEntireCell(true).findAll().map(x => x.getColumn());

      if (occurrences.length != 0) {
        col = occurrences;
      };

      scoreSheet.getRange(1,col).setValue(sh.getName());
      sortScores(col, formResponses);
    };
  });
  return "Imported grades successfully."
}

function tabScores() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getActiveSheet();

  var scoreSheet = getSheetbyId(PropertiesService.getScriptProperties().getProperty("Gradebook"));
  var col = scoreSheet.getLastColumn() + 1;

  if (sh.getSheetId() != scoreSheet){
    var data = sh.getDataRange().getValues();
    // Logger.log(data)

    try {
      var formResponses = FormApp.openByUrl(sh.getFormUrl()).getResponses();
      // Logger.log("Found Form")
    } catch (e) {
      // Logger.log("Did not find form")
      // var formResponses = sh.getRange(1,emailIndex+2, sh.getLastRow(), commentIndex-2).getValues();
      return "Could not find a linked Google Form. Please link a form first, then try again."
    }

    var occurrences = scoreSheet.createTextFinder(sh.getName()).matchEntireCell(true).findAll().map(x => x.getColumn());

    if (occurrences.length != 0) {
      col = occurrences;
    };

    scoreSheet.getRange(1,col).setValue(sh.getName());
    sortScores(col, formResponses);
    return "Imported Tab Successfully."
  } else {
    return "Cannot Import from Gradebook Tab."
  }
}

function sortScores(col, formResponses) {
  var ss = SpreadsheetApp.getActive();
  var scoreSheet = getSheetbyId(PropertiesService.getScriptProperties().getProperty("Gradebook"));
  var studentList = scoreSheet.getRange(1,1,scoreSheet.getLastRow()).getValues();
  Logger.log(studentList)

  for (var s = 0; s < formResponses.length; s++) {
    var email = formResponses[s].getRespondentEmail();
    Logger.log(email)
    for (var l = 0; l < studentList.length; l++){
      // Logger.log(studentList)
      // Logger.log(studentList[l]);

      // If Student is not on Student List, then add them.
      if (!studentList.toString().includes(email)) {
        // Logger.log('Not on Student List')
        try {
          var name = AdminDirectory.Users.get(email, {viewType:'domain_public', fields:'name'});
          var fullName = name.name.fullName;
        } catch(err) {
          var fullName = 'Name not found';
        }
        scoreSheet.getRange(scoreSheet.getLastRow()+1,1).setValue(email);
        scoreSheet.getRange(scoreSheet.getLastRow(),2).setValue(fullName);
        studentList.push([email]);
      }

      if (email == studentList[l]) {
        var itemResponses = formResponses[s].getGradableItemResponses();
        var scores = [];
        for(var p = 0; p < itemResponses.length; p++){
          var score = itemResponses[p].getScore();
          scores.push(score);
        }
        var sum = scores.reduce(function(a, b) { return a + b; });
        Logger.log(studentList[l]+' - '+email+' - '+sum)
        scoreSheet.getRange(studentList.findIndex(function(value){
          return value.toString() === email
        })+1,col).setValue(sum);
        break
      };
    };
  };
}