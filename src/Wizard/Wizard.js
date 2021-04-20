import { useState } from "react";
import "./Wizard.css";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import RangeComponent from "../Components/RangeComponent/RangeComponent";
import MultipleSelectComponent from "../Components/MultiSelectComponent/MultiSelectComponent";
import ConclusionComponent from '../Components/ConclusionComponent/ConclusionComponent'

const typeToComponent = {
    range: RangeComponent,
    multi: MultipleSelectComponent,
    conclusion: ConclusionComponent
};

function Wizard({ data }) {


    const [componentData, setComponentData] = useState({ "Price Range": [1500, 3500] });

    const setComponentBackground = (bg) => {
        setImageBackground(bg)
    }

    const saveComponentData = (value, title) => {
        const data = { ...componentData, [title]: value }
        setComponentData(data)
        console.log(data)
    }

    const [imageBackground, setImageBackground] = useState()

    const [questionIndex, setQuestionIndex] = useState(0);

    const handleSliderNext = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep + 1);
        setImageBackground(imageBackground)
    };

    const handleSliderBack = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep - 1);
        setImageBackground(imageBackground)
    };
    console.log(imageBackground)
    console.log(data.questions[questionIndex]);
    console.log(componentData)
    const Component = typeToComponent[data.questions[questionIndex].type];
    return (
        <div className="Wizard" style={{
            backgroundImage: `url(${imageBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}><div className='titlesDiv'>
                {questionIndex === 0 && <h1 className="wizardTitle">Which Phone Should I Buy?</h1>}
                <h1 className="questionTitle">{data.questions[questionIndex].title}</h1>
            </div>
            {Component ? <Component {...data.questions[questionIndex]} handleSliderNext={handleSliderNext} setComponentBackground={setComponentBackground} componentData={componentData} saveComponentData={saveComponentData} key={data.questions[questionIndex].title} /> : null}
            <MobileStepper
                variant="dots"
                steps={data.questions.length}
                position="bottom"
                activeStep={questionIndex}
                // nextButton={
                //     <Button
                //         size="small"
                //         onClick={handleSliderNext}
                //         disabled={questionIndex === data.questions.length - 1}>
                //         Next
                //         <KeyboardArrowRight />
                //     </Button>
                // }
                backButton={
                    <Button size="large" onClick={handleSliderBack} disabled={questionIndex === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    );
}

export default Wizard;
