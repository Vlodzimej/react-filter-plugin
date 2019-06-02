import * as actions from '../actions/ActionCreator';
import BaseComponent from '../../utils/BaseComponent';

/**
 * Компонент управляющий значениями элементов ввода
 */
export default class InputControl extends BaseComponent {
	constructor(selector, options, store) {
		super(selector, store, 'values');
	}
	/**
	 * Обновление текущего значения элемента ввода
	 * @param {Number} index - Индекс элемента ввода
	 * @param {String} type - Тип элемента ввода
	 * @param {Any} value - Новое значение
	 * TODO: Возможно ли перенести обработку и определение новых значений в редьюсер? И будет ли это более рационально?
	 */
	updateFilterValue(index, type, value) {
		// Объявление переменной, в которую будет помещено новое значения элемента ввода и отправлено в хранилище состояния
		var newValue;
		switch (type) {
			case 'text':
				newValue = value;
				break;

			case 'single':
				newValue = value;
				break;

			case 'multiple':
				var currentValue = [...this.state.values[index].currentValue];
				newValue = currentValue.find(val => val == value)
					? currentValue.filter(val => val != value)
					: [...currentValue, value];
				break;

			case 'select':
				var currentValue = [...this.state.values[index].currentValue];
				newValue = currentValue.find(val => val == value.id)
					? currentValue.filter(val => val != value.id)
					: [...currentValue, value.id];
				break;
		}
		this.dispatch(
			actions.updateInputCurrentValue({ index, value: newValue })
		);
	}

	removeFilterValue(index) {
		this.dispatch(actions.clearInputValue(index));
	}

	render() {
		/**
		 * Рендер не требуется при обновлении состояния values
		 */
	}
}
