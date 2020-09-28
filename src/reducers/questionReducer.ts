// Import Reducer type
import { Reducer } from "redux";
import {
    QuestionActions,
    QuestionActionTypes
} from "../actions/QuestionActions";
import { IQuestion } from "../types";

// Define the Question State
export interface IQuestionState {
    readonly questions: IQuestion[];
}

// Define the initial state
const initialQuestionState: IQuestionState = {
    questions: []
};

//Question reducer
export const questionReducer: Reducer<IQuestionState, QuestionActions> = (
    state = initialQuestionState,
    action
) => {
    switch (action.type as any) {
        //Load initial questions
        case QuestionActionTypes.GET_ALL: {
            return {
                ...state,
                questions: action.questions
            };
        }
        //Add more questions to state
        case QuestionActionTypes.LOAD_MORE: {
            let oldArray = state.questions;

            return {
                ...state,
                questions: action.questions.concat(oldArray)
            };
        }
        //Update single question
        case QuestionActionTypes.UPDATE_QUESTION: {
            let _Array = state.questions;

            if (action.index && action.question) {
                _Array.splice(action.index, 1, action.question);
            }

            if (action.index && action.question) {
                return {
                    ...state,
                    questions: _Array
                };
            }
        }
        //Delete single question
        case QuestionActionTypes.DELETE_QUESTION: {
            let _Array = state.questions;

            if (action.index || action.index === 0) {
                _Array.splice(action.index, 1);

                return {
                    ...state,
                    questions: _Array
                };
            }
        }

        default:
            return state;
    }
};
