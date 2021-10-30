import React from 'react';
import '../App.css';
type ButtonType = {
    callBack: () => void;
    name: string;
}

export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack();
    }
    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}