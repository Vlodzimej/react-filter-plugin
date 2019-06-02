import * as actions from '../actions/ActionCreator';
import BaseComponent from '../../utils/BaseComponent';
import { textInput, singleInput, multipleInput, selectInput } from './inputs';
import { fetchInputData } from '../services';
import InputControl from './InputControl';
import { createBreadcrumbs } from './Breadcrumbs';
import '../../css/items-viewer-filter.css';

/**
 * Компонент "Фильтр"
 */
export default class Filter extends BaseComponent {
	constructor(selector, options, store) {
		super(selector, store, 'filter', 'inputs');
		const that = this;
		this.store = store;
		this.createElements(options);
		this.init(options);
	}

	/**
	 * Инициализация компонента
	 * @param {Array} options - Настройки инициализации
	 */
	init(options) {
		this.inputControl = new InputControl(null, null, this.store);
		/// Получение данных фильтра
		this.dispatch(actions.getFilterOptions(options.filter));
		this.loadInputsData(options.inputs);

		var initValues = options.inputs.map(() => {
			return { initialValue: '', currentValue: '' };
		});

		this.dispatch(actions.initInputValues(initValues));
	}

	/**
	 * Наполнение содержимого элементов с помощью подгрузки асинхронных данных
	 * *Выполняется при указанном пути в свойстве fetchDataURL и пустом значении свойства data
	 * @param {Array} inputs
	 */
	loadInputsData(inputs) {
		const { apiUrl } = this.store.getState().filter;
		/// Получаем настроек элементов фильтра указанных при инициализации
		this.dispatch(actions.getInputsOptions(inputs));
		/// Подтягиваем даннные заполнения для каждого элемента с сервера(если необходимо)
		inputs.map((input, index) => {
			if (
				input.fetchDataUrl != undefined &&
				input.fetchDataUrl != '' &&
				input.data.length == 0
			) {
				const { fetchDataUrl, processInputData } = input;
				const slash =
					fetchDataUrl[0] == '/' && apiUrl.length > 0 ? '' : '/';
				fetchInputData({
					processInputData,
					fetchDataURL: `${apiUrl}${slash}${fetchDataUrl}`,
				}).then(data => {
					const newData = {
						inputData: data,
						index: index,
					};
					this.dispatch(actions.fetchInputData(newData));
				});
			}
		});
	}

	/**
	 * Реднер отдельного элемента фильтра
	 * @param {Object} input
	 */
	renderInput(input) {
		switch (input.type) {
			case 'text':
				return $(textInput(input));
			case 'single':
				return $(singleInput(input));
			case 'multiple':
				return $(multipleInput(input));
			case 'select':
				return $(selectInput(input));
				break;
		}
	}

	/**
	 * Сброс значений элементов фильтра
	 */
	resetFilter() {
		this.dispatch(actions.cancelInputValues());
		this.updateSearchUri();
		// Принудительно вызвываем метод рендера,
		// так как изменение состояния хранилища значений (values)
		// не вызывает рендер элементов, а их нужно обновить,
		// потому что текущие значения изменились
		this.$filterPanelBreadcrumbContainer.html('');
		this.render();
	}

	/**
	 * Переключение видимости панели
	 * @param {boolean} show - Флаг принудительного отображения панели
	 */
	toggleFilterPanel(show) {
		const { visible } = this.store.getState().filter;
		var toggleFilterPanel =
			!visible || show
				? actions.showFilterPanel
				: actions.hideFilterPanel;
		this.dispatch(actions.rollbackInputValues());
		this.dispatch(toggleFilterPanel());
	}

	/**
	 * Формирование поисковой строки searchUri
	 */
	getSearchURI() {
		var { filter, inputs, values } = this.store.getState();
		var data = this.getFilterResultData(inputs, values);
		var searchSections = data.map(option => {
			return `${option.name}=${option.value}`;
		});

		var searchString = filter.encodeSearchUri
			? encodeURIComponent(searchSections.join('&'))
			: searchSections.join('&');
		return `searchUri=${searchString}`;
	}

	getFilterResultData(inputs, values) {
		return inputs
			.map((input, index) => {
				/*
				const value = Array.isArray(values[index])
					? values[index].currentValue.join(',')
					: values[index].currentValue;
				*/
				const value = values[index].currentValue;
				if (value.length == 0) return;
				return {
					name: input.name,
					value: value,
				};
			})
			.filter(x => x != undefined);
	}

	/**
	 * Применение настроек фильтра
	 * Если при инициализации не была задана пользовательская функция обработка конечных данных,
	 * тогда производится запуск стандартной функции формирования searchUri
	 */
	applyFilter() {
		const { filter, inputs, values } = this.store.getState();
		this.dispatch(actions.applyInputValues());

		typeof filter.getResult === 'function'
			? filter.getResult(this.getFilterResultData(inputs, values))
			: this.updateSearchUri(inputs, values);

		this.$filterPanelBreadcrumbContainer.html('');
		this.$filterPanelBreadcrumbContainer.append(
			$(
				createBreadcrumbs(
					inputs,
					values,
					index => this.removeFilterParam(index),
					() => this.applyFilter(),
					index => this.focusElement(index)
				)
			)
		);
	}

	/**
	 * Обновление searchUri в хранилище состояния фильтра
	 */
	updateSearchUri() {
		const searchUri = this.getSearchURI();
		this.dispatch(actions.updateSearchUri(searchUri));
	}

	removeFilterParam(index) {
		this.inputControl.removeFilterValue(index);
		this.render();
	}

	focusElement(index) {
		console.log('focus element');
		this.toggleFilterPanel(true);
		//TODO: Реализовать установку фокуса на элементе ввода, либо его подсветку
	}

	/**
	 * Рендер Фильтра
	 * *Осуществляется при каждом изменении состояния filter и inputs
	 */
	render() {
		const { inputs, filter, values } = this.store.getState();
		// Отрисовка названия
		this.$filterPanel.css({ width: filter.width });
		this.$filterPanelSwitchLabel.text(filter.title);
		// Формирование массива с элементами ввода
		const $inputs = inputs.map((input, index) => {
			// К данным элемента ввода добавляем значение его индекса(порядкового номера)
			// и указатель на функцию обновления текущего значения в хранилище состояния
			const data = {
				...input,
				index: index,
				values: values[index],
				onChange: value =>
					this.inputControl.updateFilterValue(
						index,
						input.type,
						value
					),
			};
			return this.renderInput(data);
		});
		// Очистка формы содержимого фильтра
		this.$filterPanelBody.html('');
		// Добавление элементов ввода в форму фильтра
		this.$filterPanelBody.append($inputs);
		// Отображение формы в зависимости от значения свойства visible
		filter.visible ? this.$filterPanel.show() : this.$filterPanel.hide();
		if (filter.showSearchUri)
			this.$filterPanelBody.append($('<div>').text(filter.searchUri));
	}

	/**
	 * Создание основных элементов управления фильтра
	 * @param {Object} options - Настройки инициализации
	 */
	createElements(options) {
		var that = this;
		this.$filterPanelBreadcrumbContainer = $('<div>');
		// Переключатель отображения
		this.$filterPanelSwitch = $('<div>').addClass(
			'items-viewer-filter-breadcrumb'
		);
		this.$filterPanelSwitchLabel = $('<span>').html('test');
		this.$filterPanelSwitch
			.append(this.$filterPanelSwitchLabel)
			.on('click', e => {
				that.toggleFilterPanel();
			});

		this.$filterPanelBottom = $('<div>')
			.addClass('panel-footer')
			.css({
				display: 'flex',
				justifyContent: 'space-between',
			});

		this.$filterButtonApply = $('<button>')
			.addClass('btn btn-primary')
			.text(options.filter.buttons.apply)
			.on('click', () => {
				that.applyFilter();
			});

		this.$filterButtonCancel = $('<button>')
			.addClass('btn btn-default')
			.text(options.filter.buttons.cancel)
			.on('click', () => {
				that.resetFilter();
			});

		this.$filterPanelBottom
			.append(this.$filterButtonApply)
			.append(this.$filterButtonCancel);
		/*
		$(document).on('mouseup', e => {
			console.log(
				that.$filterPanelBody.is(e.target),
				that.$filterPanelBody.has(e.target).length
			);
			if (
				that.$filterPanelSwitch.has(e.target).length == 0 &&
				that.$filterPanel.has(e.target).length == 0
			) {
				that.toggleFilterPanel(false);
			}
		});
*/
		// Основная панель фильтра
		this.$filterPanel = $('<div>').addClass('panel panel-default');
		// Заголовок
		if (options.filter.showHeader) {
			this.$filterPanelHeader = $('<div>')
				.addClass('panel-heading')
				.text(options.filter.title);
			this.$filterPanel.append(this.$filterPanelHeader);
		}
		// Контейнер с контентом
		this.$filterPanelBody = $('<div>').addClass('panel-body');
		this.$filterPanel.append(this.$filterPanelBody);
		this.$filterPanel.append(this.$filterPanelBottom);
		this.$selector.append(this.$filterPanelSwitch);
		this.$selector.append(this.$filterPanelBreadcrumbContainer);
		this.$selector.append(this.$filterPanel);
	}
}
