import { IQuestion } from "../types";

const Validation = {
    //Validate data when clicking update button
    validateSubmission: function(question: IQuestion): string[] {
        let errors = [];

        if (question.question === "") {
            errors.push("Question must not be empty");
        }

        if (question.correct_answer === "") {
            errors.push("Please include a correct answer");
        }
        if (question.incorrect_answers.length === 0) {
            errors.push("Please include at least one incorrect answer");
        }
        for (let value of question.incorrect_answers) {
            if (value === "") {
                errors.push("Answers should not be empty");
            }
        }

        return errors;
    }
};

export default Validation;
