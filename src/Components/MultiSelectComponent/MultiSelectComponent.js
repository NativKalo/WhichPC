import { useState, useEffect } from "react";
import "./MultiSelectComponent.css";

function MultipleSelectComponent({ title, options, handleSliderNext, saveComponentData, componentData, bg, setComponentBackground }) {

    useEffect(() => {
        setComponentBackground(bg)
    }, []);

    const handleSlider = (answer) => {
        saveComponentData(answer, title)
        handleSliderNext()
    };

    return (
        <div className="multipleSelectDiv">
            {options.map((option, index) => {
                return (
                    <span key={index}
                        className="multipleSelectIcon">
                        <button className='selectButton' onClick={() => handleSlider(option.name)}> {option.name}</button>
                    </span>
                );
            })}
        </div>
    )
}

export default MultipleSelectComponent;
