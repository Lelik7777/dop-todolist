import React from 'react';
import {FilterValuesType} from '../App';


type PropsType = {
    callBack: () => void;
    name: string | FilterValuesType;
    filter?: FilterValuesType;
}
export const Button = ({callBack, name, filter, ...props}: PropsType) => {

    return (
        <button
            onClick={callBack}
            className={filter === name ? 'active-filter' : ''}
        >
            {name}
        </button>
    )
}
