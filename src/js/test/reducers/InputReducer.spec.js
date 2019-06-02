import test from 'ava';
import { InputReducer } from '../../reducers/InputReducer';

test('should provide the initial state', t => {
	t.deepEqual(InputReducer(undefined, {}), []);
});

test('should handle GET_INPUTS_OPTIONS action', t => {
	t.deepEqual(
		InputReducer(
			{},
			{
				type: 'GET_INPUTS_OPTIONS',
				payload: [{ value: '0' }, { value: '1' }],
			}
		),
		[{ value: '0', index: 0 }, { value: '1', index: 1 }]
	);
});

test('should handle FETCH_INPUT_DATA action', t => {
	t.deepEqual(
		InputReducer([{ index: 0, data: null }, { index: 1, data: null }], {
			type: 'FETCH_INPUT_DATA',
			payload: { index: 1, inputData: 'test' },
		}),
		[{ index: 0, data: null }, { index: 1, data: 'test' }]
	);
});

test('should handle unknown actions', t => {
	t.truthy(InputReducer(1, { type: 'unknown' }) === 1);
});
