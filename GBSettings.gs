function getSheetbyId(id) {
  Logger.log(id)
  return SpreadsheetApp.getActive().getSheets().filter(
    function(s) {return s.getSheetId().toString() === id;}
  )[0];
}

function GradebookExists() {
  var scoreSheet = getSheetbyId(PropertiesService.getScriptProperties().getProperty("Gradebook"));
  var sheets = SpreadsheetApp.getActive().getSheets();
  var gbExists = false;
  for (var i in sheets) {
    if (sheets[i].getSheetId().toString() == scoreSheet.getSheetId().toString()) {
      return gbExists = true
    }
  }
}

function createGradebook() {
  createTriggers();
  var ss = SpreadsheetApp.getActive();
  ss.insertSheet('Gradebook');
  var scoreSheet = ss.getSheetByName('Gradebook');
  scoreSheet.hideColumn(scoreSheet.getRange(1,1));
  scoreSheet.setFrozenColumns(2);
  scoreSheet.setFrozenRows(1);
  scoreSheet.getRange(1,1).setValue('Email Address');
  scoreSheet.getRange(1,2).setValue('Student Name');
  PropertiesService.getScriptProperties().setProperty("Gradebook", scoreSheet.getSheetId().toString())

  return "Created Gradebook tab."
}

function getDocProps() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName('Document Properties');
  let uObj=PropertiesService.getScriptProperties().getProperties();
  let keys = Object.keys(uObj);
  sh.clearContents();
  let a=[['Key','Value']];
  keys.forEach(k => {a.push([k,uObj[k]]);});
  sh.getRange(1,1,a.length, a[0].length).setValues(a);
  ss.toast('Document Properties generated.')
}

function delDocProps() {
  PropertiesService.getScriptProperties().deleteAllProperties();
}