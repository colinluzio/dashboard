import * as React from "react";
import { useDispatch } from "react-redux";
import { loadMore } from "../actions/QuestionActions";
import { Button } from "react-bootstrap";

const FetchButton: React.SFC = props => {
    const dispatch = useDispatch();

    const loadQuestions = () => {
        dispatch(loadMore());
    };
    return (
        <div>
            <Button variant="secondary" onClick={loadQuestions}>
                Load More Questions
            </Button>
        </div>
    );
};

export default FetchButton;
