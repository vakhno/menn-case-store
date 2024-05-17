import MaxWidthWrapper from '@/components/MaxWidthWrapper/MaxWidthWrapper';
import Steps from '@/components/Steps/Steps';
import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const layout = ({ children }: Props) => {
	return (
		<MaxWidthWrapper className="flex-1 flex flex-col">
			<Steps />
			{children}
		</MaxWidthWrapper>
	);
};

export default layout;
