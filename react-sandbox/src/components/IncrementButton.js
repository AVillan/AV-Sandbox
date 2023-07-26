import React from 'react';

export default function IncrementButton(props) {
    
    return (
        <>
            <button onClick={props.onClick}>Current Increment Button Count <span>{props.count}</span></button>
        </>
    );
}