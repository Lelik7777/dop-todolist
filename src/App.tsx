import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {addTaskAC, changeStatusAC, removeTaskAC, taskReducer} from './components/redux/taskReducer';
import {changeFilterAC, filterReducer} from './components/redux/filterReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducerType} from './components/redux/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    /*  let [tasks, tasksDispatch] = useReducer(taskReducer,
          [{id: v1(), title: 'HTML&CSS', isDone: true},
              {id: v1(), title: 'JS', isDone: true},
              {id: v1(), title: 'ReactJS', isDone: false},
              {id: v1(), title: 'Rest API', isDone: false},
              {id: v1(), title: 'GraphQL', isDone: false},]
      );*/
    let dispatch = useDispatch();
    //let tasks = useSelector<RootReducerType, TaskType[]>(state => state.tasks);
   //let filter=useSelector<RootReducerType,FilterValuesType>(state => state.filter)
    // let [filter, filterDispatch] = useReducer(filterReducer, 'all');

    function removeTask(id: string) {
        //tasksDispatch(removeTaskAC(id));
        dispatch(removeTaskAC(id));
    }

    function addTask(title: string) {
        // tasksDispatch(addTaskAC(title));
        dispatch(addTaskAC(title))
    }

    const changeStatus = (CurrentId: string, value: boolean) => {
        //tasksDispatch(changeStatusAC(CurrentId, value))
        dispatch(changeStatusAC(CurrentId, value));
    }


   /* let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }*/




    return (
        <div className="App">
            <Todolist title="What to learn"
                     // tasks={tasksForTodolist}
                      removeTask={removeTask}
                     // changeFilter={changeFilter}
                      addTask={addTask}
                     // filter={filter}
changeStatus={changeStatus}
            />
        </div>
    );
}

export default App;
