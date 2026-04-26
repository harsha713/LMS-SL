// Main JavaScript file for Saaradaa Learknowations Pvt. Ltd.

// Function to load worksheets dynamically
function loadWorksheets() {
  const container = document.getElementById('worksheets-container');
  if (!container) return;

  worksheets.forEach(worksheet => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${worksheet.title}</h3>
      <p><strong>Subject:</strong> ${worksheet.subject}</p>
      <p><strong>Questions:</strong> ${worksheet.questions.length}</p>
      <button class="btn" onclick="startWorksheet(${worksheet.id})">Start Worksheet</button>
    `;
    container.appendChild(card);
  });
}

// Function to start a worksheet
function startWorksheet(id) {
  const worksheet = worksheets.find(w => w.id === id);
  if (!worksheet) return;

  // Hide worksheets list and show form
  document.getElementById('worksheets-container').style.display = 'none';
  document.getElementById('worksheet-form').style.display = 'block';

  const form = document.getElementById('worksheet-form-element');
  form.dataset.worksheetId = id;

  const questionsContainer = document.getElementById('worksheet-questions');
  questionsContainer.innerHTML = '';

  worksheet.questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question'; // Reuse quiz-question class
    questionDiv.innerHTML = `<h4>${index + 1}. ${q.question}</h4>`;

    if (q.type === 'mcq') {
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';
      q.options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="wq${index}" value="${option}"> ${option}`;
        optionsDiv.appendChild(label);
      });
      questionDiv.appendChild(optionsDiv);
    } else if (q.type === 'text') {
      questionDiv.innerHTML += `<input type="text" name="wq${index}" placeholder="Your answer">`;
    }

    questionsContainer.appendChild(questionDiv);
  });
}

// Function to handle worksheet submission
function handleWorksheetSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const worksheetId = parseInt(form.dataset.worksheetId);
  const worksheet = worksheets.find(w => w.id === worksheetId);
  if (!worksheet) return;

  let score = 0;
  const total = worksheet.questions.length;

  worksheet.questions.forEach((q, index) => {
    const input = form.elements[`wq${index}`];
    let userAnswer = '';
    if (q.type === 'mcq') {
      const selected = form.querySelector(`input[name="wq${index}"]:checked`);
      userAnswer = selected ? selected.value.toLowerCase() : '';
    } else {
      userAnswer = input.value.toLowerCase().trim();
    }
    if (userAnswer === q.answer.toLowerCase()) {
      score++;
    }
  });

  // Hide form and show result
  document.getElementById('worksheet-form').style.display = 'none';
  document.getElementById('worksheet-result').style.display = 'block';

  document.getElementById('worksheet-score').textContent = `${score}/${total}`;
  document.getElementById('worksheet-message').textContent = score === total ? 'Perfect! You\'re a star!' : 'Great job! Keep learning!';
}

// Function to go back to worksheets list
function backToWorksheets() {
  document.getElementById('worksheet-result').style.display = 'none';
  document.getElementById('worksheets-container').style.display = 'grid';
}

// Function to load quiz questions dynamically
function loadQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  quizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question';
    questionDiv.innerHTML = `<h4>${index + 1}. ${q.question}</h4>`;

    if (q.type === 'mcq') {
      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'quiz-options';
      q.options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
        optionsDiv.appendChild(label);
      });
      questionDiv.appendChild(optionsDiv);
    } else if (q.type === 'text') {
      questionDiv.innerHTML += `<input type="text" name="q${index}" placeholder="Your answer">`;
    }

    container.appendChild(questionDiv);
  });
}

// Function to handle quiz submission
function handleQuizSubmit(event) {
  event.preventDefault();
  const form = event.target;
  let score = 0;
  const total = quizQuestions.length;

  quizQuestions.forEach((q, index) => {
    const input = form.elements[`q${index}`];
    let userAnswer = '';
    if (q.type === 'mcq') {
      const selected = form.querySelector(`input[name="q${index}"]:checked`);
      userAnswer = selected ? selected.value.toLowerCase() : '';
    } else {
      userAnswer = input.value.toLowerCase().trim();
    }
    if (userAnswer === q.answer.toLowerCase()) {
      score++;
    }
  });

  document.getElementById('score').textContent = `${score}/${total}`;
  document.getElementById('message').textContent = score === total ? 'Perfect! You\'re a star!' : 'Great job! Keep learning!';
  document.getElementById('result').style.display = 'block';
}

// Function to load book of the month
function loadBookOfTheMonth() {
  const container = document.getElementById('book-container');
  if (!container || books.length === 0) return;

  const book = books[0]; // Assuming first book is the book of the month
  container.innerHTML = `
    <div class="card">
      <img src="${book.cover}" alt="Book Cover" style="max-width: 200px; height: auto; border-radius: 10px;">
      <h3>${book.title}</h3>
      <p><strong>Summary:</strong> ${book.summary}</p>
      <p><strong>What You Learn:</strong> ${book.whatYouLearn}</p>
      <textarea id="reflection" rows="4" placeholder="Write your reflection here..."></textarea>
      <button id="submit-reflection" class="btn">Submit Reflection</button>
      <div id="reflection-success" class="success-message" style="display: none;">Thank you for your reflection!</div>
    </div>
  `;

  document.getElementById('submit-reflection').addEventListener('click', () => {
    document.getElementById('reflection-success').style.display = 'block';
  });
}

// Function to handle parent-child submit
function handleParentSubmit() {
  document.getElementById('good-job-message').style.display = 'block';
}

// Function to load Lottie animation
function loadLottieAnimation() {
  const animationContainer = document.getElementById('lottie-animation');
  if (animationContainer) {
    lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets2.lottiefiles.com/packages/lf20_5tkzkblw.json' // Sample friendly character animation
    });
  }
}

// Function to alternate speech bubble messages
function alternateSpeechBubble() {
  const speechBubble = document.getElementById('speech-bubble');
  const messages = ['Hello!', 'Ready to learn?', 'Pick a worksheet!', 'Let\'s have fun!'];
  let index = 0;

  setInterval(() => {
    speechBubble.textContent = messages[index];
    index = (index + 1) % messages.length;
  }, 3500); // Change every 3.5 seconds
}

// Function to toggle mobile menu
function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.toggle('active');
}

// Function to close mobile menu
function closeMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.classList.remove('active');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadWorksheets();
  loadQuiz();
  loadBookOfTheMonth();
  loadLottieAnimation();
  alternateSpeechBubble();

  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', handleQuizSubmit);
  }

  const worksheetForm = document.getElementById('worksheet-form-element');
  if (worksheetForm) {
    worksheetForm.addEventListener('submit', handleWorksheetSubmit);
  }

  const backBtn = document.getElementById('back-to-worksheets');
  if (backBtn) {
    backBtn.addEventListener('click', backToWorksheets);
  }

  const parentSubmitBtn = document.getElementById('submit-parent');
  if (parentSubmitBtn) {
    parentSubmitBtn.addEventListener('click', handleParentSubmit);
  }

  // Hamburger menu event listeners
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  const closeMenuBtn = document.querySelector('.close-menu');
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }

  // Close menu on outside click
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });
  }
});
