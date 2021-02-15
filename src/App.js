import { Route, BrowserRouter, Switch } from "react-router-dom";
import './App.css';
import Home from './routes/home/Home';
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
