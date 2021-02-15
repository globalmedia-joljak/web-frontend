import logo from './logo.svg';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import './App.css';

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
