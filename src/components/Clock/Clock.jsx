import React, { useState, useEffect } from 'react';
import './Clock.css'
const Clock = ({position}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);


        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedDate = date.toLocaleDateString();

    return (
        <div className={`clock-container ${position === 'left' ? 'clock-container-left' : 'clock-container-right'}`}>
            <h2>Tijd</h2>
            <div>{formattedTime}</div>
            <h2>Datum</h2>
            <div>{formattedDate}</div>
        </div>
    );
};

export default Clock;
