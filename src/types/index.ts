// Define the Question type
export interface IQuestion {
    question: string;
    category: string;
    difficulty: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export class initialQuestionClass implements IQuestion {
    question: string;
    category: string;
    difficulty: string;
    correct_answer: string;
    incorrect_answers: string[];

    constructor() {
        this.question = "";
        this.category = "";
        this.difficulty = "";
        this.correct_answer = "";
        this.incorrect_answers = [];
    }
}

export const initialQuestion = new initialQuestionClass();
