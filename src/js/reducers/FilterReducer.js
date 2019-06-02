import { handleActions } from 'redux-actions';
import {
	GET_FILTER_OPTIONS,
	SHOW_FILTER_PANEL,
	HIDE_FILTER_PANEL,
	UPDATE_SEARCH_URI
} from '../actions/ActionCreator';

var initialState = 0;

export const FilterReducer = handleActions(
	{
		[GET_FILTER_OPTIONS]: (state, action) => action.payload,

		[SHOW_FILTER_PANEL]: state => {
			return {
				...state,
				visible: true,
			};
		},

		[HIDE_FILTER_PANEL]: state => {
			return {
				...state,
				visible: false,
			};
		},
		[UPDATE_SEARCH_URI]: (state, action) => {
			return {
				...state,
				searchUri: action.payload
			}
		}
	},
	initialState
);
