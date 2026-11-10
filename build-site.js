// Generator for the Rijschool 010 website.
// Source: src/ (site.css + extra.css, site.js, home.html). Output: static pages at clean URLs.
// Run: node build-site.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');

const SITE = {
  name: 'Rijschool 010',
  // Web3Forms access key (web3forms.com). Leeg = demo-modus: formulier gaat direct naar /bedankt/ zonder te versturen.
  web3formsKey: '5aecdcbd-92b8-4082-9633-668010b3887a',
  domain: 'https://rijschool010.nl',
  phone: '06 - 38 66 17 29',
  phoneIntl: '+31638661729',
  wa: 'https://wa.me/31638661729',
  email: 'info@rijschool010.nl',
  street: 'Maansteen 13',
  zip: '3162 TB',
  city: 'Rhoon',
  since: 2011,
  rating: '4,9',
  ratingNum: '4.9',
  reviews: 56,
  reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJH_Xj-F5NxEcRL7QnIA8WCWc',
  writeReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJH_Xj-F5NxEcRL7QnIA8WCWc',
  noindex: true, // demo: flip to false when the site goes live
};

// les = losse les van 45 min. Pakketlessen zijn 90 min: los €120, in een pakket €115.
// examen: losse waarde van het praktijkexamen. null = nog onbekend, dan staat er "+ examen".
const PRICE = { les: 60, les90: 120, pakLes: 115, proef: 60, examen: 350, ttt: 250 };
const PACKS = [
  { id: 'start', name: 'Start', lessen: 15, sub: 'Voor wie al wat gevoel heeft in de auto' },
  { id: 'compleet', name: 'Compleet', lessen: 20, pop: true, sub: 'De meeste leerlingen hebben dit nodig' },
  { id: 'zeker', name: 'Zeker Slagen', lessen: 30, sub: 'Volledig traject, ook bij faalangst' },
];
const eur = n => '€' + n.toLocaleString('nl-NL');
const exam = PRICE.examen;
PACKS.forEach(p => {
  p.prijs = p.lessen * PRICE.pakLes;
  p.korting = p.lessen * (PRICE.les90 - PRICE.pakLes);
  p.van = p.lessen * PRICE.les90 + PRICE.proef + (exam || 0);
  p.voordeel = p.korting + PRICE.proef + (exam || 0);
  p.vanTxt = eur(p.van) + (exam == null ? ' + examen' : '');
  p.voordeelTxt = eur(p.voordeel) + (exam == null ? ' + gratis examen' : '');
});

/* ---------- icons ---------- */
const P = {
  car: '<path d="M5 17h14M6 17v2M18 17v2M3 13l2-6a2 2 0 0 1 2-1.4h10A2 2 0 0 1 19 7l2 6v4H3z"/><circle cx="7.5" cy="13.5" r="1"/><circle cx="16.5" cy="13.5" r="1"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  heart: '<path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  star: '<path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
  flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  euro: '<path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.5A8.4 8.4 0 1 1 21 11.5z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};
const icon = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${P[n]}</svg>`;
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>';

/* ---------- content: services ---------- */
const SERVICES = [
  {
    slug: 'rijles-automaat', name: 'Rijles automaat', icon: 'car', img: 'automaat',
    short: 'Geen koppeling, alle aandacht voor de weg.',
    title: 'Rijles automaat in Rhoon en Rotterdam',
    h1: 'Rijles in een automaat. <span class="grad-text">Sneller examenklaar.</span>',
    intro: 'Geen koppeling, geen schakelen. In een automaat gaat al je aandacht naar het verkeer, waardoor je sneller leert rijden. Ideaal als je vlot je rijbewijs wilt, of als schakelen je spanning geeft.',
    about: [
      'Bij een automaat schakelt de auto zelf. Jij hebt alleen gas en rem. Dat klinkt klein, maar het scheelt veel: je hoeft niet tegelijk te koppelen, te schakelen en op het verkeer te letten. Vanaf de eerste les richt je je op wat echt telt: kijken, inschatten en veilig beslissen.',
      'Gemiddeld heb je in een automaat minder lessen nodig dan in een schakelauto. Let wel: met een automaatrijbewijs (code 78) mag je alleen in een automaat rijden. Steeds meer auto\'s zijn automaat of elektrisch, dus voor veel leerlingen is dat geen enkel probleem. Twijfel je? In de proefles bespreken we eerlijk wat bij jou past.',
    ],
    signalsTitle: 'Is automaat iets voor jou?',
    signals: ['Je wilt zo snel mogelijk je rijbewijs halen', 'Koppelen en schakelen geven je stress of faalangst', 'Je gaat later toch in een automaat of elektrische auto rijden'],
    krijgt: [
      ['Lessen van 90 minuten', 'In een pakket: genoeg tijd om iets nieuws te leren en het meteen goed te oefenen.'],
      ['Een plan per les', 'Je weet altijd waar je staat en wat de volgende stap naar je examen is.'],
      ['Ophalen in de regio', 'Thuis, op school of op het station in Rhoon, Rotterdam en omgeving.'],
      ['Examen inbegrepen', 'Kies je een pakket, dan zit je praktijkexamen er al bij.'],
    ],
    faq: [
      ['Hoeveel lessen heb ik nodig in een automaat?', 'Dat verschilt per persoon. Gemiddeld heb je in een automaat minder lessen nodig dan in een schakelauto. Na je proefles krijg je een eerlijk advies.'],
      ['Mag ik met een automaatrijbewijs in een schakelauto rijden?', 'Nee. Haal je je rijbewijs in een automaat (code 78), dan mag je alleen in een automaat rijden. Wil je later toch schakelen, dan kun je daarvoor apart examen doen.'],
      ['Wat kost rijles in een automaat?', `Een losse les van 45 minuten kost ${eur(PRICE.les)}. In een pakket rijd je lessen van 90 minuten voor ${eur(PRICE.pakLes)} per les en is je praktijkexamen inbegrepen.`],
    ],
    related: ['rijles-schakel', 'rijles-faalangst', 'spoedcursus'],
  },
  {
    slug: 'rijles-schakel', name: 'Rijles schakel', icon: 'gear', img: 'schakel',
    short: 'Handgeschakeld rijbewijs, rijden in elke auto.',
    title: 'Rijles schakel in Rhoon en Rotterdam',
    h1: 'Rijles in een schakelauto. <span class="grad-text">Rijden in elke auto.</span>',
    intro: 'Leer koppelen, schakelen en wegrijden op een helling zonder stress. Met een handgeschakeld rijbewijs mag je in iedere auto rijden, ook in een automaat.',
    about: [
      'In een schakelauto bedien je zelf de koppeling en de versnellingen. Dat vraagt in het begin wat meer oefening, maar het levert je een rijbewijs zonder beperking op. Je mag daarna in elke personenauto rijden, handgeschakeld of automaat.',
      'We bouwen het stap voor stap op. Eerst rustig leren wegrijden en schakelen op een stille weg, daarna pas de drukte van Rotterdam in. Zo wordt schakelen iets wat je vanzelf doet, en houd je je hoofd vrij voor het verkeer.',
    ],
    signalsTitle: 'Kies je voor schakel?',
    signals: ['Je wilt een rijbewijs waarmee je in elke auto mag rijden', 'De auto van familie of werk is handgeschakeld', 'Je wilt de auto helemaal leren kennen'],
    krijgt: [
      ['Schakelen in jouw tempo', 'Eerst de basis op een rustige plek, daarna pas het drukke verkeer.'],
      ['Wegrijden op een helling', 'Hellingproeven en bruggen oefenen we tot het vanzelf gaat.'],
      ['Een plan per les', 'Elke les bouwt voort op de vorige, met je examen als doel.'],
      ['Examen inbegrepen', 'Bij elk pakket zit je praktijkexamen erbij.'],
    ],
    faq: [
      ['Is schakelen moeilijk?', 'In het begin is het even wennen. Met rustige uitleg en genoeg herhaling gaat het na een paar lessen vanzelf.'],
      ['Kan ik later overstappen naar automaat?', 'Ja. Merk je dat schakelen je tegenhoudt, dan kun je overstappen naar de automaat. We bespreken dat samen, zonder druk.'],
      ['Wat kost rijles in een schakelauto?', `Hetzelfde als in de automaat: ${eur(PRICE.les)} per losse les van 45 minuten, of ${eur(PRICE.pakLes)} per les in een pakket met examen inbegrepen.`],
    ],
    related: ['rijles-automaat', 'opfriscursus', 'rijles-vanaf-16-5-jaar'],
  },
  {
    slug: 'rijles-faalangst', name: 'Rijles bij faalangst', icon: 'heart', img: 'g16',
    short: 'Onze specialiteit. Rustig en positief naar je examen.',
    title: 'Rijles bij faalangst in Rotterdam en Rhoon',
    h1: 'Rijles bij faalangst. <span class="grad-text">Rustig naar je roze pasje.</span>',
    intro: 'Ben je bang dat je dichtklapt tijdens je examen? Begeleiding bij faalangst is al jaren onze specialiteit. Veel van onze leerlingen met faalangst slaagden in één keer.',
    about: [
      'Faalangst is de angst om te falen op het moment dat het telt. In de les gaat het prima, maar bij de gedachte aan een examinator naast je slaat de spanning toe. Dat is heel normaal, en het is goed aan te pakken.',
      'Wij werken rustig, positief en duidelijk. We oefenen examensituaties zo vaak dat ze vertrouwd voelen, en je leert wat je kunt doen als de spanning toch opkomt. Bij het CBR kun je een faalangstexamen aanvragen, met meer tijd en een examinator die extra getraind is in het begeleiden van spanning. We bespreken samen of dat bij jou past.',
    ],
    signalsTitle: 'Herken je dit?',
    signals: ['In de les rijd je goed, maar het examen maakt je onzeker', 'Je bent eerder gezakt door de zenuwen', 'Je stelt je examen steeds uit omdat het spannend voelt'],
    krijgt: [
      ['Een rustige, positieve instructeur', 'Geen geschreeuw of zuchten. Wel duidelijke uitleg en vertrouwen.'],
      ['Examen oefenen tot het vertrouwd voelt', 'We rijden examenroutes en doen proefexamens, zodat niets nieuw is op de dag zelf.'],
      ['Faalangstexamen bespreken', 'We kijken samen of een faalangstexamen bij het CBR iets voor je is.'],
      ['Jouw tempo', 'We gaan pas een stap verder als jij er klaar voor bent.'],
    ],
    review: ['Tara Brouw', 'Ik ben bij rijschool 010 gekomen doordat ik er een auto van zag rijden en daarop stond specifiek ook voor mensen met faalangst. Shahbaz heeft mij het vertrouwen gegeven door een rustige duidelijke begeleiding. Met als resultaat in 1x geslaagd!'],
    faq: [
      ['Wat is een faalangstexamen?', 'Een praktijkexamen bij het CBR voor kandidaten met faalangst. Je krijgt meer tijd en een examinator die extra getraind is om je op je gemak te stellen. We helpen je bij de aanvraag.'],
      ['Kan ik in een automaat rijden als ik faalangst heb?', 'Ja, en dat raden we vaak aan. In een automaat heb je minder om tegelijk op te letten, waardoor er meer rust in je hoofd blijft.'],
      ['Ik ben al eens gezakt. Kan ik bij jullie verder?', 'Zeker. Veel leerlingen kwamen na een eerdere teleurstelling bij ons. We kijken eerst waar het misging en pakken dat gericht aan.'],
    ],
    related: ['rijangst', 'rijles-automaat', 'proefles'],
  },
  {
    slug: 'rijangst', name: 'Rijles bij rijangst', icon: 'shield', img: 'g12',
    short: 'Weer met een goed gevoel achter het stuur.',
    title: 'Rijangst overwinnen met rijles in Rotterdam',
    h1: 'Rijangst overwinnen. <span class="grad-text">Stap voor stap.</span>',
    intro: 'Durf je niet meer goed achter het stuur, of heb je het rijden lang uitgesteld? We nemen de tijd en bouwen je zelfvertrouwen stap voor stap weer op.',
    about: [
      'Rijangst is iets anders dan faalangst. Het gaat niet om het examen, maar om het rijden zelf: de snelweg, druk verkeer, invoegen, of een nare ervaring die blijft hangen. Het gevolg is dat je de auto gaat vermijden. Hoe langer je dat doet, hoe hoger de drempel wordt.',
      'We beginnen waar jij je prettig voelt. Een rustige wijk, een vaste route, korte stukjes. Pas als dat goed voelt, gaan we een stap verder. Geen druk, wel een duidelijk plan. Je rijdt in een lesauto met dubbele bediening, dus je bent nooit alleen.',
    ],
    signalsTitle: 'Herken je dit?',
    signals: ['Je hebt een rijbewijs maar durft niet meer alleen te rijden', 'Snelwegen, invoegen of drukke kruispunten vermijd je liever', 'Na een nare ervaring voelt rijden niet meer veilig'],
    krijgt: [
      ['Starten in je comfortzone', 'Eerst rustige wegen en vaste routes, zodat het rijden weer vertrouwd wordt.'],
      ['Dubbele bediening', 'De instructeur kan altijd ingrijpen. Dat geeft rust.'],
      ['Gericht oefenen', 'Snelweg, invoegen of de stad: we werken naar precies die situatie toe.'],
      ['Geduld en eerlijkheid', 'Je hoort wat goed gaat en wat nog beter kan, zonder oordeel.'],
    ],
    review: ['Carolina U.', 'Jafri is een rustige en positieve rijinstructeur die altijd topadvies geeft. Ik was gestopt met rijden, maar dankzij Jafri heb ik het plezier in autorijden weer helemaal teruggevonden.'],
    faq: [
      ['Ik heb al een rijbewijs. Kan ik toch les nemen?', 'Ja. Je rijdt in onze lesauto met dubbele bediening, zodat je je veilig voelt terwijl je weer went.'],
      ['Hoeveel lessen heb ik nodig?', 'Dat verschilt sterk. Sommige mensen zijn na een paar lessen weer op weg, anderen hebben meer tijd nodig. We spreken het per keer af.'],
      ['Kan ik ook alleen de snelweg oefenen?', 'Ja. We stemmen de lessen af op wat jij lastig vindt.'],
    ],
    related: ['opfriscursus', 'rijles-faalangst', 'instructrice'],
  },
  {
    slug: 'opfriscursus', name: 'Opfriscursus', icon: 'refresh', img: 'g18',
    short: 'Lang niet gereden? Weer zeker de weg op.',
    title: 'Opfriscursus rijles in Rotterdam en omgeving',
    h1: 'Opfriscursus. <span class="grad-text">Weer zeker de weg op.</span>',
    intro: 'Wel een rijbewijs, maar al lang niet gereden? Met een paar opfrislessen ben je weer helemaal bij en rijd je met vertrouwen door Rotterdam en omgeving.',
    about: [
      'Veel mensen halen hun rijbewijs en rijden daarna jaren niet. Of ze komen uit het buitenland en moeten wennen aan het Nederlandse verkeer: fietsers overal, voorrang van rechts, rotondes en trams. Na een tijdje voelt de auto dan vreemd en spannend.',
      'In een opfriscursus kijken we eerst waar je staat. Daarna oefenen we precies wat jij nodig hebt, of dat nu de snelweg is, parkeren of de drukte in de stad. Een losse les duurt 45 minuten, dus je neemt precies zoveel als je nodig hebt.',
    ],
    signalsTitle: 'Herken je dit?',
    signals: ['Je hebt je rijbewijs maar rijdt al jaren niet', 'Je bent net in Nederland en moet wennen aan de regels', 'Je wilt weer zelfstandig rijden, voor werk of gezin'],
    krijgt: [
      ['Eerst een nulmeting', 'In de eerste les kijken we wat goed gaat en wat aandacht nodig heeft.'],
      ['Precies oefenen wat jij nodig hebt', 'Snelweg, parkeren, rotondes of de stad.'],
      ['Automaat of schakel', 'Je kiest zelf in welke auto je de lessen volgt.'],
      ['Geen pakket nodig', 'Je kunt ook losse lessen nemen, precies zoveel als je nodig hebt.'],
    ],
    faq: [
      ['Hoeveel opfrislessen heb ik nodig?', 'Dat hangt af van hoe lang je niet hebt gereden. Vaak zijn een paar lessen genoeg. Na de eerste les weet je wat we adviseren.'],
      ['Kan ik kiezen tussen automaat en schakel?', 'Ja, je kiest zelf in welke auto je de opfrislessen volgt.'],
      ['Wat kost een opfrisles?', `Een losse les van 45 minuten kost ${eur(PRICE.les)}.`],
    ],
    related: ['rijangst', 'driving-lessons-english', 'rijles-automaat'],
  },
  {
    slug: 'spoedcursus', name: 'Spoedcursus', icon: 'bolt', img: 'g05',
    short: 'Vaker per week of 10 dagen achter elkaar.',
    title: 'Spoedcursus rijbewijs in Rotterdam en Rhoon',
    h1: 'Spoedcursus rijbewijs. <span class="grad-text">Snel en goed voorbereid.</span>',
    intro: 'Wil je snel je rijbewijs? Met een spoedcursus les je vaker per week, of tien dagen achter elkaar, en doe je daarna je praktijkexamen.',
    about: [
      'Bij een spoedcursus plannen we je lessen dicht op elkaar. Doordat er weinig tijd tussen de lessen zit, vergeet je minder en ga je sneller vooruit. Je kiest voor meerdere lessen per week, of voor een intensieve cursus van tien dagen achter elkaar.',
      'Een spoedcursus is intensief en vraagt wat van je. Daarom kijken we in de proefles eerst of het bij je past. De examendatum hangt af van de beschikbaarheid bij het CBR, dus meld je op tijd aan. Je theorie moet binnen zijn voordat je praktijkexamen doet.',
    ],
    signalsTitle: 'Past een spoedcursus bij jou?',
    signals: ['Je hebt een deadline, zoals een nieuwe baan', 'Je theorie is gehaald en je wilt doorpakken', 'Je hebt een periode vrij en wilt die goed benutten'],
    krijgt: [
      ['Lessen dicht op elkaar', 'Meerdere lessen per week of tien dagen achter elkaar.'],
      ['Realistische planning', 'Na de proefles maken we een planning die past bij jouw niveau.'],
      ['Examen inbegrepen', 'Met een pakket zit je praktijkexamen erbij.'],
      ['Ook op zaterdag', 'Zo halen we het maximale uit je beschikbare tijd.'],
    ],
    faq: [
      ['Hoe snel kan ik examen doen?', 'Dat hangt af van je niveau en van de beschikbaarheid bij het CBR. Na de proefles maken we een realistische planning.'],
      ['Moet ik mijn theorie al hebben?', 'Voor je praktijkexamen moet je theorie gehaald zijn. Beginnen met lessen kan al terwijl je de theorie leert.'],
      ['Wat kost een spoedcursus?', `Je betaalt gewoon per les: ${eur(PRICE.les)} per losse les van 45 minuten, of ${eur(PRICE.pakLes)} per les in een pakket met examen inbegrepen.`],
    ],
    related: ['rijles-automaat', 'proefles', 'tarieven'],
  },
  {
    slug: 'driving-lessons-english', name: 'Lessons in English', icon: 'globe', img: 'g11', lang: 'en',
    short: 'Driving lessons fully in English.',
    title: 'Driving lessons in English in Rotterdam',
    eyebrow: 'Lessons in English',
    h1: 'Driving lessons in English. <span class="grad-text">Clear and calm.</span>',
    intro: 'New to the Netherlands? Take your driving lessons fully in English, in an automatic or a manual car. Clear explanations, a plan for every lesson and a calm instructor.',
    about: [
      'Learning to drive in a new country is a lot at once: different rules, cyclists everywhere, trams and priority to traffic from the right. Doing all that in a language you are still learning makes it harder than it needs to be. At Rijschool 010 every lesson is in English, so you can focus on the road.',
      'We prepare you for exactly what the CBR examiner expects on your practical exam, and help you with the planning around it. Single lessons last 45 minutes. In a package you drive 90 minute lessons, which gives you time to practise properly instead of rushing.',
    ],
    signalsTitle: 'Is this you?',
    signals: ['You moved to the Netherlands and need a Dutch driving licence', 'Your foreign licence cannot be exchanged', 'You prefer clear instructions in English'],
    krijgt: [
      ['Lessons fully in English', 'Every explanation, every tip, every debrief.'],
      ['A plan for every lesson', 'You always know where you stand and what comes next.'],
      ['Automatic or manual', 'You choose the car that suits you.'],
      ['Exam included', 'Choose a package and your practical exam is included.'],
    ],
    review: ['Martin O.', 'Highly recommend Rijschool 010. Was able to take great driving lessons in English which helped me pass my exam in one try. Each lesson has a plan to help you be prepared for the exam, which I really appreciated.'],
    faq: [
      ['How much does a lesson cost?', `A single 45 minute lesson costs ${eur(PRICE.les)}. With a package you pay ${eur(PRICE.pakLes)} per lesson and your practical exam is included.`],
      ['Can I choose automatic or manual?', 'Yes, both are available in English.'],
      ['Where do you give lessons?', 'In Rhoon, Rotterdam, Barendrecht, Schiedam, Vlaardingen, Maassluis and Maasland. Outside this area we can meet at a station in our region.'],
    ],
    related: ['rijles-automaat', 'opfriscursus', 'tarieven'],
  },
  {
    slug: 'rijles-vanaf-16-5-jaar', name: 'Rijles vanaf 16,5 jaar', icon: 'star', img: 'g20',
    short: 'Begin vroeg met 2toDrive, examen op je 17e.',
    title: 'Rijles vanaf 16,5 jaar (2toDrive) in Rotterdam',
    h1: 'Rijles vanaf 16,5 jaar. <span class="grad-text">Je roze pasje op je 17e.</span>',
    intro: 'Je kunt al vanaf 16,5 jaar beginnen met rijlessen en op je 17e praktijkexamen doen. Zo heb je je rijbewijs al op zak voordat je 18 bent.',
    about: [
      'Met 2toDrive mag je vanaf je 17e rijden, zolang er een coach naast je zit die bij het CBR is aangemeld. Dat is bijvoorbeeld een ouder die zelf al minstens vijf jaar een rijbewijs heeft. Vanaf je 18e mag je alleen de weg op. Met lessen begin je al op 16,5 jaar, en theorie-examen doen kan vanaf 16 jaar.',
      'Vroeg beginnen heeft voordelen. Je hebt meer tijd, je combineert de lessen makkelijk met school, en tot je 18e bouw je met je coach veel extra rijervaring op. We plannen de lessen rond je rooster, ook op zaterdag.',
    ],
    signalsTitle: 'Voor jou als je...',
    signals: ['16,5 jaar bent, of bijna', 'je rijbewijs wilt halen naast school', 'op je 18e al ervaren wilt zijn'],
    krijgt: [
      ['Lessen rond je schoolrooster', 'Na school of op zaterdag.'],
      ['Uitleg over 2toDrive', 'We vertellen precies hoe het werkt met je coach en het CBR.'],
      ['Een plan per les', 'Zodat je op je 17e klaar bent voor je examen.'],
      ['Examen inbegrepen', 'Bij elk pakket zit je praktijkexamen erbij.'],
    ],
    faq: [
      ['Vanaf wanneer mag ik theorie-examen doen?', 'Vanaf 16 jaar.'],
      ['Wie kan mijn coach zijn?', 'Iemand die minstens vijf jaar een rijbewijs B heeft, bijvoorbeeld een ouder. Je meldt je coach aan bij het CBR. Check de actuele voorwaarden op cbr.nl.'],
      ['Mag ik op mijn 17e alleen rijden?', 'Nee. Tot je 18e rijd je alleen met een aangemelde coach naast je.'],
    ],
    related: ['rijles-automaat', 'rijles-schakel', 'spoedcursus'],
  },
  {
    slug: 'proefles', name: 'Gratis proefles', icon: 'flag', img: 'g16',
    short: '45 minuten kennismaken, gratis bij een pakket.',
    title: 'Gratis proefles van 45 minuten',
    h1: 'Gratis proefles. <span class="grad-text">45 minuten kennismaken.</span>',
    intro: 'Maak kennis met je instructeur en de lesauto. Na de proefles weet je waar je staat en hoeveel lessen we adviseren. Bij elk pakket is de proefles gratis.',
    about: [
      'In de proefles van 45 minuten rijd je meteen zelf. We kijken wat je al kunt, hoe je reageert in het verkeer en waar je je nog onzeker over voelt. Heb je nog nooit gereden? Dan beginnen we rustig met de basis.',
      'Na afloop krijg je een eerlijk advies over het aantal lessen, en of automaat of schakel beter bij je past. Na het inplannen krijg je een Tikkie-betaalverzoek. Zodra dat binnen 24 uur betaald is, staat je afspraak vast. Kies je daarna voor een pakket, dan is de proefles gratis.',
    ],
    signalsTitle: 'Na de proefles weet je',
    signals: ['Hoe de lesauto werkt en hoe het voelt om zelf te rijden', 'Waar je nu staat', 'Hoeveel lessen we je adviseren'],
    krijgt: [
      ['45 minuten zelf rijden', 'Geen praatje vooraf van een half uur, je gaat gewoon de weg op.'],
      ['Eerlijk advies', 'Over het aantal lessen en automaat of schakel.'],
      ['Kies je instructeur', 'Ook de proefles kan met onze vrouwelijke instructrice.'],
      ['Gratis bij een pakket', 'Kies je voor een pakket, dan betaal je de proefles niet.'],
    ],
    faq: [
      ['Hoe bevestig ik mijn proefles?', 'Na het inplannen krijg je een Tikkie-betaalverzoek. Zodra dat binnen 24 uur betaald is, staat je afspraak vast.'],
      ['Kan de proefles in een automaat of schakelauto?', 'Ja. Je kiest bij je aanmelding in welke auto je de proefles wilt doen.'],
      ['Kan de proefles met de vrouwelijke instructrice?', 'Ja, geef dat aan in het aanmeldformulier.'],
    ],
    related: ['tarieven', 'rijles-automaat', 'instructrice'],
  },
];

/* extra link targets used in "related" */
const PAGES = {
  tarieven: { href: '/tarieven/', name: 'Tarieven en pakketten', short: 'Losse les €60, pakketten met examen inbegrepen.', icon: 'euro' },
  instructrice: { href: '/instructrice/', name: 'Vrouwelijke instructrice', short: 'Pittig, direct en een hoog slagingspercentage.', icon: 'user' },
};
SERVICES.forEach(s => { PAGES[s.slug] = { href: `/${s.slug}/`, name: s.name, short: s.short, icon: s.icon }; });

/* ---------- content: locations ---------- */
const LOCATIONS = [
  { slug: 'rhoon', name: 'Rhoon', local: 'Rhoon is onze thuisbasis. We rijden dagelijks door het dorp, door Portland en richting de A15. Rustige woonstraten om te beginnen, en de snelweg dichtbij als je verder bent.', hoods: ['Rhoon-dorp', 'Portland', 'Rhoonse Baan', 'Richting A15'], nearby: ['rotterdam', 'barendrecht', 'schiedam'], img: 'g02' },
  { slug: 'rotterdam', name: 'Rotterdam', local: 'Rotterdam is een stad om goed te leren rijden: drukke kruispunten, trams, veel fietsers en snelwegen rondom. We geven les in heel Rotterdam en rijden het meest op Zuid.', hoods: ['Charlois', 'IJsselmonde', 'Feijenoord', 'Hoogvliet', 'Pendrecht', 'Zuidwijk', 'Lombardijen', 'Centrum'], nearby: ['rhoon', 'barendrecht', 'schiedam'], img: 'g08' },
  { slug: 'barendrecht', name: 'Barendrecht', local: 'In Barendrecht oefen je alles: rustige woonwijken in Carnisselande, rotondes rond het centrum en de drukte bij knooppunt Vaanplein waar de A15 en A29 samenkomen.', hoods: ['Carnisselande', 'Smitshoek', 'Centrum', 'Oude Dorp'], nearby: ['rhoon', 'rotterdam', 'schiedam'], img: 'g04' },
  { slug: 'schiedam', name: 'Schiedam', local: 'Schiedam combineert smalle straten in de historische binnenstad met drukke doorgaande wegen. De A4 en A20 liggen vlakbij, ideaal om invoegen en snelwegrijden te oefenen.', hoods: ['Centrum', 'Kethel', 'Nieuwland', 'Woudhoek', 'Groenoord'], nearby: ['rotterdam', 'vlaardingen', 'maassluis'], img: 'g06' },
  { slug: 'vlaardingen', name: 'Vlaardingen', local: 'In Vlaardingen rijd je door woonwijken met veel voorrangssituaties, langs de haven en over de A20. Een mooie mix van rustig en druk.', hoods: ['Westwijk', 'Holy', 'Ambacht', 'Babberspolder', 'Centrum'], nearby: ['schiedam', 'maassluis', 'maasland'], img: 'g13' },
  { slug: 'maassluis', name: 'Maassluis', local: 'Maassluis heeft een smal centrum rond de haven, nieuwere wijken zoals de Steendijkpolder en een snelle aansluiting op de A20. Van alles wat je op je examen tegenkomt.', hoods: ['Centrum', 'Steendijkpolder', 'Sluispolder', 'Koningshoek'], nearby: ['maasland', 'vlaardingen', 'schiedam'], img: 'g14' },
  { slug: 'maasland', name: 'Maasland', local: 'Maasland is een dorp met polderwegen, veel fietsers en rotondes. Perfect om rustig te beginnen voordat je de drukte van de stad in gaat.', hoods: ['Maasland-dorp', 'Polderwegen', 'Rotondes richting A20'], nearby: ['maassluis', 'vlaardingen', 'schiedam'], img: 'g09' },
];
const locBy = s => LOCATIONS.find(l => l.slug === s);

/* ---------- reviews (real Google reviews, verbatim) ---------- */
const REVIEWS = [
  ['Carolina U.', 'Jafri is een rustige en positieve rijinstructeur die altijd topadvies geeft. Echt de beste rijinstructeur die je je kunt wensen. Ik was gestopt met rijden, maar dankzij Jafri heb ik het plezier in autorijden weer helemaal teruggevonden. Hij geeft vertrouwen, blijft geduldig en zorgt ervoor dat je met een goed gevoel achter het stuur zit.'],
  ['Tara Brouw', 'Ik ben bij rijschool 010 gekomen doordat ik er een auto van zag rijden en daarop stond specifiek ook voor mensen met faalangst. Langere tijd uitgesteld om af te rijden, Shahbaz heeft mij het vertrouwen gegeven door een rustige duidelijke begeleiding. Met als resultaat in 1x geslaagd!!!! Kan niks anders zeggen dan een top rijschool!!!'],
  ['Farhana Shahid', 'Na twee eerdere teleurstellingen ben ik bij deze rijschool uitstekend begeleid. De instructeur is zeer deskundig en biedt een realistische kijk op het leerproces. Dankzij zijn aanpak heb ik mijn zelfvertrouwen in de auto weer terug. Ik kijk met grote tevredenheid terug op het gehele traject.'],
  ['Martin O.', 'Highly recommend Rijschool 010. Was able to take great driving lessons in English which helped me pass my exam in one try. The instructor is a very nice, honest guy who clearly explains your mistakes and how to fix them, while keeping a learning environment that makes driving fun. Each lesson has a plan to help you be prepared for the exam, which I really appreciated.', 'English'],
  ['Isabelle Zielinski', 'Shabaz is echt een topper! Hij blijft zo rustig en is altijd positief. Als je rijden spannend vindt of faalangst heb ga dan vooral bij hem rijden!!!!'],
  ['T. Muller', 'Ik ben vandaag in een keer geslaagd voor het praktijkexamen! Dankzij mijn lieve rij-instructeur. Ik raad iedereen aan om hier rijles te nemen. De instructeur is heel lief en geduldig, ik ging altijd met veel plezier naar rijles. Hij leert je op je eigen tempo stap voor stap auto rijden.'],
];

/* ---------- building blocks ---------- */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const stripTags = s => s.replace(/<[^>]+>/g, '');

function navHtml(cur) {
  const svcLinks = SERVICES.map(s => `<a href="/${s.slug}/"><span class="di">${icon(s.icon)}</span><span>${s.name}<small>${s.short}</small></span></a>`).join('');
  const locLinks = LOCATIONS.map(l => `<a href="/rijschool-${l.slug}/"><span class="di">${icon('pin')}</span><span>${l.name}</span></a>`).join('') +
    `<a href="/werkgebied/"><span class="di">${icon('globe')}</span><span>Heel ons werkgebied</span></a>`;
  const isSvc = SERVICES.some(s => cur === `/${s.slug}/`);
  const isLoc = cur === '/werkgebied/' || cur.startsWith('/rijschool-');
  const a = (href, label) => `<li><a href="${href}"${cur === href ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<div class="progress" id="progress"></div>
<header class="nav" id="nav">
  <div class="wrap bar">
    <a href="/" class="brand" aria-label="Rijschool 010 home">
      <img class="logo-on-light" src="/img/logo-dark.webp" alt="Rijschool 010" width="185" height="38">
      <img class="logo-on-dark" src="/img/logo-light.webp" alt="Rijschool 010" width="185" height="38">
    </a>
    <nav aria-label="Hoofdmenu">
      <ul>
        <li class="dd"><button aria-expanded="false" aria-haspopup="true"${isSvc ? ' class="active"' : ''}>Rijlessen ${CHEV}</button><div class="dd-panel wide">${svcLinks}</div></li>
        ${a('/tarieven/', 'Tarieven')}
        ${a('/instructrice/', 'Instructrice')}
        <li class="dd"><button aria-expanded="false" aria-haspopup="true"${isLoc ? ' class="active"' : ''}>Werkgebied ${CHEV}</button><div class="dd-panel">${locLinks}</div></li>
        ${a('/geslaagd/', 'Geslaagd')}
        ${a('/over-ons/', 'Over ons').replace('<li>', '<li class="hide-md">')}
        ${a('/contact/', 'Contact')}
      </ul>
    </nav>
    <div class="nav-cta">
      <a href="/proefles/#aanmelden" class="btn btn-primary"><span class="t-long">Gratis proefles</span><span class="t-short">Proefles</span> ${ARROW}</a>
      <button class="burger" id="burger" aria-label="Menu openen" aria-expanded="false" aria-controls="mobileMenu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu">
  <div class="mm-head"><b>Menu</b><button class="mm-close" id="mobileClose" aria-label="Menu sluiten">×</button></div>
  <a href="/">Home</a><a href="/tarieven/">Tarieven en pakketten</a><a href="/instructrice/">Vrouwelijke instructrice</a>
  <div class="mm-label">Rijlessen</div>
  ${SERVICES.map(s => `<a href="/${s.slug}/">${s.name}</a>`).join('')}
  <div class="mm-label">Werkgebied</div>
  <div class="mm-grid">${LOCATIONS.map(l => `<a href="/rijschool-${l.slug}/">${l.name}</a>`).join('')}<a href="/werkgebied/">Alles</a></div>
  <div class="mm-label">Meer</div>
  <a href="/geslaagd/">Geslaagd</a><a href="/reviews/">Reviews</a><a href="/over-ons/">Over ons</a><a href="/veelgestelde-vragen/">Veelgestelde vragen</a><a href="/contact/">Contact</a>
  <a href="/proefles/#aanmelden" class="btn btn-primary" style="justify-content:center;margin-top:10px">Plan je gratis proefles</a>
</div>
<a class="wa-fab" href="${SITE.wa}?text=Hoi%20Rijschool%20010%2C%20ik%20wil%20graag%20een%20proefles%20plannen." target="_blank" rel="noopener" aria-label="WhatsApp Rijschool 010">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-.9 1.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 6 6 0 0 0 1.2 3.1 13 13 0 0 0 5.2 4.6c1.8.8 2.6.8 3.5.7a3 3 0 0 0 2-1.4 2.4 2.4 0 0 0 .2-1.4c-.1-.2-.3-.2-.6-.4zM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.8L.1 24l6.3-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.6-8.4z"/></svg>
</a>`;
}

function footerHtml() {
  return `<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <a href="/" class="logo-card" aria-label="Rijschool 010 home"><img class="logo-on-light" src="/img/logo-dark.webp" alt="Rijschool 010" loading="lazy" width="210" height="43"><img class="logo-on-dark" src="/img/logo-light.webp" alt="Rijschool 010" loading="lazy" width="210" height="43"></a>
        <p>Sinds ${SITE.since} rijles in automaat en schakel in Rhoon, Rotterdam en omgeving. Gespecialiseerd in faalangst en rijangst.</p>
        <div class="nap">
          <a href="tel:${SITE.phoneIntl}">${SITE.phone}</a>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
          ${SITE.street ? `<span>${SITE.street}, ${SITE.zip} ${SITE.city}</span>` : ''}
          <span>Ma t/m za · zondag gesloten</span>
        </div>
      </div>
      <div><h5>Rijlessen</h5><ul>${SERVICES.map(s => `<li><a href="/${s.slug}/">${s.name}</a></li>`).join('')}</ul></div>
      <div><h5>Werkgebied</h5><ul>${LOCATIONS.map(l => `<li><a href="/rijschool-${l.slug}/">Rijschool ${l.name}</a></li>`).join('')}<li><a href="/werkgebied/">Heel ons werkgebied</a></li></ul></div>
      <div><h5>Rijschool 010</h5><ul><li><a href="/tarieven/">Tarieven en pakketten</a></li><li><a href="/instructrice/">Vrouwelijke instructrice</a></li><li><a href="/over-ons/">Over ons</a></li><li><a href="/geslaagd/">Geslaagd</a></li><li><a href="/reviews/">Reviews</a></li><li><a href="/veelgestelde-vragen/">Veelgestelde vragen</a></li><li><a href="/contact/">Contact</a></li></ul></div>
    </div>
    <div class="copy"><span>© ${new Date().getFullYear()} Rijschool 010 · <a href="/privacy/">Privacy</a></span><span>Ontwerp en realisatie: S5Online Marketing</span></div>
  </div>
</footer>
<div class="lightbox" id="lightbox" role="dialog" aria-label="Foto vergroot"><button aria-label="Sluiten">×</button><img alt=""></div>`;
}

function crumbsHtml(crumbs) {
  return `<ol class="crumbs rv">${crumbs.map((c, i) => i === crumbs.length - 1
    ? `<li aria-current="page">${c[0]}</li>` : `<li><a href="${c[1]}">${c[0]}</a></li>`).join('')}</ol>`;
}

function pageHero({ eyebrow, h1, lead, crumbs, img, imgAlt, ctas, pink, card, en = false }) {
  const imgBlock = img ? `<div class="ph-img rv s"><img src="/img/${img}.webp" alt="${esc(imgAlt || 'Leerling van Rijschool 010 bij de lesauto')}">${card ? `<div class="float-card"><span class="stars">★★★★★</span><span><b>${SITE.rating} ${en ? 'on' : 'op'} Google</b>${SITE.reviews} reviews</span></div>` : ''}</div>` : '';
  return `<section class="page-hero">
  <canvas id="flakes" data-n="40" aria-hidden="true"></canvas>
  <div class="blob b1"${pink ? ' style="background:var(--pink)"' : ''}></div><div class="blob b2"></div>
  <div class="wrap ${img ? 'ph-grid' : ''}">
    <div>
      ${crumbs ? crumbsHtml(crumbs) : ''}
      <h1 class="rv">${h1}</h1>
      ${lead ? `<p class="lead rv">${lead}</p>` : ''}
      ${ctas === false ? '' : `<div class="hero-ctas rv">${ctas || `<a href="/proefles/#aanmelden" class="btn btn-primary magnetic">Plan je gratis proefles ${ARROW}</a><a href="/tarieven/" class="btn btn-ghost magnetic">Bekijk pakketten</a>`}</div>`}
    </div>
    ${imgBlock}
  </div>
</section>`;
}

function faqHtml(items, { title = 'Veelgestelde vragen', eyebrow = 'Goed om te weten', cls = '' } = {}) {
  return `<section class="${cls}" id="faq">
  <div class="wrap">
    <div class="center"><span class="eyebrow rv">${eyebrow}</span><h2 class="h2 rv">${title}</h2></div>
    <div class="faq-wrap">
      ${items.map(([q, a]) => `<div class="faq rv"><button aria-expanded="false">${q}<span class="pm">+</span></button><div class="a"><div><p>${a}</p></div></div></div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function ctaBand({ title = 'Klaar om te beginnen?', text = 'Plan je proefles van 45 minuten. Bij elk pakket is die gratis, en je praktijkexamen zit erbij.', primary = ['Plan je gratis proefles', '/proefles/#aanmelden'], en = false } = {}) {
  return `<section class="tight">
  <div class="wrap">
    <div class="cta-band rv s">
      <div style="position:relative;z-index:1"><h2>${title}</h2><p>${text}</p></div>
      <div class="acts">
        <a href="${primary[1]}" class="btn btn-white">${primary[0]} ${ARROW}</a>
        <a href="${SITE.wa}" target="_blank" rel="noopener" class="btn btn-outline">${en ? 'Send a WhatsApp' : 'Stuur een WhatsApp'}</a>
      </div>
    </div>
  </div>
</section>`;
}

function reviewCards(list) {
  return list.map(([n, t, tag]) => `<article class="review rv"><div class="who"><span class="av">${n[0]}</span><div><b>${n}</b><small>Google review${tag ? ' · ' + tag : ''}</small></div></div><p>${t}</p></article>`).join('\n      ');
}

function pricingSection({ cls = '', heading = true } = {}) {
  const packs = PACKS.map(p => `<div class="pack${p.pop ? ' pop' : ''} rv">
        <h4>${p.name}</h4><span class="sub">${p.lessen} lessen van 90 minuten</span>
        <div class="was"><s>${p.vanTxt}</s></div>
        <span class="was-note">Los: lessen, proefles en examen</span>
        <div class="p">${eur(p.prijs)}</div>
        <span class="save">Jouw voordeel: ${p.voordeelTxt}</span>
        <ul><li>${p.lessen} × 90 minuten rijles</li><li>${eur(PRICE.pakLes)} per les (los ${eur(PRICE.les90)})</li><li class="exam">Praktijkexamen inbegrepen${exam == null ? '' : ` (${eur(exam)})`}</li><li class="exam">Gratis herexamen*</li><li class="gift">Gratis proefles (${eur(PRICE.proef)})</li><li>Automaat of schakel</li></ul>
        <a href="/proefles/?pakket=${p.id}#aanmelden" class="btn ${p.pop ? 'btn-primary' : 'btn-ghost'}">Kies ${p.name}</a>
      </div>`).join('\n      ');
  return `<section id="tarieven" class="${cls}">
  <div class="wrap">
    ${heading ? `<div class="center">
      <span class="eyebrow rv">Tarieven</span>
      <h2 class="h2 rv">Eerlijke prijzen,<br><span class="grad-text">examen inbegrepen.</span></h2>
      <p class="lead rv">Losse lessen van 45 minuten voor ${eur(PRICE.les)}, of een pakket met lessen van 90 minuten. In een pakket zit je praktijkexamen erbij en is je proefles gratis.</p>
    </div>` : ''}
    <div class="price-top">
      <div class="price-card rv l">
        <div class="lbl">🚗 Losse rijles</div>
        <div class="amt">${eur(PRICE.les)}<small> / les</small></div>
        <span class="dur">⏱ 45 minuten</span>
        <p>Een losse les van 45 minuten, in de automaat of de schakelauto. Handig voor een opfrisles. Rijd je vaker, dan is een pakket met lessen van 90 minuten voordeliger.</p>
      </div>
      <div class="price-card free rv r">
        <div class="shine"></div>
        <div class="lbl">🎁 Proefles</div>
        <div class="amt">Gratis<small> bij elk pakket</small></div>
        <span class="dur">⏱ 45 minuten</span>
        <p>Maak kennis met je instructeur en de auto. We kijken wat je al kunt en geven een eerlijk advies. Zonder pakket kost de proefles ${eur(PRICE.proef)}.</p>
      </div>
    </div>
    <div class="pack-grid">
      ${packs}
    </div>
    <p class="note rv"><b>*Gratis herexamen bij TTT (tussentijdse toets, ${eur(PRICE.ttt)}).</b><br>In elk pakket rijd je lessen van 90 minuten voor ${eur(PRICE.pakLes)} per les (los ${eur(PRICE.les90)}), met praktijkexamen en gratis proefles.</p>
  </div>
</section>`;
}

function contactSection({ title = 'Plan je proefles.', id = 'contact', vraag = false } = {}) {
  return `<section id="${id}">
  <div class="wrap">
    <div class="contact-box rv s">
      <div class="contact-side">
        <span class="eyebrow" style="color:#fff">${vraag ? 'Contact' : 'Meld je aan'}</span>
        <h2>${title}</h2>
        <p>${vraag ? 'Stel je vraag via het formulier en we reageren binnen 24 uur. Liever meteen antwoord? Bel of stuur een WhatsApp.' : 'Vul het formulier in en we nemen binnen 24 uur contact met je op. Vraag je liever iets snel? Stuur een WhatsApp.'}</p>
        <div class="c-lines">
          <a href="${SITE.wa}" target="_blank" rel="noopener">${icon('chat')}<span><small>WhatsApp</small>${SITE.phone}</span></a>
          <a href="tel:${SITE.phoneIntl}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg><span><small>Bellen</small>${SITE.phone}</span></a>
          <a href="mailto:${SITE.email}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg><span><small>E-mail</small>${SITE.email}</span></a>
          <div>${icon('pin')}<span><small>Adres</small>${SITE.street}, ${SITE.zip} ${SITE.city}</span></div>
          <div>${icon('cal')}<span><small>Lesdagen</small>Maandag t/m zaterdag</span></div>
        </div>
      </div>
${vraag ? `      <form id="form" novalidate data-key="${SITE.web3formsKey}">
        <input type="hidden" name="subject" value="${vraag ? 'Nieuwe vraag via rijschool010.nl' : 'Nieuwe proeflesaanmelding via rijschool010.nl'}">
        <input type="hidden" name="from_name" value="Website Rijschool 010">
        <input type="hidden" name="formulier" value="${vraag ? 'Contact' : 'Proefles'}">
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="f"><label for="naam">Naam *</label><input id="naam" name="naam" required autocomplete="name"></div>
        <div class="f"><label for="tel">Telefoonnummer *</label><input id="tel" name="tel" type="tel" required autocomplete="tel"></div>
        <div class="f full"><label for="mail">E-mailadres</label><input id="mail" name="mail" type="email" autocomplete="email"></div>
        <div class="f full"><label for="bericht">Je vraag *</label><textarea id="bericht" name="bericht" rows="5" required placeholder="Waar kunnen we je mee helpen?"></textarea></div>
        <button class="btn btn-primary" type="submit">Verstuur vraag ${ARROW}</button>
        <p class="form-alt">Wil je een proefles plannen? <a href="/proefles/#aanmelden">Meld je hier aan</a>.</p>
      </form>` : `      <form id="form" novalidate data-key="${SITE.web3formsKey}">
        <input type="hidden" name="subject" value="${vraag ? 'Nieuwe vraag via rijschool010.nl' : 'Nieuwe proeflesaanmelding via rijschool010.nl'}">
        <input type="hidden" name="from_name" value="Website Rijschool 010">
        <input type="hidden" name="formulier" value="${vraag ? 'Contact' : 'Proefles'}">
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="f"><label for="naam">Voor- en achternaam *</label><input id="naam" name="naam" required autocomplete="name"></div>
        <div class="f"><label for="tel">Telefoonnummer *</label><input id="tel" name="tel" type="tel" required autocomplete="tel"></div>
        <div class="f"><label for="mail">E-mailadres</label><input id="mail" name="mail" type="email" autocomplete="email"></div>
        <div class="f"><label for="plaats">Postcode en woonplaats *</label><input id="plaats" name="plaats" required autocomplete="postal-code"></div>
        <div class="f full"><label>Ik wil les in een *</label>
          <div class="seg"><label><input type="radio" name="auto" value="Automaat" checked><span>Automaat</span></label><label><input type="radio" name="auto" value="Schakel"><span>Schakel</span></label></div>
        </div>
        <div class="f full"><label>Instructeur</label>
          <div class="seg pinkseg"><label><input type="radio" name="instr" value="Geen voorkeur" checked><span>Geen voorkeur</span></label><label><input type="radio" name="instr" value="Vrouwelijke instructrice" id="pickLady"><span>Vrouwelijke instructrice</span></label></div>
        </div>
        <div class="f"><label for="pakket">Pakket</label><select id="pakket" name="pakket"><option value="onbekend">Weet ik nog niet</option>${PACKS.map(p => `<option value="${p.id}">${p.name}: ${p.lessen} lessen, ${eur(p.prijs)}</option>`).join('')}<option value="los">Losse lessen</option></select></div>
        <div class="f"><label for="theorie">Heb je je theorie al? *</label><select id="theorie" name="theorie"><option>Ja</option><option>Nee, nog niet</option><option>Ik heb al een rijbewijs (opfris)</option></select></div>
        <div class="f full"><label for="contactvia">Hoe wil je benaderd worden?</label><select id="contactvia" name="contactvia"><option>WhatsApp</option><option>Gebeld worden</option><option>E-mail</option></select></div>
        <div class="f full"><label for="bericht">Beschikbaarheid of vraag</label><textarea id="bericht" name="bericht" rows="3" placeholder="Bijv. dinsdag en zaterdag, of: ik heb last van faalangst"></textarea></div>
        <button class="btn btn-primary" type="submit">Verstuur aanmelding ${ARROW}</button>
      </form>`}
    </div>
  </div>
</section>`;
}

const PAGES_EN = {
  'rijles-automaat': ['Automatic lessons', 'No clutch, all your attention on the road.'],
  'rijles-schakel': ['Manual lessons', 'A manual licence lets you drive any car.'],
  'opfriscursus': ['Refresher course', 'Not driven for a while? Get confident again.'],
  'tarieven': ['Prices and packages', 'Single lesson €60, packages with exam included.'],
  'proefles': ['Free trial lesson', '45 minutes to get to know us, free with every package.'],
};
function serviceCards(slugs, { cls = 'card-grid', highlightFirst = false, en = false } = {}) {
  return `<div class="${cls}">${slugs.map((sl, i) => {
    const p = PAGES[sl];
    const [name, short] = en && PAGES_EN[sl] ? PAGES_EN[sl] : [p.name, p.short];
    return `<a href="${p.href}" class="feat rv tilt${highlightFirst && i === 0 ? ' highlight' : ''}"><div class="ico">${icon(p.icon)}</div><h4>${name}</h4><p>${short}</p><span class="more">${en ? 'Read more' : 'Lees meer'} ${ARROW}</span></a>`;
  }).join('')}</div>`;
}

/* ---------- JSON-LD ---------- */
const orgLd = {
  '@context': 'https://schema.org', '@type': 'DrivingSchool', name: SITE.name, url: SITE.domain + '/', telephone: SITE.phoneIntl, email: SITE.email,
  foundingDate: String(SITE.since), image: SITE.domain + '/img/og.jpg', logo: SITE.domain + '/img/icon-512.png',
  ...(SITE.street ? { address: { '@type': 'PostalAddress', streetAddress: SITE.street, postalCode: SITE.zip, addressLocality: SITE.city, addressCountry: 'NL' } } : {}),
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }],
  areaServed: LOCATIONS.map(l => l.name),
  aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.ratingNum, reviewCount: String(SITE.reviews) },
  priceRange: '€€',
};
const ld = obj => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
const crumbLd = crumbs => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: stripTags(c[0]), item: SITE.domain + c[1] })) });
const faqLd = items => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: stripTags(q), acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })) });

/* ---------- layout ---------- */
function layout({ url, title, desc, body, crumbs, faq, lang = 'nl', extraLd = [] }) {
  const lds = [orgLd, ...extraLd];
  if (crumbs) lds.push(crumbLd(crumbs));
  if (faq) lds.push(faqLd(faq));
  return `<!doctype html>
<html lang="${lang}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${SITE.noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="canonical" href="${SITE.domain}${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${SITE.domain}/img/og.jpg">
<meta property="og:url" content="${SITE.domain}${url}">
<meta name="theme-color" content="#1f6bff">
<link rel="icon" href="/img/icon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/img/icon-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${lds.map(ld).join('\n')}
</head>
<body>
${navHtml(url)}
<main id="top">
${body}
</main>
${footerHtml()}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

/* ---------- pages ---------- */
const out = [];
const page = (url, opts) => out.push({ url, html: layout({ url, ...opts }) });

// Home
{
  const body = fs.readFileSync(path.join(SRC, 'home.html'), 'utf8')
    .replace('{{PRICING}}', pricingSection())
    .replace('{{CTA}}', ctaBand());
  page('/', {
    title: 'Rijschool 010 | Rijles automaat en schakel in Rhoon en Rotterdam',
    desc: `Rijschool 010 geeft sinds ${SITE.since} rijles in automaat en schakel in Rhoon, Rotterdam, Barendrecht, Schiedam, Vlaardingen, Maassluis en Maasland. Specialist in faalangst. ${SITE.rating} sterren op Google.`,
    body,
  });
}

// Service pages
for (const s of SERVICES) {
  const en = s.lang === 'en';
  const crumbs = [['Home', '/'], [en ? 'Driving lessons' : 'Rijlessen', '/#lessen'], [s.name, `/${s.slug}/`]];
  const L = en
    ? { what: 'What to expect', get: 'What you get', getH: 'Everything to pass <span class="grad-text">with confidence.</span>', price: 'Prices', priceH: 'Clear prices, <span class="grad-text">exam included.</span>', single: 'Single lesson (45 min)', pack: 'Per 90 min lesson in a package', trial: 'Trial lesson (45 min)', free: 'Free', freeSub: 'with every package', perPack: 'incl. practical exam', more: 'See all packages', rel: 'Related', relH: 'You might also like', cta: 'Ready to start?', ctaT: 'Book your 45 minute trial lesson. Free with every package, and your practical exam is included.', ctaB: 'Book a trial lesson', faqT: 'Frequently asked questions', faqE: 'Good to know', ask: 'Ask your question', reviewE: 'Google review' }
    : { what: 'Wat is het', get: 'Wat je krijgt', getH: 'Alles om <span class="grad-text">met vertrouwen</span> te slagen.', price: 'Prijzen', priceH: 'Duidelijke prijzen, <span class="grad-text">examen inbegrepen.</span>', single: 'Losse les (45 min)', pack: 'Per les van 90 min in een pakket', trial: 'Proefles (45 min)', free: 'Gratis', freeSub: 'bij elk pakket', perPack: 'inclusief praktijkexamen', more: 'Bekijk alle pakketten', rel: 'Gerelateerd', relH: 'Dit vind je misschien ook interessant', cta: 'Klaar om te beginnen?', ctaT: undefined, ctaB: 'Plan je gratis proefles', faqT: 'Veelgestelde vragen', faqE: 'Goed om te weten', ask: 'Stel je vraag', reviewE: 'Google review' };
  const body = `${pageHero({
    eyebrow: s.eyebrow || s.name, h1: s.h1, lead: s.intro, crumbs, img: s.img, card: true, en,
    ctas: `<a href="/proefles/#aanmelden" class="btn btn-primary magnetic">${L.ctaB} ${ARROW}</a><a href="${SITE.wa}" target="_blank" rel="noopener" class="btn btn-ghost magnetic">WhatsApp</a>`,
  })}
${s.slug === 'proefles' ? contactSection({ title: 'Plan je proefles.', id: 'aanmelden' }) : ''}
<section class="alt">
  <div class="wrap split">
    <div class="prose">
      <span class="eyebrow rv">${L.what}</span>
      <h2 class="h2 rv">${s.name}</h2>
      ${s.about.map(p => `<p class="rv">${p}</p>`).join('\n      ')}
      ${s.review ? `<article class="review rv" style="margin-top:26px"><div class="who"><span class="av">${s.review[0][0]}</span><div><b>${s.review[0]}</b><small>${L.reviewE}</small></div></div><p>${s.review[1]}</p></article>` : ''}
    </div>
    <aside class="signals rv r">
      <h3>${s.signalsTitle}</h3>
      <p>${en ? 'Recognise yourself? Then this is for you.' : 'Herken je jezelf hierin? Dan is dit iets voor jou.'}</p>
      <ul>${s.signals.map(x => `<li>${x}</li>`).join('')}</ul>
      <a href="/proefles/#aanmelden" class="btn btn-primary">${L.ctaB} ${ARROW}</a>
    </aside>
  </div>
</section>
<section>
  <div class="wrap">
    <span class="eyebrow rv">${L.get}</span>
    <h2 class="h2 rv">${L.getH}</h2>
    <div class="krijgt">${s.krijgt.map(([t, d], i) => `<div class="rv"><b class="k">${i + 1}</b><div><h4>${t}</h4><p>${d}</p></div></div>`).join('')}</div>
  </div>
</section>
<section class="alt tight">
  <div class="wrap">
    <span class="eyebrow rv">${L.price}</span>
    <h2 class="h2 rv">${L.priceH}</h2>
    <div class="price-strip">
      <div class="rv"><span>${L.single}</span><b>${eur(PRICE.les)}</b><span>${en ? 'Automatic or manual' : 'Automaat of schakel'}</span></div>
      <div class="rv"><span>${L.pack}</span><b>${eur(PRICE.pakLes)}</b><span>${L.perPack}</span></div>
      <div class="rv"><span>${L.trial}</span><b>${L.free}</b><span>${L.freeSub}</span></div>
    </div>
    <div style="margin-top:26px" class="rv"><a href="/tarieven/" class="btn btn-ghost">${L.more} ${ARROW}</a></div>
  </div>
</section>
<section>
  <div class="wrap">
    <span class="eyebrow rv">${L.rel}</span>
    <h2 class="h2 rv">${L.relH}</h2>
    ${serviceCards(s.related, { en })}
  </div>
</section>
${faqHtml(s.faq, { title: L.faqT, eyebrow: L.faqE, cls: 'alt' })}
${ctaBand({ title: L.cta, text: L.ctaT, primary: [L.ctaB, '/proefles/#aanmelden'], en })}`;
  page(`/${s.slug}/`, { title: `${s.title} | Rijschool 010`, desc: stripTags(s.intro), body, crumbs, faq: s.faq, lang: s.lang || 'nl' });
}

// Location pages
for (const l of LOCATIONS) {
  const crumbs = [['Home', '/'], ['Werkgebied', '/werkgebied/'], [`Rijschool ${l.name}`, `/rijschool-${l.slug}/`]];
  const faq = [
    [`Geven jullie rijles in ${l.name}?`, `Ja. We halen je op in ${l.name}: thuis, op school, op je werk of bij het station.`],
    [`Wat kost rijles in ${l.name}?`, `Een losse les van 45 minuten kost ${eur(PRICE.les)}. In een pakket rijd je lessen van 90 minuten voor ${eur(PRICE.pakLes)} per les en is je praktijkexamen inbegrepen.`],
    [`Kan ik in ${l.name} les krijgen van een vrouwelijke instructrice?`, 'Ja. Geef het aan bij je aanmelding, dan plannen we je lessen met haar in.'],
    ['Geven jullie les in een automaat en een schakelauto?', 'Ja, je kiest zelf. Het tarief is voor beide hetzelfde.'],
  ];
  const body = `${pageHero({
    h1: `Rijschool in ${l.name}. <span class="grad-text">Automaat en schakel.</span>`,
    lead: `${l.local} We halen je op en brengen je weer terug.`, crumbs, img: l.img, card: true,
  })}
<section class="alt">
  <div class="wrap">
    <span class="eyebrow rv">Rijlessen in ${l.name}</span>
    <h2 class="h2 rv">Al onze lessen,<br><span class="grad-text">ook in ${l.name}.</span></h2>
    ${serviceCards(SERVICES.map(s => s.slug), { highlightFirst: false })}
  </div>
</section>
<section>
  <div class="wrap split">
    <div class="prose">
      <span class="eyebrow rv">Lokaal</span>
      <h2 class="h2 rv">Lesroutes in ${l.name}</h2>
      <p class="rv">We rijden door de wijken waar jij woont en waar je straks ook examen doet. Zo ken je de lastige kruispunten, de rotondes en de drukke momenten al voordat het telt.</p>
      <div class="hoods rv">${l.hoods.map(h => `<span>${h}</span>`).join('')}</div>
    </div>
    <div class="stat-grid" style="grid-template-columns:1fr 1fr">
      <div class="stat rv"><div class="num">${SITE.rating}</div><p>Score op Google</p></div>
      <div class="stat rv"><div class="num">${SITE.since}</div><p>Sinds dit jaar actief</p></div>
      <div class="stat rv"><div class="num">90<small style="font-size:1.1rem"> min</small></div><p>Per les in een pakket</p></div>
      <div class="stat rv"><div class="num">${eur(PRICE.pakLes)}</div><p>Per les in een pakket</p></div>
    </div>
  </div>
</section>
<section class="alt tight">
  <div class="wrap">
    <span class="eyebrow rv">In de buurt</span>
    <h2 class="h2 rv">Ook actief in</h2>
    <div class="loc-grid three">${l.nearby.map(n => `<a class="loc rv" href="/rijschool-${n}/">Rijschool ${locBy(n).name} ${icon('pin')}</a>`).join('')}</div>
  </div>
</section>
${faqHtml(faq)}
${ctaBand({ title: `Rijles in ${l.name}?`, text: `Plan je proefles van 45 minuten. We halen je op in ${l.name}. Bij elk pakket is de proefles gratis en zit je examen erbij.` })}`;
  page(`/rijschool-${l.slug}/`, { title: `Rijschool ${l.name} | Rijles automaat en schakel | Rijschool 010`, desc: `Rijles in ${l.name} bij Rijschool 010: automaat en schakel, lessen van 90 minuten, specialist in faalangst. Pakket met examen inbegrepen.`, body, crumbs, faq });
}

// Tarieven
{
  const crumbs = [['Home', '/'], ['Tarieven', '/tarieven/']];
  const faq = [
    ['Wat kost een losse rijles?', `Een losse rijles van 45 minuten kost ${eur(PRICE.les)}, in de automaat en in de schakelauto.`],
    ['Wat zit er in een pakket?', `Je lessen van 90 minuten voor ${eur(PRICE.pakLes)} per stuk, je praktijkexamen bij het CBR${exam == null ? '' : ` (${eur(exam)})`} en een gratis proefles van 45 minuten (${eur(PRICE.proef)}). Doe je ook de tussentijdse toets, dan is je herexamen gratis.`],
    ['Wat is de tussentijdse toets?', `Een proefexamen bij het CBR halverwege je lessen, met een echte examinator. De toets kost ${eur(PRICE.ttt)} en is niet inbegrepen in een pakket. Doe je hem wel, dan krijg je bij een pakket een gratis herexamen. Rijd je de toets goed, dan hoef je bij je praktijkexamen de bijzondere verrichtingen niet meer te doen.`],
    ['Kan ik in termijnen betalen?', 'Ja. Je kunt je pakket in één keer betalen, in termijnen, of per les afrekenen.'],
    ['Waarom lessen van 90 minuten?', 'In 90 minuten heb je tijd om iets nieuws te leren én het meteen goed te oefenen. Je rijdt meer en zit minder te wachten.'],
    ['Hoe bevestig ik een les?', 'Na het inplannen krijg je een Tikkie-betaalverzoek. Zodra dat binnen 24 uur betaald is, staat je afspraak vast.'],
  ];
  const rows = [
    ['Lesduur', '45 minuten', ...PACKS.map(() => '90 minuten')],
    ['Aantal lessen', 'Zoveel je wilt', ...PACKS.map(p => String(p.lessen))],
    ['Prijs per les', eur(PRICE.les), ...PACKS.map(() => eur(PRICE.pakLes))],
    ['Jij betaalt', 'Per les', ...PACKS.map(p => `<span class="hl">${eur(p.prijs)}</span>`)],
    ['Praktijkexamen', exam == null ? 'Apart' : eur(exam), ...PACKS.map(() => `<span class="hl">Inbegrepen${exam == null ? '' : ` (${eur(exam)})`}</span>`)],
    ['Tussentijdse toets (optioneel)', eur(PRICE.ttt), ...PACKS.map(() => eur(PRICE.ttt))],
    ['Proefles (45 min)', eur(PRICE.proef), ...PACKS.map(() => `<span class="hl">Gratis (${eur(PRICE.proef)})</span>`)],
    ['Herexamen', exam == null ? 'Apart' : eur(exam), ...PACKS.map(() => '<span class="hl">Gratis*</span>')],
    ['Wat je bespaart', 'Geen', ...PACKS.map(p => `<span class="hl">${p.voordeelTxt}</span>`)],
  ];
  const cols = [['Losse lessen', 1], ...PACKS.map((p, i) => [p.name, i + 2])];
  const body = `${pageHero({ h1: 'Tarieven en pakketten. <span class="grad-text">Examen inbegrepen.</span>', lead: `Losse lessen van 45 minuten voor ${eur(PRICE.les)}, of een pakket met lessen van 90 minuten. In een pakket is je praktijkexamen inbegrepen en is je proefles gratis.`, crumbs, ctas: false })}
${pricingSection({ heading: false, cls: '' }).replace('<section id="tarieven" class="">', '<section id="pakketten" style="padding-top:20px">')}
<section class="alt">
  <div class="wrap">
    <span class="eyebrow rv">Vergelijken</span>
    <h2 class="h2 rv">Alles naast elkaar</h2>
    <div class="table-wrap rv"><table class="cmp">
      <thead><tr><th></th><th>Losse lessen</th>${PACKS.map(p => `<th>${p.name}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>
    <div class="cmp-cards">${cols.map(([name, ci]) => `<div class="cmp-card rv${ci === 3 ? ' pop' : ''}"><h4>${name}</h4><dl>${rows.map(r => `<div><dt>${r[0]}</dt><dd>${r[ci]}</dd></div>`).join('')}</dl></div>`).join('')}</div>
    <p class="note rv"><b>*Gratis herexamen bij TTT (tussentijdse toets, ${eur(PRICE.ttt)}).</b></p>
  </div>
</section>
<section>
  <div class="wrap">
    <span class="eyebrow rv">Betaalgemak</span>
    <h2 class="h2 rv">Betalen zoals het<br><span class="grad-text">jou uitkomt.</span></h2>
    <div class="card-grid">
      <div class="feat rv"><div class="ico">${icon('euro')}</div><h4>In één keer</h4><p>Je betaalt je pakket in één keer en hoeft daarna nergens meer aan te denken.</p></div>
      <div class="feat rv"><div class="ico">${icon('cal')}</div><h4>In termijnen</h4><p>Je spreidt het bedrag over meerdere termijnen. We spreken samen af wat werkt.</p></div>
      <div class="feat rv"><div class="ico">${icon('car')}</div><h4>Per les</h4><p>Liever per les afrekenen? Dat kan ook, contant of met een Tikkie.</p></div>
    </div>
  </div>
</section>
${faqHtml(faq, { cls: 'alt' })}
${ctaBand()}`;
  page('/tarieven/', { title: 'Tarieven en pakketten rijles | Rijschool 010', desc: `Rijles bij Rijschool 010: losse les van 45 minuten ${eur(PRICE.les)}. Pakketten vanaf ${eur(PACKS[0].prijs)} met praktijkexamen inbegrepen en gratis proefles.`, body, crumbs, faq });
}

// Instructrice
{
  const crumbs = [['Home', '/'], ['Vrouwelijke instructrice', '/instructrice/']];
  const faq = [
    ['Kan ik les krijgen van een vrouwelijke instructrice?', 'Ja. Kies bij je aanmelding voor de vrouwelijke instructrice, dan plannen we je proefles en lessen met haar in.'],
    ['Is ze niet te streng?', 'Ze is direct en ze legt de lat hoog. Maar ze staat aan jouw kant: ze wil dat je slaagt, en dat merk je in elke les.'],
    ['Kost les bij haar meer?', `Nee. Je betaalt hetzelfde tarief: ${eur(PRICE.les)} per losse les van 45 minuten, of ${eur(PRICE.pakLes)} per les in een pakket met examen inbegrepen.`],
    ['Kan de proefles ook met haar?', 'Ja. Zo merk je meteen of haar aanpak bij je past.'],
  ];
  const body = `${pageHero({
    h1: 'Ze zegt waar het op staat.<br><span style="color:var(--pink)">En daarom slaag je.</span>',
    lead: 'Onze instructrice is een pittige dame. Scherp, streng en direct, en precies daarom zo goed. Ze praat niets mooier dan het is, pakt fouten bij de wortel aan en zorgt dat je echt snapt wat je doet.',
    crumbs, pink: true,
    ctas: `<a href="/proefles/?instructeur=vrouw#aanmelden" class="btn btn-pink magnetic">Proefles met haar plannen ${ARROW}</a><a href="/tarieven/" class="btn btn-ghost magnetic">Bekijk pakketten</a>`,
  })}
<section class="lady" style="padding-top:40px">
  <div class="wrap lady-grid">
    <div class="lady-visual rv l">
      <div class="rings"><span></span><span></span><span></span></div>
      <div class="inner">
        <div class="avatar">${icon('user').replace('stroke="currentColor" stroke-width="2"', 'stroke="#fff" stroke-width="1.6"')}</div>
        <h3>Pittig. Direct.<br>Geslaagd.</h3>
      </div>
    </div>
    <div>
      <span class="eyebrow pink rv">Haar aanpak</span>
      <h2 class="h2 rv">Geen trucjes.<br><span style="color:var(--pink)">Echt leren rijden.</span></h2>
      <p class="lead rv">Ze leert je geen kunstje voor één examenrit, maar rijden dat blijft zitten. Dat zie je terug in haar hoge slagingspercentage.</p>
      <ul class="check-list">
        <li class="rv"><span class="ck">✓</span><div><b>Eerlijk en direct</b><span>Je hoort meteen wat goed gaat en wat niet. Geen omwegen, dus geen verspilde lessen.</span></div></li>
        <li class="rv"><span class="ck">✓</span><div><b>Aanpak bij de wortel</b><span>Ze stopt niet bij het symptoom. Ze zoekt uit waarom het misgaat en lost dát op, tot je het echt begrijpt.</span></div></li>
        <li class="rv"><span class="ck">✓</span><div><b>Streng, maar aan jouw kant</b><span>Ze legt de lat hoog omdat ze wil dat je slaagt. Liever één keer goed dan drie keer opnieuw.</span></div></li>
      </ul>
    </div>
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <span class="eyebrow pink rv">Voor wie</span>
    <h2 class="h2 rv">Les bij haar is iets voor jou als je...</h2>
    <div class="card-grid">
      <div class="feat rv"><div class="ico">${icon('target')}</div><h4>Resultaat wilt</h4><p>Je wilt slagen, en liever in één keer. Je hebt liever eerlijke feedback dan een schouderklopje.</p></div>
      <div class="feat rv"><div class="ico">${icon('eye')}</div><h4>Wilt snappen wat je doet</h4><p>Niet alleen weten dát iets moet, maar ook waarom. Dan pas blijft het hangen.</p></div>
      <div class="feat rv"><div class="ico">${icon('user')}</div><h4>Liever les krijgt van een vrouw</h4><p>Om persoonlijke of culturele redenen, of omdat het gewoon prettiger voelt. Dat kan.</p></div>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <span class="eyebrow rv">Rijlessen</span>
    <h2 class="h2 rv">Zo kun je bij haar lessen</h2>
    ${serviceCards(['rijles-automaat', 'rijles-schakel', 'proefles'])}
  </div>
</section>
${faqHtml(faq, { cls: 'alt' })}
${ctaBand({ title: 'Durf jij het aan?', text: 'Plan je proefles met onze instructrice. Pittig, direct, en gericht op één ding: dat jij slaagt.', primary: ['Proefles met haar plannen', '/proefles/?instructeur=vrouw#aanmelden'] })}`;
  page('/instructrice/', { title: 'Vrouwelijke rijinstructrice in Rotterdam en Rhoon | Rijschool 010', desc: 'Rijles van een vrouwelijke instructrice bij Rijschool 010. Pittig, scherp en direct, met een hoog slagingspercentage. Automaat en schakel.', body, crumbs, faq });
}

// Over ons
{
  const crumbs = [['Home', '/'], ['Over ons', '/over-ons/']];
  const body = `${pageHero({ h1: 'Rijschool 010. <span class="grad-text">Sinds ' + SITE.since + ' in de regio.</span>', lead: '010 is het netnummer van Rotterdam, en daar rijden we. Vanuit Rhoon geven we sinds ' + SITE.since + ' rijles in Rotterdam en omgeving, in automaat en schakel, met een eigen specialiteit: leerlingen met faalangst en rijangst.', crumbs, img: 'vloot', imgAlt: 'De lesauto\'s van Rijschool 010', card: true })}
<section class="alt">
  <div class="wrap split">
    <div class="prose">
      <span class="eyebrow rv">Ons verhaal</span>
      <h2 class="h2 rv">Rustig leren rijden,<br><span class="grad-text">met een plan.</span></h2>
      <p class="rv">Bij Rijschool 010 draait het om één ding: dat je met een goed gevoel en goed voorbereid je examen doet. Daarom rijd je in een pakket lessen van 90 minuten, werken we met een plan per les en rijd je altijd privé. Je haalt niemand op en brengt niemand thuis.</p>
      <p class="rv">Veel van onze leerlingen kwamen bij ons na een eerdere teleurstelling, of omdat ze het rijden spannend vonden. Precies daar zijn we goed in. Rustig waar het moet, direct waar het kan. Je kunt kiezen voor les van onze vrouwelijke instructrice, en de lessen kunnen ook in het Engels.</p>
    </div>
    <aside class="signals rv r">
      <h3>Rijschool 010 in het kort</h3>
      <p>De feiten op een rij.</p>
      <ul><li>Sinds ${SITE.since} actief in Rotterdam en omgeving</li><li>${SITE.rating} sterren op Google uit ${SITE.reviews} reviews</li><li>Automaat en schakel, lessen van 45 of 90 minuten</li><li>Specialist in faalangst en rijangst</li><li>Les in het Nederlands of Engels</li></ul>
      <a href="/reviews/" class="btn btn-ghost">Lees de reviews ${ARROW}</a>
    </aside>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="dakbord rv s"><img src="/img/dakbord.webp" alt="Dakbord Rijschool 010 met auto en motor" loading="lazy" width="1600" height="312"><p>Herken je ons dakbord? Dan zie je een van onze lesauto's.</p></div>
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <span class="eyebrow rv">Waarom wij</span>
    <h2 class="h2 rv">Waar we voor staan</h2>
    <div class="card-grid">
      <div class="feat highlight rv tilt"><div class="ico">${icon('heart')}</div><h4>Rust en vertrouwen</h4><p>Geen stress in de auto. Wel duidelijke uitleg en eerlijke feedback.</p></div>
      <div class="feat rv tilt"><div class="ico">${icon('target')}</div><h4>Een plan per les</h4><p>Je weet altijd waar je staat en wat je volgende stap is.</p></div>
      <div class="feat rv tilt"><div class="ico">${icon('user')}</div><h4>Privé rijles</h4><p>Elke minuut van je les is van jou.</p></div>
      <div class="feat rv tilt"><div class="ico">${icon('cal')}</div><h4>Ook op zaterdag</h4><p>Maandag t/m zaterdag. Op zondag zijn we gesloten.</p></div>
      <div class="feat rv tilt"><div class="ico">${icon('euro')}</div><h4>Betaalgemak</h4><p>In één keer, in termijnen of per les.</p></div>
      <div class="feat rv tilt"><div class="ico">${icon('globe')}</div><h4>Lessons in English</h4><p>Alle lessen kunnen ook in het Engels.</p></div>
    </div>
  </div>
</section>
${ctaBand()}`;
  page('/over-ons/', { title: 'Over Rijschool 010 | Sinds ' + SITE.since + ' rijles in Rotterdam en Rhoon', desc: `Rijschool 010 geeft sinds ${SITE.since} rijles in Rotterdam en omgeving. Lessen van 45 en 90 minuten, privé, specialist in faalangst. ${SITE.rating} sterren op Google.`, body, crumbs });
}

// Geslaagd
{
  const crumbs = [['Home', '/'], ['Geslaagd', '/geslaagd/']];
  const body = `${pageHero({ h1: 'Zij gingen je voor. <span class="grad-text">Geslaagd!</span>', lead: 'Elke foto is een leerling die met Rijschool 010 het roze pasje haalde. Klik op een foto om hem te vergroten. Jij bent de volgende.', crumbs })}
<section style="padding-top:0">
  <div class="wrap"><div class="g-grid" data-gallery="grid" data-from="1" data-to="43"></div></div>
</section>
${ctaBand({ title: 'Jij staat hier straks ook tussen.', text: 'Plan je proefles en begin aan je traject naar het roze pasje.' })}`;
  page('/geslaagd/', { title: 'Geslaagde leerlingen | Rijschool 010', desc: 'Bekijk de geslaagde leerlingen van Rijschool 010 in Rotterdam, Rhoon en omgeving. Jij bent de volgende.', body, crumbs });
}

// Reviews
{
  const crumbs = [['Home', '/'], ['Reviews', '/reviews/']];
  const body = `${pageHero({ h1: `${SITE.rating} sterren op Google. <span class="grad-text">Uit ${SITE.reviews} reviews.</span>`, lead: 'Lees wat leerlingen over hun lessen bij Rijschool 010 zeggen. Alle reviews komen van ons Google-bedrijfsprofiel.', crumbs, ctas: `<a href="${SITE.reviewsUrl}" target="_blank" rel="noopener" class="btn btn-primary magnetic">Alle reviews op Google ${ARROW}</a><a href="${SITE.writeReviewUrl}" target="_blank" rel="noopener" class="btn btn-ghost magnetic">Schrijf een review</a>` })}
<section style="padding-top:0">
  <div class="wrap"><div class="rev-grid">
      ${reviewCards(REVIEWS)}
  </div></div>
</section>
${ctaBand()}`;
  page('/reviews/', { title: `Reviews: ${SITE.rating} sterren op Google | Rijschool 010`, desc: `Rijschool 010 scoort ${SITE.rating} sterren op Google uit ${SITE.reviews} reviews. Lees wat leerlingen zeggen over hun rijlessen.`, body, crumbs });
}

// Werkgebied
{
  const crumbs = [['Home', '/'], ['Werkgebied', '/werkgebied/']];
  const body = `${pageHero({ h1: 'Ons werkgebied. <span class="grad-text">Wij rijden in jouw buurt.</span>', lead: 'We halen je op in Rhoon, Rotterdam, Barendrecht, Schiedam, Vlaardingen, Maassluis en Maasland. Woon je net buiten ons gebied? Dan spreken we af bij een station in de regio.', crumbs })}
<section style="padding-top:0">
  <div class="wrap">
    <div class="loc-grid">${LOCATIONS.map(l => `<a class="loc rv" href="/rijschool-${l.slug}/">Rijschool ${l.name} ${icon('pin')}</a>`).join('')}</div>
    <div class="map rv" style="margin-top:30px;aspect-ratio:16/7"><iframe title="Kaart Rijschool 010, Maansteen 13 Rhoon" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Maansteen+13,+3162+TB+Rhoon&z=13&output=embed"></iframe></div>
  </div>
</section>
${ctaBand({ title: 'Woon je in ons werkgebied?', text: 'Plan je proefles. We halen je op bij huis, school, werk of het station.' })}`;
  page('/werkgebied/', { title: 'Werkgebied: rijles in Rhoon, Rotterdam en omgeving | Rijschool 010', desc: 'Rijschool 010 geeft rijles in Rhoon, Rotterdam, Barendrecht, Schiedam, Vlaardingen, Maassluis en Maasland.', body, crumbs });
}

// FAQ
{
  const crumbs = [['Home', '/'], ['Veelgestelde vragen', '/veelgestelde-vragen/']];
  const faq = [
    ['Wat kost een rijles?', `Een losse rijles van 45 minuten kost ${eur(PRICE.les)}. In een pakket rijd je lessen van 90 minuten voor ${eur(PRICE.pakLes)} per les.`],
    ['Welke pakketten hebben jullie?', PACKS.map(p => `${p.name}: ${p.lessen} lessen van 90 minuten voor ${eur(p.prijs)}`).join('. ') + '. Bij elk pakket zit je praktijkexamen erbij en is de proefles gratis.'],
    ['Is het examen echt inbegrepen?', 'Ja. Bij elk pakket is je praktijkexamen bij het CBR inbegrepen.'],
    ['Hoe lang duurt een les?', 'Een losse les duurt 45 minuten. In een pakket rijd je lessen van 90 minuten, zodat je per les meer leert.'],
    ['Hoe bevestig ik mijn proefles of rijles?', 'Na het inplannen krijg je een Tikkie-betaalverzoek. Zodra dat binnen 24 uur betaald is, staat je afspraak vast.'],
    ['Kan ik les krijgen van een vrouwelijke instructrice?', 'Ja. Geef het aan bij je aanmelding.'],
    ['Ik heb faalangst. Kan ik bij jullie terecht?', 'Zeker. Begeleiding bij faalangst en rijangst is onze specialiteit.'],
    ['Vanaf welke leeftijd kan ik beginnen?', 'Vanaf 16,5 jaar. Op je 17e kun je praktijkexamen doen.'],
    ['Geven jullie ook les in het weekend?', 'Op zaterdag wel. We geven les van maandag t/m zaterdag, op zondag zijn we gesloten.'],
    ['Do you offer driving lessons in English?', 'Yes. You can follow all your lessons in English, in an automatic or a manual car.'],
    ['Waar geven jullie les?', 'In Rhoon, Rotterdam, Barendrecht, Schiedam, Vlaardingen, Maassluis en Maasland. Daarbuiten spreken we af bij een station in de regio.'],
  ];
  const body = `${pageHero({ h1: 'Veelgestelde vragen. <span class="grad-text">Kort en duidelijk.</span>', lead: 'Staat je vraag er niet tussen? Stuur een WhatsApp, dan krijg je snel antwoord.', crumbs, ctas: `<a href="${SITE.wa}" target="_blank" rel="noopener" class="btn btn-primary magnetic">Stel je vraag via WhatsApp ${ARROW}</a>` })}
${faqHtml(faq, { title: 'Alles over rijles bij Rijschool 010', eyebrow: 'FAQ' }).replace('<section class="" id="faq">', '<section id="faq" style="padding-top:0">')}
${ctaBand()}`;
  page('/veelgestelde-vragen/', { title: 'Veelgestelde vragen over rijles | Rijschool 010', desc: 'Antwoord op de meestgestelde vragen over rijles bij Rijschool 010: prijzen, pakketten, examen, faalangst en lessen in het Engels.', body, crumbs, faq });
}

// Contact
{
  const crumbs = [['Home', '/'], ['Contact', '/contact/']];
  const body = `${pageHero({ h1: 'Contact. <span class="grad-text">We helpen je graag.</span>', lead: `Een vraag over lessen, pakketten of je examen? Bel, WhatsApp of mail ons, of gebruik het formulier. We reageren binnen 24 uur.`, crumbs, ctas: `<a href="tel:${SITE.phoneIntl}" class="btn btn-primary magnetic">Bel ${SITE.phone} ${ARROW}</a><a href="/proefles/#aanmelden" class="btn btn-ghost magnetic">Gratis proefles plannen</a>` })}
${contactSection({ title: 'Stel je vraag.', id: 'contact', vraag: true }).replace('<section id="contact">', '<section id="contact" style="padding-top:0">')}`;
  page('/contact/', { title: 'Contact | Rijschool 010', desc: `Vragen over rijles bij Rijschool 010? Bel of WhatsApp ${SITE.phone} of mail ${SITE.email}.`, body, crumbs });
}

// Privacy
{
  const crumbs = [['Home', '/'], ['Privacy', '/privacy/']];
  const body = `${pageHero({ h1: 'Privacyverklaring', lead: 'Hoe Rijschool 010 omgaat met je persoonsgegevens.', crumbs, ctas: false })}
<section style="padding-top:0">
  <div class="wrap prose" style="max-width:820px">
    <h3>Welke gegevens we verwerken</h3>
    <p>Als je je aanmeldt via het formulier, WhatsApp, telefoon of e-mail, verwerken we de gegevens die je ons geeft: je naam, telefoonnummer, e-mailadres, postcode en woonplaats, en wat je ons vertelt over je beschikbaarheid en voorkeuren.</p>
    <h3>Waarvoor we ze gebruiken</h3>
    <p>We gebruiken je gegevens alleen om contact met je op te nemen, je lessen en examen in te plannen en betalingen te verwerken. Voor het aanvragen van je praktijkexamen geven we de benodigde gegevens door aan het CBR.</p>
    <h3>Hoe lang we ze bewaren</h3>
    <p>We bewaren je gegevens niet langer dan nodig voor je lestraject en voor onze wettelijke administratieplicht.</p>
    <h3>Je rechten</h3>
    <p>Je mag altijd vragen welke gegevens we van je hebben, en vragen om ze aan te passen of te verwijderen. Stuur daarvoor een mail naar <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
    <h3>Contact</h3>
    <p>Rijschool 010. Telefoon ${SITE.phone}, e-mail ${SITE.email}.</p>
  </div>
</section>`;
  page('/privacy/', { title: 'Privacyverklaring | Rijschool 010', desc: 'Privacyverklaring van Rijschool 010.', body, crumbs });
}

// Bedankt
{
  const body = `${pageHero({ h1: 'Bedankt! <span class="grad-text">We hebben je aanmelding.</span>', lead: 'We nemen binnen 24 uur contact met je op om je proefles in te plannen. Daarna ontvang je een Tikkie-betaalverzoek. Zodra dat betaald is, staat je afspraak vast.', ctas: `<a href="${SITE.wa}" target="_blank" rel="noopener" class="btn btn-primary magnetic">Stuur alvast een WhatsApp ${ARROW}</a><a href="/" class="btn btn-ghost magnetic">Terug naar home</a>` })}`;
  page('/bedankt/', { title: 'Bedankt voor je aanmelding | Rijschool 010', desc: 'Bedankt voor je aanmelding bij Rijschool 010.', body });
}

// 404
out.push({ url: '/404.html', html: layout({ url: '/404.html', title: 'Pagina niet gevonden | Rijschool 010', desc: 'Deze pagina bestaat niet.', body: `<section class="nf"><div class="wrap"><div class="big grad-text">404</div><h1 class="h2">Deze afslag bestaat niet.</h1><p class="lead" style="margin:0 auto 30px">De pagina die je zoekt is er niet. Rij terug naar home of plan meteen je proefles.</p><div class="hero-ctas" style="justify-content:center"><a href="/" class="btn btn-primary">Naar home ${ARROW}</a><a href="/proefles/#aanmelden" class="btn btn-ghost">Gratis proefles</a></div></div></section>` }) });

/* ---------- write ---------- */
const css = fs.readFileSync(path.join(SRC, 'site.css'), 'utf8') + '\n' + fs.readFileSync(path.join(SRC, 'extra.css'), 'utf8');
fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'assets', 'site.css'), css);
fs.copyFileSync(path.join(SRC, 'site.js'), path.join(ROOT, 'assets', 'site.js'));

for (const { url, html } of out) {
  const file = url.endsWith('.html') ? path.join(ROOT, url) : path.join(ROOT, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}
const urls = out.filter(o => !o.url.endsWith('.html') && o.url !== '/bedankt/').map(o => o.url);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE.domain}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\n${SITE.noindex ? 'Disallow: /' : 'Allow: /'}\nSitemap: ${SITE.domain}/sitemap.xml\n`);

const all = out.map(o => o.html).join('');
const dashes = (all.match(/[—–]/g) || []).length;
console.log(`${out.length} pages written. Em/en dashes: ${dashes}`);
