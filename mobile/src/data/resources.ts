import type { Resource } from "@/src/types";

export const resourceFreshnessNotice =
  "Third-party pricing, features, and availability can change. Check the provider before relying on a resource.";
const verified = "2026-07-13";

export const resources: Resource[] = [
  {
    id: "college-board-ap",
    name: "AP Students",
    provider: { name: "College Board", official: true },
    url: "https://apstudents.collegeboard.org/",
    supportedCourses: ["AP"],
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "History & Social Science",
      "Computer Science & Technology",
      "World Languages",
      "Arts & Other",
    ],
    type: "Official course materials",
    pricingModel: "Official",
    accountRequired: false,
    bestFor:
      "Official AP course descriptions, exam information, and preparation guidance",
    limitations:
      "Some AP Classroom features require enrollment in a class section.",
    mobile: true,
    lastVerified: verified,
    official: true,
  },
  {
    id: "ap-classroom",
    name: "AP Classroom",
    provider: { name: "College Board", official: true },
    url: "https://myap.collegeboard.org/",
    supportedCourses: ["AP"],
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "History & Social Science",
      "Computer Science & Technology",
      "World Languages",
      "Arts & Other",
    ],
    type: "Official practice",
    pricingModel: "School access",
    accountRequired: true,
    bestFor:
      "Teacher-assigned AP Daily videos, topic questions, and progress checks",
    limitations:
      "Access depends on course enrollment and teacher assignments. Never enter College Board credentials into Orbit Garden.",
    mobile: true,
    lastVerified: verified,
    official: true,
  },
  {
    id: "khan",
    name: "Khan Academy",
    provider: { name: "Khan Academy", official: false },
    url: "https://www.khanacademy.org/",
    supportedCourses: [
      "Algebra I",
      "Geometry",
      "Algebra II",
      "Precalculus",
      "Calculus",
      "Statistics",
      "Biology",
      "Chemistry",
      "Physics",
      "SAT",
    ],
    subjects: ["Mathematics", "Science"],
    type: "Videos and practice",
    pricingModel: "Free",
    accountRequired: false,
    bestFor:
      "Concept review and guided practice in supported math and science topics",
    limitations: "Course coverage varies; confirm alignment with your class.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "openstax",
    name: "OpenStax",
    provider: { name: "Rice University", official: false },
    url: "https://openstax.org/subjects",
    supportedCourses: [
      "Algebra",
      "Precalculus",
      "Calculus",
      "Statistics",
      "Biology",
      "Chemistry",
      "Physics",
      "United States History",
    ],
    subjects: ["Mathematics", "Science", "History & Social Science"],
    type: "Open textbooks",
    pricingModel: "Free",
    accountRequired: false,
    bestFor: "Complete openly licensed textbooks and worked examples",
    limitations: "May not match your teacher’s sequence or terminology.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "phet",
    name: "PhET Interactive Simulations",
    provider: { name: "University of Colorado Boulder", official: false },
    url: "https://phet.colorado.edu/",
    supportedCourses: [
      "Physics",
      "Chemistry",
      "Biology",
      "Earth Science",
      "Mathematics",
    ],
    subjects: ["Mathematics", "Science"],
    type: "Simulations",
    pricingModel: "Free",
    accountRequired: false,
    bestFor:
      "Visualizing science and math relationships through interactive models",
    limitations:
      "A simulation supplements, rather than replaces, problem practice.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "desmos",
    name: "Desmos Graphing Calculator",
    provider: { name: "Desmos Studio", official: false },
    url: "https://www.desmos.com/calculator",
    supportedCourses: [
      "Algebra I",
      "Geometry",
      "Algebra II",
      "Precalculus",
      "Calculus",
      "Statistics",
    ],
    subjects: ["Mathematics"],
    type: "Math tool",
    pricingModel: "Free",
    accountRequired: false,
    bestFor: "Graphing functions and exploring transformations",
    limitations: "Check which calculator features are permitted on your exam.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "purdue-owl",
    name: "Purdue OWL",
    provider: { name: "Purdue University", official: false },
    url: "https://owl.purdue.edu/",
    supportedCourses: ["English", "Writing", "Research"],
    subjects: ["English", "Arts & Other"],
    type: "Writing support",
    pricingModel: "Free",
    accountRequired: false,
    bestFor:
      "Citation formats, research writing, grammar, and rhetorical guidance",
    limitations: "Always follow your teacher’s specific citation requirements.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "mdn",
    name: "MDN Web Docs",
    provider: { name: "Mozilla", official: false },
    url: "https://developer.mozilla.org/",
    supportedCourses: [
      "Web Development",
      "Programming Fundamentals",
      "AP Computer Science Principles",
    ],
    subjects: ["Computer Science & Technology"],
    type: "Coding documentation",
    pricingModel: "Free",
    accountRequired: false,
    bestFor: "Authoritative web-platform reference and learning guides",
    limitations: "Some reference pages assume prior programming knowledge.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "freecodecamp",
    name: "freeCodeCamp",
    provider: { name: "freeCodeCamp", official: false },
    url: "https://www.freecodecamp.org/",
    supportedCourses: [
      "Web Development",
      "Programming Fundamentals",
      "Data Science",
    ],
    subjects: ["Computer Science & Technology"],
    type: "Coding practice",
    pricingModel: "Free",
    accountRequired: true,
    bestFor: "Structured coding lessons and hands-on practice",
    limitations: "Its curriculum may not align directly with a school course.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "fiveable",
    name: "Fiveable",
    provider: { name: "Fiveable", official: false },
    url: "https://fiveable.me/",
    supportedCourses: ["AP"],
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "History & Social Science",
      "Computer Science & Technology",
      "World Languages",
      "Arts & Other",
    ],
    type: "Study guides",
    pricingModel: "Freemium",
    accountRequired: false,
    bestFor: "AP-focused review guides and community study features",
    limitations:
      "Some features require a paid plan; check the provider for current availability.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "quizlet",
    name: "Quizlet",
    provider: { name: "Quizlet", official: false },
    url: "https://quizlet.com/",
    supportedCourses: ["General"],
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "History & Social Science",
      "Computer Science & Technology",
      "World Languages",
      "Arts & Other",
    ],
    type: "Flashcards",
    pricingModel: "Freemium",
    accountRequired: true,
    bestFor: "Creating and reviewing flashcards",
    limitations:
      "User-created sets can contain errors, and some features require a paid plan.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
  {
    id: "albert",
    name: "Albert",
    provider: { name: "Albert", official: false },
    url: "https://www.albert.io/",
    supportedCourses: ["AP", "SAT", "ACT"],
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "History & Social Science",
      "Computer Science & Technology",
    ],
    type: "Exam practice",
    pricingModel: "Paid",
    accountRequired: true,
    bestFor: "Course-aligned practice questions and explanations",
    limitations:
      "Paid access or a school subscription is usually required; check current offerings.",
    mobile: true,
    lastVerified: verified,
    official: false,
  },
];

export function filterResources(
  query: string,
  courseName?: string,
  pricing?: string,
) {
  const normalized = query.trim().toLowerCase();
  return resources.filter((resource) => {
    const matchesText =
      !normalized ||
      `${resource.name} ${resource.provider.name} ${resource.bestFor}`
        .toLowerCase()
        .includes(normalized);
    const matchesCourse =
      !courseName ||
      resource.supportedCourses.some(
        (course) =>
          course === "General" ||
          (course === "AP" && courseName.startsWith("AP")) ||
          courseName.toLowerCase().includes(course.toLowerCase()),
      );
    return (
      matchesText &&
      matchesCourse &&
      (!pricing || resource.pricingModel === pricing)
    );
  });
}
