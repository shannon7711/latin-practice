/* =====================================================================
   TRANSLATION CONTENT
   =====================================================================
   Copied from "Case practice.docx" and "Latin story to translate.docx".
   To change a sentence or answer, edit the text between the quotes.

   SENTENCES (Case practice)
     Each section has a title, an optional note shown above its
     sentences, and a list of { latin, english } pairs.

   PASSAGE (Latin story to translate)
     sentences : shown one at a time for the student to translate
     vocab     : the vocabulary list, shown as a help while translating
     text      : the whole passage, shown for the grammar questions.
                 Put **two stars** either side of a word to make it bold.
     questions : grammar questions asked one after another
   ===================================================================== */

const SENTENCES = [
  {
    title: "The genitive case",
    note: "Remember, the genitive case usually translates as “of the X” or “X’s”.",
    items: [
      { latin: "ancillae domini video.",
        english: "I see the slave-girls of the master. I see the master’s slave-girls." },
      { latin: "rex bellum amicorum pugnat.",
        english: "The king fights the war of [his] friends/allies. The king fights his friends’ war." },
      { latin: "hortus poetae est latus et bonus.",
        english: "The garden of the poet is wide and good. The poet’s garden is wide and good." },
    ],
  },
  {
    title: "The dative case",
    note: "The dative case is used for the indirect object. It usually translates as to X or from X.",
    items: [
      { latin: "servi pecuniam in forum domino dant.",
        english: "The slaves give the money to the master in the forum." },
      { latin: "nulli nuntii epistulam mittunt.",
        english: "No messengers send the letter." },
      { latin: "postridie vestimenta reginae reddo.",
        english: "On the next day I return the clothes to the queen." },
    ],
  },
  {
    title: "The ablative case",
    note: "Without a preposition it usually translates as with X, by X or from X.",
    items: [
      { latin: "cum equo canis ad templum ambulat.",
        english: "The dog walks to the temple with the horse." },
      { latin: "servos in agris laborare iubeo.",
        english: "I order the slaves to work in the fields." },
      { latin: "perterritum puerum magno gladio mox oppugnat.",
        english: "He soon attacks the terrified boy with the large sword." },
    ],
  },
  {
    title: "Mixed",
    note: "",
    items: [
      { latin: "filia aquam servo mariti dat.",
        english: "The daughter gives water to the slave of her husband. Slave is in the dative case (hence to), husband in the genitive (hence of)." },
      { latin: "insula lata domini non est in Roma.",
        english: "The wide island of the master is not in Rome. Domini is in the genitive singular, Roma in the ablative singular." },
      { latin: "villam amicis pueri capio.",
        english: "I capture the house from the friends of the boy. Amicis is the ablative plural, pueri is the genitive singular." },
    ],
  },
];

const PASSAGE = {
  title: "Paris and Helen",

  sentences: [
    { latin: "Paris cum servo prope Troiam nunc habitat.",
      english: "Paris now lives with his slave near Troy." },
    { latin: "in agris semper laborat.",
      english: "He always works in the fields." },
    { latin: "olim deae Minerva et Iuno et Venus disputant.",
      english: "One day the goddesses Minerva and Juno and Venus argue." },
    { latin: "deae ad Paridem veniunt.",
      english: "The goddesses come to Paris." },
    { latin: "‘quis’ inquiunt ‘est pulcherrima? iudex es.’",
      english: "‘Who’, they say, ‘is the most beautiful? You are the judge.’" },
    { latin: "Minerva sapientiam promittit.",
      english: "Minerva promises wisdom." },
    { latin: "Iuno pecuniam et imperium promittit.",
      english: "Juno promises money and power." },
    { latin: "Venus feminam pulcherrimam promittit.",
      english: "Venus promises the most beautiful woman." },
    { latin: "Paris Venerem legit.",
      english: "Paris chooses Venus. Paris selects Venus." },
    { latin: "Venus Paridem ad Graeciam ducit.",
      english: "Venus leads Paris to Greece." },
    { latin: "in Graecia Paris Helenam videt.",
      english: "In Greece Paris sees Helen." },
    { latin: "Helena femina pulcherrima est.",
      english: "Helen is the most beautiful woman." },
    { latin: "Paris Helenam amat et Helena Paridem amat.",
      english: "Paris loves Helen and Helen loves Paris." },
    { latin: "Paris Helenam e Graecia ducit.",
      english: "Paris leads Helen out of Greece." },
    { latin: "Troiam navigant.",
      english: "They sail to Troy." },
    { latin: "Graeci iratissimi sunt et Troiam navigant.",
      english: "The Greeks are very angry and they sail to Troy." },
    { latin: "bellum incipit.",
      english: "The war begins." },
  ],

  vocab: [
    ["Paris (accusative Paridem)", "Paris"],
    ["prope (+ accusative)", "near, near to"],
    ["Troia", "Troy"],
    ["habito, habitare", "I live, to live"],
    ["olim", "one day"],
    ["Minerva", "Minerva"],
    ["Iuno", "Juno"],
    ["Venus (accusative Venerem)", "Venus"],
    ["disputo, disputare", "I argue, to argue"],
    ["veniunt", "they come"],
    ["quis…?", "who"],
    ["inquiunt", "they say"],
    ["pulcherrima", "the most beautiful"],
    ["iudex", "judge"],
    ["sapientia", "wisdom"],
    ["promitto, promittere", "I promise, to promise"],
    ["imperium", "power"],
    ["Troiam", "to Troy"],
    ["iratissimus", "very angry"],
    ["incipit", "(it) begins"],
  ],

  text:
    "Paris cum **servo** prope Troiam nunc **habitat**. in **agris** semper laborat. " +
    "olim **deae** Minerva et Iuno et Venus disputant. deae ad Paridem veniunt. " +
    "‘quis’ inquiunt ‘est pulcherrima? iudex es.’ " +
    "Minerva **sapientiam** promittit. Iuno pecuniam et imperium promittit. " +
    "Venus feminam pulcherrimam promittit. Paris Venerem legit. Venus Paridem ad Graeciam ducit. " +
    "in Graecia Paris Helenam videt. Helena femina pulcherrima est. " +
    "Paris Helenam amat et Helena Paridem amat. Paris Helenam e Graecia ducit. Troiam navigant. " +
    "Graeci iratissimi **sunt** et Troiam navigant. **bellum** incipit.",

  questions: [
    { question: "What case is servo and why?",
      answer: "It is in the ablative case because the preposition cum (meaning with) takes the ablative." },
    { question: "What person and number (i.e. singular or plural) is the verb habitat in? What would it be in the second person plural?",
      answer: "Habitat is the third person singular. Habitatis is the second person plural." },
    { question: "What case, number (i.e. singular or plural) and gender is agris? Why is it in this case?",
      answer: "Agris is ablative plural masculine from the noun ager meaning field or land. It is in the ablative because the preposition in here uses the ablative case." },
    { question: "What case, number and gender is deae?",
      answer: "Deae is nominative plural feminine from dea, meaning goddess." },
    { question: "What case, number and gender is sapientiam?",
      answer: "Accusative singular feminine from sapientia." },
    { question: "What person and number is the verb sunt in? What would it be in the first person singular and the first person plural?",
      answer: "Third person plural. Sum is first person singular and sumus first person plural." },
    { question: "What case, number and gender is bellum?",
      answer: "Nominative singular neuter." },
  ],
};
