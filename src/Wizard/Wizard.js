import { useState } from 'react';
import './Wizard.css';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';


function Wizard({ data }) {
    const [questionIndex, setQuestionIndex] = useState(0);

    const handleNext = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className="Wizard">
            <h1 className='wizardTitle'>Which Phone Should I Buy?</h1>


            {data.questions[questionIndex].title}



            <MobileStepper
                variant="dots"
                steps={data.questions.length}
                position="bottom"
                activeStep={questionIndex}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={questionIndex === data.questions.length - 1}>
                        Next
          <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={questionIndex === 0}>
                        <KeyboardArrowLeft />
          Back
        </Button>
                }
            />
        </div>
    );
}

export default Wizard;
