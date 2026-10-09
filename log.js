/* =====================================================================
   RECORDING STUDENT ANSWERS
   =====================================================================
   GitHub Pages can only serve files, so answers are sent to a Google
   Sheet instead. Follow the steps in SETUP-LOGGING.md, then paste your
   web app URL between the quotes below. While it is empty, nothing is
   sent anywhere.
   ===================================================================== */

const LOG_URL = "";

/* activity: "Nouns", "Verbs", "Sentences", "Passage translation", "Passage grammar"
   prompt:   what the student was shown
   answer:   what they typed
   correct:  the model answer */
function logAnswer(activity, prompt, answer, correct) {
  if (!LOG_URL) return;
  const row = {
    activity,
    prompt,
    answer,
    correct,
  };
  // text/plain avoids a CORS preflight, which Google Apps Script can't answer.
  fetch(LOG_URL, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(row),
  }).catch(() => {});
}
