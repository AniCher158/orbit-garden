import type { Assignment, Course, ReviewItem } from "@/src/types";

export interface Recommendation {
  assignment?: Assignment;
  review?: ReviewItem;
  score: number;
  reason: string;
}
export function prioritizeWork(
  assignments: Assignment[],
  reviews: ReviewItem[],
  courses: Course[],
  now = new Date(),
): Recommendation | null {
  const options: Recommendation[] = assignments
    .filter((item) => !item.completed)
    .map((assignment) => {
      const due = new Date(assignment.dueAt).getTime();
      const hours = (due - now.getTime()) / 3600000;
      const urgency =
        hours < 0
          ? 12
          : hours <= 24
            ? 10
            : hours <= 72
              ? 7
              : hours <= 168
                ? 4
                : 1;
      const score =
        urgency +
        assignment.priority * 2 +
        assignment.difficulty +
        Math.min(3, assignment.estimatedMinutes / 30);
      const course =
        courses.find((item) => item.id === assignment.courseId)?.name ??
        "this course";
      const timing =
        hours < 0
          ? "is overdue"
          : hours <= 24
            ? "is due within a day"
            : hours <= 72
              ? "is due in the next few days"
              : "is coming up";
      return {
        assignment,
        score,
        reason: `Recommended because ${assignment.title} for ${course} ${timing} and is marked priority ${assignment.priority}.`,
      };
    });
  reviews
    .filter(
      (review) =>
        review.status === "active" && new Date(review.nextReviewAt) <= now,
    )
    .forEach((review) => {
      const course =
        courses.find((item) => item.id === review.courseId)?.name ??
        "this course";
      options.push({
        review,
        score: 8 + (5 - review.confidence),
        reason: `Recommended because ${review.topic} in ${course} is due for review and confidence is ${review.confidence} out of 5.`,
      });
    });
  return options.sort((a, b) => b.score - a.score)[0] ?? null;
}
