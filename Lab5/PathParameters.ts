// Path parameters arrive as strings in req.params.
// Results go back as strings: res.send(6) would be read as a status code.
export default function PathParameters(app) {
  const add = (req, res) => {
    const { a, b } = req.params;
    const sum = parseFloat(a) + parseFloat(b);
    res.send(sum.toString());
  };
  const subtract = (req, res) => {
    const { a, b } = req.params;
    res.send((parseFloat(a) - parseFloat(b)).toString());
  };
  const multiply = (req, res) => {
    const { a, b } = req.params;
    res.send((parseFloat(a) * parseFloat(b)).toString());
  };
  const divide = (req, res) => {
    const { a, b } = req.params;
    res.send((parseFloat(a) / parseFloat(b)).toString());
  };
  app.get("/lab5/add/:a/:b", add);
  app.get("/lab5/subtract/:a/:b", subtract);
  app.get("/lab5/multiply/:a/:b", multiply);
  app.get("/lab5/divide/:a/:b", divide);
}
