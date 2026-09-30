/* =====================================================================
   VOCABULARY LIST
   =====================================================================
   To add a word, copy an existing line and edit it. The "latin" text is
   written exactly as it appears in the GCSE_Latin spreadsheet.

   NOUNS
     latin   : "nominative, genitive"            e.g. "puella, puellae"
     type    : the declension/gender label from the spreadsheet, e.g. "1f", "2m"
               (types the site knows how to decline are listed in latin.js)
     english : meaning
     forms   : OPTIONAL - only for irregular nouns. Replaces the regular
               form for a case. Give a list: the first is shown as the
               answer, any others are also accepted.
               Case keys: nom.sg acc.sg gen.sg dat.sg abl.sg
                          nom.pl acc.pl gen.pl dat.pl abl.pl

   VERBS
     latin   : principal parts, e.g. "amo, amare, amavi, amatus"
     conj    : conjugation number (1 = infinitive in -are)
     english : meaning
     note    : OPTIONAL - extra info shown to the student, e.g. "+ dat"
     forms   : OPTIONAL - for irregular verbs, all six present tense forms
               in order: I, you (sg), he/she/it, we, you (pl), they
   ===================================================================== */

const VOCAB = {
  nouns: [
    // ---- 1st declension ----
    { latin: "ancilla, ancillae",     type: "1f", english: "slave-girl" },
    { latin: "aqua, aquae",           type: "1f", english: "water" },
    { latin: "cena, cenae",           type: "1f", english: "dinner" },
    { latin: "cura, curae",           type: "1f", english: "care, worry" },
    { latin: "dea, deae",             type: "1f", english: "goddess",
      forms: { "dat.pl": ["deabus", "deis"], "abl.pl": ["deabus", "deis"] } },
    { latin: "domina, dominae",       type: "1f", english: "mistress" },
    { latin: "epistula, epistulae",   type: "1f", english: "letter" },
    { latin: "femina, feminae",       type: "1f", english: "woman" },
    { latin: "filia, filiae",         type: "1f", english: "daughter",
      forms: { "dat.pl": ["filiabus", "filiis"], "abl.pl": ["filiabus", "filiis"] } },
    { latin: "hora, horae",           type: "1f", english: "hour" },
    { latin: "ianua, ianuae",         type: "1f", english: "door" },
    { latin: "insula, insulae",       type: "1f", english: "island" },
    { latin: "ira, irae",             type: "1f", english: "anger" },
    { latin: "nauta, nautae",         type: "1m", english: "sailor" },
    { latin: "pecunia, pecuniae",     type: "1f", english: "money" },
    { latin: "poena, poenae",         type: "1f", english: "punishment" },
    { latin: "porta, portae",         type: "1f", english: "gate" },
    { latin: "puella, puellae",       type: "1f", english: "girl" },
    { latin: "regina, reginae",       type: "1f", english: "queen" },
    { latin: "silva, silvae",         type: "1f", english: "wood" },
    { latin: "taberna, tabernae",     type: "1f", english: "shop, inn" },
    { latin: "terra, terrae",         type: "1f", english: "ground, land" },
    { latin: "turba, turbae",         type: "1f", english: "crowd" },
    { latin: "via, viae",             type: "1f", english: "street, road, way" },
    { latin: "villa, villae",         type: "1f", english: "villa" },
    { latin: "vita, vitae",           type: "1f", english: "life" },

    // ---- 2nd declension ----
    { latin: "amicus, amici",         type: "2m", english: "friend" },
    { latin: "animus, animi",         type: "2m", english: "spirit, soul, mind" },
    { latin: "annus, anni",           type: "2m", english: "year" },
    { latin: "cibus, cibi",           type: "2m", english: "food" },
    { latin: "deus, dei",             type: "2m", english: "god",
      forms: { "nom.pl": ["di", "dei", "dii"],
               "dat.pl": ["dis", "deis", "diis"], "abl.pl": ["dis", "deis", "diis"] } },
    { latin: "dominus, domini",       type: "2m", english: "master" },
    { latin: "equus, equi",           type: "2m", english: "horse" },
    { latin: "filius, filii",         type: "2m", english: "son" },
    { latin: "gladius, gladii",       type: "2m", english: "sword" },
    { latin: "hortus, horti",         type: "2m", english: "garden" },
    { latin: "legatus, legati",       type: "2m", english: "commander" },
    { latin: "libertus, liberti",     type: "2m", english: "freedman" },
    { latin: "locus, loci",           type: "2m", english: "place",
      forms: { "nom.pl": ["loca", "loci"], "acc.pl": ["loca", "locos"] } },
    { latin: "maritus, mariti",       type: "2m", english: "husband" },
    { latin: "modus, modi",           type: "2m", english: "manner, way" },
    { latin: "murus, muri",           type: "2m", english: "wall" },
    { latin: "nuntius, nuntii",       type: "2m", english: "messenger, message" },
    { latin: "puer, pueri",           type: "2m", english: "boy" },
    { latin: "servus, servi",         type: "2m", english: "slave" },
    // Labelled "3m" in the spreadsheet, but vir is 2nd declension.
    { latin: "vir, viri",             type: "2m", english: "man" },
  ],

  verbs: [
    // ---- 1st conjugation ----
    { latin: "adiuvo, adiuvare, adiuvi, adiutus",           conj: 1, english: "help" },
    { latin: "ambulo, ambulare, ambulavi",                  conj: 1, english: "walk" },
    { latin: "amo, amare, amavi, amatus",                   conj: 1, english: "love, like" },
    { latin: "appropinquo, appropinquare, appropinquavi",   conj: 1, english: "approach", note: "+ dat" },
    { latin: "clamo, clamare, clamavi, clamatus",           conj: 1, english: "shout" },
    { latin: "cogito, cogitare, cogitavi, cogitatus",       conj: 1, english: "think" },
    { latin: "curo, curare, curavi, curatus",               conj: 1, english: "look after, care for, supervise" },
    { latin: "despero, desperare, desperavi, desperatus",   conj: 1, english: "despair" },
    { latin: "do, dare, dedi, datus",                       conj: 1, english: "give" },
    { latin: "exspecto, exspectare, exspectavi, exspectatus", conj: 1, english: "wait for" },
    { latin: "festino, festinare, festinavi",               conj: 1, english: "hurry" },
    { latin: "habito, habitare, habitavi, habitatus",       conj: 1, english: "live" },
    { latin: "impero, imperare, imperavi, imperatus",       conj: 1, english: "order, command", note: "+ dat" },
    { latin: "intro, intrare, intravi, intratus",           conj: 1, english: "enter" },
    { latin: "laboro, laborare, laboravi",                  conj: 1, english: "work" },
    { latin: "lacrimo, lacrimare, lacrimavi",               conj: 1, english: "cry" },
    { latin: "laudo, laudare, laudavi, laudatus",           conj: 1, english: "praise" },
    { latin: "libero, liberare, liberavi, liberatus",       conj: 1, english: "free, set free" },
    { latin: "narro, narrare, narravi, narratus",           conj: 1, english: "tell" },
    { latin: "navigo, navigare, navigavi",                  conj: 1, english: "sail" },
    { latin: "neco, necare, necavi, necatus",               conj: 1, english: "kill" },
    { latin: "nuntio, nuntiare, nuntiavi, nuntiatus",       conj: 1, english: "announce, report" },
    { latin: "oppugno, oppugnare, oppugnavi, oppugnatus",   conj: 1, english: "attack" },
    { latin: "oro, orare, oravi, oratus",                   conj: 1, english: "beg" },
    { latin: "paro, parare, paravi, paratus",               conj: 1, english: "prepare" },
    { latin: "porto, portare, portavi, portatus",           conj: 1, english: "carry" },
    { latin: "postulo, postulare, postulavi, postulatus",   conj: 1, english: "demand" },
    { latin: "pugno, pugnare, pugnavi",                     conj: 1, english: "fight" },
    { latin: "puto, putare, putavi, putatus",               conj: 1, english: "think" },
    { latin: "rogo, rogare, rogavi, rogatus",               conj: 1, english: "ask, ask for" },
    { latin: "saluto, salutare, salutavi, salutatus",       conj: 1, english: "greet" },
    { latin: "servo, servare, servavi, servatus",           conj: 1, english: "save, look after" },
    { latin: "specto, spectare, spectavi, spectatus",       conj: 1, english: "look at, watch" },
    { latin: "sto, stare, steti",                           conj: 1, english: "stand" },
    { latin: "supero, superare, superavi, superatus",       conj: 1, english: "overcome, overpower" },
    { latin: "voco, vocare, vocavi, vocatus",               conj: 1, english: "call" },

    // ---- irregular ----
    { latin: "sum, esse, fui", conj: "irregular", english: "be",
      forms: ["sum", "es", "est", "sumus", "estis", "sunt"] },
  ],
};
