function createQuiz() {
  var newQuiz = FormApp.create('New Gradebook Quiz')
    .setIsQuiz(true)
    .setCollectEmail(true)
    .setLimitOneResponsePerUser(true);
  var ss = SpreadsheetApp.getActive();
  newQuiz.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return newQuiz.getEditUrl()
}

function importForm(formData) {
  var ss = SpreadsheetApp.getActive();
  formData.forEach(function(form) {
    var formID = FormApp.openById(form);
    formID.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId())

    var formName = formID.getTitle();
    var formURL = formID.getEditUrl().replace('/edit','/viewform');
    Logger.log(formName+' - '+formURL)
    
    // Find the relevant Sheet to the Form...
    var sheets = ss.getSheets().filter(function(sh){
      Logger.log(sh.getFormUrl())
      return sh.getFormUrl() === formURL
    });
    // Rename the Tab to the Form Name.
    sheets[0].setName(formName);
  });
}