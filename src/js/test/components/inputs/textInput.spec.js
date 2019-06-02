import test from 'ava';
import { textInput } from '../../../components/inputs/textInput';

test('Check textInput element', t => {
	var input = textInput({ index: 1, name: 'test' }).getElementsByTagName(
		'input'
	);
	t.truthy(input.test != undefined);
});
