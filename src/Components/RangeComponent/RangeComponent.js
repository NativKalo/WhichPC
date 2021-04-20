import { useState, useEffect } from "react";
import "./RangeComponent.css";
import Slider from "@material-ui/core/Slider";

function RangeComponent({ title, defaultMinValue, defaultMaxValue, maxValue, minValue, saveComponentData, componentData, bg, setComponentBackground }) {

    useEffect(() => {
        setComponentBackground(bg)
    }, []);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        saveComponentData(newValue, title)
    };


    const [sliderValue, setSliderValue] = useState(componentData[title] || [defaultMinValue, defaultMaxValue]);

    return (
        <div className="rangeSlider">

            <div className="rangeSliderInput">
                <Slider
                    max={maxValue}
                    min={minValue}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    valueLabelDisplay="on"
                    aria-labelledby="range-slider"
                />
            </div>
        </div>
    );
}

export default RangeComponent;
