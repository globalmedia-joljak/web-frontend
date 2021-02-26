import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import SignIn from "./routes/signin/SignIn";
import SignOut1 from "./routes/signout/signout1";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/signin" exact={true} component={SignIn} />
				<Route path="/signout" exact={true} component={SignOut1} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
