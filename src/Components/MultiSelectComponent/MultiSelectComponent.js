import { useState, useEffect } from "react";
import "./MultiSelectComponent.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as MyIcon } from "../../icons/wifi-router.svg";

function MultipleSelectComponent({ title, options, saveComponentData, componentData, bg, setComponentBackground }) {

    useEffect(() => {
        setComponentBackground(bg)
    }, []);

    const [selectedWhatFor, setSelectedWhatFor] = useState(componentData[title] || []);

    const selectMultipleSelectionIcon = (option, index) => {
        console.log(option);
        const selectedArray = [...selectedWhatFor];
        if (selectedArray[index] != true) {
            selectedArray[index] = true;
        } else {
            selectedArray[index] = false;
        }
        setSelectedWhatFor(selectedArray);
        console.log(selectedArray);
        saveComponentData(selectedArray, title)
    };
    return (
        <div className="multipleSelectDiv">
            {options.map((option, index) => {
                return (
                    <span key={index}
                        // onClick={() => selectMultipleSelectionIcon(option.name, index)}
                        className="multipleSelectIcon">
                        <button> {option.name}</button>
                        {/* <span>
                            <SvgIcon key={option.name} className="svg">
                                <MyIcon
                                    className={"svgIcon " + (selectedWhatFor[index] ? "rectClicked" : "")}
                                />
                            </SvgIcon>
                            <span className="multiSelectText">{option.name}</span>
                        </span> */}
                    </span>
                );
            })}
        </div>
    )
}

export default MultipleSelectComponent;
