import { TFormNewOperation } from './formNewOperation'

export type TFormProcessingOperation = TFormNewOperation & {
	initialAmount: string
	retainedAmount: string
	sumOperationDivision: string
	counterpartyDivision: string
	counterpartyAccountDivision: string
	caseDivision: string
	articleDivision: string
}
