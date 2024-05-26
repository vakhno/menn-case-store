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
		<MaxWidthWrapper className="h-full w-full flex justify-center items-center">
			{children}
		</MaxWidthWrapper>
	);
};

export default layout;
