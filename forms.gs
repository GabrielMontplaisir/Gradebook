function createQuiz() {
  var newQuiz = FormApp.create('New Gradebook Quiz')
    .setIsQuiz(true)
    .setCollectEmail(true)
    .setLimitOneResponsePerUser(true);
  var ss = SpreadsheetApp.getActive();
  newQuiz.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return newQuiz.getEditUrl()
}

function importQuiz(formData) {
  ss = SpreadsheetApp.getActive();
  formData.forEach(function(form) {
    var formID = FormApp.openById(form);
    formID.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())
  });
}