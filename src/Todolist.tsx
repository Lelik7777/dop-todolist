import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import {Input} from './components/Input';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [filterTasks, setFilterTasks] = useState<FilterValuesType>('all');

    const [title, setTitle] = useState('');

    const filter = (f: FilterValuesType) => {
        setFilterTasks(f);
    }
    const funFilterTasks = (f: FilterValuesType) => {
        switch (f) {
            case 'active':
                return props.tasks.filter(x => !x.isDone);
            case 'completed':
                return props.tasks.filter(x => x.isDone);
            default:
                return props.tasks;
        }
    }
    const addTask = () => {
        props.addTask(title);
        setTitle('');
    }
    const onClickHandler = (id: string) => props.removeTask(id);
    return <div>
        <h3>{props.title}</h3>

        <Input callBack={props.addTask} title={title} setTitle={setTitle}/>
        <Button callBack={addTask} name={'+'}/>
        <ul>
            {
                funFilterTasks(filterTasks)?.map(t => {
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button callBack={() => onClickHandler(t.id)} name={'x'}/>
                    </li>
                })
            }
        </ul>
        <div>
            <Button callBack={() => filter('all')} name={'all'}/>
            <Button callBack={() => filter('active')} name={'active'}/>
            <Button callBack={() => filter('completed')} name={'completed'}/>
        </div>
    </div>
}

