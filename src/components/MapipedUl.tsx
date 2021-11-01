import {Button} from './Button';
import React from 'react';
import {TaskType} from '../Todolist';
import {InputCheckBox} from './InputCheckBox';

type PropsType = {
    tasks: TaskType[];
    callback: (s: string) => void;
}
export const MappedUl = ({tasks, callback}: PropsType) => {

    return (
        <ul>
            {
                tasks.map(t => {
                    const callBack = () => callback(t.id);
                    return <li key={t.id}>
                        <InputCheckBox isDone={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={callBack} name={'x'}/>
                    </li>
                })
            }
        </ul>
    )
}
