var gradeBook = "Gradebook";

function GradebookExists() {
  var scoreSheet = SpreadsheetApp.getActive().getSheetByName(gradeBook);
  var gbExists = false;
  if (scoreSheet) {
    return gbExists = true
  }
}

function createGradebook() {
  var ss = SpreadsheetApp.getActive();
  ss.insertSheet(gradeBook);

  var scoreSheet = ss.getSheetByName(gradeBook);
  scoreSheet.setFrozenColumns(2);
  scoreSheet.setFrozenRows(1);
  PropertiesService.getDocumentProperties().setProperty('IDCol', "Email Address");
  PropertiesService.getDocumentProperties().setProperty('GradeCol', "Score");
  scoreSheet.getRange(1,1).setValue('Homeroom Name');
  scoreSheet.getRange(2,1).setValue('In this column, starting with this row, paste the list of student emails or unique identifiers.');
  scoreSheet.getRange(3,1,3).setValue('student@domain.com');
  scoreSheet.getRange(2,2).setValue('In this column, starting with this row, paste the list of student names.');
  scoreSheet.getRange(3,2,3).setValue('Student Name');
  return "Created Gradebook tab."
}

function getID() {
  return PropertiesService.getDocumentProperties().getProperty("IDCol");
}

function getGrade() {
  return PropertiesService.getDocumentProperties().getProperty("GradeCol");
}

function updateID() {
  var currentid = SpreadsheetApp.getCurrentCell().getValue();
  PropertiesService.getDocumentProperties().setProperty('IDCol', currentid);
  return currentid
}

function updateGrade() {
  var currentgrade = SpreadsheetApp.getCurrentCell().getValue();
  PropertiesService.getDocumentProperties().setProperty('GradeCol', currentgrade);
  return currentgrade
}

function getDocProps() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName('Document Properties');
  let uObj=PropertiesService.getDocumentProperties().getProperties();
  let keys = Object.keys(uObj);
  sh.clearContents();
  let a=[['Key','Value']];
  keys.forEach(k => {a.push([k,uObj[k]]);});
  sh.getRange(1,1,a.length, a[0].length).setValues(a);
  ss.toast('Document Properties generated.')
}