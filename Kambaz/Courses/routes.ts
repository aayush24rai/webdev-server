import CoursesDao from "./dao";
import EnrollmentsDao from "../Enrollments/dao";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const enrollmentsDao = EnrollmentsDao(db);

  const findAllCourses = (req, res) => {
    res.json(dao.findAllCourses());
  };
  const findCourseById = (req, res) => {
    const course = dao.findCourseById(req.params.courseId);
    if (!course) {
      res.status(404).json({ message: `Course ${req.params.courseId} not found` });
      return;
    }
    res.json(course);
  };
  // "current" means the user stored in this browser's session
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.json(dao.findCoursesForEnrolledUser(userId));
  };
  // creating a course also enrolls its creator
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    if (currentUser) {
      enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    }
    res.json(newCourse);
  };
  const deleteCourse = (req, res) => {
    dao.deleteCourse(req.params.courseId);
    res.sendStatus(200);
  };
  const updateCourse = (req, res) => {
    const updated = dao.updateCourse(req.params.courseId, req.body);
    if (!updated) {
      res.status(404).json({ message: `Course ${req.params.courseId} not found` });
      return;
    }
    res.json(updated);
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users/current/courses", createCourse);
}
