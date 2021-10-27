import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    /*  const changeFilterAll = () => {
          props.changeFilter('all');
      }
      const changeFilterActive = () => {
          props.changeFilter('active');
      }
      const changeFilterCompleted = () => {
          props.changeFilter('completed');
      }*/
    const filter = (f: FilterValuesType) => {
        props.changeFilter(f);
    }
    const onClickHandler = (id:string) => props.removeTask(id);
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button callBack={addTask} name={'del'}/>
           {/* <button onClick={addTask}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                  /*  const onClickHandler = () => props.removeTask(t.id)*/

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={()=>onClickHandler(t.id)} name={'x'}/>
                  {/*      <button onClick={onClickHandler}>x</button>*/}
                    </li>
                })
            }
        </ul>
        <div>
            <Button callBack={() => filter('all')} name={'all'}/>
            <Button callBack={() => filter('active')} name={'active'}/>
            <Button callBack={() => filter('completed')} name={'completed'}/>
            {/* <button onClick={()=>filter('all')}>All</button>
            <button onClick={()=>filter('active')}>Active</button>
            <button onClick={()=>filter('completed')}>Completed</button>*/}
        </div>
    </div>
}
