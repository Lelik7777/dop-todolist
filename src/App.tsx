import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {addTaskAC, changeStatusAC, removeTaskAC, taskReducer} from './components/redux/taskReducer';
import {changeFilterAC, filterReducer} from './components/redux/filterReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    let [tasks, tasksDispatch] = useReducer(taskReducer,
        [{id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},]
    );

    let [filter, filterDispatch] = useReducer(filterReducer, 'all');

    function removeTask(id: string) {
        tasksDispatch(removeTaskAC(id));
    }

    function addTask(title: string) {
        tasksDispatch(addTaskAC(title));
    }

    const changeStatus = (CurrentId: string, value: boolean) => {
        tasksDispatch(changeStatusAC(CurrentId, value))
    }


    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        filterDispatch(changeFilterAC(value));
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}

            />
        </div>
    );
}

export default App;
