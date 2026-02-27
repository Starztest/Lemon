// ═══════════════════════════════════════════════════════
//  DOSTOEVSKY'S MATHEMATICAL REDEMPTION — App Engine
// ═══════════════════════════════════════════════════════

(function () {
  "use strict";

  // ── STATE ───────────────────────────────────────────
  const state = {
    solved: 0,
    streak: 0,
    bestStreak: 0,
    quotesEarned: [],
    currentProblem: null,
    difficulty: "easy",
    category: "arithmetic",
    problemCount: 0,
    calcCount: 0
  };

  // Load persisted state
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem("dostoevsky_math") || "{}");
      if (saved.solved !== undefined) state.solved = saved.solved;
      if (saved.streak !== undefined) state.streak = saved.streak;
      if (saved.bestStreak !== undefined) state.bestStreak = saved.bestStreak;
      if (saved.quotesEarned !== undefined) state.quotesEarned = saved.quotesEarned;
      if (saved.problemCount !== undefined) state.problemCount = saved.problemCount;
      if (saved.calcCount !== undefined) state.calcCount = saved.calcCount;
    } catch (e) {}
    updateStats();
  }

  function saveState() {
    try {
      localStorage.setItem("dostoevsky_math", JSON.stringify({
        solved: state.solved,
        streak: state.streak,
        bestStreak: state.bestStreak,
        quotesEarned: state.quotesEarned,
        problemCount: state.problemCount,
        calcCount: state.calcCount
      }));
    } catch (e) {}
  }

  function updateStats() {
    document.getElementById("stat-solved").textContent = state.solved;
    document.getElementById("stat-streak").textContent = state.streak;
    document.getElementById("stat-quotes").textContent = state.quotesEarned.length;
  }

  // ── QUOTE REWARD SYSTEM ─────────────────────────────
  function getRandomQuote(tier) {
    const pool = DOSTOEVSKY_QUOTES.filter(q =>
      (tier === "any" || q.tier === tier) && !state.quotesEarned.includes(q.id)
    );
    if (pool.length === 0) {
      const allPool = DOSTOEVSKY_QUOTES.filter(q => !state.quotesEarned.includes(q.id));
      if (allPool.length === 0) {
        return DOSTOEVSKY_QUOTES[Math.floor(Math.random() * DOSTOEVSKY_QUOTES.length)];
      }
      return allPool[Math.floor(Math.random() * allPool.length)];
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function showQuoteModal(quote) {
    if (!quote) return;
    if (!state.quotesEarned.includes(quote.id)) {
      state.quotesEarned.push(quote.id);
      saveState();
      updateStats();
    }
    const modal = document.getElementById("quote-modal");
    document.getElementById("modal-quote-text").textContent = '"' + quote.text + '"';
    document.getElementById("modal-quote-source").textContent = "— " + quote.source + " (" + quote.year + ")";
    modal.classList.remove("hidden");
  }

  function hideQuoteModal() {
    document.getElementById("quote-modal").classList.add("hidden");
  }

  document.getElementById("modal-close").addEventListener("click", hideQuoteModal);
  document.querySelector(".quote-modal-backdrop").addEventListener("click", hideQuoteModal);

  // ── TAB NAVIGATION ──────────────────────────────────
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      this.classList.add("active");
      document.getElementById("tab-" + this.dataset.tab).classList.add("active");
      if (this.dataset.tab === "collection") renderCollection();
    });
  });

  // ── DIFFICULTY & CATEGORY SELECTORS ─────────────────
  document.querySelectorAll(".diff-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".diff-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      state.difficulty = this.dataset.difficulty;
    });
  });

  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      state.category = this.dataset.category;
    });
  });

  // ── PROBLEM GENERATOR ─────────────────────────────
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function generateProblem() {
    const d = state.difficulty;
    const c = state.category;
    let problem = { text: "", answer: 0, hint: "", solution: "" };

    if (c === "arithmetic") {
      if (d === "easy") {
        const a = randInt(1, 50), b = randInt(1, 50);
        const ops = ["+", "-", "×"];
        const op = ops[randInt(0, 2)];
        if (op === "+") { problem.answer = a + b; problem.text = a + " + " + b + " = ?"; }
        else if (op === "-") { problem.answer = a - b; problem.text = a + " − " + b + " = ?"; }
        else { problem.answer = a * b; problem.text = a + " × " + b + " = ?"; }
        problem.hint = "Basic " + (op === "+" ? "addition" : op === "-" ? "subtraction" : "multiplication");
        problem.solution = problem.text.replace("?", problem.answer);
      } else if (d === "medium") {
        const type = randInt(0, 2);
        if (type === 0) {
          const a = randInt(10, 200), b = randInt(2, 20);
          problem.answer = round2(a / b);
          problem.text = a + " ÷ " + b + " = ?";
          problem.hint = "Division — round to 2 decimal places if needed.";
          problem.solution = a + " ÷ " + b + " = " + problem.answer;
        } else if (type === 1) {
          const a = randInt(10, 99), b = randInt(10, 99), c2 = randInt(1, 50);
          problem.answer = a * b + c2;
          problem.text = a + " × " + b + " + " + c2 + " = ?";
          problem.hint = "Multiply first, then add.";
          problem.solution = a + " × " + b + " = " + (a*b) + ", then + " + c2 + " = " + problem.answer;
        } else {
          const base = randInt(2, 15);
          problem.answer = base * base;
          problem.text = base + "² = ?";
          problem.hint = "Square means multiply the number by itself.";
          problem.solution = base + " × " + base + " = " + problem.answer;
        }
      } else {
        const type = randInt(0, 2);
        if (type === 0) {
          const a = randInt(100, 999), b = randInt(100, 999);
          problem.answer = a * b;
          problem.text = a + " × " + b + " = ?";
          problem.hint = "Try breaking it down: " + a + " × " + Math.round(b/100)*100 + " + ...";
          problem.solution = a + " × " + b + " = " + problem.answer;
        } else if (type === 1) {
          const base = randInt(2, 12), exp = randInt(3, 5);
          problem.answer = Math.pow(base, exp);
          problem.text = base + "^" + exp + " = ?";
          problem.hint = "Multiply " + base + " by itself " + exp + " times.";
          let sol = base + "";
          for (let i = 1; i < exp; i++) sol += " × " + base;
          problem.solution = sol + " = " + problem.answer;
        } else {
          const n = randInt(4, 10);
          let fact = 1;
          for (let i = 2; i <= n; i++) fact *= i;
          problem.answer = fact;
          problem.text = n + "! = ?";
          problem.hint = "Factorial: multiply all integers from 1 to " + n + ".";
          let sol = "1";
          for (let i = 2; i <= n; i++) sol += " × " + i;
          problem.solution = sol + " = " + fact;
        }
      }
    } else if (c === "algebra") {
      if (d === "easy") {
        const x = randInt(-10, 10), b = randInt(1, 20);
        const result = x + b;
        problem.answer = x;
        problem.text = "x + " + b + " = " + result + ". Solve for x.";
        problem.hint = "Subtract " + b + " from both sides.";
        problem.solution = "x = " + result + " − " + b + " = " + x;
      } else if (d === "medium") {
        const x = randInt(-10, 10), a = randInt(2, 8), b = randInt(-15, 15);
        const result = a * x + b;
        problem.answer = x;
        problem.text = a + "x + " + (b >= 0 ? b : "(" + b + ")") + " = " + result + ". Solve for x.";
        problem.hint = "Subtract " + b + " from both sides, then divide by " + a + ".";
        problem.solution = a + "x = " + (result - b) + "  →  x = " + (result - b) + "/" + a + " = " + x;
      } else {
        const x = randInt(-5, 5), a = randInt(2, 5), b = randInt(1, 10), d2 = randInt(1, 10);
        // Ensure c2 !== a to avoid division by zero
        let c2;
        do {
          c2 = randInt(1, 5);
        } while (c2 === a);
        const left = a * x + b, right = c2 * x + d2;
        problem.text = a + "x + " + b + " = " + c2 + "x + " + d2 + ". Solve for x.";
        problem.answer = x;
        problem.hint = "Move x terms to one side and constants to the other.";
        problem.solution = (a-c2) + "x = " + (d2-b) + "  →  x = " + (d2-b) + "/" + (a-c2) + " = " + x;
      }
    } else if (c === "geometry") {
      if (d === "easy") {
        const type = randInt(0, 1);
        if (type === 0) {
          const r = randInt(1, 15);
          problem.answer = round2(Math.PI * r * r);
          problem.text = "Area of a circle with radius " + r + "? (Use π ≈ 3.14159, round to 2 decimals)";
          problem.hint = "Area = πr²";
          problem.solution = "π × " + r + "² = π × " + (r*r) + " = " + problem.answer;
        } else {
          const w = randInt(2, 20), h = randInt(2, 20);
          problem.answer = w * h;
          problem.text = "Area of a rectangle: width " + w + ", height " + h + "?";
          problem.hint = "Area = width × height";
          problem.solution = w + " × " + h + " = " + problem.answer;
        }
      } else if (d === "medium") {
        const type = randInt(0, 1);
        if (type === 0) {
          const a = randInt(3, 12), b = randInt(3, 12);
          problem.answer = round2(Math.sqrt(a*a + b*b));
          problem.text = "Hypotenuse of a right triangle with legs " + a + " and " + b + "? (Round to 2 decimals)";
          problem.hint = "Pythagorean theorem: c² = a² + b²";
          problem.solution = "c = √(" + a + "² + " + b + "²) = √(" + (a*a) + " + " + (b*b) + ") = √" + (a*a+b*b) + " = " + problem.answer;
        } else {
          const r = randInt(2, 10), h = randInt(5, 20);
          problem.answer = round2(Math.PI * r * r * h);
          problem.text = "Volume of a cylinder: radius " + r + ", height " + h + "? (Round to 2 decimals)";
          problem.hint = "V = πr²h";
          problem.solution = "π × " + r + "² × " + h + " = " + problem.answer;
        }
      } else {
        const r = randInt(2, 10);
        problem.answer = round2((4/3) * Math.PI * r * r * r);
        problem.text = "Volume of a sphere with radius " + r + "? (Round to 2 decimals)";
        problem.hint = "V = (4/3)πr³";
        problem.solution = "(4/3) × π × " + r + "³ = " + problem.answer;
      }
    } else if (c === "calculus") {
      if (d === "easy") {
        const coeff = randInt(1, 10), pow = randInt(2, 5);
        const newCoeff = coeff * pow, newPow = pow - 1;
        problem.text = "d/dx [" + coeff + "x^" + pow + "] = ?  (format: ax^b)";
        problem.answer = newCoeff + "x^" + newPow;
        problem.hint = "Power rule: d/dx [ax^n] = a·n·x^(n-1)";
        problem.solution = coeff + " × " + pow + " = " + newCoeff + ", power: " + pow + "-1 = " + newPow + " → " + problem.answer;
      } else if (d === "medium") {
        const a = randInt(1, 5), b = randInt(1, 10);
        problem.text = "∫ " + (a > 1 ? a : "") + "x dx = ?  (format: ax^2 + C, omit fraction — give the coefficient as a decimal)";
        problem.answer = round2(a / 2) + "x^2 + C";
        problem.hint = "Power rule for integration: ∫x^n dx = x^(n+1)/(n+1) + C";
        problem.solution = a + "/2 × x^2 + C = " + problem.answer;
      } else {
        const a = randInt(2, 6);
        problem.text = "What is the derivative of e^(" + a + "x)?  (format: ae^(bx))";
        problem.answer = a + "e^(" + a + "x)";
        problem.hint = "Chain rule: d/dx [e^(ax)] = a·e^(ax)";
        problem.solution = "By chain rule: " + a + " × e^(" + a + "x) = " + problem.answer;
      }
    }

    state.problemCount++;
    state.currentProblem = problem;
    return problem;
  }

  // ── PRACTICE PROBLEM UI ───────────────────────────
  const problemText = document.getElementById("problem-text");
  const problemNum = document.getElementById("problem-num");
  const answerInput = document.getElementById("answer-input");
  const feedback = document.getElementById("feedback");
  const hintArea = document.getElementById("hint-area");
  const solutionArea = document.getElementById("solution-area");

  function showProblem() {
    const p = generateProblem();
    problemText.textContent = p.text;
    problemNum.textContent = state.problemCount;
    answerInput.value = "";
    feedback.classList.add("hidden");
    feedback.className = "feedback hidden";
    hintArea.classList.add("hidden");
    solutionArea.classList.add("hidden");
    answerInput.focus();
  }

  function checkAnswer() {
    if (!state.currentProblem) return;
    const userAns = answerInput.value.trim();
    if (!userAns) return;

    const correctAns = String(state.currentProblem.answer);
    const isNumericAnswer = !isNaN(Number(correctAns));
    let correct = false;

    if (isNumericAnswer) {
      const userNum = parseFloat(userAns);
      const correctNum = parseFloat(correctAns);
      correct = Math.abs(userNum - correctNum) < 0.05;
    } else {
      correct = userAns.replace(/\s/g, "").toLowerCase() === correctAns.replace(/\s/g, "").toLowerCase();
    }

    feedback.classList.remove("hidden", "correct", "incorrect");

    if (correct) {
      state.solved++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      feedback.classList.add("correct");
      feedback.textContent = "✓ Correct! The answer is " + correctAns + ". Well done, seeker of truth!";
      saveState();
      updateStats();
      setTimeout(() => {
        const quote = getRandomQuote(state.difficulty);
        showQuoteModal(quote);
      }, 800);
    } else {
      state.streak = 0;
      feedback.classList.add("incorrect");
      feedback.textContent = "✗ Not quite. Try again, or use a hint. \"Pain and suffering are always inevitable for a large intelligence.\"";
      saveState();
      updateStats();
    }
  }

  document.getElementById("new-problem").addEventListener("click", showProblem);
  document.getElementById("submit-answer").addEventListener("click", checkAnswer);
  answerInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkAnswer();
  });

  document.getElementById("hint-btn").addEventListener("click", function () {
    if (state.currentProblem) {
      hintArea.textContent = "💡 " + state.currentProblem.hint;
      hintArea.classList.remove("hidden");
    }
  });

  document.getElementById("show-solution").addEventListener("click", function () {
    if (state.currentProblem) {
      solutionArea.textContent = "📋 " + state.currentProblem.solution;
      solutionArea.classList.remove("hidden");
    }
  });

  // ── CALCULATOR ────────────────────────────────────
  const calcInput = document.getElementById("calc-input");
  const calcHistory = document.getElementById("calc-history");
  let calcDisplay = "0";
  let calcFirst = null;
  let calcOp = null;
  let calcWaiting = false;

  function updateCalcDisplay() {
    calcInput.value = calcDisplay;
  }

  function calcReset() {
    calcDisplay = "0";
    calcFirst = null;
    calcOp = null;
    calcWaiting = false;
    calcHistory.textContent = "";
    updateCalcDisplay();
  }

  function calcPerformOp(op, a, b) {
    switch (op) {
      case "add": return a + b;
      case "subtract": return a - b;
      case "multiply": return a * b;
      case "divide": return b !== 0 ? a / b : "Error";
      default: return b;
    }
  }

  document.querySelectorAll(".calc-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const action = this.dataset.action;

      if (action >= "0" && action <= "9") {
        if (calcWaiting) { calcDisplay = action; calcWaiting = false; }
        else { calcDisplay = calcDisplay === "0" ? action : calcDisplay + action; }
        updateCalcDisplay();
        return;
      }

      if (action === "decimal") {
        if (calcWaiting) { calcDisplay = "0."; calcWaiting = false; }
        else if (!calcDisplay.includes(".")) { calcDisplay += "."; }
        updateCalcDisplay();
        return;
      }

      if (action === "clear") { calcReset(); return; }

      if (action === "backspace") {
        calcDisplay = calcDisplay.length > 1 ? calcDisplay.slice(0, -1) : "0";
        updateCalcDisplay();
        return;
      }

      if (action === "percent") {
        calcDisplay = String(parseFloat(calcDisplay) / 100);
        updateCalcDisplay();
        return;
      }

      if (action === "sqrt") {
        const val = parseFloat(calcDisplay);
        calcDisplay = val >= 0 ? String(round2(Math.sqrt(val))) : "Error";
        calcHistory.textContent = "√(" + val + ")";
        updateCalcDisplay();
        rewardCalc();
        return;
      }

      if (action === "power") {
        const val = parseFloat(calcDisplay);
        calcDisplay = String(round2(val * val));
        calcHistory.textContent = val + "²";
        updateCalcDisplay();
        rewardCalc();
        return;
      }

      if (action === "sin" || action === "cos" || action === "tan") {
        const val = parseFloat(calcDisplay);
        const rad = val * Math.PI / 180;
        if (action === "sin") calcDisplay = String(round2(Math.sin(rad)));
        if (action === "cos") calcDisplay = String(round2(Math.cos(rad)));
        if (action === "tan") calcDisplay = String(round2(Math.tan(rad)));
        calcHistory.textContent = action + "(" + val + "°)";
        updateCalcDisplay();
        rewardCalc();
        return;
      }

      if (["add", "subtract", "multiply", "divide"].includes(action)) {
        const current = parseFloat(calcDisplay);
        if (calcFirst !== null && !calcWaiting) {
          const result = calcPerformOp(calcOp, calcFirst, current);
          calcDisplay = String(round2(result));
          updateCalcDisplay();
          calcFirst = result;
        } else {
          calcFirst = current;
        }
        calcOp = action;
        calcWaiting = true;
        const opSymbols = { add: "+", subtract: "−", multiply: "×", divide: "÷" };
        calcHistory.textContent = calcFirst + " " + opSymbols[action];
        return;
      }

      if (action === "equals") {
        if (calcFirst !== null && calcOp) {
          const current = parseFloat(calcDisplay);
          const result = calcPerformOp(calcOp, calcFirst, current);
          calcHistory.textContent = calcFirst + " " + { add:"+", subtract:"−", multiply:"×", divide:"÷" }[calcOp] + " " + current + " =";
          calcDisplay = String(round2(result));
          updateCalcDisplay();
          calcFirst = null;
          calcOp = null;
          calcWaiting = false;
          rewardCalc();
        }
      }
    });
  });

  function rewardCalc() {
    state.calcCount = (state.calcCount || 0) + 1;
    if (state.calcCount % 3 === 0) {
      const quote = getRandomQuote("any");
      const reward = document.getElementById("calc-quote-reward");
      document.getElementById("calc-reward-text").textContent = '"' + quote.text + '"';
      document.getElementById("calc-reward-source").textContent = "— " + quote.source;
      reward.classList.remove("hidden");
      if (!state.quotesEarned.includes(quote.id)) {
        state.quotesEarned.push(quote.id);
        saveState();
        updateStats();
      }
      setTimeout(() => reward.classList.add("hidden"), 8000);
    }
  }

  // ── EQUATION SOLVER ───────────────────────────────
  document.querySelectorAll(".solver-type-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".solver-type-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".solver-form").forEach(f => f.classList.remove("active"));
      this.classList.add("active");
      document.getElementById("solver-" + this.dataset.type).classList.add("active");
      document.getElementById("solver-result").classList.add("hidden");
      document.getElementById("solver-quote-reward").classList.add("hidden");
    });
  });

  function showSolverResult(steps) {
    const resultDiv = document.getElementById("solver-result");
    const stepsDiv = document.getElementById("solver-steps");
    stepsDiv.innerHTML = steps.map((s, i) =>
      '<div class="step ' + (i === steps.length - 1 ? 'step-final' : '') + '">' + s + '</div>'
    ).join("");
    resultDiv.classList.remove("hidden");

    const quote = getRandomQuote("any");
    const reward = document.getElementById("solver-quote-reward");
    document.getElementById("solver-reward-text").textContent = '"' + quote.text + '"';
    document.getElementById("solver-reward-source").textContent = "— " + quote.source + " (" + quote.year + ")";
    reward.classList.remove("hidden");
    if (!state.quotesEarned.includes(quote.id)) {
      state.quotesEarned.push(quote.id);
      saveState();
      updateStats();
    }
  }

  document.getElementById("solve-linear").addEventListener("click", function () {
    const a = parseFloat(document.getElementById("lin-a").value);
    const b = parseFloat(document.getElementById("lin-b").value);
    const c = parseFloat(document.getElementById("lin-c").value);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return alert("Please fill in all coefficients.");
    if (a === 0) return alert("'a' cannot be 0 for a linear equation.");
    const x = round2((c - b) / a);
    showSolverResult([
      "Given: " + a + "x + " + b + " = " + c,
      a + "x = " + c + " − " + b,
      a + "x = " + round2(c - b),
      "x = " + round2(c - b) + " / " + a,
      "✦  x = " + x
    ]);
  });

  document.getElementById("solve-quadratic").addEventListener("click", function () {
    const a = parseFloat(document.getElementById("quad-a").value);
    const b = parseFloat(document.getElementById("quad-b").value);
    const c = parseFloat(document.getElementById("quad-c").value);
    if (isNaN(a) || isNaN(b) || isNaN(c)) return alert("Please fill in all coefficients.");
    if (a === 0) return alert("'a' cannot be 0 for a quadratic equation.");
    const disc = b * b - 4 * a * c;
    const steps = [
      "Given: " + a + "x² + " + b + "x + " + c + " = 0",
      "Discriminant: b² − 4ac = " + b + "² − 4(" + a + ")(" + c + ") = " + round2(disc)
    ];
    if (disc < 0) {
      steps.push("Discriminant < 0: No real solutions");
      steps.push("✦  Complex roots: x = (" + (-b) + " ± √" + round2(disc) + "i) / " + (2*a));
    } else if (disc === 0) {
      const x = round2(-b / (2 * a));
      steps.push("Discriminant = 0: One repeated root");
      steps.push("✦  x = " + x);
    } else {
      const x1 = round2((-b + Math.sqrt(disc)) / (2 * a));
      const x2 = round2((-b - Math.sqrt(disc)) / (2 * a));
      steps.push("√discriminant = " + round2(Math.sqrt(disc)));
      steps.push("✦  x₁ = " + x1);
      steps.push("✦  x₂ = " + x2);
    }
    showSolverResult(steps);
  });

  document.getElementById("solve-system").addEventListener("click", function () {
    const a1 = parseFloat(document.getElementById("sys-a1").value);
    const b1 = parseFloat(document.getElementById("sys-b1").value);
    const c1 = parseFloat(document.getElementById("sys-c1").value);
    const a2 = parseFloat(document.getElementById("sys-a2").value);
    const b2 = parseFloat(document.getElementById("sys-b2").value);
    const c2 = parseFloat(document.getElementById("sys-c2").value);
    if ([a1,b1,c1,a2,b2,c2].some(isNaN)) return alert("Please fill in all coefficients.");
    const det = a1 * b2 - a2 * b1;
    const steps = [
      "Eq1: " + a1 + "x + " + b1 + "y = " + c1,
      "Eq2: " + a2 + "x + " + b2 + "y = " + c2,
      "Determinant: " + a1 + "×" + b2 + " − " + a2 + "×" + b1 + " = " + round2(det)
    ];
    if (Math.abs(det) < 0.0001) {
      steps.push("Determinant ≈ 0: System has no unique solution (parallel or coincident lines).");
    } else {
      const x = round2((c1 * b2 - c2 * b1) / det);
      const y = round2((a1 * c2 - a2 * c1) / det);
      steps.push("Using Cramer's rule:");
      steps.push("✦  x = " + x);
      steps.push("✦  y = " + y);
    }
    showSolverResult(steps);
  });

  // ── QUOTE COLLECTION ──────────────────────────────
  let currentFilter = "all";

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      renderCollection();
    });
  });

  function renderCollection() {
    const gallery = document.getElementById("quote-gallery");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    const total = DOSTOEVSKY_QUOTES.length;
    const earned = state.quotesEarned.length;
    progressFill.style.width = (earned / total * 100) + "%";
    progressText.textContent = earned + " / " + total + " quotes collected";

    const mainSources = ["Crime and Punishment", "The Brothers Karamazov", "Notes from Underground", "The Idiot"];

    let filtered = DOSTOEVSKY_QUOTES;
    if (currentFilter !== "all") {
      if (currentFilter === "other") {
        filtered = DOSTOEVSKY_QUOTES.filter(q => !mainSources.includes(q.source));
      } else {
        filtered = DOSTOEVSKY_QUOTES.filter(q => q.source === currentFilter);
      }
    }

    if (filtered.length === 0) {
      gallery.innerHTML = '<div class="empty-collection"><div class="empty-icon">📚</div><p>No quotes in this category yet.</p></div>';
      return;
    }

    gallery.innerHTML = filtered.map(q => {
      const unlocked = state.quotesEarned.includes(q.id);
      return '<div class="quote-card ' + (unlocked ? "" : "locked") + '">' +
        '<blockquote>"' + q.text + '"</blockquote>' +
        '<cite>— ' + q.source + ' (' + q.year + ')</cite>' +
        '</div>';
    }).join("");
  }

  // ── INITIALIZE ────────────────────────────────────
  loadState();
  showProblem();

})();
