import React, { Fragment, useRef, useState, useLayoutEffect } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import NextImage from 'next/image';
import { cn, formatedPrice, getBase64 } from '@/lib/utils';
import { Rnd } from 'react-rnd';
import HandleComponent from '@/components/HandleComponent/HandleComponent';
import { ScrollArea } from '../ui/scroll-area';
import { Field, Radio, RadioGroup, Description, Label as RadioLabel } from '@headlessui/react';
import { Label } from '../ui/label';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import { RadioGroupItem, RadioGroup as RadioG } from '../ui/radio-group';
type Props = {
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
};

const COLORS = [
	{ label: 'Black', value: 'black', tw_bg: 'bg-zinc-900', tw_border: 'bg-zinc-900' },
	{ label: 'Blue', value: 'blue', tw_bg: 'bg-blue-900', tw_border: 'bg-blue-900' },
	{ label: 'Rose', value: 'rose', tw_bg: 'bg-rose-900', tw_border: 'bg-rose-900' },
] as const;

const MODELS = [
	{ label: 'IPhone X', value: 'iphonex', price: 14 },
	{ label: 'IPhone 11', value: 'iphone11', price: 14 },
	{ label: 'IPhone 12', value: 'iphone12', price: 14 },
	{ label: 'IPhone 13', value: 'iphone13', price: 14 },
	{ label: 'IPhone 14', value: 'iphone14', price: 18 },
	{ label: 'IPhone 15', value: 'iphone15', price: 18 },
] as const;

const MATERIALS = [
	{ label: 'Silicone', value: 'silicone', description: null, price: 0 },
	{
		label: 'Polycarbonate',
		value: 'polycarbonate',
		description: 'Scratch-resistant coating',
		price: 10,
	},
] as const;

const FINISHES = [
	{ label: 'Smooth', value: 'smooth', description: null, price: 0 },
	{ label: 'Textured', value: 'textured', description: 'Soft grippy texture', price: 3 },
];

const DesignConfigurator = ({ imageSrc, imageWidth, imageHeight }: Props) => {
	const router = useRouter();
	const [options, setOptions] = useState<{
		color: (typeof COLORS)[number];
		model: (typeof MODELS)[number];
		material: (typeof MATERIALS)[number];
		finish: (typeof FINISHES)[number];
	}>({
		color: JSON.parse(window.localStorage.getItem('caseColor') || 'null') || COLORS[0],
		model: JSON.parse(window.localStorage.getItem('caseModel') || 'null') || MODELS[0],
		material: JSON.parse(window.localStorage.getItem('caseMaterial') || 'null') || MATERIALS[0],
		finish: JSON.parse(window.localStorage.getItem('caseFinish') || 'null') || FINISHES[0],
	});

	const [renderedDimension, setRenderedDimension] = useState({
		width: imageWidth,
		height: imageHeight,
	});

	const [renderedPosition, setRenderedPosition] = useState({
		x: 150,
		y: 210,
	});

	const phoneCaseRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const base64ToBlob = (base64: string, mimeType: string) => {
		const byteCharacters = atob(base64);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers.push(byteCharacters.charCodeAt(i));
		}
		const byteArray = new Uint8Array(byteNumbers);
		return new Blob([byteArray], { type: mimeType });
	};

	const saveConfiguration = async () => {
		if (phoneCaseRef.current && containerRef.current) {
			try {
				// getting coordinates and dimensions of phone canvas (space of phone case)
				const {
					left: phoneLeft,
					top: phoneTop,
					width: phoneWidth,
					height: phoneHeight,
				} = phoneCaseRef.current.getBoundingClientRect();
				// getting coordinates of full canvas (space where phone and user image is locating)
				const { left: containerLeft, top: containerTop } =
					containerRef.current.getBoundingClientRect();
				// left space between full canvas and phone canvas
				const leftOffset = phoneLeft - containerLeft;
				// top space between full canvas and phone canvas
				const topOffset = phoneTop - containerTop;
				// X position of user image inside phone canvas
				const actualX = renderedPosition.x - leftOffset;
				// Y position of user image inside phone canvas
				const actualY = renderedPosition.y - topOffset;
				// creating canvas just to cut user image from phone canvas
				const canvas = document.createElement('canvas');
				canvas.width = phoneWidth;
				canvas.height = phoneHeight;
				const ctx = canvas.getContext('2d');
				// creating a cropped image for phone case
				const userImage = new Image();
				userImage.crossOrigin = 'anonymous';
				userImage.src = imageSrc;
				await new Promise((resolve) => {
					userImage.onload = resolve;
				});
				ctx?.drawImage(
					userImage,
					actualX,
					actualY,
					renderedDimension.width,
					renderedDimension.height,
				);
				// converting image for exporting
				const base64 = canvas.toDataURL();
				// const base64Data = base64.split(',')[1];
				// console.log('base64Data', base64Data);
				// const blob = base64ToBlob(base64Data, 'image/png');
				// console.log('blob', blob);
				// const file = new File([blob], 'newFile.png', { type: 'image/png' });
				// const base64File = await getBase64(file);
				console.log('base64', base64);
				window.localStorage.setItem('croppedImage', base64);
				router.push('/configure/preview');
			} catch (error) {
				return;
			}
		} else {
			return;
		}
	};

	useLayoutEffect(() => {
		if (!imageSrc) {
			return notFound();
		}
	});

	console.log(options);

	return (
		<div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
			<div
				ref={containerRef}
				className="relative h-[38rem] overflow-hidden col-span-2 w-full max-w-4xl items-center justify-center rounded-e-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
				<div className="relative w-60 m-auto bg-opacity-50 pointer-events-none aspect-[896/1831]">
					<AspectRatio
						ref={phoneCaseRef}
						ratio={896 / 1831}
						className={cn('pointer-events-none relative z-50 aspect-[896/1831] w-full')}>
						<NextImage
							fill
							src="/phone-template.png"
							alt="phone image"
							className="pointer-events-none z-50 select-none"
						/>
					</AspectRatio>
					<div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
					<div
						className={cn(
							`${options.color.tw_bg}`,
							'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
						)}
					/>
				</div>

				<Rnd
					className="absolute z-20 border-[3px] border-primary"
					default={{ x: 150, y: 210, height: imageHeight, width: imageWidth }}
					onResizeStop={(_, __, ref, ___, position) => {
						const { x, y } = position;
						setRenderedDimension({
							// removing 'px' with slice, because ref.style.height/width return '40px'
							height: parseInt(ref.style.height.slice(0, -2)),
							width: parseInt(ref.style.width.slice(0, -2)),
						});
						setRenderedPosition({ x, y });
					}}
					onDragStop={(_, position) => {
						const { x, y } = position;
						setRenderedPosition({ x, y });
					}}
					lockAspectRatio
					resizeHandleComponent={{
						bottomRight: <HandleComponent />,
						bottomLeft: <HandleComponent />,
						topRight: <HandleComponent />,
						topLeft: <HandleComponent />,
					}}>
					<div className="relative w-full h-full">
						<NextImage src={imageSrc} fill alt="user image" className="pointer-events-none" />
					</div>
				</Rnd>
			</div>

			<div className="h-[38rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white">
				<ScrollArea className="relative flex-1 overflow-auto">
					<div
						className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
						aria-hidden="true"
					/>
					<div className="px-8 pb-12 pt-8">
						<h2 className="tracking-tight font-bold">Customize your case</h2>
						<div className="w-full h-px bg-zinc-200 my-6" />
						<div className="relative mt-4 h-full flex flex-col justify-between gap-6">
							<RadioGroup
								value={options.color}
								onChange={(value) => {
									window.localStorage.setItem('caseColor', JSON.stringify(value));
									setOptions((prev) => ({ ...prev, color: value }));
								}}>
								<Label>Color: {options.color.label}</Label>
								<div className="mt-3 flex items-center space-x-3">
									{COLORS.map((color) => (
										<Field key={color.value} className="flex items-center gap-2">
											<Radio
												value={color}
												className={() => {
													return cn(
														'relative m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
														{
															[`${color.tw_border}`]: options.color.value === color.value,
														},
													);
												}}>
												<span
													className={cn(
														`${color.tw_bg}`,
														'h-8 w-8 rounded-full border-4 border-white',
													)}
												/>
											</Radio>
										</Field>
									))}
								</div>
							</RadioGroup>
							<div className="relative flex flex-col gap-3">
								<Label>Model</Label>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" role="combobox" className="w-full justify-between">
											{options.model.label}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent avoidCollisions>
										{MODELS.map((model) => (
											<DropdownMenuItem
												key={model.value}
												className={cn(
													'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
													{
														'bg-zinc-100': options.model.value === model.value,
													},
												)}
												onClick={() => {
													window.localStorage.setItem('caseModel', JSON.stringify(model));
													setOptions((prev) => ({ ...prev, model }));
												}}>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														model.value === options.model.value ? 'opacity-100' : 'opacity-0',
													)}
												/>
												{model.label}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<div className="relative flex flex-col gap-3">
								<Label>Materials</Label>
								<RadioGroup
									value={options.material}
									onChange={(value) => {
										window.localStorage.setItem('caseMaterial', JSON.stringify(value));
										setOptions((prev) => ({ ...prev, material: value }));
									}}>
									<div className="flex flex-col gap-2">
										{MATERIALS.map((material) => (
											<Radio
												key={material.value}
												value={material}
												className={() =>
													cn(
														'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
														{ 'border-primary': options.material.value === material.value },
													)
												}>
												<span className="flex items-center">
													<span className="flex flex-col text-sm">
														<RadioLabel className="font-medium text-gray-900" as="span">
															{material.label}
														</RadioLabel>
														{material.description ? (
															<Description className="text-gray-500" as="span">
																<span className="block sm:inline">{material.description}</span>
															</Description>
														) : null}
													</span>
												</span>
												<Description
													as="span"
													className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
													<span className="font-medium text-gray-900">
														{formatedPrice(material.price)}
													</span>
												</Description>
											</Radio>
										))}
									</div>
								</RadioGroup>
							</div>
							<div className="relative flex flex-col gap-3">
								<Label>Finished</Label>
								<RadioGroup
									value={options.finish}
									onChange={(value) => {
										window.localStorage.setItem('caseFinish', JSON.stringify(value));
										setOptions((prev) => ({ ...prev, finish: value }));
									}}>
									<div className="flex flex-col gap-2">
										{FINISHES.map((finish) => (
											<Radio
												key={finish.value}
												value={finish}
												className={() =>
													cn(
														'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
														{ 'border-primary': options.finish.value === finish.value },
													)
												}>
												<span className="flex items-center">
													<span className="flex flex-col text-sm">
														<RadioLabel className="font-medium text-gray-900" as="span">
															{finish.label}
														</RadioLabel>
														{finish.description ? (
															<Description className="text-gray-500" as="span">
																<span className="block sm:inline">{finish.description}</span>
															</Description>
														) : null}
													</span>
												</span>
												<Description
													as="span"
													className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
													<span className="font-medium text-gray-900">
														{formatedPrice(finish.price)}
													</span>
												</Description>
											</Radio>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>
					</div>
				</ScrollArea>
				<div className="width-full px-8 h-16 bg-white">
					<div className="h-px w-full bg-zinc-200" />
					<div className="w-full h-full flex justify-end items-center">
						<div className="w-full flex gap-6 items-center">
							<p className="font-medium whitespace-nowrap">
								{formatedPrice(options.model.price + options.material.price + options.finish.price)}
							</p>
							<Button size="sm" className="w-full" onClick={saveConfiguration}>
								Continue <ArrowRight className="h-4 w-4 ml-1.5 inline" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DesignConfigurator;
