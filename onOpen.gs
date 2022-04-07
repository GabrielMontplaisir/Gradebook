function onInstall(e) {
  onOpen(e);
}

function onOpen() {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem("Tab to Gradebook", "tabScores")
      .addSeparator()
      .addItem("Document to Gradebook", "docScores")
    .addToUi();
};