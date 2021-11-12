import React, {ChangeEvent} from 'react';
import {TaskType} from '../Todolist';

type PropsType = {
    t: TaskType;
    todolistsID: string;
    removeTask: (todolistsID: string, taskId: string) => void;
    changeTaskStatus: (todolistsID: string, taskId: string, isDone: boolean) => void
}
export const MappedTodoList = ({t, todolistsID, removeTask, changeTaskStatus, ...props}: PropsType) => {
    const onClickHandler = () => removeTask(todolistsID, t.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>K
        changeTaskStatus(todolistsID, t.id, e.currentTarget.checked)

    return (
        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
        </li>
    )
}

