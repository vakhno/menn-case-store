import React, { Fragment, useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { Rnd } from 'react-rnd';
import HandleComponent from '@/components/HandleComponent/HandleComponent';
import { ScrollArea } from '../ui/scroll-area';
import { Field, Radio, RadioGroup, Description, Label } from '@headlessui/react';
// import { Label } from '../ui/label';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
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
	{ label: 'IPhone X', value: 'iphonex' },
	{ label: 'IPhone 11', value: 'iphone11' },
	{ label: 'IPhone 12', value: 'iphone12' },
	{ label: 'IPhone 13', value: 'iphone13' },
	{ label: 'IPhone 14', value: 'iphone14' },
	{ label: 'IPhone 15', value: 'iphone15' },
] as const;

const MATERIALS = [
	{ label: 'Silicone', value: 'silicone', description: null, price: 5 },
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
	console.log('imageSrc', imageSrc);
	const [options, setOptions] = useState<{
		color: (typeof COLORS)[number];
		model: (typeof MODELS)[number];
		material: (typeof MATERIALS)[number];
		finish: (typeof FINISHES)[number];
	}>({
		color: COLORS[0],
		model: MODELS[0],
		material: MATERIALS[0],
		finish: FINISHES[0],
	});

	return (
		<div className="relative mt-20 grid grid-cols-3 mb-20 pb-20">
			<div className="relative h-[38rem] overflow-hidden col-span-2 w-full max-w-4xl items-center justify-center rounded-e-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
				<div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
					<AspectRatio
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

			<div className="h-[38rem] flex flex-col bg-white">
				<ScrollArea className="relative flex-1 overflow-auto">
					<div
						className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
						aria-hidden="true"
					/>
					<div className="px-8 pb-12 pt-8">
						<h2 className="tracking-tight font-bold">Customize your case</h2>
						<div className="w-full h-px bg-zinc-200 my-6" />
						<div className="relative mt-4 h-full flex flex-col justify-between">
							<RadioGroup
								value={options.color}
								onChange={(value) => setOptions((prev) => ({ ...prev, color: value }))}>
								{/* <Label>Color: {options.color.label}</Label> */}
								<div className="mt-3 flex items-center space-x-3">
									{COLORS.map((color) => (
										<Field key={color.value} className="flex items-center gap-2">
											<Radio
												value={color}
												className={({ checked }) =>
													cn(
														'relative m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent',
														{
															[`${color.tw_border}`]: checked,
														},
													)
												}>
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
								{/* <Label>Model</Label> */}
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" role="combobox" className="w-full justify-between">
											{options.model.label}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										{MODELS.map((model) => (
											<DropdownMenuItem
												key={model.value}
												className={cn(
													'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
													{
														'bg-zinc-100': model.value === options.model.value,
													},
												)}
												onClick={() => setOptions((prev) => ({ ...prev, model }))}>
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
								{/* <Label>Materials</Label> */}
								<RadioGroup defaultValue={options.material.value}>
									{MATERIALS.map((material) => (
										<Radio key={material.value} value={material.value}>
											<Label>{material.label}</Label>
											{material.description ? (
												<Description as="span">{material.description}</Description>
											) : null}
										</Radio>
									))}
								</RadioGroup>
							</div>
							<div className="relative flex flex-col gap-3">
								{/* <Label>Finished</Label>*/}
								<RadioGroup defaultValue={options.finish.value}>
									<div className="flex flex-col gap-2">
										{FINISHES.map((finish) => (
											<Radio
												key={finish.value}
												value={finish.value}
												className={({ checked }) =>
													cn(
														'relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',
														{ 'border-primary': checked },
													)
												}>
												<span className="flex items-center">
													<span className="flex flex-col text-sm"></span>
													<Label className="font-medium text-gray-900" as="span">
														{finish.label}
													</Label>
													{finish.description ? (
														<Description className="text-gray-500" as="span">
															<span className="block sm:inline">{finish.description}</span>
														</Description>
													) : null}
												</span>
											</Radio>
										))}
									</div>
								</RadioGroup>
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default DesignConfigurator;
