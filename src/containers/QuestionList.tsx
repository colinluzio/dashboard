import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Row, Col } from "react-bootstrap";
import { IAppState } from "../store/Store";
import { IQuestion } from "../types";
import { getQuestions } from "../actions/QuestionActions";
import FetchButton from "../components/FetchButton";
import Question from "../components/Question";

// Create the containers interface
interface IProps {
    questions: IQuestion[];
    setCurrent: (index: number) => void;
}

class QuestionList extends React.Component<IProps> {
    public render() {
        const { questions } = this.props;

        return (
            <div className="question-container">
                <Row className="mb-3">
                    <Col xs={3}>Questions</Col>
                    <Col className="text-right">
                        <FetchButton />
                    </Col>
                </Row>
                <ul>
                    {questions &&
                        questions.map((question, index) => {
                            return (
                                <li key={index}>
                                    <Question
                                        question={question}
                                        index={index}
                                        setCurrent={this.props.setCurrent}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ getQuestions }, dispatch);
};

// Grab the questions from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
    return {
        questions: store.questionState.questions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
