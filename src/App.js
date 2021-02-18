import { Route, BrowserRouter, Switch } from "react-router-dom";
// import "./App.css";
// import { Home, Notice, Tbuild, Projects } from "./routes";

import Home from "./routes/Home.js";
import Notice from "./routes/Notice.js";
import Tbuild from "./routes/Tbuild.js";
import Projects from "./routes/Projects.js";

import Navigation from "./components/Header/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      {/* <Route path="/" exact={true} component={Home} /> */}
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/notice" component={Notice} />
        <Route path="/teams" component={Tbuild} />
        <Route path="/projects" component={Projects} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
