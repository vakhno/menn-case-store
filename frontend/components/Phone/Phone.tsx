import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	src: string;
	dark?: boolean;
};

const Phone = ({ className, src, dark = false, ...props }: Props) => {
	return (
		<div className={cn('relative pointer-events-none z-50 overflow-hidden', className)} {...props}>
			<img
				src={dark ? '/phone-template-dart-edges.png' : '/phone-template-white-edges.png'}
				alt="phone image"
				className="pointer-events-none z-50 select-none"
			/>
			<div className="absolute -z-10 inset-0">
				<img
					src={src}
					alt="overlaying phone image"
					className="object-cover min-w-full min-h-full"
				/>
			</div>
		</div>
	);
};

export default Phone;
