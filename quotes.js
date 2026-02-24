// ═══════════════════════════════════════════════════════
//  THE DOSTOEVSKY QUOTE VAULT
//  "The soul is healed by being with children." 
//  — Fyodor Dostoevsky
// ═══════════════════════════════════════════════════════

const DOSTOEVSKY_QUOTES = [
  // ── Crime and Punishment ──────────────────────────────
  {
    id: 1,
    text: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "easy"
  },
  {
    id: 2,
    text: "The darker the night, the brighter the stars. The deeper the grief, the closer is God!",
    source: "Crime and Punishment",
    year: 1866,
    tier: "easy"
  },
  {
    id: 3,
    text: "To go wrong in one's own way is better than to go right in someone else's.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "easy"
  },
  {
    id: 4,
    text: "When reason fails, the devil helps!",
    source: "Crime and Punishment",
    year: 1866,
    tier: "easy"
  },
  {
    id: 5,
    text: "Man grows used to everything, the scoundrel!",
    source: "Crime and Punishment",
    year: 1866,
    tier: "easy"
  },
  {
    id: 6,
    text: "If he has a conscience he will suffer for his mistake. That will be his punishment — as well as the prison.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "medium"
  },
  {
    id: 7,
    text: "Taking a new step, uttering a new word, is what people fear most.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "medium"
  },
  {
    id: 8,
    text: "Power is given only to those who dare to lower themselves and pick it up.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "hard"
  },

  // ── The Brothers Karamazov ────────────────────────────
  {
    id: 9,
    text: "The mystery of human existence lies not in just staying alive, but in finding something to live for.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "easy"
  },
  {
    id: 10,
    text: "Above all, don't lie to yourself. The man who lies to himself and listens to his own lie comes to a point that he cannot distinguish the truth within him.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "medium"
  },
  {
    id: 11,
    text: "What is hell? I maintain that it is the suffering of being unable to love.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "easy"
  },
  {
    id: 12,
    text: "The soul is healed by being with children.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "easy"
  },
  {
    id: 13,
    text: "A real gentleman, even if he loses everything he owns, must show no emotion. Money must be so far beneath a gentleman that it is hardly worth troubling about.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "medium"
  },
  {
    id: 14,
    text: "I think the devil doesn't exist, but man has created him, he has created him in his own image and likeness.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "hard"
  },
  {
    id: 15,
    text: "But how could you live and have no story to tell?",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "easy"
  },
  {
    id: 16,
    text: "Love in action is a harsh and dreadful thing compared to love in dreams.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "medium"
  },
  {
    id: 17,
    text: "Beauty is mysterious as well as terrible. God and the devil are fighting there and the battlefield is the heart of man.",
    source: "The Brothers Karamazov",
    year: 1880,
    tier: "hard"
  },

  // ── Notes from Underground ────────────────────────────
  {
    id: 18,
    text: "I say let the world go to hell, but I should always have my tea.",
    source: "Notes from Underground",
    year: 1864,
    tier: "easy"
  },
  {
    id: 19,
    text: "The best way to keep a prisoner from escaping is to make sure he never knows he's in prison.",
    source: "Notes from Underground",
    year: 1864,
    tier: "medium"
  },
  {
    id: 20,
    text: "Every man has reminiscences which he would not tell to everyone, but only to his friends.",
    source: "Notes from Underground",
    year: 1864,
    tier: "easy"
  },
  {
    id: 21,
    text: "Man is sometimes extraordinarily, passionately, in love with suffering.",
    source: "Notes from Underground",
    year: 1864,
    tier: "medium"
  },
  {
    id: 22,
    text: "To think too much is a disease.",
    source: "Notes from Underground",
    year: 1864,
    tier: "easy"
  },
  {
    id: 23,
    text: "Talking nonsense is the sole privilege mankind possesses over the other organisms.",
    source: "Notes from Underground",
    year: 1864,
    tier: "medium"
  },

  // ── The Idiot ─────────────────────────────────────────
  {
    id: 24,
    text: "Beauty will save the world.",
    source: "The Idiot",
    year: 1869,
    tier: "easy"
  },
  {
    id: 25,
    text: "Compassion is the chief law of human existence.",
    source: "The Idiot",
    year: 1869,
    tier: "easy"
  },
  {
    id: 26,
    text: "It is better to be unhappy and know the worst, than to be happy in a fool's paradise.",
    source: "The Idiot",
    year: 1869,
    tier: "medium"
  },
  {
    id: 27,
    text: "Don't let us forget that the causes of human actions are usually immeasurably more complex and varied than our subsequent explanations of them.",
    source: "The Idiot",
    year: 1869,
    tier: "hard"
  },
  {
    id: 28,
    text: "There is something at the bottom of every new human thought, every thought of genius, that can never be communicated to others.",
    source: "The Idiot",
    year: 1869,
    tier: "hard"
  },

  // ── Demons (The Possessed) ────────────────────────────
  {
    id: 29,
    text: "The secret of existence is not in living, but in knowing what you live for.",
    source: "Demons",
    year: 1872,
    tier: "medium"
  },
  {
    id: 30,
    text: "If God does not exist, everything is permitted.",
    source: "Demons",
    year: 1872,
    tier: "easy"
  },
  {
    id: 31,
    text: "Much unhappiness has come into the world because of bewilderment and things left unsaid.",
    source: "Demons",
    year: 1872,
    tier: "easy"
  },

  // ── The Gambler ───────────────────────────────────────
  {
    id: 32,
    text: "Money is coined liberty, and so it is ten times dearer to the man who is deprived of freedom.",
    source: "The House of the Dead",
    year: 1862,
    tier: "medium"
  },

  // ── White Nights ──────────────────────────────────────
  {
    id: 33,
    text: "My God, a moment of bliss. Why, isn't that enough for a whole lifetime?",
    source: "White Nights",
    year: 1848,
    tier: "easy"
  },
  {
    id: 34,
    text: "But to remain human beings while turning into a piano key — that's what I can't take!",
    source: "Notes from Underground",
    year: 1864,
    tier: "hard"
  },

  // ── Letters & Notebooks ───────────────────────────────
  {
    id: 35,
    text: "There is no subject so old that something new cannot be said about it.",
    source: "A Diary of a Writer",
    year: 1877,
    tier: "easy"
  },
  {
    id: 36,
    text: "To love someone means to see them as God intended them.",
    source: "Personal Letters",
    year: 1880,
    tier: "easy"
  },
  {
    id: 37,
    text: "Man only likes to count his troubles; he doesn't calculate his happiness.",
    source: "Notes from Underground",
    year: 1864,
    tier: "easy"
  },
  {
    id: 38,
    text: "Happiness does not lie in happiness, but in the achievement of it.",
    source: "A Diary of a Writer",
    year: 1877,
    tier: "medium"
  },
  {
    id: 39,
    text: "Right or wrong, it's very pleasant to break something from time to time.",
    source: "Notes from Underground",
    year: 1864,
    tier: "easy"
  },
  {
    id: 40,
    text: "The cleverest of all, in my opinion, is the man who calls himself a fool at least once a month.",
    source: "Personal Letters",
    year: 1876,
    tier: "medium"
  },
  {
    id: 41,
    text: "We sometimes encounter people, even perfect strangers, who begin to interest us at first sight, before a word is spoken.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "easy"
  },
  {
    id: 42,
    text: "Realists do not fear the results of their study.",
    source: "Personal Letters",
    year: 1878,
    tier: "hard"
  },
  {
    id: 43,
    text: "Nothing in this world is harder than speaking the truth, nothing easier than flattery.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "medium"
  },
  {
    id: 44,
    text: "It takes something more than intelligence to act intelligently.",
    source: "Crime and Punishment",
    year: 1866,
    tier: "medium"
  },
  {
    id: 45,
    text: "Sarcasm: the last refuge of modest and chaste-souled people when the privacy of their soul is coarsely and intrusively invaded.",
    source: "Notes from Underground",
    year: 1864,
    tier: "hard"
  }
];

