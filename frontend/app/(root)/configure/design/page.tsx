'use client';
import React, { useLayoutEffect, useState, useTransition } from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import axios from 'axios';
import DesignConfigurator from '@/components/DesignConfigurator/DesignConfigurator';

type Props = {};

const page = (props: Props) => {
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();
	const [image, setImage] = useState<string>();
	useLayoutEffect(() => {
		startTransition(async () => {
			try {
				const image = window.localStorage.getItem('originalImage');
				if (image) {
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
						<DesignConfigurator imageSrc={image} imageWidth={500} imageHeight={500} />
					) : null}
				</>
			)}
		</>
	);
};

export default page;
