import React from 'react';
import Light from './Light';

type TrafficLightsProps = {
    orientation: "vertical" | "horizontal";
    state: "red" | "green" | "yellow";
    onLightClick: (color: string) => void;
};

const TrafficLights: React.FC<TrafficLightsProps> = ({ orientation, state, onLightClick }) => {
    return (
        <div className={`trafficLight flex flex-col items-center border-2 border-black p-2 rounded-lg w-fit`}>
            <div className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} justify-center`}>
                <Light isActive={state === 'red'} tlColor="red" onClick={() => onLightClick("red")} />
                <Light isActive={state === 'yellow'} tlColor="yellow" onClick={() => onLightClick("yellow")} />
                <Light isActive={state === 'green'} tlColor="green" onClick={() => onLightClick("green")} />
            </div>
        </div>
    );
};

export default TrafficLights;
