import { useEffect } from "react";
import "./ConclusionComponent.css";


function ConclusionComponent({ componentData, bg, setComponentBackground }) {

    useEffect(() => {
        setComponentBackground(bg)
    }, []);

    return (
        <div className="conclusionDiv">
            {JSON.stringify(componentData)}
        </div >
    );
}

export default ConclusionComponent;
