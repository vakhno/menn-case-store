'use client';
import DesignPreview from '@/components/DesignPreview/DesignPreview';
import { notFound } from 'next/navigation';
import React, { useLayoutEffect, useState } from 'react';

type Props = {};

const page = (props: Props) => {
	const image = window.localStorage.getItem('croppedImage');
	useLayoutEffect(() => {
		if (!window.localStorage.getItem('croppedImage')) {
			return notFound();
		}
	});
	return <DesignPreview imgSrc={image} />;
};

export default page;
