import React, { useState, useEffect } from 'react';
import TrafficLights from './TrafficLights';
import PedestrianTrafficLight from './PedestrianTrafficLight';

const TrafficSystem: React.FC = () => {
    const [carLight, setCarLight] = useState<"red" | "yellow" | "green">("green");
    const [pedestrianLight, setPedestrianLight] = useState<"Wait" | "Go">("Wait");
    const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical");

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzVTzYWlIwwQEYLatGnycVJ5pLuYchGif4DEOYEWLEKaC8cWsqKe5vmaIJKtu7p2Pjm/exec';

    useEffect(() => {
        const interval = setInterval(async () => {
            switch (carLight) {
                case "green":
                    setCarLight("yellow");
                    setPedestrianLight("Wait");
                    await sendStateToGoogleScript("yellow", false);
                    break;
                case "yellow":
                    setCarLight("red");
                    setPedestrianLight("Go");
                    await sendStateToGoogleScript("red", false);
                    break;
                case "red":
                    setCarLight("green");
                    setPedestrianLight("Wait");
                    await sendStateToGoogleScript("green", false);
                    break;
                default:
                    break;
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [carLight]);

    const handlePedestrianLightToggle = async () => {
        if (pedestrianLight === "Go") {
            return
        } 

        setPedestrianLight("Go");
        setCarLight("green");
        await sendStateToGoogleScript("green", true);
    };

    const sendStateToGoogleScript = async (state: "red" | "green" | "yellow", isAutomatic: boolean) => {
        try {
            const response = await fetch(googleScriptUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    state: state,
                    isAutomatic: JSON.stringify(isAutomatic),
                }),
            });

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error("Error updating Google Script:", error);
        }
    };

    const isManualControlEnabled = carLight === "red";

    useEffect(() => {
        if (carLight === "green" || carLight === "yellow") {
            setPedestrianLight("Wait");
        }
    }, [carLight]);

    const toggleOrientation = () => {
        setOrientation(orientation === "vertical" ? "horizontal" : "vertical");
    };

    return (
        <div className="flex flex-col items-center gap-10">
            <div className="mb-4">
                <button
                    onClick={toggleOrientation}
                    className="p-2 rounded bg-blue-500 text-white"
                >
                    Toggle Orientation ({orientation === "vertical" ? "Vertical" : "Horizontal"})
                </button>
            </div>
            
            <div className="flex gap-10">
                <TrafficLights
                    orientation={orientation}
                    state={carLight}
                    onLightClick={(color) => setCarLight(color as "red" | "green" | "yellow")}
                />
                <PedestrianTrafficLight
                    state={pedestrianLight}
                    isManualControlEnabled={isManualControlEnabled}
                />
            </div>

            <button
                onClick={handlePedestrianLightToggle}
                disabled={isManualControlEnabled}
                className={`mt-4 p-2 rounded ${!isManualControlEnabled ? 'bg-blue-500' : 'bg-gray-400'} text-white`}
            >
                {pedestrianLight === "Wait" ? "Allow Crossing" : "Stop Crossing"}
            </button>
        </div>
    );
};

export default TrafficSystem;
