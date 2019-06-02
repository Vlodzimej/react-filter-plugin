import { handleActions } from 'redux-actions';
import {
	UPDATE_INPUT_CURRENT_VALUE,
	INIT_INPUT_VALUES,
	APPLY_INPUT_VALUES,
	ROLLBACK_INPUT_VALUES,
	CANCEL_INPUT_VALUES,
	CLEAR_INPUT_VALUE,
} from '../actions/ActionCreator';

const initialState = 0;

export const ValueReducer = handleActions(
	{
		[INIT_INPUT_VALUES]: (state, action) => action.payload,

		[UPDATE_INPUT_CURRENT_VALUE]: (state, action) =>
			state.map((item, index) =>
				index === action.payload.index
					? {
							...item,
							currentValue: action.payload.value,
					  }
					: item
			),

		[APPLY_INPUT_VALUES]: state =>
			state.map(x => {
				return {
					initialValue: x.currentValue,
					currentValue: x.currentValue,
				};
			}),

		[ROLLBACK_INPUT_VALUES]: state =>
			state.map(x => {
				return {
					initialValue: x.initialValue,
					currentValue: x.initialValue,
				};
			}),

		[CANCEL_INPUT_VALUES]: state =>
			state.map(x => {
				return {
					initialValue: '',
					currentValue: '',
				};
			}),
		[CLEAR_INPUT_VALUE]: (state, action) =>
			state.map((item, index) =>
				action.payload == index
					? { ...item, currentValue: '', initialValue: '' }
					: { ...item }
			),
	},
	initialState
);
