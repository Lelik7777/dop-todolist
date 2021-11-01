import React from 'react';

type PropsType = {
    isDone: boolean
}
export const InputCheckBox = ({isDone}: PropsType) => {
    return (

        <input type="checkbox" checked={isDone}/>
    )
}