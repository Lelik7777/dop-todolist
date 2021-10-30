import {Button} from './Button';
import React from 'react';
import {TaskType} from '../Todolist';
type PropsType={
    tasks:TaskType[];
    callback:(s:string)=>void;
}
export const MappedUl = ({tasks,callback}:PropsType) => {

    return (
        <ul>
            {
                tasks.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={() => callback(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
    )
}