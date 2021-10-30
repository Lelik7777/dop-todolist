import React from 'react';
import '../App.css';

type ButtonType = {
    callBack: () => void;
    name: string;
}

export const Button = ({callBack, name}: ButtonType) => {
    const onClickHandler = () => {
        callBack();
    }
    return (
        <button onClick={onClickHandler}>{name}</button>
    )
}