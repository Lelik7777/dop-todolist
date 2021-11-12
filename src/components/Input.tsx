import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType = {
    type: string;
    value?: string;
    callBack1?: (e: ChangeEvent<HTMLInputElement>) => void;
    callBack2?: (e: KeyboardEvent<HTMLInputElement>) => void;
    checked?:boolean;
}
export const Input = ({type, value, callBack1, callBack2,checked, ...props}: PropsType) => {
    return (
        <input
            type={type}
            value={value}
            onChange={callBack1}
            onKeyPress={callBack2}
            checked={checked}
        />
    )
}