import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

export const selectInput = input => {
	var inputContainer = document.createElement('div');
	inputContainer.className = 'form-group';

	var select = document.createElement('select');
	select.className = 'form-control';
	select.setAttribute('multiple', 'multiple');

	var inputLabel = document.createElement('div');
	var inputLabelElement = document.createElement('label');
	inputLabelElement.setAttribute('id', `input-${input.index}`);
	inputLabelElement.innerHTML = input.label;
	inputLabel.appendChild(inputLabelElement);

	inputContainer.appendChild(inputLabel);
	inputContainer.appendChild(select);

	var values = [];
	var data = [];
	if (input.values != undefined) {
		values = [...input.values.currentValue];
		data = [...input.data].map(parent => {
			var children = parent.children.map(child =>
				values.find(val => val == child.id)
					? { ...child, selected: true }
					: child
			);
			return { ...parent, children: children };
		});
	}
	var $select = $(select);
	$select.select2({
		tags: true,
		width: '100%',
		data: data,
	});

	// Добавление/удаление значения
	$select.on('select2:select select2:unselect', function(e) {
		var data = e.params.data;
		input.onChange(data);
	});

	return inputContainer;
};
