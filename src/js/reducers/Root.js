import { combineReducers } from 'redux';
import { InputReducer } from './InputReducer';
import { FilterReducer } from './FilterReducer';
import { ValueReducer } from './ValueReducer';

export const RootReducer = combineReducers({
  filter: FilterReducer,
  inputs: InputReducer,
  values: ValueReducer
});
