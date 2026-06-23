import type { Course, Lesson, LessonStep } from "../types/content";

export const course: Course = {
  id: "random-walks",
  title: "Random Walks",
  description:
    "Learn stochastic intuition by stepping, simulating, predicting, and correcting your way through fair walks, spread, and drift.",
  lessonIds: ["L1", "L2", "L3", "L4", "L5"],
};

export const lessons: Lesson[] = [
  {
    id: "L1",
    courseId: course.id,
    order: 1,
    title: "Your First Random Walk",
    description: "Turn fair coin flips into movement on a number line.",
    stepIds: ["L1-S1", "L1-S2", "L1-S3", "L1-S4", "L1-S5", "L1-S6"],
    unlockAfter: null,
    estimatedMinutes: 4,
  },
  {
    id: "L2",
    courseId: course.id,
    order: 2,
    title: "Where Do You Land?",
    description: "Run many walks and watch the terminal distribution spread out.",
    stepIds: ["L2-S1", "L2-S2", "L2-S3", "L2-S4", "L2-S5"],
    unlockAfter: "L1",
    estimatedMinutes: 4,
  },
  {
    id: "L3",
    courseId: course.id,
    order: 3,
    title: "Drift and Bias",
    description: "Bias the coin and discover how expected position changes.",
    stepIds: ["L3-S1", "L3-S2", "L3-S3", "L3-S4", "L3-S5"],
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
    title: "The big idea",
    body: "Random walks do not drift when fair, but they do diffuse. The center stays near 0 while the cloud gets wider.",
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
    title: "The big idea",
    body: "Fair walks spread without drifting. Biased walks still spread, but their center moves at speed 2p - 1 per step.",
    interaction: {
      widget: "none",
      validation: { type: "completion" },
    },
    feedback: {
      correct: "You finished the MVP random-walk arc: motion, spread, and drift.",
      incorrect: "",
    },
  },
];

export function getLesson(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === lessonId);
}

export function getLessonSteps(lessonId: string): LessonStep[] {
  const lesson = getLesson(lessonId);
  if (!lesson) return [];
  return lesson.stepIds
    .map((stepId) => steps.find((step) => step.id === stepId))
    .filter((step): step is LessonStep => Boolean(step));
}
