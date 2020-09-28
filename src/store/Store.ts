import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";

// Import reducers and state type
import { questionReducer, IQuestionState } from "../reducers/questionReducer";

// Create an interface for the application state
export interface IAppState {
    questionState: IQuestionState;
}

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
    questionState: questionReducer
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
    const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
    return store;
}
