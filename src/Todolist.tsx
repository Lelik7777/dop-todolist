import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {MappedTodoList} from './components/MappedTodoList';
import {Button} from './components/Button';
import {Input} from './components/Input';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsID: string, taskId: string) => void
    changeFilter: (value: FilterValuesType, todolistsID: string) => void
    addTask: (todolistsID: string, title: string) => void
    changeTaskStatus: (todolistsID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistsID: string
    removeTodolist: (todolistsID: string) => void
}

export function Todolist({tasks, filter, ...props}: PropsType) {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistsID, title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter('all', props.todolistsID);
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistsID);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistsID);
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    const callBack = () => props.removeTodolist(props.todolistsID);
    return <div>
        <h3>{props.title}
            <Button
                callBack={callBack}
                name={'x'}
            />

        </h3>
        <div>
            <Input
                type={'text'}
                value={title}
                callBack1={onChangeHandler}
                callBack2={onKeyPressHandler}
            />
            <Button callBack={addTask} name={'+'}/>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    return (
                        <MappedTodoList t={t}
                                        todolistsID={props.todolistsID}
                                        removeTask={props.removeTask}
                                        changeTaskStatus={props.changeTaskStatus}/>
                    )
                })

            }
        </ul>
        <div>

            <Button callBack={onAllClickHandler} name={'all'} filter={filter}/>
            <Button callBack={onActiveClickHandler} name={'active'} filter={filter}/>
            <Button callBack={onCompletedClickHandler} name={'completed'} filter={filter}/>
        </div>
    </div>
}
