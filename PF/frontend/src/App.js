import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudioDetail from "./routes/StudioDetail";
import StudioList from "./routes/StudioList";
import Home from "./routes/Home";
import Login from './Login';
import Logout from "./logout";
import ProfileView from './profile';
import Register from './Register';
import HomeProfile from './HomeProfile';
import PasswordView from './Password';
import SearchPage from "./routes/SearchPage";
import PaymentHistoryView from "./routes/PaymentHistory";
import ClassDetail from "./routes/ClassDetail";
import CreateSubscriptionPlan from "./routes/CreateSubscriptionPlan";
import SubscriptionDetail from "./routes/UpdateSubscriptionPlan";
import EditSubscriptionPlan from "./routes/EditSubscription";
import ShowSubscriptionPlans from "./routes/ShowSubscriptionPlans";
import UserClassHistory from "./routes/UserClassHistory";
import UserClassSchedule from "./routes/UserClassSchedules";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/accounts/edit">
          <ProfileView />
        </Route>
        <Route path="/accounts/password">
          <PasswordView />
        </Route>
        <Route path="/accounts/payment/">
          <PaymentHistoryView />
        </Route>
        <Route path="/accounts/class/schedule">
          <UserClassSchedule />
        </Route>
        <Route path="/accounts/class/history">
          <UserClassHistory />
        </Route>
        <Route path="/profile">
          <HomeProfile />
        </Route>
        <Route path="/studio/:id">
          <StudioDetail />
        </Route>
        <Route path="/studio">
          <StudioList />
        </Route>
        <Route path="/class/:id">
          <ClassDetail />
        </Route>
        <Route path="/subscribe">
          <CreateSubscriptionPlan />
        </Route>
        <Route path="/preview">
          <ShowSubscriptionPlans />
        </Route>
        <Route path="/accounts/subscription/edit">
          <EditSubscriptionPlan />
        </Route>
        <Route path="/accounts/subscription">
          <SubscriptionDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;