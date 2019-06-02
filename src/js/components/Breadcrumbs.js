/**
 * Создание breadcrumbs по данным фильтрации
 */
export const createBreadcrumbs = (inputs, values, removeFilterValue, applyFilter, focusElement) => {
	const breadcrumbData = inputs
		.map((input, index) => {
			const value = Array.isArray(values[index].currentValue)
				? values[index].currentValue.join(',')
				: values[index].currentValue;
			if (value.length == 0) return;
			return {
				label: input.label,
				value: value,
				index: index
			};
		})
		.filter(x => x != undefined);

	return breadcrumbData.map((item, index) => {
		var breadcrumb = document.createElement('div');
		breadcrumb.className = 'items-viewer-filter-breadcrumb';
		breadcrumb.innerHTML = `${item.label} : ${item.value}`;

        var breadcrumbResetButton = document.createElement('span');
        breadcrumbResetButton.className = 'items-viewer-filter-breadcrumb-reset-button';
		breadcrumbResetButton.innerHTML = ' &#10006;';
		
		breadcrumb.onclick = () => {
			focusElement(item.index);
		}
        breadcrumbResetButton.onclick = () => {
			breadcrumb.remove();
			removeFilterValue(item.index);
			applyFilter();
        }

        breadcrumb.appendChild(breadcrumbResetButton);
        return breadcrumb;
	});
};
