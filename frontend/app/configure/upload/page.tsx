'use client';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Loader2, MousePointerSquareDashed, Image, Divide } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';

type Props = {};

const page = (props: Props) => {
	const [isDragOver, setIsDragOver] = useState<boolean>(false);
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [isPending, startTransition] = useTransition();
	const isUploaded = false;

	const onDropRejected = () => {
		console.log('rejected');
	};
	const onDropAccepted = () => {
		console.log('accepted');
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
							) : isUploaded || isPending ? (
								<Loader2 className="animate-spin h-6 w-6 text-zing-500 mb-2" />
							) : (
								<Image className="h-6 w-6 text-zinc-500 mb-2" />
							)}
							<div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
								{isUploaded ? (
									<div className="flex flex-col items-center">
										<p>Uploading...</p>
										<Progress value={uploadProgress} className="mt-2 w-40 h-2 bg-gray-300" />
									</div>
								) : isPending ? (
									<div className="flex flex-col items-center">
										<p>Redirecting, please wait...</p>
									</div>
								) : isDragOver ? (
									<p>
										<span className="font-semibold">Drop file</span> to upload
									</p>
								) : (
									<p>
										<span className="font-semibold">Click to upload</span> or Drag & Drop
									</p>
								)}
							</div>
							{isPending ? null : <p className="text-xs text-zinc-500">PNG, JPEG, JPG</p>}
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
};

export default page;
