'use client';
import React, { useLayoutEffect, useState, useTransition } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import axios from 'axios';
import DesignConfigurator from '@/components/DesignConfigurator/DesignConfigurator';

type Props = {};

const page = (props: Props) => {
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [image, setImage] = useState();
	useLayoutEffect(() => {
		startTransition(async () => {
			try {
				const id = searchParams.get('id');
				const result = await axios.post('http://localhost:8080/photo/is-photo-exist', { id });
				console.log('res', result);
				const { success, image } = result.data;
				if (success) {
					setImage(image);
				}
			} catch (error) {
				return notFound();
			}
		});
	}, []);

	return (
		<>
			{isPending ? null : (
				<>
					{image ? (
						<DesignConfigurator
							imageSrc={`${process.env.NEXT_PUBLIC_IMAGES_UPLOAD_URI}${image}`}
							imageWidth={500}
							imageHeight={500}
						/>
					) : null}
				</>
			)}
		</>
	);
};

export default page;
