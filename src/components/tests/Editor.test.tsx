import React from "react";
import ReactDOM from "react-dom";
import Editor from "../Editor";
import { Provider } from "react-redux";
import configureStore from "../../store/Store";
import ReactTestUtils from "react-dom/test-utils";

describe("Editor", () => {
    const store = configureStore();

    const _question = {
        question: "What is 5 x 5",
        category: "maths",
        difficulty: "easy",
        correct_answer: "25",
        incorrect_answers: ["15", "20", "30"]
    };

    let container: HTMLDivElement | Element | DocumentFragment;

    beforeEach(() => {
        container = document.createElement("div");

        const component = (
            <Provider store={store}>
                <Editor selected={_question} index={0} />
            </Provider>
        );

        document.body.appendChild(container);

        ReactDOM.render(component, container);
    });

    describe("Form and form elements", () => {
        it("renders a form", () => {
            expect(container.querySelector("form")).not.toBeNull();
        });

        it("renders an input field for the question", () => {
            expect(
                container.querySelector("input#questionField")
            ).not.toBeNull();
        });

        it("renders an input field for 3rd and final incorrect answer", () => {
            expect(
                container.querySelector("input#answerField_3")
            ).not.toBeNull();
        });
        it("should render checkboxes correctly", () => {
            expect(container.querySelectorAll("span.checkmark")).toHaveLength(
                4
            );
        });
    });

    describe("Render correct text", () => {
        it("should render correct question", () => {
            const form = container.querySelector("form");
            const field = form.elements.question;
            expect(field.type).toEqual("text");
            expect(field.value).toEqual("What is 5 x 5");
        });
    });

    describe("Form events", () => {
        it("Question field should be updated on change", async () => {
            expect.hasAssertions();
            const form = container.querySelector("form");
            const field = form.elements.question;

            await ReactTestUtils.Simulate.change(field, {
                target: { value: "What is 2 x 2" }
            });

            expect(field.value).toEqual("What is 2 x 2");
        });

        it("should change the value of question to empty and then display an error message on submission", async () => {
            expect.hasAssertions();
            const form = container.querySelector("form");
            const button = container.querySelector("button");
            const field = form.elements.question;

            await ReactTestUtils.Simulate.change(field, {
                target: { value: "" }
            });
            await ReactTestUtils.Simulate.click(button, {
                target: { value: "" }
            });

            expect(container.querySelector("div.alert-danger")).not.toBeNull();
        });

        it("should not change when correct answer is cicked", async () => {
            expect.hasAssertions();
            const incorrect = container.querySelectorAll(
                "input[type=checkbox]"
            )[0];
            const form = container.querySelector("form");

            await ReactTestUtils.Simulate.change(incorrect, {
                target: { checked: true }
            });
            const field = form.elements.answerField_0;

            expect(field.value).toEqual("25");
        });

        it("should place the an incorrect answer as correct when clicked", async () => {
            expect.hasAssertions();
            const incorrect = container.querySelectorAll(
                "input[type=checkbox]"
            )[1];
            const form = container.querySelector("form");

            await ReactTestUtils.Simulate.change(incorrect, {
                target: { checked: true }
            });
            const field = form.elements.answerField_0;

            expect(field.value).toEqual("15");
        });
    });
});
