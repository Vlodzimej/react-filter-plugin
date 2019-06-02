import axios from 'axios';
/**
 * Асинхронное получение данных с помощью GET-запроса и осуществление их конечной 
 * обработки через промежуточную функцию, заданную в параметре processInputData 
 * объекта input с использованием промисов
 * @param {Object} input Объект с данными элемента фильтра
 * @returns Promise
 */
export const fetchInputData = (input) => {
    return axios
        .get(input.fetchDataURL)
        .then(response =>
            typeof input.processInputData === 'function' ?
            input.processInputData(response.data) :
            response.data
        )
        .catch(data => {
            console.error(data);
        });
}
