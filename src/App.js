import { Route, BrowserRouter, Switch } from "react-router-dom";

import {
  Home,
  Notice,
  Tbuild,
  Projects,
  Search,
  MyPage,
  NotFound,
} from "./routes";
import "./assets/style.scss";

import Navigation from "./components/header/Navigation";

function App() {
  return (
    <div className="joljak-wrapper">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/notice" component={Notice} />
          <Route path="/teams" component={Tbuild} />
          <Route path="/projects" component={Projects} />
          <Route path="/search" component={Search} />
          <Route path="/mypage" component={MyPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
