import ModulesDao from "./dao";

// Nested in the UI, flat on the server:
// GET/POST /api/courses/:courseId/modules, PUT/DELETE /api/modules/:moduleId
export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);

  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findModulesForCourse(courseId));
  };
  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const module = { ...req.body, course: courseId };
    res.json(dao.createModule(module));
  };
  const deleteModule = (req, res) => {
    dao.deleteModule(req.params.moduleId);
    res.sendStatus(200);
  };
  const updateModule = (req, res) => {
    const updated = dao.updateModule(req.params.moduleId, req.body);
    if (!updated) {
      res.status(404).json({ message: `Module ${req.params.moduleId} not found` });
      return;
    }
    res.json(updated);
  };

  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}
