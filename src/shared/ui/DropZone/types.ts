export interface IDropZoneProps {
	files?: Array<{
		id: string
		file: File
	}>
	onDrop: (file: File[]) => void
	onRemoveFile: (index: number) => void
	accept?: (flag: boolean) => void
	acceptedTypes?: string[]
}
