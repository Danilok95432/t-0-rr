export interface IImportsData {
	id: string
	date: string
	org: string
	accounts: string[]
	file: string
	standard: string
}

export interface IImportsOperation {
	id: string
	date: string
	id_direction: string
	sum: string
	contragent: string
	operation: string
	account: string
	org: string
}

export interface IImportLoadedFileInfo {
	status: string
	operations: string
	dohod: string
	rashod: string
	move: string
	dublicate: string
	error_format: string
	uploaded_filename: string
	new_import: string
	info_messages: string[]
}
