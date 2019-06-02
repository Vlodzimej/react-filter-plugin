/**
 * Элемент ввода с множественным выбором вариантов
 * @param {Object} input
 */
export const multipleInput = input => {
	const currentValue = input.values != undefined ? [...input.values.currentValue] : [];
	var inputContainer = document.createElement('div');
	inputContainer.className = 'form-group';

	var buttonGroup = document.createElement('div');
	buttonGroup.className = 'btn-group';
	buttonGroup.setAttribute('id', `input-${input.index}`);
	buttonGroup.setAttribute('name', input.name);

	var inputLabel = document.createElement('div');
	var inputLabelElement = document.createElement('label');
	inputLabelElement.setAttribute('id', `input-${input.index}`);
	inputLabelElement.innerHTML = input.label;
	inputLabel.appendChild(inputLabelElement);

	input.data.map(item => {
		var button = document.createElement('button');
		button.className = 'btn btn-default';
		button.setAttribute('data-value', item.name);
		button.innerHTML = item.label;
		button.style.outline = 0;

		buttonGroup.appendChild(button);

		if (currentValue.find(x => x == item.name)) {
			console.log('item name', item.name)
			button.classList.add('active');
		}

		button.onmouseup = () => {
			var buttonValue = button.dataset.value;

			currentValue != buttonValue
				? input.onChange(buttonValue)
				: input.onChange('');

			button.classList.toggle('active');
			button.blur();
		};
	});

	inputContainer.appendChild(inputLabel);
	inputContainer.appendChild(buttonGroup);

	return inputContainer;	
};
