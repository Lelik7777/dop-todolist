import React from 'react';
import '../App.css';

type ButtonType = {
    callBack: () => void;
    name: string;
}

export const Button = ({callBack, name}: ButtonType) => {
    return (
        <button onClick={callBack}>{name}</button>
    )
}