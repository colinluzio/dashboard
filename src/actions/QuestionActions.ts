// Import redux types
import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";
import { IQuestion } from "../types";

// Import Question Typing
import { IQuestionState } from "../reducers/questionReducer";

// Create Action Constants
export enum QuestionActionTypes {
    GET_ALL = "GET_ALL",
    LOAD_MORE = "LOAD_MORE",
    UPDATE_QUESTION = "UPDATE_QUESTION",
    DELETE_QUESTION = "DELETE_QUESTION"
}

// Interface for Get All Action Type
export interface IQuestionActions {
    type: QuestionActionTypes.GET_ALL;
    questions: IQuestion[];
    question?: IQuestion;
    index?: number;
}

/* 
Combine the action types with a union
*/
export type QuestionActions = IQuestionActions;

/*Initial load questions
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getQuestions: ActionCreator<ThunkAction<
    Promise<any>,
    IQuestionState,
    null,
    IQuestionActions
>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(
                "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple"
            );
            dispatch({
                questions: response.data.results,
                type: QuestionActionTypes.GET_ALL
            });
        } catch (err) {
            console.error(err);
        }
    };
};

/* Load more questions
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const loadMore: ActionCreator<ThunkAction<
    Promise<any>,
    IQuestionState,
    null,
    IQuestionActions
>> = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get(
                "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple"
            );
            dispatch({
                questions: response.data.results,
                type: QuestionActionTypes.LOAD_MORE
            });
        } catch (err) {
            console.error(err);
        }
    };
};

/*Update single question */
export function updateQuestion(question: IQuestion, index: number) {
    return { type: QuestionActionTypes.UPDATE_QUESTION, question, index };
}

/*Delete question from state */
export function deleteQuestion(index: number) {
    return { type: QuestionActionTypes.DELETE_QUESTION, index };
}
