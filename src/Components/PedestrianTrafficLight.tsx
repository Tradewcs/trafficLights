import React, { useEffect, useState } from 'react';
import Light from './Light';

type PedestrianTrafficLightProps = {
    isManualControlEnabled: boolean;
    state: "Wait" | "Go";
};

const PedestrianTrafficLight: React.FC<PedestrianTrafficLightProps> = ({
    isManualControlEnabled,
    state
}) => {
    const [pedestrianState, setPedestrianState] = useState<"Wait" | "Go">(state);

    useEffect(() => {
        setPedestrianState(state);
    }, [state]);

    const handlePedestrianClick = (color: string) => {
        if (isManualControlEnabled) {
            const newState = color === "red" ? "Wait" : "Go";
            setPedestrianState(newState);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h2>Pedestrian Traffic Light</h2>
            <Light
                tlColor="red"
                isActive={pedestrianState === "Wait"}
                onClick={() => handlePedestrianClick("red")}
            />
            <Light
                tlColor="green"
                isActive={pedestrianState === "Go"}
                onClick={() => handlePedestrianClick("green")}
            />
        </div>
    );
};

export default PedestrianTrafficLight;
