import * as React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IQuestion, initialQuestionClass } from "../types";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../actions/QuestionActions";
import { Answer, Checkbox } from "./Field";
import Helper from "../helpers";
import Validation from "../helpers/Validation";

interface EditorProps {
    selected: IQuestion;
    index: number;
}

type Errors = string[];

const Editor: React.SFC<EditorProps> = props => {
    const [question, setQuestion] = React.useState<IQuestion>(props.selected);
    const [errors, setErrors] = React.useState<Errors>([]);

    if (props.selected !== question) {
        setQuestion(props.selected);
    }

    const dispatch = useDispatch();

    /*Update question, send to action creator 
    Or display error if not valid
    */
    const _updateQuestion = (event: React.MouseEvent) => {
        event.preventDefault();
        let _errors = Validation.validateSubmission(question);

        if (_errors.length === 0) {
            dispatch(updateQuestion(question, props.index));
        } else {
            setErrors(_errors);
            setTimeout(() => {
                setErrors([]);
            }, 3000);
        }
    };

    /*Update state of question text */
    const updateQuestionText = (text: string): void => {
        let newQuestion = question;
        if (newQuestion) {
            newQuestion.question = text;
            setQuestion({ ...question, question: text });
        }
    };

    /*Update the state of the answer */
    const updateAnswer = (index: number, text: string): void => {
        let newQuestion = question;
        if (index === 0) {
            newQuestion.correct_answer = text;
            setQuestion({ ...question, correct_answer: text });
        } else {
            newQuestion.incorrect_answers[index - 1] = text;
            setQuestion({
                ...question,
                incorrect_answers: newQuestion.incorrect_answers
            });
        }
    };

    /*Only set correct answer if clicking a currently incorrect answer. 
    Ie toggling correct answer will do nothing
    */
    const setCorrect = (index: number): void => {
        if (index !== 0) {
            let newQuestion = question;

            let newCorrect = question.incorrect_answers[index - 1];

            if (question.correct_answer !== "") {
                question.incorrect_answers.splice(
                    index - 1,
                    1,
                    question.correct_answer
                );
            }
            question.correct_answer = newCorrect;

            setQuestion({
                ...question,
                correct_answer: newCorrect,
                incorrect_answers: newQuestion.incorrect_answers
            });
        }
    };

    return (
        <Row>
            <Col>
                <form>
                    <Row>
                        <Col xs={11}>
                            <div className="form-group">
                                <label htmlFor="questionField">Question</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="questionField"
                                    name="question"
                                    value={
                                        question
                                            ? Helper.formatText(
                                                  question.question
                                              )
                                            : ""
                                    }
                                    onChange={(
                                        ev: React.ChangeEvent<HTMLInputElement>
                                    ): void =>
                                        updateQuestionText(ev.target.value)
                                    }
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={9}>
                            <span>Answers</span>
                        </Col>
                        <Col xs={2}>
                            <span>Is Correct</span>
                        </Col>
                    </Row>
                    {question.correct_answer && (
                        <Row>
                            <Col xs={9}>
                                <Answer
                                    text={question.correct_answer}
                                    index={0}
                                    updateAnswer={updateAnswer}
                                />
                            </Col>
                            <Col xs={2}>
                                <Checkbox
                                    index={0}
                                    correct={true}
                                    setCorrect={setCorrect}
                                />
                            </Col>
                        </Row>
                    )}
                    {question.incorrect_answers.map((answer, index) => {
                        return (
                            <Row key={index}>
                                <Col xs={9}>
                                    <Answer
                                        index={index + 1}
                                        text={answer}
                                        updateAnswer={updateAnswer}
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Checkbox
                                        correct={false}
                                        index={index + 1}
                                        setCorrect={setCorrect}
                                    />
                                </Col>
                            </Row>
                        );
                    })}
                    {errors && (
                        <Row>
                            <Col>
                                {errors.map((error, index) => {
                                    return (
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                            key={index}
                                        >
                                            {error}
                                        </div>
                                    );
                                })}
                            </Col>
                        </Row>
                    )}
                    {!(question instanceof initialQuestionClass) && (
                        <Button variant="primary" onClick={_updateQuestion}>
                            Update
                        </Button>
                    )}
                </form>
            </Col>
        </Row>
    );
};

export default Editor;
