import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { StandartSection } from './sections/standart-section/StandartContent'
import { useGetStandartInfoQuery } from '@/features/standarts/api/standartsApi'
import { useParams } from 'react-router'

const formatDateTime = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

const StandartContent = () => {
  const { id } = useParams()
  const currentDateTime = formatDateTime(new Date())
  const { data: standartData } = useGetStandartInfoQuery(id ?? '')

  return (
    <ItemLayout 
      labelButton='Вернуться к списку эталонов' 
      pathToBack='standarts' 
      title={`Эталон ${currentDateTime}`}
      isStandart
      customLength={String(standartData?.length)}
      customText={`Всего операций импортировано:`}
    >
      <StandartSection />
    </ItemLayout>
  )
}

export default StandartContent