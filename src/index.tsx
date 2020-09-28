import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

/* Make the store available to all container 
components in the application */
import { Provider } from "react-redux";

// Store type from Redux
import { Store } from "redux";

// Import the store function and state
import configureStore, { IAppState } from "./store/Store";
import { getQuestions } from "./actions/QuestionActions";

import "./index.css";
import App from "./components/App";

interface IProps {
    store: Store<IAppState>;
}

/* 
Create a root component that receives the store via props
*/
const Root: React.SFC<IProps> = props => {
    return (
        <Provider store={props.store}>
            <App />
        </Provider>
    );
};

// Generate the store
const store = configureStore();

//Load initial questions
store.dispatch(getQuestions());

// Render the App
ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root") as HTMLElement
);
