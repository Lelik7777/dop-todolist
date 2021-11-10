import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksType = {
    [key: string]: TaskType[];
}
export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

function App() {

    /* let [tasks, setTasks] = useState([
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
     ]);
     let [filter, setFilter] = useState<FilterValuesType>("all");*/
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(id: string, idL: string) {
        /*  let filteredTasks = tasks.filter(t => t.id != id);
          setTasks(filteredTasks);*/
        setTasks({...tasks, [idL]: tasks[idL].filter(x => x.id !== id)});
    }

    function addTask(title: string, idL: string) {
        let task = {id: v1(), title: title, isDone: false};
        /*let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
        setTasks({...tasks,[idL]:[...tasks[idL],task]})

    }

    function changeStatus(taskId: string, isDone: boolean, idL: string) {
        /*  let task = tasks.find(t => t.id === taskId);
          if (task) {
              task.isDone = isDone;
          }

          setTasks([...tasks]);*/
        setTasks({...tasks,[idL]:tasks[idL].map(x=>x.id===taskId?{...x,isDone}:x)});
    }

    function changeFilter(value: FilterValuesType, idL: string) {
        setTodolists(todolists.map(x=>x.id===idL?{...x,filter:value}:x));
    }


    return (
        <div className="App">
            {
                todolists.map(x => {
                    let tasksForTodolist = tasks[x.id];

                    if (x.filter === 'active') {
                        tasksForTodolist = tasks[x.id].filter(t => t.isDone === false);
                    }
                    if (x.filter === 'completed') {
                        tasksForTodolist = tasks[x.id].filter(t => t.isDone === true);
                    }


                    return (
                        <Todolist
                            key={x.id}
                            idL={x.id}
                            title={x.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={x.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
