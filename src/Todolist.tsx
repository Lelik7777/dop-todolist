import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styles from './Todolist.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerType} from './components/redux/store';
import {changeFilterAC} from './components/redux/filterReducer';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    //tasks: Array<TaskType>
    removeTask: (taskId: string) => void
   // changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (CurrentId: string, value: boolean) => void
    //filter:FilterValuesType
}

export function Todolist({...props}: PropsType) {
    let tasks = useSelector<RootReducerType, TaskType[]>(state => state.tasks);
    let filter=useSelector<RootReducerType,FilterValuesType>(state => state.filter)
    let [title, setTitle] = useState("")
    let dispatch = useDispatch();
    const [error, setError] = useState<string|boolean>(false)
    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    function changeFilter(value: FilterValuesType) {
        //filterDispatch(changeFilterAC(value));
        dispatch(changeFilterAC(value));
    }
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim());
            setTitle("");
            setError(false)
        }else{
            setError('Title is required')
            setTitle("");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if(title.length>=5){
            setError('Title is too length')
        }else{
            setError(false)
        }

        // setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
            // setError(false)
        }
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    const onChangeHandlerForChangeStatus=(CurrentId: string,event:ChangeEvent<HTMLInputElement>)=>{
        props.changeStatus(CurrentId,event.currentTarget.checked)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ''} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    // const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeStatus(t.id, event.currentTarget.checked)
                    // }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={(event)=>onChangeHandlerForChangeStatus(t.id,event)}/>

                        <span className={t.isDone ? styles.isDone : ''}>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

        <div>
            <button className={filter==='all' ? styles.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={filter==='active' ? styles.activeFilter : ''}  onClick={onActiveClickHandler}>Active</button>
            <button className={filter==='completed' ? styles.activeFilter : ''} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
