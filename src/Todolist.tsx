import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {MappedTodoList} from './components/MappedTodoList';

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
    return <div>
        <h3>{props.title}
            <button onClick={() => props.removeTodolist(props.todolistsID)}>X</button>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
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
            <button className={filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
