const $ = id => document.getElementById(id);

const state = {
  mode: null,        // "nouns" or "verbs"
  word: null,        // current vocab entry
  answers: null,     // { key: [accepted forms] }
  order: [],         // keys in the order the student fills them in
  checked: false,
  retrying: false,   // true after "Try again", so the word isn't counted twice
  done: 0,           // words attempted this session
  perfect: 0,        // words answered fully correctly on first check
};

/* ---------- navigation ---------- */

document.querySelectorAll(".choice[data-mode]").forEach(btn =>
  btn.addEventListener("click", () => startMode(btn.dataset.mode)));

$("log-notice").hidden = !LOG_URL;

$("back").addEventListener("click", () => {
  $("practice").hidden = true;
  $("home").hidden = false;
});

$("answers").addEventListener("submit", e => { e.preventDefault(); check(); });
$("retry").addEventListener("click", retry);
$("next").addEventListener("click", nextWord);

function startMode(mode) {
  state.mode = mode;
  state.done = 0;
  state.perfect = 0;
  state.word = null;
  $("home").hidden = true;
  $("practice").hidden = false;
  nextWord();
}

/* ---------- choosing a word ---------- */

function pickWord() {
  const pool = state.mode === "nouns" ? practisableNouns() : practisableVerbs();
  if (pool.length === 1) return pool[0];
  let w;
  do { w = pool[Math.floor(Math.random() * pool.length)]; } while (w === state.word);
  return w;
}

function nextWord() {
  state.word = pickWord();
  state.checked = false;
  state.retrying = false;
  state.mode === "nouns" ? showNoun(state.word) : showVerb(state.word);
  updateTally();
  $("result").hidden = true;
  $("check").hidden = false;
  $("retry").hidden = true;
  $("next").hidden = true;
  focusFirstEmpty();
}

/* ---------- building the table ---------- */

function showNoun(noun) {
  const [nom, gen] = splitParts(noun.latin);
  $("word-latin").textContent = `${nom}, ${gen}`;
  $("word-english").textContent = noun.english;
  $("word-info").textContent = describeNoun(noun);
  $("instruction").textContent = "Decline this noun. You don't need to add long vowel marks.";

  state.answers = declineNoun(noun);
  state.order = [...CASES.map(c => `${c}.sg`), ...CASES.map(c => `${c}.pl`)];
  buildGrid(CASES.map(c => ({ label: CASE_NAMES[c], keys: [`${c}.sg`, `${c}.pl`] })));
}

function showVerb(verb) {
  const [first, inf] = splitParts(verb.latin);
  $("word-latin").textContent = `${first}, ${inf}`;
  $("word-english").textContent = `to ${verb.english.replace(/, /g, ", to ")}`;
  $("word-info").textContent = describeVerb(verb) + (verb.note ? ` · ${verb.note}` : "");
  $("instruction").textContent = "Conjugate this verb in the present tense. You don't need to add long vowel marks.";

  state.answers = conjugateVerb(verb);
  state.order = PERSONS.slice();
  const labels = ["1st person", "2nd person", "3rd person"];
  buildGrid([1, 2, 3].map((p, i) => ({ label: labels[i], keys: [`${p}sg`, `${p}pl`] })));
}

/* rows: [{ label, keys: [singularKey, pluralKey] }] */
function buildGrid(rows) {
  const grid = $("grid");
  grid.innerHTML = "";

  const head = grid.createTHead().insertRow();
  ["", "Singular", "Plural"].forEach(t => {
    const th = document.createElement("th");
    th.textContent = t;
    head.appendChild(th);
  });

  const body = grid.createTBody();
  for (const row of rows) {
    const tr = body.insertRow();
    const th = document.createElement("th");
    th.textContent = row.label;
    tr.appendChild(th);
    for (const key of row.keys) {
      const td = tr.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.id = `in-${key}`;
      input.dataset.key = key;
      input.setAttribute("aria-label", `${row.label} ${key.endsWith("sg") ? "singular" : "plural"}`);
      input.autocapitalize = "off";
      input.spellcheck = false;
      // Fill down the singular column first, then the plural column.
      input.tabIndex = state.order.indexOf(key) + 1;
      input.addEventListener("keydown", onKeyDown);
      input.addEventListener("input", () => clearMark(input));
      td.appendChild(input);
      const note = document.createElement("div");
      note.className = "correction";
      note.id = `fix-${key}`;
      td.appendChild(note);
    }
  }
}

/* Enter moves to the next box; on the last box it checks the answers. */
function onKeyDown(e) {
  if (e.key !== "Enter") return;
  if (state.checked) return;           // let Enter submit / do nothing special
  const i = state.order.indexOf(e.target.dataset.key);
  if (i < state.order.length - 1) {
    e.preventDefault();
    $(`in-${state.order[i + 1]}`).focus();
  }
}

/* ---------- checking ---------- */

function check() {
  if (state.checked) { nextWord(); return; }

  let right = 0;
  for (const key of state.order) {
    const input = $(`in-${key}`);
    const accepted = state.answers[key];
    const ok = isCorrect(input.value, accepted);
    input.classList.toggle("good", ok);
    input.classList.toggle("bad", !ok);
    const fix = $(`fix-${key}`);
    fix.innerHTML = "";
    if (!ok) {
      fix.append("Answer: ");
      const b = document.createElement("b");
      b.textContent = accepted.join(" / ");
      fix.appendChild(b);
    }
    if (ok) right++;
  }

  const total = state.order.length;
  logAnswer(
    state.mode === "nouns" ? "Nouns" : "Verbs",
    $("word-latin").textContent + (state.retrying ? " (retry)" : ""),
    state.order.map(k => $(`in-${k}`).value.trim() || "–").join(", "),
    state.order.map(k => state.answers[k][0]).join(", "));
  if (!state.retrying) {
    state.done++;
    if (right === total) state.perfect++;
  }
  state.checked = true;
  updateTally();

  const result = $("result");
  result.hidden = false;
  result.className = "result " + (right === total ? "all-good" : "some-bad");
  result.textContent = right === total
    ? `Excellent! All ${total} correct.`
    : `${right} out of ${total} correct. Corrections are shown in red.`;

  $("check").hidden = true;
  $("retry").hidden = right === total;
  $("next").hidden = false;
  $("next").focus();
}

/* Clear the wrong answers (and hide corrections) so the student can have another go. */
function retry() {
  for (const key of state.order) {
    const input = $(`in-${key}`);
    $(`fix-${key}`).innerHTML = "";
    if (input.classList.contains("bad")) input.value = "";
    clearMark(input);
  }
  state.checked = false;
  state.retrying = true;
  $("result").hidden = true;
  $("check").hidden = false;
  $("retry").hidden = true;
  $("next").hidden = true;
  focusFirstEmpty();
}

function clearMark(input) {
  input.classList.remove("good", "bad");
}

function focusFirstEmpty() {
  const key = state.order.find(k => !$(`in-${k}`).value) || state.order[0];
  $(`in-${key}`).focus();
}

function updateTally() {
  $("tally").textContent = state.done
    ? `${state.perfect} of ${state.done} words fully correct`
    : "";
}
