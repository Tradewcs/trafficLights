import { useState } from 'react'
import StatsBar from './StatsBar';
import TrafficLights from './TrafficLights';

const ClicksDashboard = () => {
    const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");

    const [redClicks, setRedClicks] = useState(0);
    const [yellowClicks, setYellowClicks] = useState(0);
    const [greenClicks, setGreenClicks] = useState(0);

    const handleLightClick = (color: string) => {
        if (color === "red") setRedClicks(redClicks + 1);
        if (color === "yellow") setYellowClicks(yellowClicks + 1);
        if (color === "green") setGreenClicks(greenClicks + 1);
    };

    const toggleOrientation = () => {
        setOrientation(orientation === "vertical" ? "horizontal" : "vertical");
    };

    return (
        <div>
            <StatsBar
                redClicks={redClicks}
                yellowClicks={yellowClicks}
                greenClicks={greenClicks}
                onToggleOrientation={toggleOrientation}
                orientation={orientation}
            />
            <TrafficLights
                initColor="yellow"
                orientation={orientation}
                onLightClick={handleLightClick}
            />
        </div>
    );
}

export default ClicksDashboard