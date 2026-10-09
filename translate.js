/* =====================================================================
   SENTENCE AND PASSAGE TRANSLATION
   =====================================================================
   Both activities are a list of steps. Each step shows some Latin (or a
   question), the student types an answer, presses Enter to see the
   model answer, and decides for themselves whether they were right.
   ===================================================================== */

const study = {
  steps: [],
  index: 0,
  revealed: false,
};

/* step: { activity, progress, heading, note, passage, vocab, label, prompt, answer } */

function sentenceSteps() {
  const total = SENTENCES.reduce((n, s) => n + s.items.length, 0);
  const steps = [];
  for (const section of SENTENCES) {
    for (const item of section.items) {
      steps.push({
        activity: "Sentences",
        progress: `Sentence ${steps.length + 1} of ${total}`,
        heading: section.title,
        note: section.note,
        label: "Translate into English",
        prompt: item.latin,
        latin: true,
        answer: item.english,
      });
    }
  }
  return steps;
}

function passageSteps() {
  const n = PASSAGE.sentences.length;
  const translate = PASSAGE.sentences.map((s, i) => ({
    activity: "Passage translation",
    progress: `Part 1: sentence ${i + 1} of ${n}`,
    heading: PASSAGE.title,
    note: "Translate the story one sentence at a time.",
    vocab: true,
    label: "Translate into English",
    prompt: s.latin,
    latin: true,
    answer: s.english,
  }));
  const q = PASSAGE.questions.length;
  const grammar = PASSAGE.questions.map((g, i) => ({
    activity: "Passage grammar",
    progress: `Part 2: question ${i + 1} of ${q}`,
    heading: "Grammar questions",
    note: "Answer these questions about the words in bold.",
    passage: true,
    label: `Question ${i + 1}`,
    prompt: g.question,
    answer: g.answer,
  }));
  return [...translate, ...grammar];
}

/* ---------- navigation ---------- */

document.querySelectorAll(".choice[data-activity]").forEach(btn =>
  btn.addEventListener("click", () => startStudy(btn.dataset.activity)));

$("study-back").addEventListener("click", () => {
  $("study").hidden = true;
  $("home").hidden = false;
});
$("study-home").addEventListener("click", () => $("study-back").click());
$("study-again").addEventListener("click", () => startStudy(study.activity));

$("study-form").addEventListener("submit", e => {
  e.preventDefault();
  study.revealed ? nextStep() : reveal();
});
$("study-next").addEventListener("click", nextStep);

/* Enter shows the answer; Shift+Enter still makes a new line. */
$("study-input").addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    $("study-form").requestSubmit();
  }
});

function startStudy(activity) {
  study.activity = activity;
  study.steps = activity === "passage" ? passageSteps() : sentenceSteps();
  study.index = 0;
  $("home").hidden = true;
  $("study").hidden = false;
  buildVocab();
  $("study-passage").innerHTML = boldMarkup(PASSAGE.text);
  showStep();
}

/* ---------- showing a step ---------- */

function showStep() {
  const step = study.steps[study.index];
  study.revealed = false;

  $("study-finished").hidden = true;
  $("study-form").hidden = false;
  $("study-card").hidden = false;

  $("study-progress").textContent = step.progress;
  $("study-heading").textContent = step.heading;
  $("study-note").textContent = step.note || "";
  $("study-note").hidden = !step.note;
  $("study-passage").hidden = !step.passage;
  $("study-vocab").hidden = !step.vocab;

  $("study-label").textContent = step.label;
  const prompt = $("study-prompt");
  prompt.textContent = step.prompt;
  prompt.classList.toggle("latin-text", !!step.latin);

  const input = $("study-input");
  input.value = "";
  input.readOnly = false;
  input.placeholder = step.latin ? "Type your English translation…" : "Type your answer…";

  $("study-hint").textContent = "see the answer";
  $("study-reveal").hidden = true;
  $("study-show").hidden = false;
  $("study-next").hidden = true;
  input.focus();
}

function reveal() {
  const step = study.steps[study.index];
  const input = $("study-input");
  study.revealed = true;
  input.readOnly = true;

  $("study-answer").textContent = step.answer;
  $("study-reveal").hidden = false;
  $("study-show").hidden = true;

  const last = study.index === study.steps.length - 1;
  const next = $("study-next");
  next.innerHTML = last ? "Finish" : "Next &rarr;";
  $("study-hint").textContent = last ? "finish" : "go to the next one";
  next.hidden = false;
  next.focus();

  logAnswer(step.activity, step.prompt, input.value.trim(), step.answer);
}

function nextStep() {
  study.index++;
  if (study.index < study.steps.length) {
    showStep();
  } else {
    finish();
  }
}

function finish() {
  $("study-form").hidden = true;
  $("study-card").hidden = true;
  $("study-passage").hidden = true;
  $("study-vocab").hidden = true;
  $("study-note").hidden = true;
  $("study-progress").textContent = "";
  $("study-heading").textContent = "Well done!";
  $("study-finished-text").textContent = study.activity === "passage"
    ? "You've finished the passage and all the grammar questions."
    : "You've finished all the sentences.";
  $("study-finished").hidden = false;
  $("study-again").focus();
}

/* ---------- helpers ---------- */

function buildVocab() {
  const list = $("study-vocab-list");
  list.innerHTML = "";
  for (const [latin, english] of PASSAGE.vocab) {
    const dt = document.createElement("dt");
    dt.textContent = latin;
    const dd = document.createElement("dd");
    dd.textContent = english;
    list.append(dt, dd);
  }
}

/* Turns **word** into <b>word</b>, escaping everything else. */
function boldMarkup(text) {
  const escape = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escape(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}
