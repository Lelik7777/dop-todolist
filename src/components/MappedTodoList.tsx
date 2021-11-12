import React, {ChangeEvent} from 'react';
import {TaskType} from '../Todolist';
import {Input} from './Input';
import {Button} from './Button';


type PropsType = {
    t: TaskType;
    todolistsID: string;
    removeTask: (todolistsID: string, taskId: string) => void;
    changeTaskStatus: (todolistsID: string, taskId: string, isDone: boolean) => void
}
export const MappedTodoList = ({t, todolistsID, removeTask, changeTaskStatus, ...props}: PropsType) => {
    const onClickHandler = () => removeTask(todolistsID, t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(todolistsID, t.id, e.currentTarget.checked)

    return (
        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Input type={'checkbox'} callBack1={onChangeHandler} checked={t.isDone}/>
            <span>{t.title}</span>
            <Button callBack={onClickHandler} name={'x'}/>
        </li>
    )
}
