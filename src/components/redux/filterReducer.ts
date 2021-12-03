import {FilterValuesType} from '../../App';
let initialFilter:FilterValuesType='all';
export  const filterReducer = (state:FilterValuesType=initialFilter,action:ChangeFilterType):FilterValuesType => {
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