function createTriggers() {
  var ss = SpreadsheetApp.getActive();
  var triggers = ScriptApp.getProjectTriggers();
  var formSubmitTriggerExists = false;

  triggers.forEach(function (trigger) {
    if(trigger.getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT && trigger.getHandlerFunction() === "formSubmit") {
      formSubmitTriggerExists = true;
    }

  });

  if (!formSubmitTriggerExists) {
    ScriptApp.newTrigger('formSubmit')
      .forSpreadsheet(ss)
      .onFormSubmit()
      .create();
    Logger.log("Trigger Created")
  }
}
