export type GradeLevel = "8" | "9" | "10" | "11" | "12" | "Other";
export type CourseLevel = "Regular" | "Honors" | "AP" | "Elective" | "Other";
export type CourseCategory =
  | "Mathematics"
  | "Science"
  | "English"
  | "History & Social Science"
  | "Computer Science & Technology"
  | "World Languages"
  | "Arts & Other";
export type AssignmentType =
  | "Homework"
  | "Project"
  | "Essay"
  | "Reading"
  | "Quiz"
  | "Test"
  | "Midterm"
  | "Final"
  | "AP Exam"
  | "SAT/ACT"
  | "Presentation"
  | "Lab"
  | "Custom";
export type StudyMethodId =
  | "pomodoro"
  | "sprint"
  | "deep"
  | "active-recall"
  | "practice-testing"
  | "blurting"
  | "feynman"
  | "reading"
  | "writing"
  | "coding"
  | "interleaving"
  | "spaced-review";
export type PricingModel =
  "Official" | "Free" | "Freemium" | "Paid" | "School access";

export interface StudentProfile {
  nickname: string;
  grade: GradeLevel;
  preferredMinutes: number;
  goals: string[];
  tests: string[];
  schoolDayStart?: string;
  schoolDayEnd?: string;
  onboarded: boolean;
}
export interface Course {
  id: string;
  name: string;
  category: CourseCategory;
  level: CourseLevel;
  color: string;
  icon: string;
  teacher?: string;
  period?: string;
  room?: string;
  currentGrade?: string;
  archived: boolean;
  isAP: boolean;
  topics: CourseTopic[];
  createdAt: string;
}
export interface APCourse {
  id: string;
  title: string;
  category: CourseCategory;
  courseUrl: string;
  classroomUrl: string;
  frqUrl?: string;
  units: string[];
}
export interface CourseTopic {
  id: string;
  title: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
}
export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}
export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  type: AssignmentType;
  dueAt: string;
  estimatedMinutes: number;
  priority: 1 | 2 | 3;
  difficulty: 1 | 2 | 3;
  notes: string;
  subtasks: Subtask[];
  completed: boolean;
  createdAt: string;
}
export interface Exam {
  id: string;
  title: string;
  courseId: string;
  examAt: string;
  topics: string[];
}
export interface StudyPlan {
  id: string;
  title: string;
  courseId: string;
  blocks: StudyBlock[];
  createdAt: string;
}
export interface StudyBlock {
  id: string;
  title: string;
  scheduledAt: string;
  minutes: number;
  completed: boolean;
}
export interface StudyMethod {
  id: StudyMethodId;
  name: string;
  explanation: string;
  bestFor: string;
  notIdealFor: string;
  steps: string[];
  example: string;
  minutes: number[];
  commonMistake: string;
}
export interface StudySession {
  id: string;
  courseId: string;
  assignmentId?: string;
  topic: string;
  goal: string;
  methodId: StudyMethodId;
  plannedMinutes: number;
  actualMinutes: number;
  completedAt: string;
  notes: string;
  recallNotes?: string;
  attempted?: number;
  correct?: number;
  missedTopics?: string[];
  rewardId?: string;
  stardustEarned: number;
  demo: boolean;
}
export interface ActiveSession {
  id: string;
  courseId: string;
  assignmentId?: string;
  topic: string;
  goal: string;
  methodId: StudyMethodId;
  plannedMinutes: number;
  totalSeconds: number;
  remainingSeconds: number;
  startedAt: number;
  endAt: number | null;
  paused: boolean;
  demo: boolean;
  audioId: string;
  pomodoro?: PomodoroState;
}
export interface PomodoroState {
  round: number;
  totalRounds: number;
  phase: "focus" | "break" | "long-break";
  focusSeconds: number;
  breakSeconds: number;
  longBreakSeconds: number;
}
export interface ReviewItem {
  id: string;
  courseId: string;
  topic: string;
  createdAt: string;
  nextReviewAt: string;
  confidence: 1 | 2 | 3 | 4 | 5;
  notes: string;
  history: string[];
  status: "active" | "completed" | "archived";
}
export interface MistakeEntry {
  id: string;
  courseId: string;
  topic: string;
  source: string;
  questionType: string;
  whatWentWrong: string;
  correctReasoning: string;
  errorCategory: string;
  followUpAt: string;
  resolved: boolean;
}
export interface ResourceProvider {
  name: string;
  official: boolean;
}
export interface Resource {
  id: string;
  name: string;
  provider: ResourceProvider;
  url: string;
  supportedCourses: string[];
  subjects: CourseCategory[];
  type: string;
  pricingModel: PricingModel;
  accountRequired: boolean;
  bestFor: string;
  limitations: string;
  mobile: boolean;
  lastVerified: string;
  official: boolean;
}
export interface ResourceBookmark {
  resourceId: string;
  helpful: boolean;
  hidden: boolean;
  courseId?: string;
}
export interface AudioTrack {
  id: string;
  name: string;
  description: string;
  asset?: number;
  license: string;
}
export interface Reward {
  id: string;
  name: string;
  slot: keyof EquippedItems;
  cost: number;
  level: number;
  color: string;
  description: string;
}
export type ShopItem = Reward;
export interface InventoryItem {
  rewardId: string;
  quantity: number;
  equipped: boolean;
}
export interface EquippedItems {
  desk?: string;
  chair?: string;
  bookshelf?: string;
  leftPlant?: string;
  rightPlant?: string;
  largeStructure?: string;
  lamp?: string;
  groundDecoration?: string;
  skyEffect?: string;
  sprigAccessory?: string;
}
export interface GardenState {
  stardust: number;
  level: number;
  inventory: InventoryItem[];
  equipped: EquippedItems;
  pendingRewardId?: string;
}
export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt?: string;
}
export interface Statistics {
  totalMinutes: number;
  weeklyMinutes: number;
  sessions: number;
  averageMinutes: number;
  byCourse: Record<string, number>;
  byMethod: Partial<Record<StudyMethodId, number>>;
  currentStreak: number;
  longestStreak: number;
  reviewsCompleted: number;
  questionsAttempted: number;
}
export interface AppSettings {
  reducedMotion: boolean;
  highContrast: boolean;
  haptics: boolean;
  defaultAudioId: string;
  volume: number;
  continueAudioOnBreak: boolean;
}
export interface AppData {
  version: 2;
  profile: StudentProfile;
  courses: Course[];
  assignments: Assignment[];
  sessions: StudySession[];
  activeSession: ActiveSession | null;
  reviews: ReviewItem[];
  mistakes: MistakeEntry[];
  bookmarks: ResourceBookmark[];
  garden: GardenState;
  settings: AppSettings;
}
