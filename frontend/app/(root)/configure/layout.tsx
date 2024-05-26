import Footer from '@/components/Footer/Footer';
import MaxWidthWrapper from '@/components/MaxWidthWrapper/MaxWidthWrapper';
import Navbar from '@/components/Navbar/Navbar';
import Steps from '@/components/Steps/Steps';
import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		// <div className="flex-1 flex flex-col h-full">
		<MaxWidthWrapper className="flex-1 flex flex-col">
			<Steps />
			{children}
		</MaxWidthWrapper>
	);
};

export default layout;
