// Kompletný test s 30 otázkami - Základy Pythonu
const questions = [
  { q: "Čo vypíše príkaz print('Ahoj')?", a: ["Ahoj", "print('Ahoj')", "chybu", "None"], correct: 0 },
  { q: "Ako deklarujeme premennú v Pythone?", a: ["var x = 5", "x = 5", "int x = 5", "let x = 5"], correct: 1 },
  { q: "Ktorý príkaz vytvorí cyklus?", a: ["if", "switch", "for", "def"], correct: 2 },
  { q: "Čo znamená operátor ==?", a: ["Priradenie", "Porovnanie", "Súčet", "Negácia"], correct: 1 },
  { q: "Ako vložíme komentár?", a: ["// komentár", "# komentár", "/* komentár */", "<!-- komentár -->"], correct: 1 },
  { q: "Ako zistíme aktuálny adresár?", a: ["os.getcwd()", "os.list()", "sys.path", "math.pi"], correct: 0 },
  { q: "Ktorý modul obsahuje funkciu sqrt?", a: ["random", "sys", "math", "datetime"], correct: 2 },
  { q: "Čo vráti len([1, 2, 3])?", a: ["3", "[1,2,3]", "1", "None"], correct: 0 },
  { q: "Ktorý zápis je funkcia?", a: ["def foo():", "var foo()", "function foo()", "fun foo()"], correct: 0 },
  { q: "Ako importujeme modul math?", a: ["include math", "import math", "using math", "require math"], correct: 1 },
  { q: "Čo robí range(5)?", a: ["Vytvorí zoznam 0..5", "Vytvorí iterátor 0..4", "Vráti 5", "Chybu"], correct: 1 },
  { q: "Ktorá hodnota je typu boolean?", a: ["True", "1", "'True'", "None"], correct: 0 },
  { q: "Ako získame dĺžku reťazca?", a: ["len('text')", "size('text')", "count('text')", "length('text')"], correct: 0 },
  { q: "Ktorý zápis je reťazec?", a: ["'text'", "[text]", "text", "<text>"], correct: 0 },
  { q: "Ktorý príkaz ukončí cyklus?", a: ["continue", "return", "exit", "break"], correct: 3 },
  { q: "Ktorý typ obsahu má hodnotu 3.14?", a: ["int", "str", "float", "bool"], correct: 2 },
  { q: "Čo vráti 2 + 3 * 4?", a: ["20", "14", "18", "11"], correct: 1 },
  { q: "Čo robí os.listdir('.')?", a: ["Zoznam súborov", "Vymaže súbory", "Spustí skript", "Zmení adresár"], correct: 0 },
  { q: "Ktorý modul vráti verziu Pythonu?", a: ["os", "sys", "math", "random"], correct: 1 },
  { q: "Ako definujeme návratovú hodnotu?", a: ["return", "yield", "break", "pass"], correct: 0 },
  { q: "Ktorý zápis je platný zoznam?", a: ["(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "<1, 2, 3>"], correct: 2 },
  { q: "Ktorý príkaz pridá položku na koniec zoznamu?", a: ["append()", "add()", "push()", "insert()"], correct: 0 },
  { q: "Čo robí funkcia input()?", a: ["Číta vstup od používateľa", "Vypíše text", "Vytvorí súbor", "Spustí skript"], correct: 0 },
  { q: "Ktoré slovo vytvára triedu?", a: ["class", "struct", "obj", "type"], correct: 0 },
  { q: "Ako v Pythone odkomentujeme riadok?", a: ["Pridáme #", "Pridáme //", "Pridáme /*", "Odstránime riadok"], correct: 0 },
  { q: "Ktorý typ sa používa na pravdivostnú hodnotu?", a: ["int", "bool", "str", "float"], correct: 1 },
  { q: "Ako spustíme funkciu foo?", a: ["foo", "foo()", "call foo", "run foo"], correct: 1 },
  { q: "Ktorý znak používa Python na odsadenie bloku?", a: ["tab alebo medzera", "bodkočiarka", "zátvorka", "dvojbodka"], correct: 0 },
  { q: "Ktorý modul náhodí číslo?", a: ["datetime", "math", "random", "os"], correct: 2 },
  { q: "Čo je pip v Pythone?", a: ["Editor", "Package manager", "Iterátor", "Interprét"], correct: 1 }
];

// DOM prvky
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
const submitQuiz = document.getElementById('submitQuiz');

/**
 * Vytvorí form s všetkými otázkami
 */
function createQuiz() {
  if (!quizForm) {
    console.error('quizForm element not found!');
    return;
  }

  questions.forEach((item, index) => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'question-block';

    const legend = document.createElement('legend');
    legend.textContent = `${index + 1}. ${item.q}`;
    fieldset.appendChild(legend);

    item.a.forEach((answer, answerIndex) => {
      const label = document.createElement('label');
      label.className = 'quiz-label';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.value = answerIndex;

      label.appendChild(input);
      label.appendChild(document.createTextNode(answer));
      fieldset.appendChild(label);
    });

    quizForm.appendChild(fieldset);
  });
}

/**
 * Vyhodnotí test a zobrazí výsledky
 */
function evaluateQuiz() {
  if (!quizForm) {
    alert('Chyba: Quiz form nenájdený!');
    return;
  }

  let score = 0;
  let answered = 0;

  questions.forEach((item, index) => {
    const selected = quizForm.querySelector(`input[name=q${index}]:checked`);
    
    if (selected) {
      answered++;
      if (Number(selected.value) === item.correct) {
        score++;
      }
    }
  });

  // Zobraz výsledky
  displayResults(score, answered);
}

/**
 * Zobrazí výsledky s spätnou väzbou
 */
function displayResults(score, answered) {
  const percentage = Math.round((score / questions.length) * 100);
  const total = questions.length;

  let feedback = '';
  let resultClass = '';

  if (score === total) {
    feedback = '🎉 Perfektu! Ovládaš všetky základy Pythonu!';
    resultClass = 'excellent';
  } else if (percentage >= 80) {
    feedback = '😊 Výborná práca! Máš pevné znalosti základov.';
    resultClass = 'good';
  } else if (percentage >= 60) {
    feedback = '👍 Dobrá práca! Pokúšaj sa na problematických častiach.';
    resultClass = 'fair';
  } else if (percentage >= 40) {
    feedback = '💪 Pokrok! Niekde ti to vychádza, ale čítaj si materiál znova.';
    resultClass = 'poor';
  } else {
    feedback = '📚 Ešte pokúšateľná práca. Prečítaj si materiál znova a vyskúšaj test ešte raz.';
    resultClass = 'very-poor';
  }

  const answeredText = answered < total ? ` (Odpovedal si na ${answered}/${total})` : '';

  quizResult.innerHTML = `
    <h3 style="color: #1e3a8a; margin-top: 0;">Tvoje výsledky:</h3>
    <p style="font-size: 1.5em; font-weight: bold; margin: 1rem 0;">
      <span style="color: #3b82f6;">${score}</span> / <span style="color: #94a3b8;">${total}</span> 
      (${percentage}%)${answeredText}
    </p>
    <div style="width: 100%; height: 30px; background: #e5e7eb; border-radius: 15px; overflow: hidden; margin: 1rem 0;">
      <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #3b82f6, #10b981); transition: width 0.5s ease;"></div>
    </div>
    <p style="font-size: 1.1em; color: #1e293b; margin: 1.5rem 0;">${feedback}</p>
  `;

  quizResult.classList.add('show');
  quizResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Inicializácia
document.addEventListener('DOMContentLoaded', () => {
  createQuiz();

  if (submitQuiz) {
    submitQuiz.addEventListener('click', (event) => {
      event.preventDefault();
      evaluateQuiz();
    });
  }
});

// Enter na poslednej otázke posle test
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    evaluateQuiz();
  }
});