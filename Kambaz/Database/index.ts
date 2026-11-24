// Barrel: one import path for every collection.
// These arrays live in memory; Chapter 6 replaces them with MongoDB.
import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

const db: any = { courses, modules, assignments, users, enrollments };
export default db;
