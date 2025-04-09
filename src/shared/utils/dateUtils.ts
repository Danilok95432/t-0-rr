/**
 * Устанавливает конечную дату на основе введенного значения
 * @param input - Объект с полем value, содержащим строку даты
 * @returns Date - Объект даты
 */
export const setEndDate = (input: { value: string }): Date => {
	const inputValue = input.value.trim()

	if (inputValue) {
		const parsedDate = new Date(inputValue)

		// Проверка на валидность даты
		if (isNaN(parsedDate.getTime())) {
			console.warn('Введена некорректная дата, используется дата по умолчанию')
			return getTomorrowDate()
		}

		return parsedDate
	} else {
		return getTomorrowDate()
	}
}

/**
 * Возвращает дату завтрашнего дня
 * @returns Date - Объект даты завтрашнего дня
 */
export const getTomorrowDate = (): Date => {
	const tomorrow = new Date()
	tomorrow.setDate(tomorrow.getDate() + 1)
	return tomorrow
}
