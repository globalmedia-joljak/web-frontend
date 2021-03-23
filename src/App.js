import { Route, BrowserRouter, Switch } from 'react-router-dom';
import {
  Home,
  Notice,
  Tbuild,
  Projects,
  Search,
  MyPage,
  ErrorPage,
  SignIn,
  SignUp,
} from './routes';
import './assets/style.scss';

import Navigation from './components/header/Navigation';
import AppProvider from './context/appContext.js';

function App() {
  return (
    <AppProvider>
      <div className="joljak-wrapper">
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/signin" exact={true} component={SignIn} />
            <Route path="/signup" exact={true} component={SignUp} />
            <Route path="/notice" exact={true} component={Notice} />
            <Route path="/teams" exact={true} component={Tbuild} />
            <Route path="/projects" exact={true} component={Projects} />
            <Route path="/search" exact={true} component={Search} />
            <Route path="/mypage" exact={true} component={MyPage} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
