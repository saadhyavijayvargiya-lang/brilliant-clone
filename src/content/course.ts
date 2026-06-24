import type { Course, Lesson, LessonStep } from "../types/content";

export const beginnerCourse: Course = {
  id: "beginner-probability",
  title: "Beginner Probability",
  description:
    "Build intuition for chance, complements, and expected value through quick visual exercises.",
  lessonIds: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"],
  subject: "Probability",
  level: "Beginner",
  accent: "cyan",
};

export const intermediateCourse: Course = {
  id: "intermediate-probability",
  title: "Intermediate Probability",
  description:
    "Move from random walks to Markov chains: distributions, drift, and state-based systems.",
  lessonIds: ["L1", "L2", "L3", "M1", "L6", "L7", "M2", "M3", "L8", "L9", "M4"],
  subject: "Probability",
  level: "Intermediate",
  accent: "violet",
};

export const advancedCourse: Course = {
  id: "advanced-probability",
  title: "Advanced Probability",
  description:
    "Preview gambler's ruin, hitting boundaries, and long-run behavior with more challenging simulations.",
  lessonIds: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
  subject: "Probability",
  level: "Advanced",
  accent: "gold",
};

export const courses: Course[] = [
  beginnerCourse,
  intermediateCourse,
  advancedCourse,
];

const extraLessonSpecs = [
  {
    id: "B3",
    courseId: beginnerCourse.id,
    order: 3,
    title: "Expected Value Playground",
    description: "Average simple random rewards and see expected value appear.",
    unlockAfter: "B2",
    widget: "running-average-sim",
    prompt: "Run coin-reward trials and watch the average payout settle down.",
    expectedQuestion: "A fair coin pays 2 points for Heads and 0 for Tails. What is the expected payout?",
    expectedAnswer: 1,
  },
  {
    id: "B4",
    courseId: beginnerCourse.id,
    order: 4,
    title: "Dice and Counting",
    description: "Count equally likely outcomes with dice and small samples.",
    unlockAfter: "B3",
    widget: "running-average-sim",
    prompt: "Roll a die repeatedly and watch the sample average approach 3.5.",
    expectedQuestion: "What is the average value of a fair six-sided die?",
    expectedAnswer: 3.5,
  },
  {
    id: "B5",
    courseId: beginnerCourse.id,
    order: 5,
    title: "Simulation Habits",
    description: "Use repeated trials to check intuition before calculating.",
    unlockAfter: "B4",
    widget: "histogram-sim",
    prompt: "Run repeated fair-walk trials and compare the picture to your guess.",
    expectedQuestion: "If a simulation average keeps moving, what usually helps it stabilize?",
    expectedAnswer: "Run more trials",
  },
  {
    id: "L6",
    courseId: intermediateCourse.id,
    order: 5,
    title: "Expected Position by Simulation",
    description: "Add many random walks to a running average and see expected value.",
    unlockAfter: "M1",
    widget: "running-average-sim",
    prompt: "Add batches of random walks and watch the running average final position.",
    expectedQuestion: "For a fair walk, what value should the running average drift toward?",
    expectedAnswer: 0,
  },
  {
    id: "L7",
    courseId: intermediateCourse.id,
    order: 6,
    title: "Typical Distance",
    description: "Connect simulation spread to the square-root rule.",
    unlockAfter: "L6",
    widget: "histogram-sim",
    prompt: "Change the number of steps and observe how typical distance grows.",
    expectedQuestion: "About how far is one typical spread for a 400-step fair walk?",
    expectedAnswer: 20,
  },
  {
    id: "M2",
    courseId: intermediateCourse.id,
    order: 7,
    title: "Two-State Game Chains",
    description: "Model win/lose states with transition probabilities.",
    unlockAfter: "L7",
    widget: "markov-chain-sim",
    prompt: "Treat Sunny as Winning and Rainy as Losing, then simulate streaks.",
    expectedQuestion: "A sticky winning state means wins tend to...",
    expectedAnswer: "Cluster together",
  },
  {
    id: "M3",
    courseId: intermediateCourse.id,
    order: 8,
    title: "Web Surfer Chains",
    description: "Think of a visitor hopping between pages as a Markov chain.",
    unlockAfter: "M2",
    widget: "markov-chain-sim",
    prompt: "Simulate state hops and interpret them as page-to-page movement.",
    expectedQuestion: "In a Markov chain, the next page depends most directly on...",
    expectedAnswer: "The current page",
  },
  {
    id: "A3",
    courseId: advancedCourse.id,
    order: 3,
    title: "Gambler's Ruin Lab",
    description: "Simulate bankroll paths until they hit win or ruin.",
    unlockAfter: "A2",
    widget: "gambler-ruin-sim",
    prompt: "Run many bankroll games and estimate the chance of ruin.",
    expectedQuestion: "With a fair game and equal boundaries, ruin probability is closest to...",
    expectedAnswer: 0.5,
  },
  {
    id: "A4",
    courseId: advancedCourse.id,
    order: 4,
    title: "Rare Event Estimation",
    description: "Use lots of trials to estimate events that do not happen often.",
    unlockAfter: "A3",
    widget: "histogram-sim",
    prompt: "Run a large batch and inspect the thin tails of the distribution.",
    expectedQuestion: "Rare-event estimates usually need...",
    expectedAnswer: "Many trials",
  },
  {
    id: "A5",
    courseId: advancedCourse.id,
    order: 5,
    title: "Equilibrium Lab",
    description: "See long-run proportions emerge from repeated state transitions.",
    unlockAfter: "A4",
    widget: "markov-chain-sim",
    prompt: "Run the chain repeatedly and look for stable proportions.",
    expectedQuestion: "A long-run equilibrium describes...",
    expectedAnswer: "Average behavior over many steps",
  },
  {
    id: "B6",
    courseId: beginnerCourse.id,
    order: 6,
    title: "Build a Target Path",
    description: "Create a sequence of steps and animate the journey.",
    unlockAfter: "B5",
    widget: "target-path-sim",
    prompt: "Choose +1 and -1 moves to animate from the start to a target.",
    expectedQuestion: "If you need to end higher than you started, you usually need more...",
    expectedAnswer: "+1 moves",
  },
  {
    id: "B7",
    courseId: beginnerCourse.id,
    order: 7,
    title: "Compare Two Strategies",
    description: "Use repeated trials to compare noisy strategies.",
    unlockAfter: "B6",
    widget: "running-average-sim",
    prompt: "Add batches of trials and compare the running average to a target.",
    expectedQuestion: "A better estimate usually comes from...",
    expectedAnswer: "More repeated trials",
  },
  {
    id: "B8",
    courseId: beginnerCourse.id,
    order: 8,
    title: "Beginner Probability Review",
    description: "Practice complements, averages, and simulation habits.",
    unlockAfter: "B7",
    widget: "histogram-sim",
    prompt: "Run a simple simulation, then answer review questions about uncertainty.",
    expectedQuestion: "Probability questions become easier when you first...",
    expectedAnswer: "Model the possible outcomes",
  },
  {
    id: "L8",
    courseId: intermediateCourse.id,
    order: 9,
    title: "Design a Walk",
    description: "Construct a path that hits a requested final state.",
    unlockAfter: "M3",
    widget: "target-path-sim",
    prompt: "Build a five-move path and watch the animation between states.",
    expectedQuestion: "A target-state problem asks you to control...",
    expectedAnswer: "The final position",
  },
  {
    id: "L9",
    courseId: intermediateCourse.id,
    order: 10,
    title: "Running Drift Estimate",
    description: "Estimate drift by adding many biased-ish outcomes.",
    unlockAfter: "L8",
    widget: "running-average-sim",
    prompt: "Add many batches and watch the running average settle.",
    expectedQuestion: "If the running average stays above 0, the walk likely has...",
    expectedAnswer: "Positive drift",
  },
  {
    id: "M4",
    courseId: intermediateCourse.id,
    order: 11,
    title: "Animate State Plans",
    description: "Create a state sequence and watch the middle states matter.",
    unlockAfter: "L9",
    widget: "target-path-sim",
    prompt: "Use steps to hit the final state while observing each middle state.",
    expectedQuestion: "The animation helps reveal...",
    expectedAnswer: "The middle states",
  },
  {
    id: "A6",
    courseId: advancedCourse.id,
    order: 6,
    title: "Ruin Sensitivity",
    description: "Change capital and edge to see ruin probability shift.",
    unlockAfter: "A5",
    widget: "gambler-ruin-sim",
    prompt: "Simulate many games and watch ruin rates respond to small changes.",
    expectedQuestion: "Ruin risk usually falls when starting capital...",
    expectedAnswer: "Increases",
  },
  {
    id: "A7",
    courseId: advancedCourse.id,
    order: 7,
    title: "Tail Hunting",
    description: "Use large simulations to inspect unusual outcomes.",
    unlockAfter: "A6",
    widget: "histogram-sim",
    prompt: "Run many walks and look at the far edges of the histogram.",
    expectedQuestion: "Tail events are outcomes that are...",
    expectedAnswer: "Far from the center",
  },
  {
    id: "A8",
    courseId: advancedCourse.id,
    order: 8,
    title: "Hit the Boundary",
    description: "Build paths that deliberately reach specific boundary states.",
    unlockAfter: "A7",
    widget: "target-path-sim",
    prompt: "Animate a path that reaches a target boundary exactly.",
    expectedQuestion: "A boundary is a state where the process...",
    expectedAnswer: "Stops or changes rule",
  },
  {
    id: "A9",
    courseId: advancedCourse.id,
    order: 9,
    title: "Advanced Simulation Review",
    description: "Tie together running averages, boundaries, tails, and states.",
    unlockAfter: "A8",
    widget: "running-average-sim",
    prompt: "Use repeated simulation as a final sanity check for hard probability.",
    expectedQuestion: "For hard probability, simulation is best used as...",
    expectedAnswer: "A bridge to intuition",
  },
] as const;

const extraExplanations: Record<string, string[]> = {
  B3: [
    "Expected value is the long-run average outcome of a random reward. To compute it, multiply each possible payout by its probability and add them up. A fair coin that pays 2 points for heads and 0 for tails has expected value (1/2)(2) + (1/2)(0) = 1 point per flip — even though you never actually win exactly 1 point on any single flip.",
    "The simulator makes this concrete: as you add more trials, the running average payout wobbles at first and then settles near the expected value. That settling is the Law of Large Numbers in action — averages of many independent trials converge to the expectation, which is why casinos and insurers can predict their long-run results precisely while individual outcomes stay random.",
  ],
  B4: [
    "Counting equally likely outcomes is the most basic way to find probabilities and averages. A fair six-sided die has outcomes 1 through 6, each with probability 1/6. Its expected value is the average of the faces: (1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5. You can never roll a 3.5, but it is the balance point of the outcomes.",
    "Rolling the die many times in the simulator shows the sample average creeping toward 3.5. Small samples can sit well above or below it; large samples pin it down. This is the same convergence idea you'll use for every harder problem: when exact reasoning is tricky, simulate many equally likely outcomes and read the stable average.",
  ],
  B5: [
    "Simulation is a problem-solving tool, not just a toy. When a probability question is hard to reason about directly, you can model the outcomes, run them many times, and read the answer off the results. The catch is that a few trials are noisy — the estimate jumps around — so you need enough repetitions for the pattern to stabilize.",
    "The habit to build is: guess first, then simulate to check, then refine your reasoning. If a simulated average keeps drifting, that's a signal you need more trials, not that the math is broken. Treat simulation as a bridge between intuition and exact calculation, especially for the messier problems later in the course.",
  ],
  B6: [
    "This lesson is about control: instead of letting randomness decide, you build a path step by step to hit a chosen target. Each move is +1 or -1, and your final position is the sum of the moves. To finish higher than you started, you need more +1 moves than -1 moves; the net displacement equals (number of +1 moves) minus (number of -1 moves).",
    "Watching the animation between states matters as much as the endpoint. The same final position can be reached by many different paths, and the in-between states show how the walker actually traveled there. This 'path vs. endpoint' distinction is the seed of deeper ideas like counting paths and the reflection principle.",
  ],
  B7: [
    "Comparing two noisy strategies is a classic trap: a single run can make the worse option look better purely by luck. The fix is to run each strategy many times and compare their averages, not their one-off results. The more trials you average, the more the random noise cancels and the true difference shows through.",
    "This is why honest comparisons — A/B tests, medical trials, trading backtests — insist on large samples. The running-average view in the simulator demonstrates it directly: early on the averages cross and tangle, but with enough trials they separate and settle near their true expected values.",
  ],
  B8: [
    "This review ties the beginner ideas together: probability as a number from 0 to 1, the complement rule, expected value as a probability-weighted average, and simulation as a way to check intuition. The single most useful first move on any probability question is to model the possible outcomes — list what can happen and how likely each is.",
    "Once outcomes are modeled, the rest follows: count favorable cases for simple probabilities, subtract from 1 for complements, weight-and-sum for expected value, or simulate many trials when exact counting is hard. The goal isn't memorizing formulas; it's having a reliable way to turn a vague question into countable possibilities.",
  ],
  L6: [
    "This lesson connects expected value back to random walks. The expected final position of a fair walk is 0, but you rarely see that from one walk. Instead, add up the final positions of many walks and divide — the running average is your estimate of the expectation, and for a fair walk it converges toward 0.",
    "Watching the running average settle is the Law of Large Numbers applied to a process you already understand. Individual walks scatter widely (remember the sqrt(n) spread), yet their average collapses toward the true expected value as you add more of them. Averaging is how you extract a stable signal from very noisy data.",
  ],
  L7: [
    "Here you connect the visual spread of a distribution to a precise rule. For a fair random walk, the typical distance from the start grows like the square root of the number of steps. After 400 steps the walk is usually within roughly sqrt(400) = 20 of the origin, not 400 — randomness partly cancels itself out.",
    "This square-root scaling is why noise shrinks slowly: to halve your typical error you need four times as much data, because error falls like 1/sqrt(n). The histogram lets you see it — quadruple the steps and the cloud only doubles in width. This single fact governs measurement error, polling margins, and diffusion in physics.",
  ],
  M2: [
    "A two-state game chain models a process that flips between, say, Winning and Losing, with fixed transition probabilities. As with weather, the next state depends only on the current one. When a state is 'sticky' — high probability of staying the same — outcomes cluster into streaks rather than alternating cleanly.",
    "This explains why winning and losing streaks feel real even in fair-ish systems: persistence in the transition probabilities, not destiny, produces the clustering. Modeling it as a Markov chain lets you quantify how long streaks tend to last and how often the system switches sides.",
  ],
  M3: [
    "A web surfer hopping from page to page is a textbook Markov chain: the next page depends mostly on the current page's links, not the entire browsing history. Treating each page as a state and each link as a transition probability turns 'how do people move through a site?' into a precise, simulatable model.",
    "This is exactly the idea behind PageRank: model the whole web as a giant Markov chain and find which pages a random surfer visits most in the long run. The same framing powers recommendation systems, navigation analytics, and any 'what comes next?' problem where the present state carries the important information.",
  ],
  L8: [
    "Designing a walk flips the usual question around: rather than predicting where randomness lands, you choose a sequence of +1/-1 moves to reach a specific final state in a fixed number of steps. This forces you to think about net displacement — the difference between up-moves and down-moves — and which combinations are even possible.",
    "Notice that many different step sequences can reach the same endpoint. Counting how many paths lead to a given final position is the combinatorial heart of random walks, and it's what makes some endings far more likely than others when the moves are random. Controlling the endpoint first builds the intuition for counting paths later.",
  ],
  L9: [
    "This lesson estimates drift by simulation. If you add up many step outcomes and the running average sits above 0, the process has positive drift; if it hovers at 0, it's drift-free. The sign and size of that stable average is the per-step drift, exactly the 2p - 1 quantity from the bias lesson.",
    "The point is that you can detect and measure drift empirically, without knowing p in advance — just average enough samples and read the result. This is how real analysts decide whether a noisy series (returns, sensor readings, click rates) has a genuine trend or is just wandering randomly.",
  ],
  M4: [
    "Animating a state plan highlights that in a sequence of states, the path between endpoints carries real information — not just where you end. Two plans with the same final state can pass through completely different intermediate states, and in many systems those middle states are what you actually care about.",
    "This matters for Markov models because the chain's behavior is the whole trajectory of states, step by step. Watching the middle states reveals streaks, detours, and near-misses that a single summary number would hide, reinforcing that a process is a sequence, not just an outcome.",
  ],
  A3: [
    "Gambler's ruin is the boundary-hitting problem applied to a bankroll. You start with some capital and bet repeatedly until you either reach a goal or go broke (0). Both 0 and the goal are absorbing — the game ends when you touch either. The central question is the probability of ruin versus reaching the goal.",
    "For a fair game with equal distances to win and lose, the ruin probability is about 1/2 by symmetry. Two facts surprise people: even a fair game ends in ruin or victory with certainty (you can't wander forever between fixed walls), and against a much richer opponent — like a casino — ruin becomes nearly certain because their boundary is effectively infinitely far away.",
  ],
  A4: [
    "Rare events live in the thin tails of a distribution — outcomes far from the center that happen only occasionally. Estimating their probability by simulation is hard precisely because they're rare: in a small batch you might see zero of them, giving you no useful estimate. You need a large number of trials before rare outcomes appear often enough to measure.",
    "This is a practical warning as much as a concept. Underestimating tail risk — because a short simulation or short history never showed it — is behind many real failures in finance, engineering, and safety. When the event matters but is rare, you must run many trials (or use smarter techniques) to see the tail at all.",
  ],
  A5: [
    "An equilibrium lab shows long-run proportions emerging from repeated transitions. Run a Markov chain long enough and the share of time spent in each state stabilizes into the stationary distribution, regardless of where you started. The randomness never stops, but the averages stop moving.",
    "Reading equilibrium correctly is the skill: it describes average behavior over many steps, not a fixed guarantee for any short window. This steady-state view answers 'what mix of states will this system occupy in the long run?' — the question behind capacity planning, PageRank, and population models.",
  ],
  A6: [
    "Ruin sensitivity is about how the chance of going broke responds to small changes in your setup. Two levers dominate: your starting capital and your per-bet edge. More starting capital pushes the ruin boundary farther away, so ruin becomes less likely; a positive edge (favorable probability) helps even more, while a negative edge eventually dooms you no matter the bankroll.",
    "The simulator lets you nudge these and watch ruin rates move, which builds risk intuition: survival is about both your buffer and your edge, and a tiny disadvantage repeated many times is far more dangerous than it looks. This is the quantitative core of bankroll management and risk-of-ruin analysis.",
  ],
  A7: [
    "Tail hunting means deliberately studying the far edges of a distribution — the unusually large or small outcomes. The center of a distribution is easy; the tails are where the surprising, high-impact events live, and they're rare enough that you need big simulations to see them clearly.",
    "Looking at the histogram's edges trains you to ask 'how bad (or good) can it get, and how often?' rather than only 'what's typical?' Tail thinking is what separates naive averages from real risk assessment, and it's essential anywhere extreme outcomes carry outsized consequences.",
  ],
  A8: [
    "Hitting a boundary on purpose combines path design with the absorbing-boundary idea. You construct a path that reaches a specific target state exactly, which means respecting both the number of steps and the net displacement needed. A boundary is a state where the process stops or changes rule — reaching it is the whole objective.",
    "This reinforces that boundaries reshape a process: instead of free wandering, the walk has a destination that ends the story. Understanding how starting point, step budget, and boundary location interact is what lets you reason about first-passage problems — when, and whether, a process reaches a critical level.",
  ],
  A9: [
    "This capstone review ties the advanced toolkit together: running averages for expected value, the square-root law for spread, boundaries for first-passage and ruin, tails for rare events, and stationary distributions for long-run state behavior. The unifying theme is that large numbers of random trials produce stable, predictable summaries.",
    "The meta-skill is using simulation as a bridge to intuition: when a hard probability problem resists exact calculation, model it, run many trials, inspect the center and the tails, and let the stable patterns guide your reasoning. That workflow — predict, simulate, compare, refine — is how working practitioners handle real stochastic systems.",
  ],
};

const extraLessons: Lesson[] = extraLessonSpecs.map((spec) => ({
  id: spec.id,
  courseId: spec.courseId,
  order: spec.order,
  title: spec.title,
  description: spec.description,
  stepIds: Array.from({ length: 5 }, (_, index) => `${spec.id}-S${index + 1}`),
  unlockAfter: spec.unlockAfter,
  estimatedMinutes: 5,
  explanation: extraExplanations[spec.id],
}));

function makeExtraSteps(): LessonStep[] {
  return extraLessonSpecs.flatMap((spec) => {
    const isNumeric = typeof spec.expectedAnswer === "number";
    return [
      {
        id: `${spec.id}-S1`,
        lessonId: spec.id,
        order: 1,
        type: "simulation",
        title: "Simulate first",
        body: spec.prompt,
        interaction: {
          widget: spec.widget,
          params:
            spec.widget === "running-average-sim"
              ? { trialsPerBatch: 50, mode: spec.id === "B4" ? "die" : "walk" }
              : spec.widget === "target-path-sim"
                ? { start: 0, target: spec.id.startsWith("A") ? 4 : 3, moves: 5 }
              : spec.widget === "gambler-ruin-sim"
                ? { trials: 300, start: 5, goal: 10, p: 0.5 }
                : spec.widget === "markov-chain-sim"
                  ? { days: 14, sunnyToSunny: 0.72, rainyToRainy: 0.64 }
                  : { defaultSteps: 80, trials: 1000 },
          validation: { type: "completion" },
        },
        feedback: {
          correct: "Good. Simulation gives you something concrete to reason from before answering.",
          incorrect: "Run the simulation at least once.",
          hint: "Press the run button and watch the average or path update.",
        },
        teach:
          "Before you calculate anything, a simulation gives you a ballpark answer to sanity-check against. Watch where the numbers settle — that stable value is usually what the exact math will confirm in the next step.",
      },
      {
        id: `${spec.id}-S2`,
        lessonId: spec.id,
        order: 2,
        type: isNumeric ? "input" : "choice",
        title: "Make the key prediction",
        body: spec.expectedQuestion,
        interaction: {
          widget: isNumeric ? "number-input" : "choice-input",
          params: isNumeric
            ? { label: "Your answer" }
            : {
                options: [
                  spec.expectedAnswer,
                  "One lucky trial",
                  "The first result only",
                ],
              },
          validation: isNumeric
            ? { type: "exact", expected: spec.expectedAnswer, tolerance: 0.01 }
            : { type: "choice", expected: spec.expectedAnswer },
        },
        feedback: {
          correct: "Correct. The simulation and the calculation are pointing to the same idea.",
          incorrect: "Not quite. Use the simulation trend, not one noisy result.",
          hint: "Look for the value or phrase that describes repeated-trial behavior.",
        },
        teach:
          "When the simulated trend and the calculated value agree, you can trust the result. That agreement is the goal of every problem here: the picture and the formula should tell the same story, and each one makes the other easier to remember.",
      },
      {
        id: `${spec.id}-S3`,
        lessonId: spec.id,
        order: 3,
        type: "choice",
        title: "Noise versus signal",
        body: "Why can a short simulation still disagree with the expected pattern?",
        interaction: {
          widget: "choice-input",
          params: {
            options: [
              "Random samples are noisy",
              "Expected value stops working",
              "The probabilities disappear",
            ],
          },
          validation: { type: "choice", expected: "Random samples are noisy" },
        },
        feedback: {
          correct: "Exactly. Short runs can be misleading; repeated runs reveal the pattern.",
          incorrect: "Expected patterns are long-run ideas, so small samples can wiggle.",
          hint: "Think about why a coin can have short streaks.",
        },
        teach:
          "Randomness is lumpy at small scale. A fair coin can give five heads in a row; a few simulation runs can land far from the expected value. Expected value describes the long run, so always judge it from many trials, not a handful.",
      },
      {
        id: `${spec.id}-S4`,
        lessonId: spec.id,
        order: 4,
        type: "choice",
        title: "What should you trust?",
        body: "When one trial and a thousand trials disagree, which is usually more informative?",
        interaction: {
          widget: "choice-input",
          params: {
            options: ["One trial", "A thousand trials", "Neither ever helps"],
          },
          validation: { type: "choice", expected: "A thousand trials" },
        },
        feedback: {
          correct: "Right. More trials usually reduce the noise in your estimate.",
          incorrect: "One trial can be interesting, but it is too noisy to summarize the system.",
          hint: "Large samples average out more randomness.",
        },
        teach:
          "This is the Law of Large Numbers: as you average more independent trials, the estimate homes in on the true value, with error shrinking like 1/sqrt(number of trials). It's why big samples beat single anecdotes everywhere — polls, experiments, and trading alike.",
      },
      {
        id: `${spec.id}-S5`,
        lessonId: spec.id,
        order: 5,
        type: "explain",
        title: "Lesson checkpoint",
        body: "The habit is: predict, simulate, compare, then refine. This makes harder probability questions feel less abstract.",
        interaction: {
          widget: "none",
          validation: { type: "completion" },
        },
        feedback: {
          correct: "Lesson complete. Keep using simulation as a bridge from intuition to calculation.",
          incorrect: "",
        },
      },
    ] satisfies LessonStep[];
  });
}

const extraSteps = makeExtraSteps();

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
    explanation: [
      "A random walk is one of the simplest random processes you can build, and it shows up everywhere — stock prices, diffusing particles, gambling, and even how animals forage. The whole idea: you start at position 0 on a number line, and at every step you flip a coin. Heads moves you one unit right (+1), tails moves you one unit left (-1). Your position at any time is just the running sum of all those +1 and -1 steps.",
      "When the coin is fair, each step is +1 or -1 with equal probability, so the average value of a single step is zero: (1/2)(+1) + (1/2)(-1) = 0. Because the average of each step is 0, the expected (average) position after any number of steps is also 0. 'Expected' does not mean 'guaranteed' — it means that if you repeated the whole walk thousands of times and averaged the final positions, you'd get something very close to 0.",
      "Here's the part that surprises people: even though the average is 0, almost no individual walk ends exactly at 0. A single path is noisy and jagged. You can get long streaks of heads that carry you far to the right, or wander back and forth near the start. Fairness controls the long-run average across many walks, not what any one walk does. That tension — predictable on average, unpredictable individually — is the heart of probability, and the rest of this course builds on it.",
    ],
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
    explanation: [
      "One random walk is noisy and hard to learn from. The trick used everywhere in probability is to repeat the experiment many times and look at the pattern of outcomes. If you run a thousand fair walks of the same length and record where each one ends, you get a distribution: a picture of which final positions are common and which are rare. The histogram in this lesson is exactly that picture — each bar counts how many walks landed in that region.",
      "Two things matter about this distribution: its center and its spread. For a fair walk the center stays at 0 no matter how many steps you take, because there is no built-in direction. But the spread grows as you add steps. The walk has more chances to wander, so extreme endings become more possible. Crucially, the center does not move — only the width of the cloud changes.",
      "The spread grows in a very specific way: the typical distance from 0 scales with the square root of the number of steps, not the number of steps itself. After 100 steps a fair walk is usually within about sqrt(100) = 10 of the origin; after 400 steps it is usually within about sqrt(400) = 20. So quadrupling the steps only doubles the typical distance. This 'square-root law' is one of the most important facts in probability and is the reason large random systems are more predictable in aggregate than you'd guess.",
    ],
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
    explanation: [
      "So far the coin was fair. Now we tilt it. Let p be the probability of a +1 step (so 1 - p is the probability of -1). When p is bigger than 0.5, right steps happen more often than left steps, and the walk picks up a steady lean called drift. Drift is the part of the motion you can predict; the randomness still rides on top of it.",
      "The average value of one biased step is (p)(+1) + (1 - p)(-1) = 2p - 1. Multiply by the number of steps n and you get the expected position: E[position] = n(2p - 1). For example, with p = 0.55 over 50 steps, that's 50 × (2(0.55) - 1) = 50 × 0.1 = 5. When p = 0.5 the formula gives 0, which matches the fair walk — fairness is just the special case with no drift.",
      "The key mental model: bias moves the center of the distribution, while randomness still spreads the cloud around that moving center. A biased walk and a fair walk both diffuse (spread out like sqrt(n)), but only the biased one marches in a direction. Comparing two walkers with different p values, the one with the larger p will, on average, end farther to the right — even though on any single race the underdog can still win by luck.",
    ],
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
    explanation: [
      "A Markov chain is a system that hops between named states, where the only thing that decides the next state is the current state — not the full history of how you got there. This 'the present is enough' rule is called the Markov property, or being memoryless. In this lesson the states are Sunny and Rainy, and each day the weather jumps to the next state according to fixed transition probabilities.",
      "We organize those probabilities into rules like P(Sunny tomorrow | Sunny today) = 0.75. Every state's outgoing probabilities must add to 1, because tomorrow has to be something: if sunny-to-sunny is 0.75, then sunny-to-rainy must be 0.25. A state is called 'sticky' when it tends to stay itself — a high Rainy-to-Rainy probability produces long rainy streaks, which is exactly why real weather clusters.",
      "Markov chains matter far beyond weather. A web surfer clicking from page to page, words in a sentence, board-game positions, customer subscription states, and queues are all naturally modeled this way — in fact, the original PageRank algorithm behind Google treated the web as one giant Markov chain. Once you know the current state and the transition probabilities, you can simulate the future or compute long-run behavior, which is the focus of the advanced course.",
    ],
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
    explanation: [
      "Probability is just a number between 0 and 1 that measures how likely something is. A probability of 0 means impossible, 1 means certain, and everything in between describes uncertainty: 0.5 is a 50/50 coin flip, 0.9 is very likely, 0.1 is unlikely. Whenever you see a percentage like 25%, it is the same idea written differently — divide by 100 to get the decimal probability 0.25.",
      "For situations where every outcome is equally likely, probability is a simple fraction: favorable outcomes divided by total outcomes. A bag with 3 blue and 1 red marble gives P(blue) = 3/4, because 3 of the 4 equally likely marbles are blue. A fair coin gives P(heads) = 1/2, and a fair die gives P(any specific face) = 1/6.",
      "The reason this matters: once you can put a number on chance, you can compare risks, combine events, and predict long-run behavior instead of just guessing. The mental habit to build is 'count the possibilities, then count the ones you care about.' Everything else in probability — complements, expected value, simulations — is built on top of this simple scale.",
    ],
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
    explanation: [
      "Two simple rules let you solve a huge fraction of probability questions. The first is the complement rule: the probability that something does NOT happen is 1 minus the probability that it does. If P(rain) = 0.3, then P(no rain) = 1 - 0.3 = 0.7. This works because an event and its opposite together cover every possibility, so their probabilities must add to 1.",
      "The second is combining 'either-or' outcomes. When outcomes are equally likely and don't overlap, you add up the favorable ones. On a 4-color spinner, P(red or blue) = 2/4 = 1/2, because two of the four equal sections qualify. (When events can overlap you have to be more careful, but the equally-likely case is the foundation.)",
      "The complement rule shines on 'at least one' questions, which are annoying to count directly. To find P(at least one heads in two flips), flip the problem: the only way to fail is two tails, with probability 1/4, so the answer is 1 - 1/4 = 3/4. The big lesson: when an event is complicated, ask what would make it fail — the opposite is often far easier to count.",
    ],
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
    explanation: [
      "Boundary-hitting problems ask a different question than 'where do you end up?' They ask 'which target do you reach first?' Picture a walker between a lower boundary at 0 and an upper boundary at 10. The walk continues until it touches one of them — these are called absorbing boundaries because once you arrive, the process stops. The question is the probability of hitting the top before the bottom.",
      "Two forces decide the answer: drift and starting position. With a fair walk (no drift), only distance matters, and by symmetry the probability of hitting the top first is your fractional position between the boundaries. Start halfway between 0 and 10 and you have a 50/50 chance; start at 2 and you are much more likely to hit 0 first, simply because it is closer.",
      "Add even a small upward bias and the odds shift toward the upper boundary, because the steady drift accumulates over many steps and overpowers pure distance. This is the mathematical backbone of gambler's ruin, option pricing, and reliability analysis: combine where you start, how strong the drift is, and where the walls are, and you can predict which outcome wins the race — on average.",
    ],
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
    explanation: [
      "Run a Markov chain for a long time and something remarkable happens: the fraction of time it spends in each state settles down to stable numbers, even though the individual hops stay random. These long-run proportions are called the stationary (or equilibrium) distribution. A weather chain might end up sunny 65% of the time and rainy 35% of the time, regardless of whether it started sunny or rainy.",
      "It is important to read '65% sunny' correctly. It does not promise exactly 13 sunny days in every 20-day stretch. It is a tendency that the average share approaches as the number of days grows. Short runs still wobble; the equilibrium is about the long-run average, not a guarantee for any particular window.",
      "Equilibrium distributions are why Markov models are so useful in practice. They tell you the steady-state behavior of a system — the typical mix of states it will occupy — which powers things like PageRank's importance scores, queueing and capacity planning, and population models. You combine the same ingredients from the whole course: states, transitions, randomness, and large numbers of repetitions producing stable averages.",
    ],
  },
  ...extraLessons,
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
    teach:
      "Your position is just the running sum of the steps: each Heads adds 1, each Tails subtracts 1. Keep that 'position = sum of steps' idea in mind — the next questions ask about the average and spread of exactly this number.",
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
    teach:
      "Expected value is an average over many repeats, not a prediction for one walk. Because each fair step averages to 0, the expected position is 0 for any number of steps — a fact you'll reuse when we add bias and the average stops being 0.",
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
    teach:
      "Separate two ideas: the center (where outcomes balance) versus the spread (how far they scatter). Fair walks keep the center at 0 while the spread grows with more steps. The next lesson makes that spread visible with a histogram.",
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
    teach:
      "Net displacement = (up steps) − (down steps). This shortcut — you only need the counts, not the order — is the seed of counting how many paths reach a given endpoint, which you'll use in the design-a-walk lessons.",
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
    teach:
      "A steady lean in one direction is called drift, and it only appears when the coin is biased. Spotting 'centered but noisy' versus 'trending' by eye is the exact skill the Drift and Bias lesson formalizes.",
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
    teach:
      "A histogram turns thousands of noisy walks into one stable shape: tall bars are common endings, short bars are rare ones. That shape is a distribution — the object the rest of this lesson asks questions about.",
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
    teach:
      "More steps means more spread, but not proportionally — the typical distance grows like sqrt(n). The very next question pins down that square-root rule with a number.",
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
    teach:
      "The square-root law is worth memorizing: typical distance ≈ sqrt(steps). Quadrupling the steps only doubles the spread. This same 1/sqrt(n) behavior controls polling error and measurement noise everywhere.",
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
    teach:
      "Always track center and spread separately — they answer different questions. Center says 'where on average,' spread says 'how uncertain.' In the next lesson, bias will move the center while spread keeps behaving like sqrt(n).",
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
    teach:
      "Relative bar heights estimate probabilities: divide a bar's count by the total trials to approximate the chance of landing there. This 'count and divide' move is how simulation answers probability questions you can't easily compute by hand.",
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
    teach:
      "Bias is the probability p of a +1 step. The cloud of paths still spreads, but now its center marches in a direction. The upcoming questions turn that visual drift into the exact formula n(2p − 1).",
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
    teach:
      "Drift direction follows the sign of 2p − 1: positive when p > 0.5, negative when p < 0.5, zero when p = 0.5. Knowing the sign first makes the exact expected-value calculation in the next step a quick check.",
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
    teach:
      "The formula E[position] = n(2p − 1) is just 'per-step drift × number of steps.' Each step contributes 2p − 1 on average, and they add up. Plugging p = 0.5 gives 0, which recovers the fair walk — a good way to check you remember it.",
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
    teach:
      "Setting the drift n(2p − 1) to zero forces p = 0.5. This is why the fair walk is the dividing line: below it the walk drifts down, above it drifts up, and exactly at it there is no trend at all.",
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
    teach:
      "On average the bigger bias wins, but 'on average' is the key phrase — on any single race the underdog can still win by luck, because spread overlaps the gap in drift. Comparing averages while remembering the noise is exactly how real experiments are judged.",
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
    teach:
      "Rare big wanders do happen — they live in the tails of the distribution. Remembering that 'fair' constrains the average but not any single path will keep you from being fooled by streaks later in the advanced tail-risk lessons.",
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
    teach:
      "The Markov property — the future depends only on the present state — is what makes these systems easy to simulate and analyze. You never need the full history, just the current state and its transition probabilities.",
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
    teach:
      "Every state's outgoing probabilities must sum to 1, because tomorrow has to be some state. That 'rows sum to 1' rule is your built-in error check whenever you read or build a transition table.",
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
    teach:
      "High self-transition probability creates streaks. This is why winning/losing runs and weather spells feel real — persistence in the transitions, not fate, clusters the outcomes. It also shapes the long-run mix you'll study in the advanced course.",
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
    teach:
      "Expected count = probability × number of trials. This simple multiply works for any 'how many out of N' question and reappears when you estimate sunny days from a long-run proportion in the advanced lessons.",
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
    teach:
      "Anchor the scale in your mind: 0 = impossible, 1 = certain, 0.5 = a coin flip. Any valid probability lives between 0 and 1, so if a calculation ever gives you something outside that range, you know to recheck it.",
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
    teach:
      "For equally likely outcomes, probability = favorable ÷ total. That single formula handles coins, dice, spinners, and marbles — the only trick is counting carefully. Converting between fractions, decimals, and percents keeps the next questions easy.",
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
    teach:
      "The complement rule, P(not A) = 1 − P(A), is one of the most useful shortcuts in probability. When an event is awkward to count directly, computing its opposite and subtracting from 1 is often far easier — as the 'at least one' question soon shows.",
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
    teach:
      "'At least one' is the classic signal to use the complement: instead of adding up every winning case, compute the single losing case (none happen) and subtract from 1. This trick scales to many coins or dice where direct counting would be painful.",
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
    teach:
      "Which boundary you hit first depends on drift and starting distance together. Even a small bias, compounded over many steps, tilts the race toward the boundary it points at — the core mechanism behind gambler's ruin.",
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
    teach:
      "For a fair walk, the probability of hitting the top before the bottom equals your fractional position between the boundaries. Start halfway and it's 1/2; start a quarter of the way up and it's 1/4. Distance is everything when there's no drift.",
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
    teach:
      "Closer boundary, higher chance: starting at 2 between 0 and 10 gives only a 2/10 chance of reaching 10 first. This is why a small bankroll against a big opponent is so likely to bust — the ruin boundary is simply nearer.",
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
    teach:
      "Stickiness changes the texture of a sequence (longer streaks) but not necessarily the long-run proportion. Keep streakiness and long-run share as separate ideas — the next questions are about the stable long-run mix.",
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
    teach:
      "A long-run proportion acts like a probability per day, so expected count = proportion × days. But it's an average tendency, not a promise — the very next question makes that distinction explicit.",
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
  ...extraSteps,
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
