/**
 * Текстовый элемент ввода
 * @param {Object} input
 */
export const textInput = input => {
    console.log('input', input);
	var inputContainer = document.createElement('div');
	inputContainer.className = 'form-group';

	var inputElement = document.createElement('input');
	inputElement.className = 'form-control';
	inputElement.setAttribute('type', 'text');
	inputElement.setAttribute('id', `input-${input.index}`);
	inputElement.setAttribute('name', input.name);

	var inputLabel = document.createElement('label');
	inputLabel.setAttribute('for', `input-${input.index}`);
	inputLabel.innerHTML = input.label;

	if (input.values != undefined) {
		inputElement.value = input.values.currentValue;
	}

	inputContainer.appendChild(inputLabel);
	inputContainer.appendChild(inputElement);

	inputElement.oninput = () => {
		input.onChange(inputElement.value);
	};
   
	return inputContainer;
};
