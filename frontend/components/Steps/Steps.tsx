'use client';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {};

const STEPS = [
	{
		name: 'Step 1: Add image',
		desciption: 'Choose image for your case',
		url: '/upload',
		value: 'upload',
	},
	{
		name: 'Step 2: Customize design',
		desciption: 'Make your case',
		url: '/design',
		value: 'design',
	},
	{
		name: 'Step 3: Summary',
		desciption: 'Review your final design',
		url: '/preview',
		value: 'preview',
	},
];

const Steps = (props: Props) => {
	const pathname = usePathname();

	return (
		<ol className="rounded-md bg-white flex rouned-none border-l border-r border-gray-200">
			{STEPS.map((step, index) => {
				const isCurrent = pathname.endsWith(step.url);
				const isCompleted = STEPS.slice(index + 1).some((step) => pathname.endsWith(step.url));
				const imgSrc = `/snake-${index + 1}.png`;
				return (
					<li key={index} className="relative overflow-hidden flex-1">
						<div>
							<span
								className={cn(
									'absolute left-0 h-full w-1 bg-zinc-400 bottom-0 top-auto h-1 w-full ',
									{
										'bg-zinc-700': isCurrent,
										'bg-primary': isCompleted,
									},
								)}
								aria-hidden="true"
							/>
							<span
								className={cn('flex items-center px-6 py-4 text-sm font-medium', {
									'lg:pl-9': index !== 0,
								})}>
								<span className="flex-shrink-0">
									<img
										src={imgSrc}
										alt=""
										className={cn('flex h-20 w-20 object-contain items-center justify-center', {
											'border-none': isCompleted,
											'border-zinc-700': isCurrent,
										})}
									/>
								</span>
								<span className={cn('ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center')}>
									<span
										className={cn('text-sm font-semibold text-zink-700', {
											'text-primary': isCompleted,
											'text-zinc-700': isCurrent,
										})}>
										{step.name}
									</span>
									<span
										className={cn('hidden sm:inline text-sm text-zinc-500', {
											inline: isCurrent,
										})}>
										{step.desciption}
									</span>
								</span>
							</span>
							{index !== 0 ? (
								<div className="absolute inset-0 hidden w-3 block">
									<svg
										className="h-full w-full text-gray-300"
										viewBox="0 0 12 82"
										fill="none"
										preserveAspectRatio="none">
										<path
											d="M0.5 0V31L10.5 41L0.5 51V82"
											stroke="currentcolor"
											vectorEffect="non-scaling-stroke"
										/>
									</svg>
								</div>
							) : null}
						</div>
					</li>
				);
			})}
		</ol>
	);
};

export default Steps;
