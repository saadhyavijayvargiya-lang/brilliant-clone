import type { Course, Lesson, LessonStep, WidgetType } from "../types/content";

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

interface Followup {
  title: string;
  body: string;
  answer: number | string;
  options?: string[];
  correct: string;
  incorrect: string;
  hint: string;
  teach: string;
}

interface FollowupSet {
  summary: string;
  questions: [Followup, Followup];
}

const extraFollowups: Record<string, FollowupSet> = {
  B3: {
    summary:
      "Expected value is a probability-weighted average of the payouts. Compute it once and you know the long-run average reward per trial.",
    questions: [
      {
        title: "Change the payout",
        body: "If the coin instead pays 4 points for Heads and 0 for Tails, what is the expected payout?",
        answer: 2,
        correct: "Yes. (1/2)(4) + (1/2)(0) = 2 — double the payout, double the expectation.",
        incorrect: "Weight each payout by 1/2 and add.",
        hint: "Half of 4 plus half of 0.",
        teach: "Expected value scales with the payouts: doubling every reward doubles the expectation.",
      },
      {
        title: "What expected value means",
        body: "Expected value is best described as which of these?",
        options: [
          "The long-run average per trial",
          "The most common single result",
          "The largest possible payout",
        ],
        answer: "The long-run average per trial",
        correct: "Right. It is the average over many repeats, not any single outcome.",
        incorrect: "It is an average across many trials, not a single result.",
        hint: "Think many repeats, then average.",
        teach: "Expected value answers 'what do I get per trial on average over the long run?'",
      },
    ],
  },
  B4: {
    summary:
      "For equally likely outcomes, the average is the balance point of the values, and expected counts are just probability times the number of trials.",
    questions: [
      {
        title: "A four-sided die",
        body: "What is the expected value of a fair four-sided die with faces 1, 2, 3, 4?",
        answer: 2.5,
        correct: "Yes. (1 + 2 + 3 + 4) / 4 = 2.5.",
        incorrect: "Average the four equally likely faces.",
        hint: "Add 1+2+3+4 and divide by 4.",
        teach: "The average of equally likely faces is the midpoint of the values.",
      },
      {
        title: "Counting sixes",
        body: "If you roll a fair six-sided die 60 times, about how many 6s do you expect?",
        options: ["10", "6", "60"],
        answer: "10",
        correct: "Right. 60 × (1/6) = 10.",
        incorrect: "Expected count = probability × rolls.",
        hint: "One sixth of 60.",
        teach: "Expected count = probability of the outcome × number of trials.",
      },
    ],
  },
  B5: {
    summary:
      "Simulation is most useful when exact reasoning is hard. A wobbly estimate is a signal to run more trials, not to trust the wobble.",
    questions: [
      {
        title: "Your estimate looks off",
        body: "An estimate from only 10 trials looks wrong. What is the best next step?",
        options: ["Run many more trials", "Trust it anyway", "Change the question"],
        answer: "Run many more trials",
        correct: "Right. More trials shrink the noise and steady the estimate.",
        incorrect: "Small samples are noisy — add more trials before trusting them.",
        hint: "More data, less noise.",
        teach: "When a simulated estimate is unstable, the fix is almost always more trials.",
      },
      {
        title: "When to simulate",
        body: "Simulation is most valuable when...",
        options: [
          "The exact math is hard to see",
          "You want one lucky result",
          "You never check your guess",
        ],
        answer: "The exact math is hard to see",
        correct: "Exactly. Simulation shines when direct calculation is awkward.",
        incorrect: "Simulation is a tool for hard-to-compute problems, not luck.",
        hint: "Use it when the formula is hard to find.",
        teach: "Reach for simulation when exact counting or algebra is difficult.",
      },
    ],
  },
  L6: {
    summary:
      "Averaging many fair walks drives the running average toward the expected position of 0; adding bias shifts that target away from 0.",
    questions: [
      {
        title: "Add a biased batch",
        body: "If you mix in walks that take more +1 steps than -1, the running average will...",
        options: ["Drift above 0", "Stay exactly at 0", "Drift below 0"],
        answer: "Drift above 0",
        correct: "Right. Extra +1 steps pull the average upward.",
        incorrect: "More +1 steps raise the average position.",
        hint: "Which direction do extra +1 steps push?",
        teach: "The running average tracks the true expected position, so bias moves it off 0.",
      },
      {
        title: "Fair expectation",
        body: "For fair 5-step walks, what is the expected final position?",
        answer: 0,
        correct: "Yes. Fair steps cancel on average, so the expectation is 0.",
        incorrect: "Fair +1/-1 steps average to 0.",
        hint: "Equal up and down chances.",
        teach: "Any fair walk has expected position 0, regardless of length.",
      },
    ],
  },
  L7: {
    summary:
      "Typical spread grows like sqrt(steps), so distance scales with the square root — quadruple the steps to double the spread.",
    questions: [
      {
        title: "Spread at 900 steps",
        body: "What is the typical spread of a fair 900-step walk?",
        answer: 30,
        correct: "Yes. sqrt(900) = 30.",
        incorrect: "Take the square root of the number of steps.",
        hint: "30 × 30 = 900.",
        teach: "Typical distance ≈ sqrt(steps); this is the square-root law in action.",
      },
      {
        title: "Doubling the spread",
        body: "To make the typical spread twice as large, multiply the number of steps by...",
        options: ["4", "2", "√2"],
        answer: "4",
        correct: "Right. Spread grows like sqrt(n), so 4× the steps doubles it.",
        incorrect: "Because spread ~ sqrt(n), you need 4× steps for 2× spread.",
        hint: "Undo a square root by squaring.",
        teach: "Since spread scales with sqrt(n), doubling spread takes four times the steps.",
      },
    ],
  },
  M2: {
    summary:
      "In a two-state game chain, stickiness controls streak length, while each state's outgoing probabilities still must sum to 1.",
    questions: [
      {
        title: "Less sticky wins",
        body: "If Win→Win drops to 0.2, winning streaks become...",
        options: ["Shorter", "Longer", "Unchanged"],
        answer: "Shorter",
        correct: "Right. A low self-transition makes the state leave quickly.",
        incorrect: "Lower Win→Win means wins rarely repeat, so streaks shorten.",
        hint: "Low stay-probability means short streaks.",
        teach: "Self-transition probability sets streak length: lower means shorter streaks.",
      },
      {
        title: "Rows sum to one",
        body: "The probabilities leaving the Win state must add up to...",
        options: ["1", "0", "2"],
        answer: "1",
        correct: "Right. Every state's outgoing probabilities sum to 1.",
        incorrect: "Tomorrow must be some state, so they sum to 1.",
        hint: "All outcomes from a state total 100%.",
        teach: "Each state's transition probabilities always sum to 1.",
      },
    ],
  },
  M3: {
    summary:
      "Treating pages as states and links as transition probabilities turns browsing into a Markov chain — the idea behind PageRank.",
    questions: [
      {
        title: "Model a link",
        body: "When modeling a web surfer, each link between pages becomes a...",
        options: ["Transition probability", "State", "Reward"],
        answer: "Transition probability",
        correct: "Right. Pages are states; links are the transitions between them.",
        incorrect: "Pages are the states; the links are the transitions.",
        hint: "What connects one state to the next?",
        teach: "Pages are states and links define the transition probabilities between them.",
      },
      {
        title: "What PageRank measures",
        body: "PageRank ranks pages by...",
        options: [
          "How often a random surfer visits them",
          "Alphabetical order",
          "Page file size",
        ],
        answer: "How often a random surfer visits them",
        correct: "Right. It is the long-run visit frequency of a random surfer.",
        incorrect: "It measures long-run visit frequency, not name or size.",
        hint: "Think long-run visits in the chain.",
        teach: "PageRank is the stationary visit frequency of a random web surfer.",
      },
    ],
  },
  A3: {
    summary:
      "Gambler's ruin is boundary-hitting for a bankroll: fair and symmetric gives 50% ruin, but a far-away opponent boundary makes ruin almost certain.",
    questions: [
      {
        title: "Versus the casino",
        body: "Playing a fair game against a casino with vastly more money, your long-run chance of ruin is...",
        options: ["Near certain", "About 50%", "Near zero"],
        answer: "Near certain",
        correct: "Right. Their boundary is effectively infinite, so you eventually bust.",
        incorrect: "When the opponent's boundary is very far, ruin becomes nearly certain.",
        hint: "Their wall is essentially infinitely far away.",
        teach: "Against a much larger bankroll, even a fair game ruins you with near certainty.",
      },
      {
        title: "Symmetric start",
        body: "Fair game, start at 4 with boundaries 0 and 8. What is P(reach 8 before 0)?",
        answer: 0.5,
        correct: "Yes. Halfway between equal boundaries gives 1/2.",
        incorrect: "You start exactly halfway, so it's symmetric.",
        hint: "4 is the midpoint of 0 and 8.",
        teach: "A fair walk starting at the midpoint hits either boundary with equal chance.",
      },
    ],
  },
  A4: {
    summary:
      "Rare events live in the tails and need many trials to observe; too few trials makes you underestimate their risk.",
    questions: [
      {
        title: "Too few trials",
        body: "A 1-in-1000 event, simulated only 50 times, will most often show up...",
        options: ["Zero times", "Exactly once", "Hundreds of times"],
        answer: "Zero times",
        correct: "Right. 50 trials rarely catch a 1-in-1000 event at all.",
        incorrect: "With only 50 trials you usually see it zero times.",
        hint: "50 is tiny compared to 1000.",
        teach: "Small samples usually miss rare events entirely, hiding their risk.",
      },
      {
        title: "Why risk gets missed",
        body: "Underestimating rare risk usually comes from...",
        options: [
          "Too few trials or too short a history",
          "Too many trials",
          "Using the complement rule",
        ],
        answer: "Too few trials or too short a history",
        correct: "Right. Short samples simply never reveal the tail.",
        incorrect: "Rare risk is missed when samples are too small or too short.",
        hint: "Not enough data to see the tail.",
        teach: "Tail risk is underestimated when the sample is too small to contain it.",
      },
    ],
  },
  A5: {
    summary:
      "A stationary distribution is set by the transition probabilities and describes the long-run mix of states, not the starting point.",
    questions: [
      {
        title: "What sets equilibrium",
        body: "The stationary distribution depends mainly on...",
        options: [
          "The transition probabilities",
          "The starting state",
          "The first day only",
        ],
        answer: "The transition probabilities",
        correct: "Right. Long-run behavior is governed by the transitions, not the start.",
        incorrect: "Equilibrium is determined by the transition probabilities.",
        hint: "What rule drives every step?",
        teach: "The long-run mix is fixed by the transition probabilities, not where you began.",
      },
      {
        title: "Long-run count",
        body: "If the long-run sunny share is 70%, how many sunny days do you expect in 30?",
        answer: 21,
        correct: "Yes. 0.70 × 30 = 21.",
        incorrect: "Multiply the long-run share by the number of days.",
        hint: "70% of 30.",
        teach: "Expected count from a long-run share = share × number of days.",
      },
    ],
  },
  B6: {
    summary:
      "Net displacement equals up-moves minus down-moves; combined with the move count, it fixes exactly how many of each you need.",
    questions: [
      {
        title: "Count the up-moves",
        body: "With 6 moves starting at 0 to end at +2, how many +1 moves are needed?",
        answer: 4,
        correct: "Yes. up − down = 2 and up + down = 6, so up = 4.",
        incorrect: "Solve up − down = 2 with up + down = 6.",
        hint: "Add the two equations.",
        teach: "Up-moves = (total moves + net displacement) / 2.",
      },
      {
        title: "Same destination",
        body: "Two different 6-move paths both end at +2. They must share the same...",
        options: ["Net displacement", "Exact order of moves", "Maximum height"],
        answer: "Net displacement",
        correct: "Right. Same endpoint means same net displacement, even if the order differs.",
        incorrect: "Endpoint depends on net displacement, not the order.",
        hint: "Order can differ; the total cannot.",
        teach: "Many move orders share one net displacement — that's why paths can differ yet end together.",
      },
    ],
  },
  B7: {
    summary:
      "Comparing noisy strategies needs many trials; averaging makes the true difference reliable instead of luck-driven.",
    questions: [
      {
        title: "One win proves little",
        body: "Strategy A beats B in a single run. You should...",
        options: ["Run many more trials", "Declare A better", "Stop testing"],
        answer: "Run many more trials",
        correct: "Right. One run is luck; many runs reveal the real winner.",
        incorrect: "A single run is too noisy to decide.",
        hint: "Don't trust one noisy result.",
        teach: "Fair comparisons average many trials, not a single outcome.",
      },
      {
        title: "Effect of averaging",
        body: "Averaging more trials makes a strategy comparison...",
        options: ["More reliable", "Noisier", "Impossible"],
        answer: "More reliable",
        correct: "Right. More trials cancel noise and sharpen the comparison.",
        incorrect: "More trials reduce noise, improving reliability.",
        hint: "More data, clearer signal.",
        teach: "Larger samples shrink noise, making comparisons trustworthy.",
      },
    ],
  },
  B8: {
    summary:
      "The beginner toolkit — complements, equally-likely counting, and expected value — all start by modeling the possible outcomes.",
    questions: [
      {
        title: "Complement on a die",
        body: "What is the probability of NOT rolling a 1 on a fair six-sided die?",
        options: ["5/6", "1/6", "1"],
        answer: "5/6",
        correct: "Right. Five of six faces are not a 1.",
        incorrect: "Use 1 − P(roll a 1).",
        hint: "1 − 1/6.",
        teach: "Complement rule: P(not A) = 1 − P(A).",
      },
      {
        title: "Expected payout",
        body: "A coin pays 10 for Heads and 0 for Tails. What is the expected payout?",
        answer: 5,
        correct: "Yes. (1/2)(10) + (1/2)(0) = 5.",
        incorrect: "Weight each payout by its 1/2 chance.",
        hint: "Half of 10.",
        teach: "Expected value weights each payout by its probability and sums.",
      },
    ],
  },
  L8: {
    summary:
      "Designing a walk is about controlling net displacement, and parity limits which endpoints a given number of moves can reach.",
    questions: [
      {
        title: "Up-moves for +1",
        body: "With 5 moves starting at 0 to end at +1, how many +1 moves are needed?",
        answer: 3,
        correct: "Yes. up − down = 1 and up + down = 5, so up = 3.",
        incorrect: "Solve up − down = 1 with up + down = 5.",
        hint: "Add the two equations.",
        teach: "Up-moves = (total moves + net displacement) / 2.",
      },
      {
        title: "A parity limit",
        body: "Why can't 5 moves end exactly at +2?",
        options: [
          "Parity: 5 moves can't produce an even displacement",
          "There are too few moves",
          "+2 is out of range",
        ],
        answer: "Parity: 5 moves can't produce an even displacement",
        correct: "Right. An odd number of ±1 moves always lands on an odd position.",
        incorrect: "Odd move counts can only reach odd endpoints.",
        hint: "Odd number of steps → odd endpoint.",
        teach: "Parity: the endpoint's evenness matches the number of moves.",
      },
    ],
  },
  L9: {
    summary:
      "The running average estimates per-step drift directly: its sign tells direction, and drift times steps gives expected position.",
    questions: [
      {
        title: "Read the drift",
        body: "If the running average settles near -0.2 per step, the walk has...",
        options: ["Negative drift", "Positive drift", "No drift"],
        answer: "Negative drift",
        correct: "Right. A negative per-step average means downward drift.",
        incorrect: "A negative average per step is negative drift.",
        hint: "Negative average → which direction?",
        teach: "The sign of the per-step average is the sign of the drift.",
      },
      {
        title: "Drift to position",
        body: "With per-step drift 0.1 over 50 steps, what is the expected position?",
        answer: 5,
        correct: "Yes. 0.1 × 50 = 5.",
        incorrect: "Expected position = per-step drift × steps.",
        hint: "0.1 times 50.",
        teach: "Expected position = per-step drift × number of steps.",
      },
    ],
  },
  M4: {
    summary:
      "A Markov process is a whole sequence of states; the intermediate states carry information a single endpoint would hide.",
    questions: [
      {
        title: "Where plans differ",
        body: "Two plans share the same start and end but differ in...",
        options: ["The middle states", "The number of states", "Nothing"],
        answer: "The middle states",
        correct: "Right. The path between endpoints is what changes.",
        incorrect: "Same endpoints can still differ in the middle.",
        hint: "Look between start and end.",
        teach: "Intermediate states distinguish paths with the same endpoints.",
      },
      {
        title: "A chain is a...",
        body: "A Markov chain's behavior is best described as...",
        options: ["A sequence of states", "A single endpoint", "A fixed number"],
        answer: "A sequence of states",
        correct: "Right. The chain is the whole trajectory, step by step.",
        incorrect: "A chain is a sequence, not one number.",
        hint: "It's a path, not a point.",
        teach: "A Markov chain is a sequence of states over time, not a single outcome.",
      },
    ],
  },
  A6: {
    summary:
      "Ruin risk responds to capital and edge: a negative edge dooms you over time, and more starting capital is the main safety lever.",
    questions: [
      {
        title: "A negative edge",
        body: "With a negative per-bet edge, long-run ruin is...",
        options: ["Increasingly likely", "Avoidable with patience", "Impossible"],
        answer: "Increasingly likely",
        correct: "Right. A negative edge compounds into near-certain ruin.",
        incorrect: "A losing edge makes ruin more likely the longer you play.",
        hint: "Small disadvantages compound.",
        teach: "A negative edge repeated many times drives ruin toward certainty.",
      },
      {
        title: "Best safety lever",
        body: "In a fair-ish game, the biggest lever to cut ruin risk is...",
        options: ["More starting capital", "Betting faster", "Playing longer"],
        answer: "More starting capital",
        correct: "Right. A bigger buffer pushes the ruin boundary away.",
        incorrect: "More capital moves the ruin wall farther off.",
        hint: "Think about the size of your buffer.",
        teach: "More starting capital is the primary way to reduce risk of ruin.",
      },
    ],
  },
  A7: {
    summary:
      "Tail events are rare, far-from-center outcomes; seeing them clearly requires many trials.",
    questions: [
      {
        title: "Define a tail event",
        body: "Tail events are...",
        options: [
          "Rare, far from the center",
          "Common, near the center",
          "The average outcome",
        ],
        answer: "Rare, far from the center",
        correct: "Right. Tails are the uncommon extremes of a distribution.",
        incorrect: "Tails sit at the far edges, not the middle.",
        hint: "Edges of the histogram.",
        teach: "Tail events are the rare extreme outcomes at a distribution's edges.",
      },
      {
        title: "Seeing the tail",
        body: "To observe a tail event clearly, you need...",
        options: ["Many trials", "A few trials", "One trial"],
        answer: "Many trials",
        correct: "Right. Rare outcomes only appear with enough trials.",
        incorrect: "Rare events require large samples to show up.",
        hint: "Rare needs lots of attempts.",
        teach: "Rare outcomes need large samples before they appear reliably.",
      },
    ],
  },
  A8: {
    summary:
      "An absorbing boundary stops the process; reaching one is a matter of net displacement and the step budget.",
    questions: [
      {
        title: "Absorbing boundary",
        body: "An absorbing boundary is a state where the process...",
        options: ["Stops", "Speeds up", "Resets randomly"],
        answer: "Stops",
        correct: "Right. Once absorbed, the walk ends there.",
        incorrect: "Absorbing means the process halts on arrival.",
        hint: "Absorbed = finished.",
        teach: "At an absorbing boundary the process stops for good.",
      },
      {
        title: "Steps to the wall",
        body: "Starting at 3, how many +1 steps reach the boundary at 7?",
        answer: 4,
        correct: "Yes. 7 − 3 = 4 upward steps.",
        incorrect: "Subtract the start from the boundary.",
        hint: "7 minus 3.",
        teach: "Minimum steps to a boundary is the distance to it.",
      },
    ],
  },
  A9: {
    summary:
      "The capstone idea: use simulation as a bridge to intuition, connecting a distribution's center and spread to exact reasoning.",
    questions: [
      {
        title: "Best use of simulation",
        body: "For hard problems, the best overall use of simulation is to...",
        options: [
          "Bridge intuition and calculation",
          "Replace all math",
          "Avoid thinking",
        ],
        answer: "Bridge intuition and calculation",
        correct: "Right. Simulate to build intuition, then confirm with math.",
        incorrect: "Simulation supports reasoning; it doesn't replace it.",
        hint: "It connects, not replaces.",
        teach: "Simulation is a bridge between intuition and exact calculation.",
      },
      {
        title: "The recurring pair",
        body: "Which pair of ideas did this course keep connecting?",
        options: ["Center and spread", "Color and shape", "Speed and price"],
        answer: "Center and spread",
        correct: "Right. Center (average) and spread (uncertainty) ran through everything.",
        incorrect: "The recurring pair was center and spread.",
        hint: "Average versus how much it scatters.",
        teach: "Center and spread — average and uncertainty — are the two recurring lenses.",
      },
    ],
  },
};

interface SecondSim {
  widget: WidgetType;
  title: string;
  body: string;
  params: Record<string, unknown>;
  correct: string;
  teach: string;
}

const secondSimById: Record<string, SecondSim> = {
  B3: {
    widget: "spinner-sim",
    title: "Spin and tally",
    body: "Spin a colored wheel many times and watch each color's share settle near its true probability.",
    params: { segments: ["Red", "Blue", "Green", "Yellow"] },
    correct: "Each color settles near 1/4 — long-run frequency estimates probability.",
    teach: "Observed frequencies converge to true probabilities as spins pile up.",
  },
  B4: {
    widget: "spinner-sim",
    title: "A six-way spinner",
    body: "Spin a six-section wheel many times; each face should approach a 1-in-6 share.",
    params: { segments: ["1", "2", "3", "4", "5", "6"] },
    correct: "Every face approaches 1/6 ≈ 17% with enough spins.",
    teach: "Equally likely outcomes each approach the same long-run frequency.",
  },
  B5: {
    widget: "galton-board-sim",
    title: "Watch a bell curve form",
    body: "Drop many balls through the pegs. Each random bounce path adds up into a smooth bell-shaped pile.",
    params: { rows: 8 },
    correct: "Random left/right bounces pile into a stable bell shape — that's a distribution forming.",
    teach: "Summing many random ±1 choices produces a bell-shaped (normal) distribution.",
  },
  B6: {
    widget: "galton-board-sim",
    title: "Many paths at once",
    body: "Each ball is a short random path. Drop a lot and see which final spots are common.",
    params: { rows: 6 },
    correct: "Center spots are most common because more paths reach them.",
    teach: "More distinct paths reach the center, so center outcomes are more likely.",
  },
  B7: {
    widget: "running-average-sim",
    title: "Average many trials",
    body: "Add batches of trials and watch the running average steady — the basis for comparing strategies.",
    params: { trialsPerBatch: 50, mode: "walk" },
    correct: "The average steadies as trials grow, making comparisons trustworthy.",
    teach: "Averaging more trials reduces noise and reveals the true value.",
  },
  B8: {
    widget: "spinner-sim",
    title: "Estimate by spinning",
    body: "Spin many times and compare each color's measured share to what you'd predict.",
    params: { segments: ["Red", "Blue", "Green", "Yellow"] },
    correct: "Measured shares match the predicted equally-likely probabilities.",
    teach: "Simulation lets you check predicted probabilities against measured frequencies.",
  },
  L6: {
    widget: "galton-board-sim",
    title: "Balls as random walks",
    body: "Each ball takes random left/right bounces — a tiny random walk. Watch where many of them land.",
    params: { rows: 8 },
    correct: "The pile centers at the middle, just like fair walks center at 0.",
    teach: "A Galton board is many random walks at once; they center like fair walks do.",
  },
  L7: {
    widget: "galton-board-sim",
    title: "Spread with more rows",
    body: "More peg rows means longer walks. Drop balls and notice the pile gets wider.",
    params: { rows: 12 },
    correct: "More rows widen the pile — spread grows with the number of steps.",
    teach: "Adding rows (steps) widens the distribution, echoing the sqrt(n) spread law.",
  },
  M2: {
    widget: "markov-chain-sim",
    title: "Simulate win/lose streaks",
    body: "Treat Sunny as Winning and Rainy as Losing. Make a state sticky and watch streaks form.",
    params: { days: 16, sunnyToSunny: 0.8, rainyToRainy: 0.55 },
    correct: "Sticky states produce visible streaks rather than clean alternation.",
    teach: "High self-transition probability creates clustered streaks.",
  },
  M3: {
    widget: "markov-chain-sim",
    title: "Hops between two pages",
    body: "Read each state as a page a visitor is on. Run the chain to see the path of page visits.",
    params: { days: 16, sunnyToSunny: 0.6, rainyToRainy: 0.6 },
    correct: "The visit sequence depends only on the current page each step.",
    teach: "A browsing session is a Markov chain over pages and links.",
  },
  L8: {
    widget: "target-path-sim",
    title: "Build to a target",
    body: "Choose +1/-1 moves to land exactly on the target, and watch the journey animate.",
    params: { start: 0, target: 2, moves: 6 },
    correct: "You controlled the endpoint by balancing up and down moves.",
    teach: "Designing a walk means choosing net displacement within a step budget.",
  },
  L9: {
    widget: "bias-slider-sim",
    title: "See drift directly",
    body: "Raise the bias and run many paths. The whole cloud slides in the favored direction.",
    params: { defaultP: 0.6, steps: 100, paths: 30 },
    correct: "More bias moves the average path faster — that's drift.",
    teach: "Bias shifts the center at speed 2p − 1 per step.",
  },
  M4: {
    widget: "target-path-sim",
    title: "Plan the in-between",
    body: "Build a path to the target and watch each intermediate state light up along the way.",
    params: { start: 0, target: 2, moves: 6 },
    correct: "The middle states show how the plan actually unfolds.",
    teach: "A plan is the whole sequence of states, not just the endpoint.",
  },
  A3: {
    widget: "gambler-ruin-sim",
    title: "Run more bankroll games",
    body: "Change the starting capital and run many games. Watch the ruin rate respond.",
    params: { trials: 300, start: 3, goal: 10, p: 0.5 },
    correct: "Starting farther from 0 lowers the ruin rate.",
    teach: "Ruin probability depends on distance to each boundary.",
  },
  A4: {
    widget: "galton-board-sim",
    title: "Hunt the tails",
    body: "Drop many balls and look at the far-left and far-right bins — the rare tail outcomes.",
    params: { rows: 10 },
    correct: "Tail bins fill slowly; rare outcomes need many trials to appear.",
    teach: "Tails populate slowly, so rare-event estimates demand large samples.",
  },
  A5: {
    widget: "markov-chain-sim",
    title: "Find the steady mix",
    body: "Run a long chain and watch the share of each state settle toward equilibrium.",
    params: { days: 20, sunnyToSunny: 0.75, rainyToRainy: 0.6 },
    correct: "The long-run share stabilizes regardless of the starting state.",
    teach: "Long runs reveal the stationary distribution set by the transitions.",
  },
  A6: {
    widget: "gambler-ruin-sim",
    title: "Test the levers",
    body: "Nudge capital and win chance to see how sharply the ruin rate moves.",
    params: { trials: 400, start: 5, goal: 10, p: 0.5 },
    correct: "Small edge or capital changes can swing the ruin rate a lot.",
    teach: "Ruin risk is sensitive to both starting capital and per-bet edge.",
  },
  A7: {
    widget: "galton-board-sim",
    title: "Inspect the extremes",
    body: "Drop a large batch and study how rarely the outermost bins get hits.",
    params: { rows: 12 },
    correct: "Extreme bins stay sparse — extremes are genuinely rare.",
    teach: "Extreme outcomes are rare, so judging them needs many trials.",
  },
  A8: {
    widget: "target-path-sim",
    title: "Reach the boundary",
    body: "Build a path that lands exactly on a target boundary, watching it animate.",
    params: { start: 0, target: 4, moves: 6 },
    correct: "Hitting a boundary is a matter of net displacement and step budget.",
    teach: "First-passage means reaching a boundary within the available steps.",
  },
  A9: {
    widget: "galton-board-sim",
    title: "One last distribution",
    body: "Drop many balls and connect the bell shape to everything you've learned: center and spread.",
    params: { rows: 12 },
    correct: "Center and spread summarize the whole distribution at a glance.",
    teach: "Center and spread are the two lenses that summarize any distribution.",
  },
};

const extraFollowups2: Record<string, [Followup, Followup]> = {
  B3: [
    {
      title: "Equal payouts",
      body: "A coin pays 2 for Heads and 2 for Tails. Expected payout?",
      options: ["2", "1", "0"],
      answer: "2",
      correct: "Right. If every outcome pays the same, the average equals that value.",
      incorrect: "Both outcomes pay 2, so the average is 2.",
      hint: "Every result pays the same amount.",
      teach: "When all payouts are equal, expected value equals that payout.",
    },
    {
      title: "Weighted payout",
      body: "A game pays 6 with probability 1/2 and 0 with probability 1/2. Expected payout?",
      answer: 3,
      correct: "Yes. (1/2)(6) + (1/2)(0) = 3.",
      incorrect: "Weight each payout by 1/2 and add.",
      hint: "Half of 6.",
      teach: "Expected value weights each payout by its probability.",
    },
  ],
  B4: [
    {
      title: "Ten-sided die",
      body: "Expected value of a fair 10-sided die (faces 1–10)?",
      answer: 5.5,
      correct: "Yes. The average of 1..10 is 5.5.",
      incorrect: "Average the smallest and largest face.",
      hint: "(1 + 10) / 2.",
      teach: "For evenly spaced faces, the mean is the midpoint of the range.",
    },
    {
      title: "Two dice outcomes",
      body: "Rolling two distinguishable dice, how many equally likely outcomes are there?",
      options: ["36", "12", "6"],
      answer: "36",
      correct: "Right. 6 × 6 = 36 ordered outcomes.",
      incorrect: "Multiply the outcomes of each die.",
      hint: "6 for the first die times 6 for the second.",
      teach: "Independent choices multiply: counts combine by multiplication.",
    },
  ],
  B5: [
    {
      title: "Name the shape",
      body: "A bell-shaped pile built from many random bounces is called a ___ distribution.",
      options: ["normal", "flat", "single"],
      answer: "normal",
      correct: "Right. Sums of many small random steps form a normal (bell) curve.",
      incorrect: "The classic bell shape is the normal distribution.",
      hint: "Also called the bell curve.",
      teach: "Sums of many independent steps tend toward the normal distribution.",
    },
    {
      title: "Smoother shape",
      body: "A smoother, cleaner histogram usually means you...",
      options: ["dropped more balls", "changed the rules", "picked one ball"],
      answer: "dropped more balls",
      correct: "Right. More samples make the shape smoother and more stable.",
      incorrect: "More samples smooth out the histogram.",
      hint: "More data, less jaggedness.",
      teach: "Larger samples produce smoother, more reliable distributions.",
    },
  ],
  B6: [
    {
      title: "Return to start",
      body: "With 8 moves starting at 0 and ending at 0, how many +1 moves are needed?",
      answer: 4,
      correct: "Yes. Equal ups and downs: 4 each.",
      incorrect: "To end where you started, ups must equal downs.",
      hint: "Half of 8.",
      teach: "Ending at the start requires equal numbers of up and down moves.",
    },
    {
      title: "Balanced moves",
      body: "Ending exactly where you started requires...",
      options: [
        "equal up and down moves",
        "all up moves",
        "an odd number of moves",
      ],
      answer: "equal up and down moves",
      correct: "Right. Net displacement zero means ups balance downs.",
      incorrect: "Net zero means the up and down counts match.",
      hint: "Net displacement must be zero.",
      teach: "Zero net displacement means up-moves equal down-moves.",
    },
  ],
  B7: [
    {
      title: "Telling coins apart",
      body: "One coin is fair, one slightly biased. To tell them apart you need...",
      options: ["many flips", "two flips", "one flip"],
      answer: "many flips",
      correct: "Right. Small differences only show up over many flips.",
      incorrect: "A small bias needs many flips to detect.",
      hint: "Tiny effects need lots of data.",
      teach: "Detecting small differences requires large samples.",
    },
    {
      title: "How error shrinks",
      body: "The error in an average shrinks roughly like...",
      options: ["1/sqrt(n)", "1/n²", "n"],
      answer: "1/sqrt(n)",
      correct: "Right. Averaging error falls like 1/sqrt(n).",
      incorrect: "Sampling error scales as 1/sqrt(n).",
      hint: "Same square-root law as walk spread.",
      teach: "Averaging error decreases like 1/sqrt(number of trials).",
    },
  ],
  B8: [
    {
      title: "Either color",
      body: "On a 4-color spinner, what is P(red or blue)?",
      options: ["1/2", "1/4", "3/4"],
      answer: "1/2",
      correct: "Right. 2 of 4 equal sections.",
      incorrect: "Count the matching sections over the total.",
      hint: "2 out of 4.",
      teach: "Add equally likely favorable sections over the total.",
    },
    {
      title: "Even roll",
      body: "Probability of rolling an even number on a fair die?",
      answer: 0.5,
      correct: "Yes. Three of six faces (2,4,6) are even.",
      incorrect: "Count even faces over six.",
      hint: "3 out of 6.",
      teach: "Half the faces are even, so the probability is 1/2.",
    },
  ],
  L6: [
    {
      title: "Average final spot",
      body: "The average final position of many fair 10-step walks is about...",
      answer: 0,
      correct: "Yes. Fair walks average to 0.",
      incorrect: "Fair steps cancel, averaging to 0.",
      hint: "No favored direction.",
      teach: "The expected position of any fair walk is 0.",
    },
    {
      title: "Where the pile centers",
      body: "The pile of final positions is centered at...",
      options: ["0", "+10", "-10"],
      answer: "0",
      correct: "Right. The distribution centers at the starting point.",
      incorrect: "Fair walks center at 0.",
      hint: "Same as the expected value.",
      teach: "A fair walk's distribution is centered at its origin.",
    },
  ],
  L7: [
    {
      title: "Spread at 100",
      body: "Typical spread of a fair 100-step walk?",
      answer: 10,
      correct: "Yes. sqrt(100) = 10.",
      incorrect: "Square root of the step count.",
      hint: "10 × 10 = 100.",
      teach: "Typical spread ≈ sqrt(steps).",
    },
    {
      title: "Quadruple the steps",
      body: "Going from 100 to 400 steps, the spread changes from ~10 to ~?",
      options: ["20", "40", "100"],
      answer: "20",
      correct: "Right. sqrt(400) = 20 — 4× steps, 2× spread.",
      incorrect: "Take sqrt(400).",
      hint: "Square root of 400.",
      teach: "4× the steps only doubles the spread, by the sqrt law.",
    },
  ],
  M2: [
    {
      title: "Fair switch",
      body: "A 50/50 switch chain (each state leaves half the time) produces...",
      options: ["no long streaks", "permanent streaks", "only wins"],
      answer: "no long streaks",
      correct: "Right. Low stickiness means streaks stay short.",
      incorrect: "Without stickiness, streaks are short.",
      hint: "Half-chance to leave each step.",
      teach: "Low self-transition probability yields short streaks.",
    },
    {
      title: "Streak length",
      body: "Streak length grows as the self-transition probability...",
      options: ["increases", "decreases", "hits 0"],
      answer: "increases",
      correct: "Right. Stickier states make longer streaks.",
      incorrect: "Higher stay-probability lengthens streaks.",
      hint: "Sticky = stays longer.",
      teach: "Higher self-transition probability lengthens streaks.",
    },
  ],
  M3: [
    {
      title: "Popular pages",
      body: "A page with many incoming links is generally visited...",
      options: ["more often", "less often", "never"],
      answer: "more often",
      correct: "Right. More inbound links raise long-run visit frequency.",
      incorrect: "More inbound links mean more visits.",
      hint: "Links funnel surfers in.",
      teach: "Inbound links raise a page's long-run visit frequency (PageRank).",
    },
    {
      title: "Dead-end page",
      body: "A 'dangling' page with no outgoing links acts like a...",
      options: ["trap state", "fast lane", "new start"],
      answer: "trap state",
      correct: "Right. With no exits, the surfer gets stuck there.",
      incorrect: "No outgoing links means no way to leave.",
      hint: "Nowhere to go next.",
      teach: "A state with no exits traps the chain (handled by random restarts in PageRank).",
    },
  ],
  L8: [
    {
      title: "Up-moves for +4",
      body: "With 6 moves starting at 0 to end at +4, how many +1 moves are needed?",
      answer: 5,
      correct: "Yes. up − down = 4 and up + down = 6, so up = 5.",
      incorrect: "Solve up − down = 4 with up + down = 6.",
      hint: "Add the equations.",
      teach: "Up-moves = (moves + displacement) / 2.",
    },
    {
      title: "Parity check",
      body: "Can a 4-move walk end at +3?",
      options: ["No, parity mismatch", "Yes", "Only with bias"],
      answer: "No, parity mismatch",
      correct: "Right. An even number of moves only reaches even endpoints.",
      incorrect: "Even move counts reach even endpoints only.",
      hint: "Even steps → even endpoint.",
      teach: "Endpoint parity matches the number of moves.",
    },
  ],
  L9: [
    {
      title: "Per-step drift",
      body: "For p = 0.6, the per-step drift 2p − 1 equals...",
      answer: 0.2,
      correct: "Yes. 2(0.6) − 1 = 0.2.",
      incorrect: "Compute 2p − 1.",
      hint: "1.2 − 1.",
      teach: "Per-step drift is 2p − 1.",
    },
    {
      title: "Drift to position",
      body: "Drift 0.2 per step over 100 steps gives expected position...",
      answer: 20,
      correct: "Yes. 0.2 × 100 = 20.",
      incorrect: "Multiply drift by steps.",
      hint: "0.2 times 100.",
      teach: "Expected position = per-step drift × steps.",
    },
  ],
  M4: [
    {
      title: "Where routes differ",
      body: "Two routes from A to B with the same endpoints differ in their...",
      options: ["intermediate states", "endpoints", "length only"],
      answer: "intermediate states",
      correct: "Right. The middle of the path is what changes.",
      incorrect: "Same endpoints differ in the middle.",
      hint: "Look between A and B.",
      teach: "Paths with shared endpoints differ in their intermediate states.",
    },
    {
      title: "Why watch the middle",
      body: "Tracking middle states helps you spot...",
      options: ["streaks and detours", "the final answer only", "nothing"],
      answer: "streaks and detours",
      correct: "Right. The trajectory reveals structure a summary hides.",
      incorrect: "Middle states show streaks and detours.",
      hint: "The journey, not just the end.",
      teach: "Intermediate states reveal streaks and detours in a process.",
    },
  ],
  A3: [
    {
      title: "Off-center start",
      body: "Fair game, start at 2 with boundaries 0 and 10. P(reach 10 before 0)?",
      answer: 0.2,
      correct: "Yes. Fractional position 2/10 = 0.2.",
      incorrect: "Use start divided by the total span.",
      hint: "2 out of 10.",
      teach: "Fair-walk hit probability equals fractional position between boundaries.",
    },
    {
      title: "Scaling the game",
      body: "Doubling both your capital and the goal (fair game) keeps ruin probability...",
      options: ["the same", "lower", "higher"],
      answer: "the same",
      correct: "Right. Only the ratio of distances matters in a fair game.",
      incorrect: "Fair-game ruin depends on ratios, not absolute size.",
      hint: "Same proportions, same odds.",
      teach: "In a fair game, ruin probability depends on ratios, not absolute amounts.",
    },
  ],
  A4: [
    {
      title: "Trials for rarity",
      body: "To estimate a 1-in-10,000 event, you need roughly...",
      options: ["tens of thousands of trials", "ten trials", "one trial"],
      answer: "tens of thousands of trials",
      correct: "Right. You need enough trials to see the event many times.",
      incorrect: "Rare events need very large samples.",
      hint: "Scale trials to the rarity.",
      teach: "Estimating a 1-in-N event reliably needs many multiples of N trials.",
    },
    {
      title: "Where rare lives",
      body: "Rare events sit in a distribution's...",
      options: ["tails", "center", "peak"],
      answer: "tails",
      correct: "Right. The extremes are the tails.",
      incorrect: "Rare extremes are the tails.",
      hint: "Far from the middle.",
      teach: "Rare outcomes live in the tails of the distribution.",
    },
  ],
  A5: [
    {
      title: "Does the start matter?",
      body: "In the long run, the starting state affects the equilibrium mix...",
      options: ["barely, in the long run", "completely", "forever"],
      answer: "barely, in the long run",
      correct: "Right. Equilibrium is set by transitions, not the start.",
      incorrect: "Long-run mix is governed by the transitions.",
      hint: "Transitions dominate eventually.",
      teach: "The stationary mix is determined by transitions, not the starting state.",
    },
    {
      title: "Long-run count",
      body: "Long-run sunny share 0.5 over 40 days → expected sunny days?",
      answer: 20,
      correct: "Yes. 0.5 × 40 = 20.",
      incorrect: "Multiply the share by the days.",
      hint: "Half of 40.",
      teach: "Expected count = long-run share × number of steps.",
    },
  ],
  A6: [
    {
      title: "Smaller bets",
      body: "Halving your bet size (same capital, fair game) usually makes ruin...",
      options: ["less likely", "more likely", "certain"],
      answer: "less likely",
      correct: "Right. Smaller bets mean more cushion before 0.",
      incorrect: "Smaller bets effectively increase your buffer.",
      hint: "More bets to cross the same gap.",
      teach: "Smaller bets relative to capital reduce ruin risk.",
    },
    {
      title: "Deadliest factor",
      body: "Over many bets, the most dangerous factor is a...",
      options: ["negative edge", "large bankroll", "short session"],
      answer: "negative edge",
      correct: "Right. A persistent disadvantage compounds into ruin.",
      incorrect: "A negative edge is the long-run killer.",
      hint: "Small disadvantages compound.",
      teach: "A negative per-bet edge dominates ruin risk over time.",
    },
  ],
  A7: [
    {
      title: "More trials, more tail",
      body: "Doubling the number of trials makes rare tail counts...",
      options: ["roughly double", "disappear", "halve"],
      answer: "roughly double",
      correct: "Right. Counts scale with trials.",
      incorrect: "Counts grow in proportion to trials.",
      hint: "Twice the trials, twice the hits.",
      teach: "Observed counts scale roughly linearly with the number of trials.",
    },
    {
      title: "Ignoring tails",
      body: "Ignoring tails leads to...",
      options: ["underestimating risk", "overestimating risk", "perfect estimates"],
      answer: "underestimating risk",
      correct: "Right. Skipping rare extremes hides real danger.",
      incorrect: "Tails carry risk; ignoring them underestimates it.",
      hint: "Extremes are where disasters live.",
      teach: "Neglecting tails underestimates the chance of extreme outcomes.",
    },
  ],
  A8: [
    {
      title: "Steps to the wall",
      body: "Start at 1 with a boundary at 6. Minimum +1 steps to reach it?",
      answer: 5,
      correct: "Yes. 6 − 1 = 5.",
      incorrect: "Distance from start to boundary.",
      hint: "6 minus 1.",
      teach: "Minimum steps to a boundary equals the distance to it.",
    },
    {
      title: "Before absorption",
      body: "Before hitting a boundary, the walk can still...",
      options: ["wander back and forth", "only go up", "teleport"],
      answer: "wander back and forth",
      correct: "Right. Until absorbed, it moves randomly.",
      incorrect: "It wanders randomly until it is absorbed.",
      hint: "It's still a random walk.",
      teach: "A walk wanders freely until it reaches an absorbing boundary.",
    },
  ],
  A9: [
    {
      title: "Spread of a sum",
      body: "The spread of a sum of many random steps grows like...",
      options: ["sqrt(n)", "n", "n²"],
      answer: "sqrt(n)",
      correct: "Right. The square-root law again.",
      incorrect: "Spread scales as sqrt(n).",
      hint: "The recurring square-root law.",
      teach: "Spread of a sum of random steps grows like sqrt(n).",
    },
    {
      title: "Best workflow",
      body: "The safest way to handle a hard probability problem is to...",
      options: [
        "simulate, then verify with math",
        "guess once",
        "ignore the tails",
      ],
      answer: "simulate, then verify with math",
      correct: "Right. Simulation builds intuition; math confirms it.",
      incorrect: "Pair simulation with a math check.",
      hint: "Use both tools together.",
      teach: "Simulate to build intuition, then confirm with exact reasoning.",
    },
  ],
};

function buildFollowupStep(
  spec: { id: string },
  order: number,
  followup: Followup
): LessonStep {
  const isNumeric = typeof followup.answer === "number";
  return {
    id: `${spec.id}-S${order}`,
    lessonId: spec.id,
    order,
    type: isNumeric ? "input" : "choice",
    title: followup.title,
    body: followup.body,
    interaction: {
      widget: isNumeric ? "number-input" : "choice-input",
      params: isNumeric
        ? { label: "Your answer" }
        : { options: followup.options ?? [] },
      validation: isNumeric
        ? { type: "exact", expected: followup.answer, tolerance: 0.01 }
        : { type: "choice", expected: followup.answer },
    },
    feedback: {
      correct: followup.correct,
      incorrect: followup.incorrect,
      hint: followup.hint,
    },
    teach: followup.teach,
  };
}

const extraLessons: Lesson[] = extraLessonSpecs.map((spec) => ({
  id: spec.id,
  courseId: spec.courseId,
  order: spec.order,
  title: spec.title,
  description: spec.description,
  stepIds: Array.from({ length: 8 }, (_, index) => `${spec.id}-S${index + 1}`),
  unlockAfter: spec.unlockAfter,
  estimatedMinutes: 7,
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
      buildFollowupStep(spec, 3, extraFollowups[spec.id].questions[0]),
      buildFollowupStep(spec, 4, extraFollowups[spec.id].questions[1]),
      {
        id: `${spec.id}-S5`,
        lessonId: spec.id,
        order: 5,
        type: "simulation",
        title: secondSimById[spec.id].title,
        body: secondSimById[spec.id].body,
        interaction: {
          widget: secondSimById[spec.id].widget,
          params: secondSimById[spec.id].params,
          validation: { type: "completion" },
        },
        feedback: {
          correct: secondSimById[spec.id].correct,
          incorrect: "Run this simulation at least once.",
          hint: "Use the run/drop/spin button to start it.",
        },
        teach: secondSimById[spec.id].teach,
      },
      buildFollowupStep(spec, 6, extraFollowups2[spec.id][0]),
      buildFollowupStep(spec, 7, extraFollowups2[spec.id][1]),
      {
        id: `${spec.id}-S8`,
        lessonId: spec.id,
        order: 8,
        type: "explain",
        title: "Lesson checkpoint",
        body: extraFollowups[spec.id].summary,
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

export function getStep(stepId: string): LessonStep | undefined {
  return steps.find((step) => step.id === stepId);
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
