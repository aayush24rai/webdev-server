// An in-memory array: CRUD changes last until the server restarts.
let todos = [
  { id: 1, title: "Task 1", completed: false, description: "Create a NodeJS server with ExpressJS" },
  { id: 2, title: "Task 2", completed: true, description: "Add path and query parameter routes" },
  { id: 3, title: "Task 3", completed: false, description: "Work with remote objects" },
  { id: 4, title: "Task 4", completed: true, description: "Work with remote arrays" },
];

export default function WorkingWithRemoteArrays(app) {
  // ---------- read ----------
  // GET /lab5/todos            -> all todos
  // GET /lab5/todos?completed= -> filter by a non-key property (query string)
  const getTodos = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      res.json(todos.filter((t) => t.completed === completedBool));
      return;
    }
    res.json(todos);
  };
  // GET /lab5/todos/:id -> one todo by primary key (path parameter)
  const getTodoById = (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Todo with ID ${id} not found` });
      return;
    }
    res.json(todo);
  };

  // ---------- GET versions used by the hyperlink exercises ----------
  const createNewTodo = (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "",
    };
    todos.push(newTodo);
    res.json(todos);
  };
  const removeTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
    }
    res.json(todos);
  };
  const updateTodoTitle = (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.title = title;
    res.json(todos);
  };
  const updateTodoCompleted = (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.completed = completed === "true";
    res.json(todos);
  };
  const updateTodoDescription = (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.description = description;
    res.json(todos);
  };

  // ---------- proper HTTP verbs with a JSON body ----------
  const postNewTodo = (req, res) => {
    const newTodo = { ...(req.body ?? {}), id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  };
  const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  };
  const updateTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => (t.id === parseInt(id) ? { ...t, ...(req.body ?? {}) } : t));
    res.sendStatus(200);
  };

  // Route order matters: /create must come before /:id,
  // or "create" would be read as an id.
  app.get("/lab5/todos", getTodos);
  app.get("/lab5/todos/create", createNewTodo);
  app.post("/lab5/todos", postNewTodo);
  app.get("/lab5/todos/:id", getTodoById);
  app.get("/lab5/todos/:id/delete", removeTodo);
  app.delete("/lab5/todos/:id", deleteTodo);
  app.put("/lab5/todos/:id", updateTodo);
  app.get("/lab5/todos/:id/title/:title", updateTodoTitle);
  app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted);
  app.get("/lab5/todos/:id/description/:description", updateTodoDescription);
}
