function onInstall(e) {
  onOpen();
}

function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem("Show Sidebar", "doGet")
  .addToUi();
};

function doGet(e) {
  var html = HtmlService.createTemplateFromFile('Sidebar')
    .evaluate();

  html
    .setTitle('Gradebook')
    .setWidth(300);
    
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.     
    .showSidebar(html);
}

function showPicker() {
    const html = HtmlService.createHtmlOutputFromFile('Picker.html')
      .setWidth(1051)
      .setHeight(650)
      .setTitle('Pick a quiz to import to Gradebook');
    SpreadsheetApp.getUi().showModalDialog(html, 'Pick a quiz to import to Gradebook');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getOAuthToken() {
  DriveApp.getRootFolder();
  return ScriptApp.getOAuthToken();
}