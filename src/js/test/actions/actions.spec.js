import test from 'ava';
import * as actions from '../../actions/ActionCreator';

test('Filter actions', (t) => {
  t.deepEqual(actions.getFilterOptions(1), {type: actions.GET_FILTER_OPTIONS, payload: 1});
  t.deepEqual(actions.showFilterPanel(1), {type: actions.SHOW_FILTER_PANEL, payload: 1});
  t.deepEqual(actions.hideFilterPanel(1), {type: actions.HIDE_FILTER_PANEL, payload: 1});  
});

test('Values actions', (t) => {
  t.deepEqual(actions.initInputValues(1), {type: actions.INIT_INPUT_VALUES, payload: 1});
  t.deepEqual(actions.updateInputCurrentValue(1), {type: actions.UPDATE_INPUT_CURRENT_VALUE, payload: 1});
  t.deepEqual(actions.applyInputValues(1), {type: actions.APPLY_INPUT_VALUES, payload: 1});  
  t.deepEqual(actions.rollbackInputValues(1), {type: actions.ROLLBACK_INPUT_VALUES, payload: 1});
  t.deepEqual(actions.cancelInputValues(1), {type: actions.CANCEL_INPUT_VALUES, payload: 1});    
});

test('Input actions', (t) => {
  t.deepEqual(actions.getInputsOptions(1), {type: actions.GET_INPUTS_OPTIONS, payload: 1});
  t.deepEqual(actions.fetchInputData(1), {type: actions.FETCH_INPUT_DATA, payload: 1});  
});
