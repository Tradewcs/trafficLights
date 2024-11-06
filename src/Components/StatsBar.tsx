import React from 'react';

type StatsBarProps = {
    redClicks: number;
    yellowClicks: number;
    greenClicks: number;
    onToggleOrientation: () => void;
    orientation: "vertical" | "horizontal";
};

const StatsBar: React.FC<StatsBarProps> = ({ redClicks, yellowClicks, greenClicks, onToggleOrientation, orientation }) => {
    return (
        <div style={{ margin: "20px 0" }}>
            <p>Red: {redClicks}, Yellow: {yellowClicks}, Green: {greenClicks}</p>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-6"
                onClick={onToggleOrientation}
            >
                Toggle Orientation (Currently: {orientation})
            </button>
        </div>
    );
};

export default StatsBar;
