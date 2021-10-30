import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {Button} from './Button';

type PropsType = {
    callBack: (title: string) => void;
}
export const FullInput = ({callBack}: PropsType) => {
    const [title, setTitle] = useState('');
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callBack(title);
        }
    }
    const addTask = () => {
        callBack(title);
        setTitle('');
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button callBack={addTask} name={'+'}/>
        </div>
    )
}

