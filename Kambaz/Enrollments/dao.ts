import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function findAllEnrollments() {
    return db.enrollments;
  }
  function enrollUserInCourse(userId, courseId) {
    const exists = db.enrollments.some((e) => e.user === userId && e.course === courseId);
    if (exists) return;
    db.enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId),
    );
  }
  function findUsersForCourse(courseId) {
    const userIds = db.enrollments.filter((e) => e.course === courseId).map((e) => e.user);
    return db.users.filter((u) => userIds.includes(u._id));
  }
  return { findAllEnrollments, enrollUserInCourse, unenrollUserFromCourse, findUsersForCourse };
}
