import React from 'react';

export default function MainButton(props) {
    const display_message = props.toggled ? 'set to false' : 'set to true';
    return (
        <button onClick={props.onClick}>{display_message}</button>
    );
}

