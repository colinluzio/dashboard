import * as React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Editor from "./Editor";
import { IAppState } from "../store/Store";
import QuestionList from "../containers/QuestionList";
import { initialQuestion } from "../types";

const App: React.SFC<{}> = () => {
    const [selected, setSelected] = React.useState(initialQuestion);
    const [index, setIndex] = React.useState(0);

    const questions: any = useSelector<IAppState>((state: IAppState) => {
        return {
            questions: state.questionState.questions
        };
    });

    const setCurrent = (value: number) => {
        setSelected(questions.questions[value]);
        setIndex(value);
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col>
                    <h1>Dashboard</h1>
                </Col>
            </Row>
            <Row>
                <Col md={7}>
                    <div className="card">
                        <h4>Editor</h4>
                        <Editor selected={selected} index={index} />
                    </div>
                </Col>
                <Col>
                    <div className="card">
                        <QuestionList setCurrent={setCurrent} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
