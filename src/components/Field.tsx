import * as React from "react";
import Helper from "../helpers";

interface FieldProps {
    index: number;
    text: string;
    updateAnswer: (index: number, text: string) => void;
}

interface CheckProps {
    index: number;
    correct: boolean;
    setCorrect: (index: number) => void;
}

export const Answer: React.SFC<FieldProps> = props => {
    const [text, setText] = React.useState(props.text ? props.text : "");

    if (props.text !== text) {
        setText(props.text);
    }

    const updateText = (text: string): void => {
        props.updateAnswer(props.index, text);
    };

    return (
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id={`answerField_${props.index}`}
                name={`answerField_${props.index}`}
                value={Helper.formatText(text)}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                    updateText(ev.target.value)
                }
            />
        </div>
    );
};

export const Checkbox: React.SFC<CheckProps> = props => {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={props.correct}
                onChange={() =>
                    props.setCorrect(props.correct ? 0 : props.index)
                }
            />
            <span className="checkmark"></span>
        </label>
    );
};
