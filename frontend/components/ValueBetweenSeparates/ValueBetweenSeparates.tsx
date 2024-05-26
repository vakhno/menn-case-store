import React from 'react';
import { Separator } from '@/components/ui/separator';

type Props = {
	text: string;
};

const ValueBetweenSeparates = ({ text }: Props) => {
	return (
		<div className="flex justify-center items-center overflow-hidden">
			<Separator />
			<span className="px-4">{text}</span>
			<Separator />
		</div>
	);
};

export default ValueBetweenSeparates;
