import { handleActions } from 'redux-actions';
import { GET_INPUTS_OPTIONS, FETCH_INPUT_DATA } from '../actions/ActionCreator';

const initialState = [];

export const InputReducer = handleActions(
	{
		[GET_INPUTS_OPTIONS]: (state, action) =>
			action.payload.map((input, index) => {
				return {
					...input,
					index: index,
				};
			}),

		[FETCH_INPUT_DATA]: (state, action) =>
			state.map((input, index) =>
				index === action.payload.index
					? {
							...input,
							data: action.payload.inputData,
					  }
					: input
			),
	},
	initialState
);
