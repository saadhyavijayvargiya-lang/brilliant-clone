import type { Course, Lesson, LessonStep } from "../types/content";

export const beginnerCourse: Course = {
  id: "beginner-probability",
  title: "Beginner Probability",
  description:
    "Build intuition for chance, complements, and expected value through quick visual exercises.",
  lessonIds: ["B1", "B2"],
  subject: "Probability",
  level: "Beginner",
  accent: "cyan",
};

export const intermediateCourse: Course = {
  id: "intermediate-probability",
  title: "Intermediate Probability",
  description:
    "Move from random walks to Markov chains: distributions, drift, and state-based systems.",
  lessonIds: ["L1", "L2", "L3", "M1"],
  subject: "Probability",
  level: "Intermediate",
  accent: "violet",
};

export const advancedCourse: Course = {
  id: "advanced-probability",
  title: "Advanced Probability",
  description:
    "Preview gambler's ruin, hitting boundaries, and long-run behavior with more challenging simulations.",
  lessonIds: ["A1", "A2"],
  subject: "Probability",
  level: "Advanced",
  accent: "gold",
};

export const courses: Course[] = [
  beginnerCourse,
  intermediateCourse,
  advancedCourse,
];

export const lessons: Lesson[] = [
  {
    id: "L1",
    courseId: intermediateCourse.id,
    order: 1,
    title: "Your First Random Walk",
    description: "Turn fair coin flips into movement on a number line.",
    stepIds: [
      "L1-S1",
      "L1-S2",
      "L1-S3",
      "L1-S4",
      "L1-S5",
      "L1-S6",
      "L1-S7",
      "L1-S8",
    ],
    unlockAfter: null,
    estimatedMinutes: 4,
  },
  {
    id: "L2",
    courseId: intermediateCourse.id,
    order: 2,
    title: "Where Do You Land?",
    description: "Run many walks and watch the terminal distribution spread out.",
    stepIds: ["L2-S1", "L2-S2", "L2-S3", "L2-S4", "L2-S5", "L2-S6", "L2-S7"],
    unlockAfter: "L1",
    estimatedMinutes: 4,
  },
  {
    id: "L3",
    courseId: intermediateCourse.id,
    order: 3,
    title: "Drift and Bias",
    description: "Bias the coin and discover how expected position changes.",
    stepIds: ["L3-S1", "L3-S2", "L3-S3", "L3-S4", "L3-S5", "L3-S6", "L3-S7"],
    unlockAfter: "L2",
    estimatedMinutes: 4,
  },
  {
    id: "L4",
    courseId: advancedCourse.id,
    order: 4,
    title: "Gambler's Ruin",
    description: "Stretch lesson: absorbing boundaries and ruin probability.",
    stepIds: [],
    unlockAfter: "L3",
    estimatedMinutes: 5,
  },
  {
    id: "L5",
    courseId: advancedCourse.id,
    order: 5,
    title: "The Reflection Trick",
    description: "Stretch lesson: symmetry and hitting probabilities.",
    stepIds: [],
    unlockAfter: "L4",
    estimatedMinutes: 4,
  },
  {
    id: "M1",
    courseId: intermediateCourse.id,
    order: 4,
    title: "Weather as a Markov Chain",
    description: "Model sunny and rainy days with state transitions.",
    stepIds: ["M1-S1", "M1-S2", "M1-S3", "M1-S4", "M1-S5", "M1-S6", "M1-S7"],
    unlockAfter: "L3",
    estimatedMinutes: 6,
  },
  {
    id: "B1",
    courseId: beginnerCourse.id,
    order: 1,
    title: "Chance as a Number",
    description: "Learn probability as a scale from impossible to certain.",
    stepIds: ["B1-S1", "B1-S2", "B1-S3", "B1-S4", "B1-S5"],
    unlockAfter: null,
    estimatedMinutes: 5,
  },
  {
    id: "B2",
    courseId: beginnerCourse.id,
    order: 2,
    title: "Complements and Either-Or",
    description: "Use opposites and simple combinations to reason faster.",
    stepIds: ["B2-S1", "B2-S2", "B2-S3", "B2-S4", "B2-S5"],
    unlockAfter: "B1",
    estimatedMinutes: 5,
  },
  {
    id: "A1",
    courseId: advancedCourse.id,
    order: 1,
    title: "Boundary Hitting",
    description: "Explore when a walk reaches a target before falling back.",
    stepIds: ["A1-S1", "A1-S2", "A1-S3", "A1-S4", "A1-S5"],
    unlockAfter: null,
    estimatedMinutes: 6,
  },
  {
    id: "A2",
    courseId: advancedCourse.id,
    order: 2,
    title: "Long-Run State Behavior",
    description: "See how random systems settle into long-run proportions.",
    stepIds: ["A2-S1", "A2-S2", "A2-S3", "A2-S4", "A2-S5"],
    unlockAfter: "A1",
    estimatedMinutes: 6,
  },
];

export const steps: LessonStep[] = [
  {
    id: "L1-S1",
    lessonId: "L1",
    order: 1,
    type: "simulation",
    title: "Take ten random steps",
    body: "Heads moves right (+1). Tails moves left (-1). Build a ten-step path and watch the walker move.",
    interaction: {
      widget: "random-walk-sim",
      params: { stepsRequired: 10, p: 0.5 },
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Nice — you completed a 10-step random walk. Every path is noisy, but the rule is simple.",
      incorrect: "Keep stepping until the path has 10 coin-flip moves.",
      hint: "Use the Heads and Tails buttons until the counter reaches 10.",
    },
  },
  {
    id: "L1-S2",
    lessonId: "L1",
    order: 2,
    type: "input",
    title: "What is the average fair-walk position?",
    body: "Imagine repeating a fair 5-step walk thousands of times. What final position do you expect on average?",
    interaction: {
      widget: "number-input",
      params: { label: "Expected final position" },
      validation: { type: "exact", expected: 0, tolerance: 0 },
    },
    feedback: {
      correct: "Right. Symmetry cancels +1 and -1 steps on average, so the expected position is 0.",
      incorrect: "Not quite. In a fair walk, right and left steps are equally likely.",
      hint: "If Heads and Tails are equally likely, neither side should win on average.",
    },
  },
  {
    id: "L1-S3",
    lessonId: "L1",
    order: 3,
    type: "choice",
    title: "Most likely after 100 fair steps",
    body: "After 100 fair steps, the walker is most likely to be near which location?",
    interaction: {
      widget: "choice-input",
      params: { options: ["-100", "-50", "0", "50", "100"] },
      validation: { type: "choice", expected: "0" },
    },
    feedback: {
      correct: "Exactly. The walk spreads out, but it remains centered around 0.",
      incorrect: "The walker can wander far, but the center of all fair outcomes is still 0.",
      hint: "Ask where the histogram would be centered after many repeated fair walks.",
    },
  },
  {
    id: "L1-S4",
    lessonId: "L1",
    order: 4,
    type: "input",
    title: "Read a path",
    body: "A path has steps +1, +1, -1, +1, -1, -1, +1, +1. What is its final position?",
    interaction: {
      widget: "number-input",
      params: { label: "Final position" },
      validation: { type: "exact", expected: 2, tolerance: 0 },
    },
    feedback: {
      correct: "Correct. Five right steps and three left steps leave net displacement +2.",
      incorrect: "Count right steps as +1 and left steps as -1, then add them.",
      hint: "There are five +1 steps and three -1 steps.",
    },
  },
  {
    id: "L1-S5",
    lessonId: "L1",
    order: 5,
    type: "choice",
    title: "Fair or drifting?",
    body: "A fair walk wiggles around 0. A biased walk tends to lean one way. Which description sounds fair?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "It trends steadily upward",
          "It trends steadily downward",
          "It wiggles around the origin",
        ],
      },
      validation: { type: "choice", expected: "It wiggles around the origin" },
    },
    feedback: {
      correct: "Yes. Individual fair paths are messy, but they do not have a built-in direction.",
      incorrect: "A steady trend usually means bias. Fair walks are centered but noisy.",
      hint: "Fair means right and left are equally likely.",
    },
  },
  {
    id: "L1-S6",
    lessonId: "L1",
    order: 6,
    type: "explain",
    title: "The big idea",
    body: "A random walk is simple local randomness with visible global patterns. Next, you will run many walks at once and see the shape of where they land.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Lesson complete. You are ready to see the distribution.",
      incorrect: "",
    },
  },
  {
    id: "L2-S1",
    lessonId: "L2",
    order: 1,
    type: "simulation",
    title: "Run many walks",
    body: "A single walk is noisy. A thousand walks reveal structure. Drag n and run trials to see where paths land.",
    interaction: {
      widget: "histogram-sim",
      params: { defaultSteps: 40, trials: 1000 },
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Good. The histogram shows many terminal positions at once.",
      incorrect: "Run the trials at least once to reveal the distribution.",
      hint: "Press Run trials after choosing a step count.",
    },
  },
  {
    id: "L2-S2",
    lessonId: "L2",
    order: 2,
    type: "choice",
    title: "Which spread is wider?",
    body: "Which fair walk should have a wider distribution of final positions?",
    interaction: {
      widget: "choice-input",
      params: { options: ["20 steps", "200 steps", "They are the same"] },
      validation: { type: "choice", expected: "200 steps" },
    },
    feedback: {
      correct: "Correct. More steps create more opportunities to wander away from 0.",
      incorrect: "The center stays at 0, but the spread grows as the number of steps grows.",
      hint: "Think about how many chances the walker gets to move away from the origin.",
    },
  },
  {
    id: "L2-S3",
    lessonId: "L2",
    order: 3,
    type: "input",
    title: "Typical spread",
    body: "A fair 100-step walk usually lands within about one standard deviation of 0. What is sqrt(100)?",
    interaction: {
      widget: "number-input",
      params: { label: "Typical spread" },
      validation: { type: "exact", expected: 10, tolerance: 0 },
    },
    feedback: {
      correct: "Yes. For a fair walk, typical spread grows like sqrt(n), so sqrt(100) = 10.",
      incorrect: "The key number is the square root of the number of steps.",
      hint: "10 × 10 = 100.",
    },
  },
  {
    id: "L2-S4",
    lessonId: "L2",
    order: 4,
    type: "choice",
    title: "Center versus spread",
    body: "When n gets larger in a fair walk, what changes most clearly?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "The center moves upward",
          "The center stays near 0 but the spread widens",
          "All paths end at 0",
        ],
      },
      validation: {
        type: "choice",
        expected: "The center stays near 0 but the spread widens",
      },
    },
    feedback: {
      correct: "Exactly. Fair walks stay centered while uncertainty grows.",
      incorrect: "Fairness keeps the center near 0. More steps mainly increase spread.",
      hint: "Separate average position from how far individual paths wander.",
    },
  },
  {
    id: "L2-S5",
    lessonId: "L2",
    order: 5,
    type: "explain",
    title: "The big idea so far",
    body: "Random walks do not drift when fair, but they do diffuse. The center stays near 0 while the cloud gets wider.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Good. Next, connect the visual spread to probability language.",
      incorrect: "",
    },
  },
  {
    id: "L2-S6",
    lessonId: "L2",
    order: 6,
    type: "choice",
    title: "What does the histogram estimate?",
    body: "Each bar in the histogram counts how often repeated walks landed in that region. What does a taller bar mean?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "That landing region appeared more often",
          "The walker moved faster there",
          "The coin became biased",
        ],
      },
      validation: {
        type: "choice",
        expected: "That landing region appeared more often",
      },
    },
    feedback: {
      correct: "Right. The histogram is a visual estimate of probability from repeated trials.",
      incorrect: "A histogram counts outcomes. Taller means more repeated walks landed there.",
      hint: "Think of each trial as one vote for its final position.",
    },
  },
  {
    id: "L2-S7",
    lessonId: "L2",
    order: 7,
    type: "explain",
    title: "Distribution intuition",
    body: "A distribution is not one answer. It is a map of many possible answers and how often they happen. Random walks teach this because individual paths are noisy but the histogram is stable.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Lesson complete. Now bias the coin and watch the center move.",
      incorrect: "",
    },
  },
  {
    id: "L3-S1",
    lessonId: "L3",
    order: 1,
    type: "simulation",
    title: "Bias the coin",
    body: "Raise the chance of a +1 step. The noise remains, but the average path starts to drift.",
    interaction: {
      widget: "bias-slider-sim",
      params: { defaultP: 0.6, steps: 100, paths: 30 },
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Good. Even a small bias creates visible drift over many steps.",
      incorrect: "Move the bias slider and run the paths.",
      hint: "Try p = 0.65 and compare it to p = 0.5.",
    },
  },
  {
    id: "L3-S2",
    lessonId: "L3",
    order: 2,
    type: "choice",
    title: "Direction of drift",
    body: "If p(+1) = 0.6, which way does the average path drift?",
    interaction: {
      widget: "choice-input",
      params: { options: ["Left", "Right", "No direction"] },
      validation: { type: "choice", expected: "Right" },
    },
    feedback: {
      correct: "Right. Positive steps are more likely, so the average position increases.",
      incorrect: "p(+1) is greater than 0.5, so positive steps win on average.",
      hint: "The +1 direction is favored.",
    },
  },
  {
    id: "L3-S3",
    lessonId: "L3",
    order: 3,
    type: "input",
    title: "Expected position",
    body: "For p = 0.55 and n = 50, the expected position is n(2p - 1). What is it?",
    interaction: {
      widget: "number-input",
      params: { label: "Expected position" },
      validation: { type: "exact", expected: 5, tolerance: 0 },
    },
    feedback: {
      correct: "Correct. 50 × (1.1 - 1) = 5.",
      incorrect: "Use n(2p - 1): 50 × (2 × 0.55 - 1).",
      hint: "2 × 0.55 = 1.10, and 1.10 - 1 = 0.10.",
    },
  },
  {
    id: "L3-S4",
    lessonId: "L3",
    order: 4,
    type: "input",
    title: "Break-even bias",
    body: "What value of p makes the expected position zero?",
    interaction: {
      widget: "number-input",
      params: { label: "p" },
      validation: { type: "exact", expected: 0.5, tolerance: 0.001 },
    },
    feedback: {
      correct: "Yes. At p = 0.5, +1 and -1 steps balance on average.",
      incorrect: "Break-even means +1 and -1 are equally likely.",
      hint: "A fair coin has p = 0.5.",
    },
  },
  {
    id: "L3-S5",
    lessonId: "L3",
    order: 5,
    type: "explain",
    title: "Drift versus spread",
    body: "Fair walks spread without drifting. Biased walks still spread, but their center moves at speed 2p - 1 per step.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Exactly. Bias moves the center; randomness still creates spread around it.",
      incorrect: "",
    },
  },
  {
    id: "L3-S6",
    lessonId: "L3",
    order: 6,
    type: "choice",
    title: "Two walkers race",
    body: "Walker A has p(+1)=0.52. Walker B has p(+1)=0.58. After many 200-step races, who tends to be farther right?",
    interaction: {
      widget: "choice-input",
      params: { options: ["Walker A", "Walker B", "They are tied"] },
      validation: { type: "choice", expected: "Walker B" },
    },
    feedback: {
      correct: "Correct. Both are noisy, but Walker B has the larger positive drift.",
      incorrect: "Compare the two biases. The larger p(+1) creates the larger average drift.",
      hint: "0.58 is farther above 0.5 than 0.52.",
    },
  },
  {
    id: "L3-S7",
    lessonId: "L3",
    order: 7,
    type: "explain",
    title: "Course checkpoint",
    body: "You have built the core random-walk intuition: a path is random, many paths form a distribution, and bias shifts the center of that distribution.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Random Walks checkpoint complete. Try Markov Chains next to learn how random systems move between named states.",
      incorrect: "",
    },
  },
  {
    id: "L1-S7",
    lessonId: "L1",
    order: 7,
    type: "choice",
    title: "Can a fair walk still wander far?",
    body: "If the coin is fair, is it possible for a path to end far from 0 after many steps?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "Yes, but it is less common than landing near 0",
          "No, fairness forces every path to stay near 0",
          "Only if the coin changes halfway through",
        ],
      },
      validation: {
        type: "choice",
        expected: "Yes, but it is less common than landing near 0",
      },
    },
    feedback: {
      correct: "Exactly. Fairness controls the average, not every individual path.",
      incorrect: "Fair walks can wander. They just do not prefer left or right on average.",
      hint: "A long streak of Heads is possible even with a fair coin.",
    },
  },
  {
    id: "L1-S8",
    lessonId: "L1",
    order: 8,
    type: "explain",
    title: "Lesson checkpoint",
    body: "A fair random walk is centered but not still. The walker can wander, return, overshoot, and surprise you — that is why the next lesson studies many walks at once.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Lesson complete. Continue to distributions to see the pattern hiding inside the noise.",
      incorrect: "",
    },
  },
  {
    id: "M1-S1",
    lessonId: "M1",
    order: 1,
    type: "simulation",
    title: "A tiny weather machine",
    body: "A Markov chain hops between states. Here the states are Sunny and Rainy. Change the transition chances and run a week of weather.",
    interaction: {
      widget: "markov-chain-sim",
      params: { days: 10, sunnyToSunny: 0.75, rainyToRainy: 0.6 },
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Nice. You just simulated a Markov chain: tomorrow depended only on today's weather.",
      incorrect: "Run the weather chain to generate a sequence.",
      hint: "Press Run chain and watch the state hops.",
    },
  },
  {
    id: "M1-S2",
    lessonId: "M1",
    order: 2,
    type: "choice",
    title: "What does memoryless mean?",
    body: "In this weather chain, tomorrow depends on today's state. What does it ignore?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "All earlier days before today",
          "Today's weather",
          "The transition chances",
        ],
      },
      validation: { type: "choice", expected: "All earlier days before today" },
    },
    feedback: {
      correct: "Right. Markov chains use the present state, not the full history.",
      incorrect: "The chain uses today's state and transition chances. It ignores older history.",
      hint: "The Markov rule says: the present is enough.",
    },
  },
  {
    id: "M1-S3",
    lessonId: "M1",
    order: 3,
    type: "input",
    title: "One-step probability",
    body: "If today is Sunny and P(Sunny tomorrow | Sunny today)=0.75, what is P(Rainy tomorrow | Sunny today)?",
    interaction: {
      widget: "number-input",
      params: { label: "Probability of Rainy" },
      validation: { type: "exact", expected: 0.25, tolerance: 0.001 },
    },
    feedback: {
      correct: "Correct. The row must add to 1, so 1 - 0.75 = 0.25.",
      incorrect: "The probabilities from one state must add to 1.",
      hint: "Subtract the sunny-to-sunny probability from 1.",
    },
  },
  {
    id: "M1-S4",
    lessonId: "M1",
    order: 4,
    type: "choice",
    title: "Sticky states",
    body: "If P(Rainy tomorrow | Rainy today) increases, what happens to rainy streaks?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "Rainy streaks become more common",
          "Rainy streaks disappear",
          "Sunny days become guaranteed",
        ],
      },
      validation: { type: "choice", expected: "Rainy streaks become more common" },
    },
    feedback: {
      correct: "Exactly. A state is sticky when it tends to stay itself.",
      incorrect: "Higher Rainy→Rainy means rain is more likely to persist.",
      hint: "Think of the chain staying in the Rainy state.",
    },
  },
  {
    id: "M1-S5",
    lessonId: "M1",
    order: 5,
    type: "input",
    title: "Expected rainy days",
    body: "If a long-run weather chain is rainy about 40% of the time, how many rainy days do you expect in a 10-day stretch?",
    interaction: {
      widget: "number-input",
      params: { label: "Expected rainy days" },
      validation: { type: "exact", expected: 4, tolerance: 0 },
    },
    feedback: {
      correct: "Yes. 40% of 10 days is 4 rainy days on average.",
      incorrect: "Convert 40% to 0.4, then multiply by 10.",
      hint: "0.4 × 10 = ?",
    },
  },
  {
    id: "M1-S6",
    lessonId: "M1",
    order: 6,
    type: "choice",
    title: "Why Markov chains matter",
    body: "Which system is naturally modeled as states with transition probabilities?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "A website visitor moving page to page",
          "A single fixed number",
          "A shape with no changes",
        ],
      },
      validation: {
        type: "choice",
        expected: "A website visitor moving page to page",
      },
    },
    feedback: {
      correct: "Right. Markov chains are useful when systems move among states.",
      incorrect: "Look for a process that hops from one state to another.",
      hint: "Pages, weather, board games, and queues can all have states.",
    },
  },
  {
    id: "M1-S7",
    lessonId: "M1",
    order: 7,
    type: "explain",
    title: "Lesson checkpoint",
    body: "A Markov chain is a random state machine. Once you know the current state and the transition probabilities, you can simulate what comes next.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Markov Chains lesson complete. You now have a second probability course path finished end to end.",
      incorrect: "",
    },
  },
  {
    id: "B1-S1",
    lessonId: "B1",
    order: 1,
    type: "choice",
    title: "Impossible, maybe, certain",
    body: "Which probability means an event is certain to happen?",
    interaction: {
      widget: "choice-input",
      params: { options: ["0", "0.5", "1"] },
      validation: { type: "choice", expected: "1" },
    },
    feedback: {
      correct: "Exactly. Probability 1 means the event always happens.",
      incorrect: "The probability scale runs from 0 to 1.",
      hint: "Certain is the top of the probability scale.",
    },
  },
  {
    id: "B1-S2",
    lessonId: "B1",
    order: 2,
    type: "input",
    title: "A fair coin",
    body: "A fair coin has two equally likely sides. What is P(Heads)?",
    interaction: {
      widget: "number-input",
      params: { label: "P(Heads)" },
      validation: { type: "exact", expected: 0.5, tolerance: 0.001 },
    },
    feedback: {
      correct: "Right. One favorable side out of two equally likely sides is 1/2 = 0.5.",
      incorrect: "Heads is one of two equally likely outcomes.",
      hint: "Write one half as a decimal.",
    },
  },
  {
    id: "B1-S3",
    lessonId: "B1",
    order: 3,
    type: "choice",
    title: "Probability as a fraction",
    body: "A bag has 3 blue marbles and 1 red marble. What is P(blue)?",
    interaction: {
      widget: "choice-input",
      params: { options: ["1/4", "3/4", "4/3"] },
      validation: { type: "choice", expected: "3/4" },
    },
    feedback: {
      correct: "Correct. There are 3 blue marbles out of 4 total.",
      incorrect: "Count favorable outcomes over total outcomes.",
      hint: "Blue marbles are favorable; all marbles are possible.",
    },
  },
  {
    id: "B1-S4",
    lessonId: "B1",
    order: 4,
    type: "input",
    title: "Percent to decimal",
    body: "What decimal probability is the same as 25%?",
    interaction: {
      widget: "number-input",
      params: { label: "Decimal probability" },
      validation: { type: "exact", expected: 0.25, tolerance: 0.001 },
    },
    feedback: {
      correct: "Yes. 25% means 25 out of 100, or 0.25.",
      incorrect: "Divide the percent by 100.",
      hint: "25 ÷ 100 = ?",
    },
  },
  {
    id: "B1-S5",
    lessonId: "B1",
    order: 5,
    type: "explain",
    title: "Probability is a scale",
    body: "Probability measures how often an event should happen in the long run. 0 is impossible, 1 is certain, and values in between describe uncertainty.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Lesson complete. Next, use complements to reason about what does not happen.",
      incorrect: "",
    },
  },
  {
    id: "B2-S1",
    lessonId: "B2",
    order: 1,
    type: "choice",
    title: "Complement rule",
    body: "If P(rain) = 0.3, what is P(no rain)?",
    interaction: {
      widget: "choice-input",
      params: { options: ["0.3", "0.7", "1.3"] },
      validation: { type: "choice", expected: "0.7" },
    },
    feedback: {
      correct: "Right. Complements add to 1, so 1 - 0.3 = 0.7.",
      incorrect: "An event and its complement must add to 1.",
      hint: "Subtract the rain probability from 1.",
    },
  },
  {
    id: "B2-S2",
    lessonId: "B2",
    order: 2,
    type: "input",
    title: "Not rolling a six",
    body: "On a fair six-sided die, what is the probability of not rolling a 6?",
    interaction: {
      widget: "number-input",
      params: { label: "P(not 6)" },
      validation: { type: "exact", expected: 0.833, tolerance: 0.01 },
    },
    feedback: {
      correct: "Correct. Five of the six faces are not 6, so 5/6 is about 0.833.",
      incorrect: "Only one face is a 6. The other five faces are not.",
      hint: "Use 5/6 as a decimal.",
    },
  },
  {
    id: "B2-S3",
    lessonId: "B2",
    order: 3,
    type: "choice",
    title: "Either event",
    body: "A spinner has 4 equal colors: red, blue, green, yellow. What is P(red or blue)?",
    interaction: {
      widget: "choice-input",
      params: { options: ["1/4", "1/2", "3/4"] },
      validation: { type: "choice", expected: "1/2" },
    },
    feedback: {
      correct: "Exactly. Red or blue covers 2 of the 4 equal sections.",
      incorrect: "Count how many sections match red or blue.",
      hint: "2 favorable sections out of 4 total sections.",
    },
  },
  {
    id: "B2-S4",
    lessonId: "B2",
    order: 4,
    type: "input",
    title: "At least one heads",
    body: "Flip two fair coins. Use the complement: what is P(at least one Heads)?",
    interaction: {
      widget: "number-input",
      params: { label: "Probability" },
      validation: { type: "exact", expected: 0.75, tolerance: 0.001 },
    },
    feedback: {
      correct: "Yes. The only complement is TT, so 1 - 1/4 = 3/4.",
      incorrect: "The complement of at least one Heads is no Heads at all.",
      hint: "No Heads means both flips are Tails.",
    },
  },
  {
    id: "B2-S5",
    lessonId: "B2",
    order: 5,
    type: "explain",
    title: "Think from the other side",
    body: "Complements are often easier than direct counting. If an event is complicated, ask what would make it fail.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Beginner Probability complete. Try Intermediate Probability when you are ready for simulations.",
      incorrect: "",
    },
  },
  {
    id: "A1-S1",
    lessonId: "A1",
    order: 1,
    type: "simulation",
    title: "Race to a boundary",
    body: "Run a biased walk and watch how often it climbs upward before wandering back. Boundary problems ask which target gets hit first.",
    interaction: {
      widget: "bias-slider-sim",
      params: { defaultP: 0.55, steps: 80, paths: 24 },
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Good. A tiny drift can make upper-boundary hits noticeably more common.",
      incorrect: "Run the paths to compare drift and spread.",
      hint: "Try p = 0.55 and look at the mean line.",
    },
  },
  {
    id: "A1-S2",
    lessonId: "A1",
    order: 2,
    type: "choice",
    title: "Upper boundary advantage",
    body: "If a walker has p(+1)=0.55, which boundary is more likely to be reached first: +10 or -10?",
    interaction: {
      widget: "choice-input",
      params: { options: ["+10", "-10", "They are exactly tied"] },
      validation: { type: "choice", expected: "+10" },
    },
    feedback: {
      correct: "Correct. The upward drift favors the +10 boundary.",
      incorrect: "The +1 step is slightly more likely than the -1 step.",
      hint: "Bias points toward the upper boundary.",
    },
  },
  {
    id: "A1-S3",
    lessonId: "A1",
    order: 3,
    type: "input",
    title: "Fair start symmetry",
    body: "In a fair walk starting halfway between 0 and 10, what is the probability of hitting 10 before 0?",
    interaction: {
      widget: "number-input",
      params: { label: "Probability" },
      validation: { type: "exact", expected: 0.5, tolerance: 0.001 },
    },
    feedback: {
      correct: "Right. Halfway between equal boundaries gives a symmetric 50/50 chance.",
      incorrect: "The start is exactly centered between the two boundaries.",
      hint: "Symmetry splits the chance evenly.",
    },
  },
  {
    id: "A1-S4",
    lessonId: "A1",
    order: 4,
    type: "choice",
    title: "Closer boundary",
    body: "In a fair walk between 0 and 10, starting at 2 makes which boundary more likely?",
    interaction: {
      widget: "choice-input",
      params: { options: ["0", "10", "They are tied"] },
      validation: { type: "choice", expected: "0" },
    },
    feedback: {
      correct: "Exactly. Starting closer to 0 makes 0 easier to hit first.",
      incorrect: "With no drift, distance to the boundary matters.",
      hint: "You are only 2 steps from 0 but 8 from 10.",
    },
  },
  {
    id: "A1-S5",
    lessonId: "A1",
    order: 5,
    type: "explain",
    title: "Boundary intuition",
    body: "Boundary problems combine drift, spread, and starting position. Small changes can strongly affect which target gets hit first.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Boundary Hitting complete. Next, study long-run behavior.",
      incorrect: "",
    },
  },
  {
    id: "A2-S1",
    lessonId: "A2",
    order: 1,
    type: "simulation",
    title: "Return to the weather chain",
    body: "Run a sticky two-state chain. Even random systems can settle into stable long-run proportions.",
    interaction: {
      widget: "markov-chain-sim",
      params: { days: 14, sunnyToSunny: 0.8, rainyToRainy: 0.7 },
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Nice. A longer chain gives more evidence about its long-run mix.",
      incorrect: "Run the chain to produce a sequence of states.",
      hint: "Use the Run chain button.",
    },
  },
  {
    id: "A2-S2",
    lessonId: "A2",
    order: 2,
    type: "choice",
    title: "Sticky sunshine",
    body: "If Sunny→Sunny is very high, what do you expect in the sequence?",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "Longer sunny streaks",
          "No sunny days",
          "Alternating sun and rain every day",
        ],
      },
      validation: { type: "choice", expected: "Longer sunny streaks" },
    },
    feedback: {
      correct: "Correct. High self-transition probabilities create streaks.",
      incorrect: "A sticky state tends to repeat itself.",
      hint: "Sunny→Sunny means staying sunny.",
    },
  },
  {
    id: "A2-S3",
    lessonId: "A2",
    order: 3,
    type: "input",
    title: "A long-run estimate",
    body: "If a chain spends 65% of days sunny in the long run, how many sunny days do you expect in 20 days?",
    interaction: {
      widget: "number-input",
      params: { label: "Sunny days" },
      validation: { type: "exact", expected: 13, tolerance: 0 },
    },
    feedback: {
      correct: "Yes. 0.65 × 20 = 13 sunny days.",
      incorrect: "Multiply the long-run proportion by the number of days.",
      hint: "65% of 20 is 13.",
    },
  },
  {
    id: "A2-S4",
    lessonId: "A2",
    order: 4,
    type: "choice",
    title: "Stable does not mean fixed",
    body: "A long-run proportion of 65% sunny means...",
    interaction: {
      widget: "choice-input",
      params: {
        options: [
          "Every 20-day run has exactly 13 sunny days",
          "Over many days, the average share tends toward 65%",
          "The chain stops being random",
        ],
      },
      validation: {
        type: "choice",
        expected: "Over many days, the average share tends toward 65%",
      },
    },
    feedback: {
      correct: "Exactly. Long-run behavior is a tendency, not a guarantee for every short run.",
      incorrect: "The chain remains random even when its averages stabilize.",
      hint: "Think average over many repetitions, not exact every time.",
    },
  },
  {
    id: "A2-S5",
    lessonId: "A2",
    order: 5,
    type: "explain",
    title: "Advanced checkpoint",
    body: "You now have the core pieces behind many stochastic models: states, transitions, boundaries, drift, and long-run averages.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "Advanced Probability complete. You have finished all current probability paths.",
      incorrect: "",
    },
  },
];

export function getLesson(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === lessonId);
}

export function getCourse(courseId: string): Course | undefined {
  return courses.find((item) => item.id === courseId);
}

export function getLessonsForCourse(courseId: string): Lesson[] {
  const selectedCourse = getCourse(courseId);
  if (!selectedCourse) return [];
  return selectedCourse.lessonIds
    .map((lessonId) => lessons.find((lesson) => lesson.id === lessonId))
    .filter((lesson): lesson is Lesson => Boolean(lesson));
}

export function getLessonSteps(lessonId: string): LessonStep[] {
  const lesson = getLesson(lessonId);
  if (!lesson) return [];
  return lesson.stepIds
    .map((stepId) => steps.find((step) => step.id === stepId))
    .filter((step): step is LessonStep => Boolean(step));
}
