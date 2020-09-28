import * as React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IQuestion } from "../types";
import Helper from "../helpers";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../actions/QuestionActions";

interface QuestionProps {
    question: IQuestion;
    index: number;
    setCurrent: (index: number) => void;
}

const Question: React.SFC<QuestionProps> = props => {
    const dispatch = useDispatch();

    return (
        <div className="card card-inner">
            <Row>
                <Col xs={6}>
                    {Helper.formatText(props.question.question)}
                    <br />
                    <span className="font-weight-bold">
                        {props.question.category}
                    </span>
                    <br />
                    <span className="font-weight-bold">
                        {props.question.difficulty}
                    </span>
                </Col>
                <Col>
                    <Button
                        variant="primary"
                        onClick={(event: any) => {
                            props.setCurrent(props.index);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={(event: React.MouseEvent) => {
                            dispatch(deleteQuestion(props.index));
                            props.setCurrent(props.index);
                        }}
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default Question;
