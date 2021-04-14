import { useState } from "react";
import "./RangeComponent.css";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function RangeComponent({ title, defaultMinValue, defaultMaxValue, maxValue, minValue }) {
    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

    const [sliderValue, setSliderValue] = useState([defaultMinValue, defaultMaxValue]);

    return (
        <div className="rangeSlider">
            <Typography id="range-slider" gutterBottom>
                {title}
            </Typography>
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
