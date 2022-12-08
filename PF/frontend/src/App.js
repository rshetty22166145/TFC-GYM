import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudioDetail from "./routes/StudioDetail";
import StudioList from "./routes/StudioList";
import Home from "./routes/Home";
import Login from './Login';
import Subscriptions from "./components/Subscriptions";
import Classes from "./components/Classes";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/studio/:id">
          <StudioDetail />
        </Route>
        <Route path="/studio">
          <StudioList />
        </Route>
        <Route path="/classes">
          <Classes />
        </Route>
        <Route path="/subscriptions">
          <Subscriptions />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;