import {TaskType} from '../../Todolist';
import {v1} from 'uuid';

export const taskReducer = (state: TaskType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return state.filter(t => t.id !== action.payload.id);
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return [...state, task];
        case 'CHANGE-STATUS':
            return state.map(m => m.id === action.payload.id ? {...m, isDone: action.payload.value} : m);
        default:
            return [...state];
    }
}
//automatic create type
type ActionType = ReturnType<typeof removeTaskAC | typeof addTaskAC | typeof changeStatusAC>

export const removeTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASKS',
        payload: {id},
    } as const
};

export const addTaskAC = (title: string) => ({type: 'ADD-TASK', title}) as const

export const changeStatusAC = (id: string, value: boolean) => ({type: 'CHANGE-STATUS', payload: {id, value}}) as const
