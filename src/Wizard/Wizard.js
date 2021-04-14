import { useState } from "react";
import "./Wizard.css";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import RangeComponent from "../Components/RangeComponent/RangeComponent";
import MultipleSelectComponent from "../Components/MultiSelectComponent/MultiSelectComponent";

const typeToComponent = {
    range: RangeComponent,
    multi: MultipleSelectComponent
};

function Wizard({ data }) {

    const [questionIndex, setQuestionIndex] = useState(0);

    const handleSliderNext = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSliderBack = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep - 1);
    };

    console.log(data.questions[questionIndex]);
    const Component = typeToComponent[data.questions[questionIndex].type];
    return (
        <div className="Wizard">
            <h1 className="wizardTitle">Which Phone Should I Buy?</h1>
            <h1 className="questionTitle">{data.questions[questionIndex].title}</h1>

            {Component ? <Component {...data.questions[questionIndex]} key={data.questions[questionIndex].title} /> : null}
            <MobileStepper
                variant="dots"
                steps={data.questions.length}
                position="bottom"
                activeStep={questionIndex}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleSliderNext}
                        disabled={questionIndex === data.questions.length - 1}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleSliderBack} disabled={questionIndex === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    );
}

export default Wizard;
