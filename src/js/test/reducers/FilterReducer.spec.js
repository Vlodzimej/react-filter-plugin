import test from 'ava';
import { FilterReducer } from '../../reducers/FilterReducer';

test('should provide the initial state', t => {
	t.truthy(FilterReducer(undefined, {}) === 0);
});

test('should handle GET_FILTER_OPTIONS action', t => {
	t.truthy(FilterReducer(1, { type: 'GET_FILTER_OPTIONS' }) !== 0);
});

test('should handle SHOW_FILTER_PANEL action', t => {
	t.deepEqual(
		FilterReducer({ visible: true }, { type: 'SHOW_FILTER_PANEL' }),
		{ visible: true }
	);
});

test('should handle HIDE_FILTER_PANEL action', t => {
	t.deepEqual(
		FilterReducer({ visible: false }, { type: 'HIDE_FILTER_PANEL' }),
		{ visible: false }
	);
});

test('should handle unknown actions', t => {
	t.truthy(FilterReducer(1, { type: 'unknown' }) === 1);
});
