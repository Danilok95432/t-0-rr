import { ItemLayout } from '@/shared/layouts/ItemLayout'
import { BalanceAccount } from './sections/BalanceAccountSection'
import { MainDataAccount } from './sections/MainDataAccountSection'
// import { MovementsAccount } from './sections/MovementsAccountSection'
import { useParams } from 'react-router-dom'
import { useGetAccountInfoQuery } from '@/features/accounts/api/accountsApi'
import { Loader } from '@/shared/ui/Loader'

const AccountContent = () => {
	const { id = '0' } = useParams()
	const { data: accountInfoData } = useGetAccountInfoQuery(id)
	const balanceInfo = {
		prihod: accountInfoData?.prihod ?? '',
		rashod: accountInfoData?.rashod ?? '',
		balance: accountInfoData?.balance ?? '',
	}
	// const transferInfo = {
	// 	expence_org_transfers: accountInfoData?.expence_org_transfers ?? '',
	// 	income_org_transfers: accountInfoData?.income_org_transfers ?? '',
	// }

	return !accountInfoData ? (
			<Loader />
		) : (
		<ItemLayout labelButton='Вернуться к списку счетов' pathToBack='accounts' title={`Счёт «${accountInfoData?.account_name}»`}>
			<BalanceAccount balanceInfo={balanceInfo} />
			<MainDataAccount id={id} account={accountInfoData} />
			{/* <MovementsAccount transferInfo={transferInfo} /> */}
		</ItemLayout>
	)
}

export default AccountContent
