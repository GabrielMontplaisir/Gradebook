# Gradebook
A Google Apps Script for Google Sheets which organizes all the grades from Google Form quizzes into a singular tab. When creating multiple Google Form Quizzes, link them all to your Google Sheet. Sync the whole document, or singular tabs, by using the Add-on menu.

## Installation

1. Start by creating a Google Sheet in your personal or work Google Drive. From the *Extensions* menu, select *Apps Script Editor*.
2. Copy the scripts from the two files into your Google Apps Script tab. Click the `Save` button.
3. Create a new tab in your Google Sheet under the name *Gradebook*. This is important, as the script will will not work otherwise.
4. In the *Gradebook* tab, paste a list of unique identifiers for your students in the 1st column, 2nd row. This needs to be unique per student, such as an email address (typically recorded by the response automatically).
5. Reload your Google Sheet.
6. Once reloaded, there should be a new Add-on available under the *Extensions* menu.

**You can create a copy template of the Gradebook by clicking on the website link to the right.**

## Usage

1. To use the Gradebook Add-on, simply create a Google Form quiz, link your Google Form enabled with *Gradebook* and start receiving responses.
2. Once you start receiving responses, a tab should be created automatically with the responses along with the students' email addresses and grades. Select the tab you want to update. From the *Extensions* menu, select `Tab to Gradebook`.
3. If you ever want to update all the grades, across all tabs, simply select `Document to Gradebook`.

**Please note:** If students ever update their scores, the Gradebook will update their grade the next time you select `Tab to Gradebook` for that quiz or `Document to Gradebook`.

## Coming Soon

- UI changes, which includes a sidebar, which will allow you to:
    - Create a Gradebook tab for you with a list of your students.
    - Attach a Google Form from the Sheet (Not sure if possible, need to check)
- Change some Gradebook customizations without having to access the code.
- Code optimizations where possible.
