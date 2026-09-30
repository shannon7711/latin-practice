/* =====================================================================
   GRAMMAR RULES
   =====================================================================
   To support a new declension or conjugation, add an entry below. Each
   one says how to find the stem and which endings to add to it.
   ===================================================================== */

const CASES = ["nom", "acc", "gen", "dat", "abl"];
const CASE_NAMES = { nom: "Nominative", acc: "Accusative", gen: "Genitive", dat: "Dative", abl: "Ablative" };
const NUMBERS = ["sg", "pl"];

const FIRST_DECLENSION = {
  name: "1st declension",
  stem: gen => gen.slice(0, -2),                       // puellae -> puell
  endings: {
    "acc.sg": "am",  "gen.sg": "ae",   "dat.sg": "ae", "abl.sg": "a",
    "nom.pl": "ae",  "acc.pl": "as",   "gen.pl": "arum", "dat.pl": "is", "abl.pl": "is",
  },
};

const SECOND_DECLENSION_MASC = {
  name: "2nd declension",
  stem: gen => gen.slice(0, -1),                       // domini -> domin, pueri -> puer
  endings: {
    "acc.sg": "um",  "gen.sg": "i",    "dat.sg": "o",  "abl.sg": "o",
    "nom.pl": "i",   "acc.pl": "os",   "gen.pl": "orum", "dat.pl": "is", "abl.pl": "is",
  },
};

// Keys match the labels used in the spreadsheet ("1f", "2m", ...).
const DECLENSIONS = {
  "1f": FIRST_DECLENSION,
  "1m": FIRST_DECLENSION,
  "2m": SECOND_DECLENSION_MASC,
};

const GENDER_NAMES = { m: "masculine", f: "feminine", n: "neuter" };

const PERSONS = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"];
const PERSON_NAMES = {
  "1sg": "1st person (I)",   "2sg": "2nd person (you)",       "3sg": "3rd person (he/she/it)",
  "1pl": "1st person (we)",  "2pl": "2nd person (you, pl.)",  "3pl": "3rd person (they)",
};

const CONJUGATIONS = {
  1: {
    name: "1st conjugation",
    stem: inf => inf.slice(0, -3),                     // amare -> am
    endings: ["o", "as", "at", "amus", "atis", "ant"],
  },
};

function splitParts(latin) {
  return latin.split(",").map(s => s.trim());
}

/* Returns { "nom.sg": ["puella"], "acc.sg": ["puellam"], ... }.
   Each value is a list of accepted answers; the first is the main one. */
function declineNoun(noun) {
  const [nom, gen] = splitParts(noun.latin);
  const rules = DECLENSIONS[noun.type];
  const stem = rules.stem(gen);
  const table = {};
  for (const c of CASES) {
    for (const n of NUMBERS) {
      const key = `${c}.${n}`;
      table[key] = key === "nom.sg" ? [nom] : [stem + rules.endings[key]];
    }
  }
  Object.assign(table, noun.forms || {});
  return table;
}

/* Returns { "1sg": ["amo"], "2sg": ["amas"], ... } */
function conjugateVerb(verb) {
  let forms = verb.forms;
  if (!forms) {
    const rules = CONJUGATIONS[verb.conj];
    const stem = rules.stem(splitParts(verb.latin)[1]);
    forms = rules.endings.map(e => stem + e);
  }
  const table = {};
  PERSONS.forEach((p, i) => { table[p] = [forms[i]]; });
  return table;
}

function describeNoun(noun) {
  const decl = DECLENSIONS[noun.type].name;
  const gender = GENDER_NAMES[noun.type.slice(-1)];
  return `${decl}, ${gender}`;
}

function describeVerb(verb) {
  return verb.forms ? "irregular" : CONJUGATIONS[verb.conj].name;
}

/* Only offer words the site knows how to inflect. */
function practisableNouns() {
  return VOCAB.nouns.filter(n => n.type in DECLENSIONS);
}
function practisableVerbs() {
  return VOCAB.verbs.filter(v => v.forms || v.conj in CONJUGATIONS);
}

/* Ignore case, spaces, accents/macrons, and treat j as i. */
function normalise(s) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "")
          .toLowerCase().replace(/j/g, "i").replace(/\s+/g, "");
}

function isCorrect(answer, accepted) {
  const a = normalise(answer);
  return a !== "" && accepted.some(f => normalise(f) === a);
}
