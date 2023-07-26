import React from 'react';

export default function MainButton(props) {
    const display_message = props.toggled ? 'Bazinga' : 'Yoof';
    return (
        <>
        <button onClick={props.onClick}>
            <span>{display_message}</span>
        </button>
        </>
    );
}

