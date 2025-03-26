import { useDropzone } from 'react-dropzone'

import styles from './dropZone.module.scss'
import { Icon } from '@/components/Icon'
import { Button } from '@/components/Button'

export const DropZone = () => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

	const files = acceptedFiles.map((file) => (
		<div className={styles['uploadFile-wrapper']} key={file.path}>
			<Icon iconId='file' className={styles['uploadFile-icon']} />
			<div className={styles.uploadFile}>
				{file.name} <span className={styles.sizeFile}>{file.size} Б</span>
			</div>

			<Button
				mode='clear'
				icon={<Icon iconId='input-reset' />}
				className={styles.deleteFile}
				onClick={() => console.log(files)}
			/>
		</div>
	))

	const error = null

	console.log(files)

	return (
		<>
			{!files.length ? (
				<section className={styles.container}>
					<div {...getRootProps({ className: 'dropzone' })}>
						<input {...getInputProps()} />
						<p>
							<span>Выберите файл</span> или перетащите файл сюда
						</p>
					</div>
				</section>
			) : (
				<div>{files}</div>
			)}

			{error && (
				<span>
					Для того, чтобы загрузить данные операций, необходимо выбрать формат импортируемого файла
				</span>
			)}
		</>
	)
}
