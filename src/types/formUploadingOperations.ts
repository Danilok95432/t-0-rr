export type TFormUploadingOperations = {
	fileType?: '1cExchange' | 'YSet' | 'custom'
	files: Array<{
		file: File
	}>
}
