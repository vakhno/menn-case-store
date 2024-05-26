'use client';
import { Progress } from '@/components/ui/progress';
import { cn, getBase64 } from '@/lib/utils';
import { Loader2, MousePointerSquareDashed, Image, Divide } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import axios, { AxiosRequestConfig } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';

type Props = {};

const page = (props: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isDragOver, setIsDragOver] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [isPending, startTransition] = useTransition();
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

	const onDropRejected = (rejectedFiles: FileRejection[]) => {
		const file = rejectedFiles[0];
		setIsDragOver(false);
		toast({
			title: 'Error',
			description: `${file.file.type} is not supported`,
			variant: 'destructive',
		});
	};
	const onDropAccepted = async (acceptedFile: File[]) => {
		startTransition(async () => {
			const axiosConfig = {
				onUploadProgress: (progressEvent: ProgressEvent) => {
					let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					setUploadProgress(percentCompleted);
				},
			};
			const id = uuid();
			try {
				const file = acceptedFile[0];
				const base64File = await getBase64(file);
				window.localStorage.setItem('originalImage', base64File);
				setTimeout(() => {
					router.push(`/configure/design`);
				}, 2000);
			} catch (error) {
				toast({
					title: 'Error',
					description: `Something went wrong`,
					variant: 'destructive',
				});
			}

			// reader.onload = (e) => {
			// 	console.log('e', e.target?.result);
			// };
			// reader.readAsDataURL(file);
			// const formData = new FormData();
			// formData.append('id', id);
			// formData.append('image', file);
			// const result = await axios.post('http://localhost:8080/photo/upload', formData, axiosConfig);
			// const { success } = result.data;
			// setIsDragOver(false);
			// if (success) {
			// 	setIsRedirecting(true);
			// 	setTimeout(() => {
			// 		router.push(`/configure/design?id=${id}`);
			// 	}, 2000);
			// } else {
			// 	toast({
			// 		title: 'Error',
			// 		description: `Something went wrong`,
			// 		variant: 'destructive',
			// 	});
			// }
		});
	};
	return (
		<div
			className={cn(
				'relative h-full flex-1 m-y-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items center',
				{
					'ring-blue-900/25 bg-blue-900/10': isDragOver,
				},
			)}>
			<div className="relative flex flex-col items-center justify-center w-full">
				<Dropzone
					onDropRejected={onDropRejected}
					onDropAccepted={onDropAccepted}
					maxFiles={1}
					accept={{
						'image/png': ['.png'],
						'image/jpeg': ['.jpeg'],
						'image/jpg': ['.jpg'],
					}}
					onDragEnter={() => setIsDragOver(true)}
					onDragLeave={() => setIsDragOver(false)}>
					{({ getRootProps, getInputProps }) => (
						<div
							className="h-full w-full flex-1 flex flex-col items-center justify-center"
							{...getRootProps()}>
							<input {...getInputProps()} />
							{isDragOver ? (
								<MousePointerSquareDashed className="h-6 w-6 text-zing-500 mb-2" />
							) : isRedirecting || isPending ? (
								<Loader2 className="animate-spin h-6 w-6 text-zing-500 mb-2" />
							) : (
								<Image className="h-6 w-6 text-zinc-500 mb-2" />
							)}
							<div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
								{isPending ? (
									<div className="flex flex-col items-center">
										<p>Uploading...</p>
										<Progress value={uploadProgress} className="mt-2 h-2 bg-gray-300" />
									</div>
								) : isRedirecting ? (
									<div className="flex flex-col items-center">
										<p>Redirecting, please wait...</p>
									</div>
								) : isDragOver && !isRedirecting ? (
									<p>
										<span className="font-semibold">Drop file</span> to upload
									</p>
								) : (
									<p>
										<span className="font-semibold">Click to upload</span> or Drag & Drop
									</p>
								)}
							</div>
							{isPending || isRedirecting ? null : (
								<p className="text-xs text-zinc-500">PNG, JPEG, JPG</p>
							)}
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
};

export default page;
