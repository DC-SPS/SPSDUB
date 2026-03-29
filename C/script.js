const questions = [
  { q: "Ktorý príkaz vypíše text v C?", a: ["cout", "printf", "echo", "print"], correct: 1 },
  { q: "Ako deklarujeme celú premennú?", a: ["int x;", "x = 5;", "var x;", "let x;"], correct: 0 },
  { q: "Ako začína hlavná funkcia?", a: ["function main()", "int main(void)", "main()", "void main"], correct: 1 },
  { q: "Ktorá knižnica je potrebná pre printf?", a: ["<string.h>", "<stdlib.h>", "<stdio.h>", "<math.h>"], correct: 2 },
  { q: "Čo vracia main?", a: ["Výsledok programu", "Žiadnu hodnotu", "Chybu", "String"], correct: 0 },
  { q: "Ako vytvoríme pole znakov?", a: ["char text[] = \"Ahoj\";", "string text = \"Ahoj\";", "char *text;", "text = \"Ahoj\";"], correct: 0 },
  { q: "Ako napíšeme podmienku v C?", a: ["if x > 0", "if (x > 0)", "if x > 0 then", "if: x > 0"], correct: 1 },
  { q: "Čo používame na cyklus s počítadlom?", a: ["while", "for", "repeat", "loop"], correct: 1 },
  { q: "Ako alokujeme pamäť dynamicky?", a: ["malloc", "new", "alloc", "reserve"], correct: 0 },
  { q: "Ktorý operátor priradí hodnotu?", a: ["=", "==", ">=", "!="], correct: 0 },
  { q: "Ktoré volanie prečíta vstup?", a: ["scanf", "cin", "read", "input"], correct: 0 },
  { q: "Čo použijeme na uvoľnenie pamäte?", a: ["free", "delete", "release", "clear"], correct: 0 },
  { q: "Aký typ predstavuje číslo s desatinnou čiarkou?", a: ["int", "float", "char", "bool"], correct: 1 },
  { q: "Ako vypočítame druhú mocninu?", a: ["a^2", "pow(a,2)", "a**2", "sqr(a)"], correct: 1 },
  { q: "Ktorý symbol ukončuje príkaz?", a: ["bodkočiarka", "dvojbodka", "medzera", "nový riadok"], correct: 0 },
  { q: "Ktorý zápis je prázdny riadok?", a: ["\"\"", "\" \"", "\n", ""], correct: 3 },
  { q: "Na čo slúži <stdlib.h>?", a: ["Matematika", "Vstup/výstup", "Pamäť a konverzie", "Stringy"], correct: 2 },
  { q: "Aký je výsledok výrazu 2 + 3 * 4?", a: ["20", "14", "18", "11"], correct: 1 },
  { q: "Ktorý typ znamená znak?", a: ["char", "int", "float", "double"], correct: 0 },
  { q: "Ako deklarujeme ukazovateľ?", a: ["int p", "int *p", "pointer p", "int& p"], correct: 1 },
  { q: "Ktorá knižnica pracuje s reťazcami?", a: ["<stdio.h>", "<string.h>", "<math.h>", "<time.h>"], correct: 1 },
  { q: "Čo robí funkcia strlen?", a: ["Vracia dĺžku reťazca", "Kopíruje reťazec", "Porovnáva reťazce", "Zmaže reťazec"], correct: 0 },
  { q: "Ktorý typ je najväčší pre čísla?", a: ["char", "int", "double", "short"], correct: 2 },
  { q: "Ktorý výraz kontroluje nerovnosť?", a: ["=", "==", "!=", ">"], correct: 2 },
  { q: "Ako vytvoríme funkciu s návratom int?", a: ["int suct(int a)", "func suct(int a)", "def suct(int a)", "function suct(int a)"], correct: 0 },
  { q: "Ako odkomentujeme riadok?", a: ["// komentár", "# komentár", "/* komentár */", "<!-- komentár -->"], correct: 0 },
  { q: "Čo používa C na blok kódu?", a: ["[]", "()", "{}", "<>"], correct: 2 },
  { q: "Čo znamená '", a: ["String", "Znak", "Celé číslo", "Float"], correct: 1 },
  { q: "Ktorý príkaz ukončí program?", a: ["stop()", "exit(0)", "end", "return 0"], correct: 3 },
  { q: "Ako skompilujeme súbor main.c?", a: ["gcc main.c -o main", "compile main.c", "run main.c", "cc main.c"], correct: 0 }
];

const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
const submitQuiz = document.getElementById('submitQuiz');

function createQuiz() {
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

function evaluateQuiz() {
  let score = 0;
  questions.forEach((item, index) => {
    const selected = quizForm.querySelector(`input[name=q${index}]:checked`);
    if (selected && Number(selected.value) === item.correct) {
      score += 1;
    }
  });

  quizResult.innerHTML = `Správne odpovede: <strong>${score} / ${questions.length}</strong><br>`;
  if (score === questions.length) {
    quizResult.innerHTML += '<p>Gratulujem! Máš plný počet bodov.</p>';
  } else if (score >= questions.length * 0.7) {
    quizResult.innerHTML += '<p>Dobrá práca! Zvládol si to veľmi dobre.</p>';
  } else {
    quizResult.innerHTML += '<p>Prečítaj si materiál znova a vyskúšaj test ešte raz.</p>';
  }
}

createQuiz();
attachCopyButtons();
submitQuiz.addEventListener('click', (event) => {
  event.preventDefault();
  evaluateQuiz();
});

function attachCopyButtons() {
  document.querySelectorAll('pre').forEach((pre) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code-button';
    button.textContent = 'Kopírovať kód';

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) return;
      const text = code.innerText;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Skopírované!';
        setTimeout(() => {
          button.textContent = 'Kopírovať kód';
        }, 1200);
      } catch (error) {
        console.error('Kopírovanie zlyhalo', error);
        button.textContent = 'Skopírovať zlyhalo';
        setTimeout(() => {
          button.textContent = 'Kopírovať kód';
        }, 1200);
      }
    });

    pre.parentNode.insertBefore(button, pre);
  });
}
