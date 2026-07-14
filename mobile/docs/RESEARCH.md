# Orbit Garden product research

Orbit Garden is a student project, not a clinical or educational intervention. This document records the reasoning behind the MVP and the limits of that reasoning. It summarizes sources rather than copying them, and it deliberately uses cautious language such as “may help” and “often useful.”

## Why combine these tools?

Students often have to move between a school calendar or LMS, notes, flashcards, timers, practice sites, videos, and exam portals. This project treats that fragmentation as a design problem: one local app can remember the relationship between a class, an assignment, a concrete study goal, the resource used, and the next review date. Orbit Garden does not replace teachers, official course systems, or specialist learning platforms; it provides a calmer launch point for them.

Research on school task-management interfaces has specifically examined how homework titles, deadlines, estimated time, and constrained weekly schedules affect planning. That informed the assignment model, transparent priority explanation, and the decision not to fill every available minute automatically.

The OECD’s review of digital technology and learning also emphasizes that design and implementation matter and that digital tools can create cognitive overload. Orbit Garden therefore keeps the primary navigation to five tabs, makes setup skippable, and avoids a social feed, chat, or engagement-maximizing notifications.

## Why retrieval and spacing tools?

Spacing and retrieval practice have a substantial research literature, including a modern review in *Nature Reviews Psychology*. Classroom research is more context-dependent than a slogan like “active recall always works” would suggest, so the app presents study methods as options and records gaps rather than promising outcomes.

The review queue is intentionally understandable: a student selects tomorrow, three days, one week, two weeks, or one month. It is not a hidden algorithm and does not claim to diagnose memory strength.

## Why practice reflection?

Practice Testing records attempted questions, correct answers, missed topics, and error categories. The purpose is to direct the next session toward reasoning gaps. The app avoids turning one practice score into a prediction of a course grade or AP score.

## Why price and access labels?

Academic resource directories often mix official, free, freemium, paid, and school-provided tools. Orbit Garden labels these categories in the data itself and adds limitations beside each recommendation. It does not use affiliate links or exact price claims. Every external entry has a `lastVerified` field because provider access and pricing can change.

## Product decisions drawn from the brief and sources

- Keep task entry short, with optional advanced fields.
- Use due date, estimated duration, priority, difficulty, and overdue review status in a visible rule-based recommendation.
- Require a concrete study goal or offer an editable course-specific example.
- Support retrieval practice, spaced review, practice questions, writing, reading, coding, and timed work without claiming one method is universal.
- Use native-feeling bottom tabs and offline local data instead of requiring an account.
- Reward any completed study session and never remove earned items after inactivity.
- Open official and third-party resources externally rather than embedding or copying them.
- Show the limitations of commercial and user-generated resources.

## Limitations

This is not original user research with a representative sample of U.S. high-school students. Several broader sources include university contexts, so their findings cannot simply be generalized to every ninth- through twelfth-grade student. A future version should be tested with students, teachers, accessibility reviewers, and school counselors, with appropriate consent and privacy safeguards.

## Sources

- Carpenter, Pan, and Butler, “[The science of effective learning with spacing and retrieval practice](https://doi.org/10.1038/s44159-022-00089-1),” *Nature Reviews Psychology* (2022).
- Agarwal et al., “[Retrieval Practice in Classroom Settings: A Review of Applied Research](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2019.00005/full),” *Frontiers in Education* (2019).
- Gueudet et al., “[What type of information displayed on digital scheduling software facilitates reflective planning tasks for students?](https://www.sciencedirect.com/science/article/pii/S0747563211002494),” *Computers in Human Behavior* (2012).
- OECD, “[The impact of digital technologies on students’ learning](https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/09/the-impact-of-digital-technologies-on-students-learning_14095366/9997e7b3-en.pdf)” (2025).
- College Board, “[AP Students](https://apstudents.collegeboard.org/)” and “[My AP](https://myap.collegeboard.org/)” for official AP resource destinations.
- Expo, “[SDK 54 reference](https://docs.expo.dev/versions/v54.0.0/)” for the supported mobile implementation.
