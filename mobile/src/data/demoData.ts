import type {
  AppData,
  Assignment,
  Course,
  ReviewItem,
  StudySession,
} from "@/src/types";

const now = new Date();
const inDays = (days: number, hour = 16) => {
  const date = new Date(now);
  date.setDate(now.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};
export const demoCourses: Course[] = [
  ["course-apbio", "AP Biology", "Science", "AP", "#77B892", "leaf", true],
  [
    "course-apush",
    "AP United States History",
    "History & Social Science",
    "AP",
    "#D38C78",
    "book",
    true,
  ],
  [
    "course-algebra",
    "Algebra II",
    "Mathematics",
    "Honors",
    "#7EB5D6",
    "calculator",
    false,
  ],
  [
    "course-english",
    "English 10",
    "English",
    "Honors",
    "#B292D7",
    "pen-tool",
    false,
  ],
  [
    "course-spanish",
    "Spanish II",
    "World Languages",
    "Regular",
    "#E3B866",
    "languages",
    false,
  ],
  [
    "course-cs",
    "Web Development",
    "Computer Science & Technology",
    "Elective",
    "#70CFC3",
    "code",
    false,
  ],
].map(
  ([id, name, category, level, color, icon, isAP]) =>
    ({
      id,
      name,
      category,
      level,
      color,
      icon,
      isAP,
      archived: false,
      topics: [],
      createdAt: now.toISOString(),
    }) as Course,
);
export const demoAssignments: Assignment[] = [
  {
    id: "demo-a1",
    title: "Cell communication practice",
    courseId: "course-apbio",
    type: "Homework",
    dueAt: inDays(1),
    estimatedMinutes: 35,
    priority: 3,
    difficulty: 2,
    notes: "Focus on signal transduction.",
    subtasks: [],
    completed: false,
    createdAt: now.toISOString(),
  },
  {
    id: "demo-a2",
    title: "DBQ outline",
    courseId: "course-apush",
    type: "Essay",
    dueAt: inDays(3),
    estimatedMinutes: 50,
    priority: 3,
    difficulty: 3,
    notes: "Use at least six documents.",
    subtasks: [
      { id: "s1", title: "Read documents", completed: true },
      { id: "s2", title: "Group evidence", completed: false },
      { id: "s3", title: "Draft thesis", completed: false },
    ],
    completed: false,
    createdAt: now.toISOString(),
  },
  {
    id: "demo-a3",
    title: "Quadratic functions quiz",
    courseId: "course-algebra",
    type: "Quiz",
    dueAt: inDays(2, 9),
    estimatedMinutes: 45,
    priority: 3,
    difficulty: 2,
    notes: "",
    subtasks: [],
    completed: false,
    createdAt: now.toISOString(),
  },
];
export const demoReviews: ReviewItem[] = [
  {
    id: "demo-r1",
    courseId: "course-apbio",
    topic: "Cell signaling pathways",
    createdAt: inDays(-4),
    nextReviewAt: inDays(0),
    confidence: 2,
    notes: "Review the steps and a specific example.",
    history: [],
    status: "active",
  },
];
export const demoSessions: StudySession[] = Array.from(
  { length: 6 },
  (_, index) =>
    ({
      id: `demo-s${index}`,
      courseId: demoCourses[index % demoCourses.length].id,
      topic: [
        "Cell energetics",
        "Reconstruction",
        "Quadratics",
        "Rhetorical analysis",
        "Past tense",
        "CSS grid",
      ][index],
      goal: "Complete a focused review",
      methodId: index % 2 ? "active-recall" : "pomodoro",
      plannedMinutes: 25,
      actualMinutes: 25,
      completedAt: inDays(-index),
      notes: "",
      stardustEarned: 60,
      demo: true,
    }) as StudySession,
);

export const demoProfile = {
  nickname: "Nova",
  grade: "10" as const,
  preferredMinutes: 25,
  goals: ["Stay ahead of assignments", "Prepare calmly for AP exams"],
  tests: ["AP Exams"],
  schoolDayStart: "08:00",
  schoolDayEnd: "15:00",
  onboarded: true,
};
export const demoData: Partial<AppData> = {
  profile: demoProfile,
  courses: demoCourses,
  assignments: demoAssignments,
  sessions: demoSessions,
  reviews: demoReviews,
  garden: {
    stardust: 420,
    level: 4,
    inventory: [
      { rewardId: "moon-desk", quantity: 1, equipped: true },
      { rewardId: "glow-fern", quantity: 1, equipped: true },
      { rewardId: "orbit-books", quantity: 1, equipped: true },
      { rewardId: "star-lamp", quantity: 1, equipped: true },
      { rewardId: "tiny-scope", quantity: 1, equipped: true },
    ],
    equipped: {
      desk: "moon-desk",
      leftPlant: "glow-fern",
      bookshelf: "orbit-books",
      lamp: "star-lamp",
      largeStructure: "tiny-scope",
    },
  },
};
