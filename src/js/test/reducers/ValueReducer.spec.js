import test from 'ava';
import { ValueReducer } from '../../reducers/ValueReducer';

test('INIT_INPUT_VALUES', t => {
	t.truthy(ValueReducer(undefined, []) === 0);
});

test('UPDATE_INPUT_CURRENT_VALUE', t => {
	t.deepEqual(
		ValueReducer(
			[
				{ initialValue: '0', currentValue: '2' },
				{ initialValue: '1', currentValue: '1' },
			],
			{
				type: 'UPDATE_INPUT_CURRENT_VALUE',
				payload: { index: 1, value: '5' },
			}
		),
		[
			{ initialValue: '0', currentValue: '2' },
			{ initialValue: '1', currentValue: '5' },
		]
	);
});

test('APPLY_INPUT_VALUES', t => {
	t.deepEqual(
		ValueReducer([{ initialValue: '0', currentValue: '2' }], {
			type: 'APPLY_INPUT_VALUES',
		}),
		[{ initialValue: '2', currentValue: '2' }]
	);
});

test('ROLLBACK_INPUT_VALUES', t => {
	t.deepEqual(
		ValueReducer([{ initialValue: '0', currentValue: '2' }], {
			type: 'ROLLBACK_INPUT_VALUES',
		}),
		[{ initialValue: '0', currentValue: '0' }]
	);
});

test('CANCEL_INPUT_VALUES', t => {
	t.deepEqual(
		ValueReducer([{ initialValue: '0', currentValue: '2' }], {
			type: 'CANCEL_INPUT_VALUES',
		}),
		[{ initialValue: '', currentValue: '' }]
	);
});

test('CLEAR_INPUT_VALUE', t => {
	t.deepEqual(
		ValueReducer(
			[
				{ initialValue: '2', currentValue: '3' },
				{ initialValue: '2', currentValue: '3' },
			],
			{
				type: 'CLEAR_INPUT_VALUE',
				payload: 1,
			}
		),
		[
			{ initialValue: '2', currentValue: '3' },
			{ initialValue: '', currentValue: '' },
		]
	);
});
