import UsersDao from "./dao";

// The signed-in user lives in req.session, so each browser has its own.
export default function UserRoutes(app, db) {
  const dao = UsersDao(db);

  const signup = (req, res) => {
    const body = req.body ?? {};
    const user = dao.findUserByUsername(body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body ?? {};
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  };
  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
  const updateUser = (req, res) => {
    const { userId } = req.params;
    const updated = dao.updateUser(userId, req.body ?? {});
    if (!updated) {
      res.status(404).json({ message: `User ${userId} not found` });
      return;
    }
    // keep the session in sync when users edit their own profile
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = updated;
    }
    res.json(updated);
  };
  const findAllUsers = (req, res) => {
    res.json(dao.findAllUsers());
  };
  const findUserById = (req, res) => {
    const user = dao.findUserById(req.params.userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  };
  const deleteUser = (req, res) => {
    dao.deleteUser(req.params.userId);
    res.sendStatus(200);
  };

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
}
