# Seeing what students type

GitHub Pages only hosts files, so it can't store anything itself. Instead, the
site sends each answer to a Google Sheet that you own. Setup takes about
5 minutes and is free.

## 1. Make the sheet

1. Go to <https://sheets.new> to make a new Google Sheet. Name it something like
   "Latin practice answers".
2. In the menu, choose **Extensions → Apps Script**.
3. Delete whatever is in the editor and paste in this code:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     if (sheet.getLastRow() === 0) {
       sheet.appendRow(["Time", "Activity", "Question", "Student answer", "Model answer"]);
     }
     const d = JSON.parse(e.postData.contents);
     sheet.appendRow([new Date(), d.activity, d.prompt, d.answer, d.correct]);
     return ContentService.createTextOutput("ok");
   }
   ```

4. Click the **Save** icon.

## 2. Publish it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**. Google will ask you to authorise it. If you see
   "Google hasn't verified this app", click **Advanced → Go to (project name)**.
   This warning appears because it's your own script, not a published app.
5. Copy the **Web app URL**. It ends in `/exec`.

## 3. Connect the website

Open `log.js` and paste the URL between the quotes:

```js
const LOG_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
```

Upload the change to GitHub. Every answer will now appear as a new row in your
sheet. The home page also shows students a short note that their answers are saved.

## What gets recorded

| Column         | Meaning                                                        |
|----------------|----------------------------------------------------------------|
| Activity       | Nouns, Verbs, Sentences, Passage translation or Passage grammar |
| Question       | The Latin sentence, grammar question or word shown             |
| Student answer | What they typed                                                |
| Model answer   | The correct answer that was shown to them                      |

If you change the Apps Script code later, use **Deploy → Manage deployments →
Edit → New version** so that the same URL keeps working.
