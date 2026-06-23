import type { Course, Lesson, LessonStep } from "../types/content";

export const course: Course = {
  id: "random-walks",
  title: "Random Walks",
  description:
    "Learn stochastic intuition by stepping, simulating, predicting, and correcting your way through fair walks, spread, and drift.",
  lessonIds: ["L1", "L2", "L3", "L4", "L5"],
  subject: "Probability",
  level: "Beginner",
  accent: "violet",
};

export const markovCourse: Course = {
  id: "markov-chains",
  title: "Markov Chains",
  description:
    "Explore systems that hop between states, settle into patterns, and predict the next step using only the present.",
  lessonIds: ["M1"],
  subject: "Probability",
  level: "Beginner",
  accent: "cyan",
};

export const courses: Course[] = [course, markovCourse];

export const lessons: Lesson[] = [
  {
    id: "L1",
    courseId: course.id,
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
    courseId: course.id,
    order: 2,
    title: "Where Do You Land?",
    description: "Run many walks and watch the terminal distribution spread out.",
    stepIds: ["L2-S1", "L2-S2", "L2-S3", "L2-S4", "L2-S5", "L2-S6", "L2-S7"],
    unlockAfter: "L1",
    estimatedMinutes: 4,
  },
  {
    id: "L3",
    courseId: course.id,
    order: 3,
    title: "Drift and Bias",
    description: "Bias the coin and discover how expected position changes.",
    stepIds: ["L3-S1", "L3-S2", "L3-S3", "L3-S4", "L3-S5", "L3-S6", "L3-S7"],
    unlockAfter: "L2",
    estimatedMinutes: 4,
  },
  {
    id: "L4",
    courseId: course.id,
    order: 4,
    title: "Gambler's Ruin",
    description: "Stretch lesson: absorbing boundaries and ruin probability.",
    stepIds: [],
    unlockAfter: "L3",
    estimatedMinutes: 5,
  },
  {
    id: "L5",
    courseId: course.id,
    order: 5,
    title: "The Reflection Trick",
    description: "Stretch lesson: symmetry and hitting probabilities.",
    stepIds: [],
    unlockAfter: "L4",
    estimatedMinutes: 4,
  },
  {
    id: "M1",
    courseId: markovCourse.id,
    order: 1,
    title: "Weather as a Markov Chain",
    description: "Model sunny and rainy days with state transitions.",
    stepIds: ["M1-S1", "M1-S2", "M1-S3", "M1-S4", "M1-S5", "M1-S6", "M1-S7"],
    unlockAfter: null,
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
