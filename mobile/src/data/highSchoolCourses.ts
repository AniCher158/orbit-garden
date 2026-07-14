import type { CourseCategory } from "@/src/types";
import { apCourses } from "./apCourses";

export interface CatalogCourse {
  name: string;
  category: CourseCategory;
  isAP?: boolean;
}
const category = (name: CourseCategory, courses: string[]): CatalogCourse[] =>
  courses.map((courseName) => ({ name: courseName, category: name }));

export const highSchoolCourses: CatalogCourse[] = [
  ...category("Mathematics", [
    "Algebra I",
    "Geometry",
    "Algebra II",
    "Precalculus",
    "Trigonometry",
    "Statistics",
    "Calculus",
    "Integrated Mathematics I",
    "Integrated Mathematics II",
    "Integrated Mathematics III",
    "Other Mathematics",
  ]),
  ...category("Science", [
    "Biology",
    "Chemistry",
    "Physics",
    "Earth and Space Science",
    "Environmental Science",
    "Anatomy and Physiology",
    "Engineering",
    "Other Science",
  ]),
  ...category("English", [
    "English 9",
    "English 10",
    "English 11",
    "English 12",
    "World Literature",
    "American Literature",
    "British Literature",
    "Creative Writing",
    "Journalism",
    "Other English",
  ]),
  ...category("History & Social Science", [
    "World History",
    "United States History",
    "European History",
    "Government and Civics",
    "Economics",
    "Psychology",
    "Sociology",
    "Human Geography",
    "Other Social Science",
  ]),
  ...category("Computer Science & Technology", [
    "Introduction to Computer Science",
    "Programming Fundamentals",
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "Robotics",
    "Engineering Design",
    "Other Technology",
  ]),
  ...category("World Languages", [
    "Spanish I",
    "Spanish II",
    "Spanish III",
    "Spanish IV",
    "Spanish V",
    "French I",
    "French II",
    "French III",
    "French IV",
    "French V",
    "German I",
    "Chinese I",
    "Japanese I",
    "Latin I",
    "American Sign Language",
    "Other World Language",
  ]),
  ...category("Arts & Other", [
    "Visual Art",
    "Music",
    "Music Theory",
    "Theater",
    "Dance",
    "Research",
    "Seminar",
    "Health",
    "Business",
    "Personal Finance",
    "Custom Course",
  ]),
  ...apCourses.map((ap) => ({
    name: ap.title,
    category: ap.category,
    isAP: true,
  })),
];
