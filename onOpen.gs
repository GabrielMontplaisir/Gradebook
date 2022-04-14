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
    .setTitle('Gradebook by ControlShiftEd')
    .setWidth(300);
    
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp or FormApp.     
    .showSidebar(html);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}