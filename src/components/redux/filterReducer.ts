import {FilterValuesType} from '../../App';

export  const filterReducer = (state:FilterValuesType,action:ChangeFilterType) => {
  switch (action.type) {
      case 'CHANGE-FILTER':
          return action.value
      default:return state;
  }
}
type ChangeFilterType=ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value:FilterValuesType) => {
  return{
      type:'CHANGE-FILTER',
      value,
  }as  const
}