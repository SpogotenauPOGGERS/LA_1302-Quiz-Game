const question = document.querySelector("#question");
const choicesText = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Was ist 2 + 2?",
    choices: [2, 4, 21, 1],
    answer: 2,
  },
  {
    question: "Was ist die Hauptstadt von Deutschland?",
    choices: ["Berlin", "Frankfurt", "Köln", "Düsseldorf"],
    answer: 1,
  },
  {
    question: "Wer ist der Akutelle Präsident der USA?",
    choices: ["Joe Rogan", "Jonas Wumpe", "Joe Biden", "Donald Trump"],
    answer: 3,
  },
  {
    question: "Wie viel Prozent der Erde ist mit Wasser bedeckt?",
    choices: ["44%", "71%", "87%", "56%"],
    answer: 2,
  },
  {
    question: "Was wird am 24. Dezember gefeiert?",
    choices: [
      "Weihnachten",
      "Halloween",
      "Kanye West's Geburtstag",
      "Heilige drei Könige",
    ],
    answer: 1,
  },
  {
    question: "Wo fand die Fussball WM 2014 statt?",
    choices: ["Griechenland", "Russland", "Deuschland", "Brasilien"],
    answer: 4,
  },
  {
    question: "1/4 ist...?",
    choices: ["bank Raub", "dieb Stahl", "scheck Betrug", "ein Bruch"],
    answer: 4,
  },
  {
    question: "Was kommt in Ostasien häufig auf den Tisch?",
    choices: ["Sonicht", "Soschoneher", "Soja", "Sovielleicht"],
    answer: 3,
  },
  {
    question:
      "Zu welcher Erkenntnis gelangt man, hat man sich an der Supermarktkasse da angestellt, wo es am langsamsten vorangeht??",
    choices: ["sturer Bock", "falsche Schlange", "krummer Hund", "böser Wolf"],
    answer: 2,
  },
  {
    question:
      "Wieviel Stunden betrug die durchschnittliche Wochenarbeitszeit einer vollzeiterwerbstätigen Person in Deutschland 2021?",
    choices: ["36,6", "38,7", "40,6", "42,5"],
    answer: 3,
  },
  {
    question: "Wie viele Kantone hat die Schweiz?",
    choices: ["26", "28", "19", "23"],
    answer: 1,
  },
  {
    question:
      "Welcher Komponist schrib unter anderem die Musikstücke zu den Filmen: Dune, Inception, Interstellar und Pirates of the Caribbean?",
    choices: [
      "Patrik Pietschmann",
      "Hans Zimmer",
      "Franz Schubert",
      "John Williams",
    ],
    answer: 2,
  },
  {
    question: "Wie viele Kontinente gibt es?",
    choices: ["7", "5", "8", "6"],
    answer: 1,
  },
  {
    question:
      "Die Flagge welches europäischen Landes kann man mit den Farben der Deutschen Flagge ebenfalls bilden?",
    choices: ["Luxemburg", "Dänemark", "Uganda", "Belgien"],
    answer: 4,
  },
  {
    question: "Wie viele Sätze hat ein Basketballspiel?",
    choices: ["3", "4", "6", "2"],
    answer: 2,
  },
  {
    question: "Wie viele Tasten hat gewöhnlich ein Klavier?",
    choices: ["72", "66", "88", "106"],
    answer: 3,
  },
  {
    question:
      "Bei welchen Fischen muss man nur zwei Buchstaben vertauschen, um die Bewohner eines Staates in Südoseuropa daraus zu machen?",
    choices: ["Muränen", "Barrakudas", "Piranhas", "Rochen"],
    answer: 1,
  },
  {
    question: "Tick Trick und?",
    choices: ["Tack", "Crack", "Track", "Truck"],
    answer: 3,
  },
  {
    question: "Wie viele Länder machen bei der WM 2022 mit?",
    choices: ["48", "32", "36", "64"],
    answer: 2,
  },
  {
    question:
      "Eines muss man den Karibikbewohnern wirklich lassen: Sie können gut ...",
    choices: ["Flirten", "anbaggern", "Bräute aufreisen", "Rum machen"],
    answer: 4,
  },
  {
    question: "Wer grundsätzlich kein Gemüse anpflanzt, der sät auch...",
    choices: [
      "ohs Teer hase",
      "sangt Mahr tin",
      "nie Kohl aus",
      "waih Nachtz mann",
    ],
    answer: 3,
  },
  {
    question: "Welchen Warnhinweis sieht man häufig im Alltag?",
    choices: [
      "Brecht abgesagt!",
      "Böll findet nicht statt!",
      "Frisch gestrichen!",
      "Grass entfällt!",
    ],
    answer: 3,
  },
  {
    question: "Wofür gibt es einen Oscar?",
    choices: [
      "Fabelhafte OP",
      "Bester Schnitt",
      "Toller Chirurg",
      "Exquisites Skalpell",
    ],
    answer: 2,
  },
  {
    question: "Haben, sein und werden sind drei...",
    choices: ["Hilfsverben", "Verderben", "Alleinerben", "Baumsterben"],
    answer: 1,
  },
  {
    question: "Wenn man einen von 2 Löchern im Reifen flickt, dann wird er...",
    choices: ["Sänger", "Maler", "Dichter", "Bildhauer"],
    answer: 3,
  },
  {
    question: "Wie viele Tage hat ein Schaltjahr?",
    choices: ["363", "365", "356", "366"],
    answer: 4,
  },
  {
    question: "Wie nennt man die Schwester der Mutter",
    choices: ["Stiefschwester", "Schwiegermutter", "Cousine", "Tante"],
    answer: 4,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(MAX_QUESTIONS);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  for (let i = 0; i < 4; i++) {
    choicesText[i].innerText = currentQuestion.choices[i];
  }

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choicesText.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    if (classToApply === "incorrect") {
      document.getElementsByName("classToApply");
      setTimeout(() => {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("/end.html");
      }, 1000);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
