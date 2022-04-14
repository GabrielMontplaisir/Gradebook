# Gradebook
A Google Apps Script for Google Sheets which organizes all the grades from Google Form quizzes into a singular tab. When creating multiple Google Form Quizzes, link them all to your Google Sheet. Sync the whole document, or singular tabs, by using the Add-on menu.

## Installation

1. Start by creating a Google Sheet in your personal or work Google Drive. From the *Extensions* menu, select *Apps Script Editor*.
2. Copy the scripts from the two files into your Google Apps Script tab. Click the `Save` button.
3. Reload your Google Sheet.
4. Once reloaded, there should be a new Add-on available under the *Extensions* menu. Select *Show Sidebar*.
3. Select the option *Create Gradebook*.
4. In the newly created *Gradebook* tab, paste a list of unique identifiers for your students in the 1st column, 2nd row. This needs to be unique per student, such as an email address (typically recorded by the response automatically).
5. If desired, you can paste the name associated with that unique identifier in the second column. **It is not recorded or used in any way.** It's just an easy way for you to know who is associated with that identifier.

**You can create a copy template of the Gradebook by clicking on the website link to the right.**

## Usage

1. To use the Gradebook Add-on, simply create a Google Form quiz, link your Google Form enabled with *Gradebook* and start receiving responses.
2. Once you start receiving responses, a tab should be created automatically with the responses along with the students' email addresses and grades. Select the tab you want to update. From the Sidebar, select `Tab to Gradebook`.
3. If you ever want to update all the grades, across all tabs, simply select `Document to Gradebook`.

Simply wait for the script to finish. Once completed, you can find the grades in the *Gradebook* tab. A notification will appear in the Sidebar as well.

**Please note:** If students ever update their scores, the Gradebook will update their grade the next time you select `Tab to Gradebook` for that quiz or `Document to Gradebook`.

## Coming Soon

- UI changes, which will allow you to:
    - Generate a list of your students in your Gradebook automatically.
    - Attach a Google Form from the Sheet (Not sure if possible, need to check)
- Change the name of your Gradebook without having to access the code.
- Code optimizations where possible.
