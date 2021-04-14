import { useState } from 'react';
import './Wizard.css';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { ReactComponent as MyIcon } from "../icons/wifi-router.svg";
import SvgIcon from '@material-ui/core/SvgIcon';

function Wizard({ data }) {

    const selectMultipleSelectionIcon = (option, index) => {
        console.log(option)
        const selectedArray = [...selectedWhatFor]
        if (selectedArray[index] != true) {
            selectedArray[index] = true
        }
        else {
            selectedArray[index] = false
        }
        setSelectedWhatFor(selectedArray)
        console.log(selectedArray)
    }

    const [selectedWhatFor, setSelectedWhatFor] = useState([])

    const [questionIndex, setQuestionIndex] = useState(0);

    const [sliderValue, setSliderValue] = useState([data.questions[questionIndex].defaultMinValue, data.questions[questionIndex].defaultMaxValue]);

    const handleSliderNext = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep + 1);
    };

    const handleSliderBack = () => {
        setQuestionIndex((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    console.log(data.questions[questionIndex])
    return (
        <div className="Wizard">
            <h1 className='wizardTitle'>Which Phone Should I Buy?</h1>
            <h1 className='questionTitle'>{data.questions[questionIndex].title}</h1>

            {data.questions[questionIndex].title === 'Budget' &&
                <div className='rangeSlider'>
                    <Typography id="range-slider" gutterBottom>
                        Price range
            </Typography ><div className='rangeSliderInput'>
                        <Slider
                            max={data.questions[questionIndex].maxValue}
                            min={data.questions[questionIndex].minValue}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                        />
                    </div>
                </div>
            }

            {data.questions[questionIndex].title === 'What for' &&
                <div className='multipleSelectDiv'>
                    {data.questions[questionIndex].options.map((option, index) => {
                        return (
                            <span onClick={() => selectMultipleSelectionIcon(option.name, index)} className='multipleSelectIcon'>
                                <span>
                                    < SvgIcon key={option.name} className='svg' >
                                        <MyIcon className={"svgIcon " + (selectedWhatFor[index] ? "rectClicked" : "")} />
                                    </SvgIcon>
                                    <span className='multiSelectText'>{option.name}</span>
                                </span>
                            </span>
                        )
                    })}
                </div>}

            {data.questions[questionIndex].title === 'PC Type' &&
                <div className='selectDiv'>
                    {data.questions[questionIndex].options.map((option) => {
                        return (
                            <span onClick={() => selectMultipleSelectionIcon(option.name)} className='selectIcon'>
                                <span>
                                    < SvgIcon key={option.name} className='svg' >
                                        <MyIcon />
                                    </SvgIcon>
                                    <span className='selectText'>{option.name}</span>
                                </span>
                            </span>
                        )
                    })}
                </div>
            }

            {data.questions[questionIndex].title === 'Size' &&
                <div className='selectDiv'>
                    {data.questions[questionIndex].options.map((option) => {
                        return (
                            <span onClick={() => selectMultipleSelectionIcon(option.name)} className='selectIcon'>
                                <span>
                                    < SvgIcon key={option.name} className='svg' >
                                        <MyIcon />
                                    </SvgIcon>
                                    <span className='selectText'>{option.name}</span>
                                </span>
                            </span>
                        )
                    })}
                </div>
            }

            <MobileStepper
                variant="dots"
                steps={data.questions.length}
                position="bottom"
                activeStep={questionIndex}
                nextButton={
                    <Button size="small" onClick={handleSliderNext} disabled={questionIndex === data.questions.length - 1}>
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
        </div >
    );
}

export default Wizard;

