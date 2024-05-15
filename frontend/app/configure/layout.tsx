import MaxWidthWrapper from '@/components/MaxWidthWrapper/MaxWidthWrapper';
import React, { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const layout = ({ children }: Props) => {
	return <MaxWidthWrapper className="flex-1 flex flex-col">{children}</MaxWidthWrapper>;
};

export default layout;
