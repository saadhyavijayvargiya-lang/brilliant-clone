import { courses, getLessonsForCourse } from "../content/course";
import type { AppProgress } from "../types/content";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export function getAchievements(progress: AppProgress): Achievement[] {
  const completedSteps = Object.values(progress.lessonProgress).reduce(
    (sum, lesson) => sum + lesson.completedStepIds.length,
    0
  );
  const completedLessons = progress.completedLessons.length;
  const activeDays = (progress.activeDates ?? []).length;
  const courseComplete = (courseId: string) =>
    getLessonsForCourse(courseId).every((lesson) =>
      progress.completedLessons.includes(lesson.id)
    );

  return [
    {
      id: "first-step",
      title: "First Step",
      description: "Complete your first exercise.",
      unlocked: completedSteps >= 1,
    },
    {
      id: "hot-hand",
      title: "Hot Hand",
      description: "Reach a 5-question correct streak.",
      unlocked: (progress.longestCorrectStreak ?? 0) >= 5,
    },
    {
      id: "perfect-ten",
      title: "Perfect Ten",
      description: "Reach a 10-question correct streak.",
      unlocked: (progress.longestCorrectStreak ?? 0) >= 10,
    },
    {
      id: "first-lesson",
      title: "Lesson Finisher",
      description: "Finish any lesson.",
      unlocked: completedLessons >= 1,
    },
    {
      id: "five-lessons",
      title: "Course Climber",
      description: "Finish five lessons.",
      unlocked: completedLessons >= 5,
    },
    {
      id: "ten-lessons",
      title: "Orbit Jumper",
      description: "Finish ten lessons.",
      unlocked: completedLessons >= 10,
    },
    {
      id: "showed-up",
      title: "Showed Up",
      description: "Study on three different days.",
      unlocked: activeDays >= 3,
    },
    {
      id: "week-streak",
      title: "Seven-Day Signal",
      description: "Build a 7-day login streak.",
      unlocked: (progress.streakCount ?? 0) >= 7,
    },
    {
      id: "beginner-path",
      title: "Beginner Path",
      description: "Complete Beginner Probability.",
      unlocked: courseComplete("beginner-probability"),
    },
    {
      id: "intermediate-path",
      title: "Intermediate Path",
      description: "Complete Intermediate Probability.",
      unlocked: courseComplete("intermediate-probability"),
    },
    {
      id: "advanced-path",
      title: "Advanced Path",
      description: "Complete Advanced Probability.",
      unlocked: courseComplete("advanced-probability"),
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Complete half of all available lessons.",
      unlocked:
        completedLessons >=
        Math.ceil(
          courses.reduce(
            (sum, course) => sum + getLessonsForCourse(course.id).length,
            0
          ) / 2
        ),
    },
    {
      id: "simulation-fan",
      title: "Simulation Fan",
      description: "Complete 25 total exercises.",
      unlocked: completedSteps >= 25,
    },
    {
      id: "probability-pro",
      title: "Probability Pro",
      description: "Complete every current lesson.",
      unlocked: courses.every((course) => courseComplete(course.id)),
    },
  ];
}

export function getLeaderboard(progress: AppProgress) {
  return [
    {
      name: progress.displayName || "You",
      correctStreak: progress.longestCorrectStreak ?? 0,
      loginStreak: progress.streakCount ?? 0,
      experiencePoints: progress.experiencePoints ?? 0,
      isCurrentUser: true,
    },
    { name: "Nova", correctStreak: 18, loginStreak: 12, experiencePoints: 4280 },
    { name: "Kai", correctStreak: 14, loginStreak: 21, experiencePoints: 5120 },
    { name: "Mira", correctStreak: 11, loginStreak: 8, experiencePoints: 3190 },
    { name: "Sol", correctStreak: 9, loginStreak: 15, experiencePoints: 2760 },
  ].sort((a, b) => b.correctStreak - a.correctStreak);
}

export function getLoginLeaderboard(progress: AppProgress) {
  return [...getLeaderboard(progress)].sort((a, b) => b.loginStreak - a.loginStreak);
}

export function getXpLeaderboard(progress: AppProgress) {
  return [...getLeaderboard(progress)].sort(
    (a, b) => b.experiencePoints - a.experiencePoints
  );
}
