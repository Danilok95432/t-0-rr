import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { StandartSection } from './sections/standart-section/StandartContent'

const formatDateTime = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

const StandartContent = () => {
  const currentDateTime = formatDateTime(new Date())

  return (
    <ItemLayout 
      labelButton='Вернуться к списку эталонов' 
      pathToBack='standarts' 
      title={`Эталон ${currentDateTime}`}
      isStandart
      customLength='0'
      customText='Всего операций импортировано:'
    >
      <StandartSection />
    </ItemLayout>
  )
}

export default StandartContent