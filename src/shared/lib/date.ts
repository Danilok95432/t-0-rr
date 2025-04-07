import { format, parse } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDateTime = (dateString: string) => {
	try {
		const date = parse(dateString, 'yyyy.MM.dd HH:mm:ss', new Date())
		return format(date, 'dd.MM.yyyy HH:mm:ss', { locale: ru })
	} catch (error) {
		console.error('Ошибка форматирования даты:', error)
		return 'Некорректная дата'
	}
}
