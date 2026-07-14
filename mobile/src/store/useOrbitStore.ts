import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";
import { completeSessionReward, purchaseReward } from "@/src/lib/rewards";
import { migrateAppData, parseAppData } from "@/src/lib/persistence";
import type {
  ActiveSession,
  AppData,
  AppSettings,
  Assignment,
  Course,
  EquippedItems,
  GardenState,
  ReviewItem,
  StudySession,
  StudentProfile,
} from "@/src/types";

const STORAGE_KEY = "orbit-garden-mobile:v2";
const isStaticRender = typeof globalThis.window === "undefined";
export const defaultProfile: StudentProfile = {
  nickname: "",
  grade: "9",
  preferredMinutes: 25,
  goals: [],
  tests: [],
  schoolDayStart: "08:00",
  schoolDayEnd: "15:00",
  onboarded: false,
};
export const defaultGarden: GardenState = {
  stardust: 0,
  level: 1,
  inventory: [],
  equipped: {},
};
export const defaultSettings: AppSettings = {
  reducedMotion: false,
  highContrast: false,
  haptics: true,
  defaultAudioId: "none",
  volume: 0.45,
  continueAudioOnBreak: true,
};

const safeStorage: StateStorage = {
  getItem: async (name) => {
    if (isStaticRender) return null;
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      await AsyncStorage.removeItem(name);
      return null;
    }
  },
  setItem: (name, value) =>
    isStaticRender ? Promise.resolve() : AsyncStorage.setItem(name, value),
  removeItem: (name) =>
    isStaticRender ? Promise.resolve() : AsyncStorage.removeItem(name),
};

interface OrbitState extends AppData {
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  finishOnboarding: (profile: StudentProfile) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  addAssignment: (assignment: Assignment) => void;
  toggleAssignment: (id: string) => void;
  setActiveSession: (session: ActiveSession | null) => void;
  updateActiveSession: (patch: Partial<ActiveSession>) => void;
  completeStudySession: (session: StudySession) => {
    rewardId?: string;
    earned: number;
  };
  addReview: (review: ReviewItem) => void;
  completeReview: (id: string, nextReviewAt?: string) => void;
  addBookmark: (resourceId: string, courseId?: string) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  equipReward: (rewardId: string, slot: keyof EquippedItems) => void;
  buyReward: (rewardId: string, cost: number) => boolean;
  clearPendingReward: () => void;
  clearAllData: () => Promise<void>;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const base: AppData = {
  version: 2,
  profile: defaultProfile,
  courses: [],
  assignments: [],
  sessions: [],
  activeSession: null,
  reviews: [],
  mistakes: [],
  bookmarks: [],
  garden: defaultGarden,
  settings: defaultSettings,
};

export const useOrbitStore = create<OrbitState>()(
  persist(
    (set, get) => ({
      ...base,
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      finishOnboarding: (profile) =>
        set({ profile: { ...profile, onboarded: true } }),
      addCourse: (course) =>
        set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (id, patch) =>
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === id ? { ...course, ...patch } : course,
          ),
        })),
      addAssignment: (assignment) =>
        set((state) => ({ assignments: [assignment, ...state.assignments] })),
      toggleAssignment: (id) =>
        set((state) => ({
          assignments: state.assignments.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item,
          ),
        })),
      setActiveSession: (activeSession) => set({ activeSession }),
      updateActiveSession: (patch) =>
        set((state) => ({
          activeSession: state.activeSession
            ? { ...state.activeSession, ...patch }
            : null,
        })),
      completeStudySession: (session) => {
        const result = completeSessionReward(session, get().garden);
        if (!session.demo)
          set((state) => ({
            sessions: [
              {
                ...session,
                rewardId: result.reward.id,
                stardustEarned: result.earned,
              },
              ...state.sessions,
            ],
            garden: result.garden,
            activeSession: null,
          }));
        else set({ activeSession: null });
        return { rewardId: result.reward.id, earned: result.earned };
      },
      addReview: (review) =>
        set((state) => ({ reviews: [review, ...state.reviews] })),
      completeReview: (id, nextReviewAt) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.id === id
              ? {
                  ...review,
                  history: [...review.history, new Date().toISOString()],
                  nextReviewAt: nextReviewAt ?? review.nextReviewAt,
                  status: nextReviewAt ? "active" : "completed",
                }
              : review,
          ),
        })),
      addBookmark: (resourceId, courseId) =>
        set((state) =>
          state.bookmarks.some((item) => item.resourceId === resourceId)
            ? {
                bookmarks: state.bookmarks.filter(
                  (item) => item.resourceId !== resourceId,
                ),
              }
            : {
                bookmarks: [
                  ...state.bookmarks,
                  { resourceId, helpful: false, hidden: false, courseId },
                ],
              },
        ),
      updateSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),
      equipReward: (rewardId, slot) =>
        set((state) => ({
          garden: {
            ...state.garden,
            equipped: { ...state.garden.equipped, [slot]: rewardId },
            inventory: state.garden.inventory.map((item) => ({
              ...item,
              equipped:
                item.rewardId === rewardId
                  ? true
                  : item.equipped &&
                    state.garden.equipped[slot] !== item.rewardId,
            })),
          },
        })),
      buyReward: (rewardId, cost) => {
        const before = get().garden;
        const after = purchaseReward(before, rewardId, cost);
        if (after === before) return false;
        set({ garden: after });
        return true;
      },
      clearPendingReward: () =>
        set((state) => ({
          garden: { ...state.garden, pendingRewardId: undefined },
        })),
      clearAllData: async () => {
        set({ ...base, hydrated: true });
        await AsyncStorage.removeItem(STORAGE_KEY);
      },
      exportData: () =>
        JSON.stringify({ ...get(), hydrated: undefined }, null, 2),
      importData: (json) => {
        const data = parseAppData(json);
        if (!data) return false;
        set({
          ...migrateAppData(data, base),
          activeSession: null,
          hydrated: true,
        });
        return true;
      },
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        version: state.version,
        profile: state.profile,
        courses: state.courses,
        assignments: state.assignments,
        sessions: state.sessions,
        activeSession: state.activeSession,
        reviews: state.reviews,
        mistakes: state.mistakes,
        bookmarks: state.bookmarks,
        garden: state.garden,
        settings: state.settings,
      }),
      migrate: (persisted, version) =>
        version < 2
          ? (migrateAppData(persisted as Partial<AppData>, base) as OrbitState)
          : (persisted as OrbitState),
      onRehydrateStorage: () => (state, error) => {
        if (error) safeStorage.removeItem(STORAGE_KEY);
        state?.setHydrated(true);
      },
    },
  ),
);

export function resetOrbitStoreForTests(data: Partial<AppData> = {}) {
  useOrbitStore.setState({ ...base, ...data, hydrated: true });
}
