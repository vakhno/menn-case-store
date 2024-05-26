'use client';
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper/MaxWidthWrapper';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import Phone from '../Phone/Phone';

type Props = {};

const PHONES = [
	'/testimonials/1.jpg',
	'/testimonials/2.jpg',
	'/testimonials/3.jpg',
	'/testimonials/4.jpg',
	'/testimonials/5.jpg',
	'/testimonials/6.jpg',
];

const COLUMNS_MOUNT = 3;

type ReviewColumnProps = {
	reviews: string[];
	className?: string;
	reviewClassName?: string;
	msPerPixel?: number;
};

const ReviewColumn = ({
	reviews,
	className,
	reviewClassName,
	msPerPixel = 0,
}: ReviewColumnProps) => {
	const columnRef = useRef<HTMLDivElement | null>(null);
	const [columnHeight, setColumnHeight] = useState(0);
	const duration = `${columnHeight * msPerPixel}ms`;
	console.log('msPerPixel', msPerPixel, columnHeight, reviews);
	useEffect(() => {
		const cleanUp = () => {
			resizeObserver && resizeObserver.disconnect();
		};
		let resizeObserver: null | ResizeObserver = null;
		if (!columnRef.current) {
			return;
		} else {
			resizeObserver = new window.ResizeObserver(() => {
				setColumnHeight(columnRef.current?.offsetHeight || 0);
			});
			resizeObserver.observe(columnRef.current);
		}
		return cleanUp;
	}, []);

	return (
		<div
			ref={columnRef}
			className={cn('animate-marquee space-y-8 py-4 m-auto', className)}
			style={{ '--marquee-duration': duration } as React.CSSProperties}>
			{reviews.concat(reviews).map((src, index) => {
				return <Review key={index} src={src} className={reviewClassName || ''} />;
			})}
		</div>
	);
};

type Review = HTMLAttributes<HTMLDivElement> & {
	src: string;
	className: string;
};

const Review = ({ src, className, ...props }: Review) => {
	const POSSIBLE_ANIMATION_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];
	const animationDelay =
		POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)];

	return (
		<div
			className={cn(
				'animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5 max-w-[320px]',
				className,
			)}
			style={{ animationDelay: animationDelay }}
			{...props}>
			<Phone src={src} />
		</div>
	);
};

const ReviewGrid = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(containerRef, { once: true, amount: 0.5 });

	return (
		<div
			ref={containerRef}
			className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
			{isInView ? (
				<>
					{new Array(COLUMNS_MOUNT).fill('').map((_, index) => (
						<ReviewColumn
							key={index}
							className="hidden block"
							reviews={PHONES.map((phone) => ({ phone, sort: Math.random() }))
								.sort((phoneA, phoneB) => phoneA.sort - phoneB.sort)
								.map(({ phone }) => phone)}
							msPerPixel={index % 2 ? 10 : 15}
						/>
					))}
				</>
			) : null}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
		</div>
	);
};

const Reviews = (props: Props) => {
	return (
		<MaxWidthWrapper className="relative max-w-5xl">
			<img
				src="/what-people-are-buying.png"
				alt=""
				className="absolute select-none hidden xl:block -left-32 top-1/3"
			/>
			<ReviewGrid />
		</MaxWidthWrapper>
	);
};

export default Reviews;
