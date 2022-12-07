import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Studio from "./routes/Studio";
import Home from "./routes/Home";
import Login from './Login';
function App() {
  /*return (
    <Router>
      <Switch>
        <Route path="/studio/:id">
          <Studio />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
  */
  return (
    <main className="App">
      <Login />
    </main>
  );
}

export default App;