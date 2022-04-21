function createQuiz() {
  var newQuiz = FormApp.create('New Gradebook Quiz')
    .setIsQuiz(true)
    .setCollectEmail(true)
    .setLimitOneResponsePerUser(true);
  var ss = SpreadsheetApp.getActive();
  newQuiz.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return newQuiz.getEditUrl()
}