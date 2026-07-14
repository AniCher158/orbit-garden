# Orbit Garden Mobile

> Grow your world while you study.

Orbit Garden is a genuine Expo and React Native study companion for high-school students. It connects courses, assignments, exams, study methods, focused sessions, spaced review, carefully labeled academic resources, and a cozy garden grown alongside Sprig—an original alien botanist.

The same codebase runs on iOS, Android, and Expo Web. Core student data stays on the device through versioned AsyncStorage and does not require an account, API key, or remote database.

**Playable web demo:** _Not deployed yet. The project is ready for Expo Web export and EAS Hosting._

## Target audience

The primary audience is U.S. students in grades 9–12, including honors and AP students and students preparing for the SAT or ACT. Advanced middle-school students and independent academic projects also fit. The app intentionally excludes workplace tasks, exercise, sleep, chores, and social productivity features.

## Screenshots

Add mobile screenshots to `docs/screenshots/` after running the Expo Web or native build:

1. Home with Sprig’s garden
2. Study setup and timer
3. AP course resource hub
4. Completed-session reward reveal

## Complete MVP flows

### Academic-to-garden vertical slice

1. Add a searchable or custom high-school course.
2. Add homework, a test, essay, project, reading, presentation, or lab.
3. Generate and edit a deterministic assignment breakdown.
4. Start a concrete Pomodoro, Active Recall, Practice Testing, Sprint, or Deep Study goal.
5. Pause, background, restore, resume, or safely cancel the timestamp-based timer.
6. Reflect on the session and collect Stardust plus a garden item.
7. Equip the item in a predefined garden slot.
8. Reopen everything from local storage.

### AP and review vertical slice

1. Add an AP course from the centralized AP catalog.
2. Open its course hub and editable unit framework.
3. Open official College Board destinations externally.
4. Add a unit to the review queue.
5. Start a Spaced Review or Active Recall session.
6. Record the completed review in the study journal.

## Features

- Short, skippable onboarding with no sensitive identity fields
- Searchable high-school and centralized AP course catalogs
- Custom courses, levels, colors, teacher, period, and optional grade support
- Academic planner with editable assignment templates
- Transparent rule-based “recommended next” explanations
- Four-round Pomodoro with short and long breaks
- Short Sprint, Deep Study, Active Recall, Practice Testing, and seven additional study methods
- Accurate timestamp timer restoration across app backgrounding
- Three original procedural ambient loops plus silent mode, mute, and volume
- Course hubs with study time, upcoming work, topics, reviews, and mapped resources
- Official AP links, unit checklists, and rule-based sample review plans
- Resource library with official/free/freemium/paid/school-access labels
- Review queue with complete, snooze, and session actions
- Journal and reflection-focused statistics
- Original SVG Sprig mascot and cross-platform garden illustration
- Stardust, inventory, predefined placement slots, and no-real-money shop
- Ten-second reviewer demo isolated from real statistics, streaks, journal, and rewards
- Export, validated import, corruption fallback, migrations, and clear-all confirmation
- Reduced-motion, high-contrast, haptics, screen-reader labels, and web keyboard support foundations

## Study methods

Pomodoro, Short Sprint, Deep Study, Active Recall, Practice Testing, Blurting, Feynman Explanation, Reading & Summary, Essay Planning, Coding Session, Interleaving, and Spaced Review. The language is deliberately cautious: methods may help in the right context and are not guarantees.

## Supported courses

The starter catalog includes mathematics, science, English, history and social science, computer science and technology, world languages, and arts/other courses. Course names remain editable because schools use different naming systems. AP names and starter unit frameworks live in `src/data/apCourses.ts` rather than UI components.

## Resource directory

Resources are metadata and external links only. Orbit Garden does not scrape or embed study content. Official destinations are prioritized, and commercial tools clearly state whether they are freemium, paid, or dependent on school access. Each entry contains `lastVerified`, `pricingModel`, account requirements, best use, and limitations.

Pricing and availability can change. Check the provider before relying on a feature or access tier. Orbit Garden has no affiliate links.

## Technology

- Expo SDK 54 and React Native 0.81
- React 19 and TypeScript
- Expo Router and React Native Web
- Zustand with AsyncStorage persistence
- React Native Reanimated and SVG
- Expo Audio, Haptics, Linear Gradient, and Status Bar
- Jest Expo and React Native Testing Library

SDK 54 was chosen from Expo’s supported stable path because the current transition guidance identifies it as the Expo Go-compatible option for physical devices.

## Architecture

```text
mobile/
├── app/                  Expo Router tabs, stacks, modals, and flows
├── assets/audio/         Original procedural ambient loops
├── assets/brand/         Editable icon source
├── docs/RESEARCH.md      Product rationale and sources
└── src/
    ├── components/       Cross-platform UI, Sprig, garden, audio
    ├── data/             Courses, AP catalog, resources, methods, shop
    ├── lib/              Priority, timer, rewards, review, plans, stats
    ├── store/            Versioned Zustand + AsyncStorage store
    ├── tests/            Deterministic logic tests
    └── types/            Academic, session, resource, and garden models
```

## Local setup

Requirements: Node.js 20.19 or newer and the Expo Go app for SDK 54.

```bash
cd mobile
npm install
npx expo start
```

Then scan the terminal QR code with Expo Go, or press `i`, `a`, or `w` for iOS simulator, Android emulator, or web.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run test
npm run export:web
```

The tests cover assignment priority, Pomodoro transitions, timer restoration, demo isolation, Stardust, shop purchases, study-plan generation, spaced review, streaks/statistics, resource filtering, access labels, storage migration, and corrupted data.

## Expo Web and EAS

```bash
npm run export:web
npx eas-cli@latest login
npx eas-cli@latest deploy
```

For future development builds:

```bash
npx eas-cli@latest build --profile development --platform ios
npx eas-cli@latest build --profile development --platform android
```

Replace the placeholder bundle identifiers in `app.json` before distributing native builds.

## Accessibility and privacy

The design uses large touch targets, screen-reader labels, status text in addition to color, a dark high-contrast palette, reduced-motion and high-contrast preferences, no required audio, and keyboard-compatible web controls. Student records remain local. The app has no analytics, authentication, school credential fields, advertising, or cloud sync.

## Audio credits

Rainy Library, Quiet Observatory, and Brown Noise were generated from filtered noise and sine waves specifically for Orbit Garden. They are original project assets released under the repository’s MIT License. There is no copyrighted music and no autoplay before the user begins a session.

## Limitations and roadmap

The MVP does not include cloud sync, cross-device access, local notification delivery, app-store distribution, a full editable calendar, every AP subject’s detailed unit framework, or teacher/LMS integrations. Future phases may add more mistake-log UI, editable AP exam dates, local notifications, expanded catalogs, native build testing, and opt-in file-picker imports.

Read [RESEARCH.md](docs/RESEARCH.md) for product reasoning and evidence limits.

## Hack Club context

Orbit Garden was built as a Hack Club Sunbeam and Stardance submission. The goal is a useful, understandable student project with a playful world—not a claim to replace teachers or guarantee academic results.

## License

MIT, matching the repository root [LICENSE](../LICENSE).
