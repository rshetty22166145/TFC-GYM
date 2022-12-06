import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Studio from "./routes/Studio";
import Home from "./routes/Home";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/studio/:id">
          <Studio />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;