import { useState, useEffect } from "react";
import "./RangeComponent.css";
import Slider from "@material-ui/core/Slider";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function RangeComponent({ handleSliderNext, title, defaultMinValue, defaultMaxValue, maxValue, minValue, saveComponentData, componentData, bg, setComponentBackground }) {

    useEffect(() => {
        setComponentBackground(bg)
    }, []);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        saveComponentData(newValue, title)
    };

    const muiTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: "yellow",
                },
                track: {
                    color: 'DarkKhaki'
                },
                rail: {
                    color: 'black'
                },
                valueLabel: {
                    color: 'DimGray'
                }
            }
        }
    });

    const [sliderValue, setSliderValue] = useState(componentData[title] || [defaultMinValue, defaultMaxValue]);

    return (
        <div className="rangeSlider">

            <div className="rangeSliderInput">
                <ThemeProvider theme={muiTheme}>
                    <Slider
                        max={maxValue}
                        min={minValue}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                    />
                </ThemeProvider >

            </div>
            <button className="rangeSelectedButton" onClick={handleSliderNext}>Start Filtering!</button>
        </div >
    );
}

export default RangeComponent;
