// Query parameters arrive as strings in req.query, e.g.
// /lab5/calculator?operation=add&a=2&b=4
export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;
    const x = parseFloat(a);
    const y = parseFloat(b);
    let result: number | string = 0;
    switch (operation) {
      case "add":
        result = x + y;
        break;
      case "subtract":
        result = x - y;
        break;
      case "multiply":
        result = x * y;
        break;
      case "divide":
        result = x / y;
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  };
  app.get("/lab5/calculator", calculator);
}
