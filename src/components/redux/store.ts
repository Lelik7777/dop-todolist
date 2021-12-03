import {combineReducers, createStore} from 'redux';
import { taskReducer } from './taskReducer';
import {filterReducer} from './filterReducer';

const rootReducer=combineReducers({
    tasks:taskReducer,
    filter:filterReducer,
});
export type RootReducerType=ReturnType<typeof rootReducer>
export const storeRedux=createStore(rootReducer);