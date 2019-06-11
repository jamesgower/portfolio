import * as React from "react";
import * as ReactDOM from "react-dom";
import AppRouter, { history } from "./routes/AppRouter";
import LoadingPage from "./components/LoadingPage";
import "normalize.css/normalize.css";
import "react-dates/lib/css/_datepicker.css";
import "./styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

window.$ = $;
window.jQuery = jQuery;

const store = configureStore();

export const App: React.FC = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(<App />, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById("app"));
renderApp();
history.push("/");
