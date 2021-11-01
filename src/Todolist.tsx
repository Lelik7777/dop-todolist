import React, {useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';
import {Input} from './components/Input';
import {MappedUl} from './components/MapipedUl';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title0: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask0: (title: string) => void
}

export function Todolist({tasks, title0, removeTask, addTask0}: PropsType) {
    const [filterTasks, setFilterTasks] = useState<FilterValuesType>('all');

    const [title, setTitle] = useState('');

    const filter = (f: FilterValuesType) => {
        setFilterTasks(f);
    }
    const funFilterTasks = (f: FilterValuesType) => {
        switch (f) {
            case 'active':
                return tasks.filter(x => !x.isDone);
            case 'completed':
                return tasks.filter(x => x.isDone);
            default:
                return tasks;
        }
    }
    const addTask = () => {
        addTask0(title);
        setTitle('');
    }
    const onClickHandler = (id: string) => removeTask(id);
    const callBack = () => filter('all');
    const callBack1 = () => filter('active');
    const callBack2 = () => filter('completed');
    return <div>
        <h3>{title0}</h3>

        <Input callBack={addTask} title={title} setTitle={setTitle}/>
        <Button callBack={addTask} name={'+'}/>

        <MappedUl callback={onClickHandler} tasks={funFilterTasks(filterTasks)}/>

        <div>
            <Button callBack={callBack} name={'all'}/>
            <Button callBack={callBack1} name={'active'}/>
            <Button callBack={callBack2} name={'completed'}/>
        </div>
    </div>
}
