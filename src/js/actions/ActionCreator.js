import { createAction } from 'redux-actions';

export const GET_INPUTS_OPTIONS = 'GET_INPUTS_OPTIONS';
export const FETCH_INPUT_DATA = 'FETCH_INPUT_DATA';
export const GET_FILTER_OPTIONS = 'GET_FILTER_OPTIONS';
export const UPDATE_SEARCH_URI = 'UPDATE_SEARCH_URI';

export const INIT_INPUT_VALUES = 'INIT_INPUT_VALUES';
export const UPDATE_INPUT_CURRENT_VALUE = 'UPDATE_INPUT_CURRENT_VALUE';
export const APPLY_INPUT_VALUES = 'APPLY_INPUT_VALUES';
export const ROLLBACK_INPUT_VALUES = 'ROLLBACK_INPUT_VALUES';
export const CANCEL_INPUT_VALUES = 'CANCEL_INPUT_VALUES';
export const CLEAR_INPUT_VALUE = 'CLEAR_INPUT_VALUE';

export const SHOW_FILTER_PANEL = 'SHOW_FILTER_PANEL';
export const HIDE_FILTER_PANEL = 'HIDE_FILTER_PANEL';


export const getInputsOptions = createAction(GET_INPUTS_OPTIONS);
export const getFilterOptions = createAction(GET_FILTER_OPTIONS);
export const fetchInputData = createAction(FETCH_INPUT_DATA);
export const updateSearchUri = createAction(UPDATE_SEARCH_URI);

export const initInputValues = createAction(INIT_INPUT_VALUES);
export const updateInputCurrentValue = createAction(UPDATE_INPUT_CURRENT_VALUE);
export const applyInputValues = createAction(APPLY_INPUT_VALUES);
export const rollbackInputValues = createAction(ROLLBACK_INPUT_VALUES);
export const cancelInputValues = createAction(CANCEL_INPUT_VALUES);
export const clearInputValue = createAction(CLEAR_INPUT_VALUE);

export const showFilterPanel = createAction(SHOW_FILTER_PANEL);
export const hideFilterPanel = createAction(HIDE_FILTER_PANEL);