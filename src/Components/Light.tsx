import React, { useState } from 'react';

type LightProps = {
    tlColor: string;
    isActive?: boolean;
    onClick: (color: string) => void;
}

const Light: React.FC<LightProps> = ({ tlColor, isActive = false, onClick }) => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
        onClick(tlColor);
    };

    const backgroundColor = isActive ? `bg-${tlColor}` : 'bg-gray';

    return (
        <button onClick={handleClick} className='flex items-center justify-center p-4' style={{ margin: '10px' }}>
            <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-semibold ${backgroundColor}`}>
                {count}
            </div>
        </button>
    );
};

export default Light;
