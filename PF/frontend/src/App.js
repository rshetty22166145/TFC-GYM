import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudioDetail from "./routes/StudioDetail";
import StudioList from "./routes/StudioList";
import Home from "./routes/Home";
import Login from './Login';
import ProfileView from './profile';
import Register from './Register';
import SearchPage from "./routes/SearchPage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/accounts/edit">
          <ProfileView />
        </Route>
        <Route path="/studio/:id">
          <StudioDetail />
        </Route>
        <Route path="/studio">
          <StudioList />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;