import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper/MaxWidthWrapper';
import { ArrowRight, Check, Star } from 'lucide-react';
import Phone from '@/components/Phone/Phone';
import Underline from '@/components/Icons/Underline';
import Reviews from '@/components/Reviews/Reviews';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
	return (
		<div className="bg-slate-50">
			<section>
				<MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pt-24 lg:pb-52 xl:gap-x-8 xl:pt-32">
					<div className="col-span-2 px-6 lg:px-0 lg:pt-4">
						<div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
							<div className="absolute w-28 left-0 -top-20 hidden lg:block">
								<img src="/snake-1.png" alt="logo" className="w-full" />
							</div>

							<h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
								Your image on a <span className="bg-green-600 px-2 text-white">Custom</span> Phone
								Case
							</h1>
							<p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
								Capture your favorite memories with your own,
								<span className="font-semibold">one-of-one</span> phone case.
							</p>
							<ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
								<div className="sapce-y-2">
									<li className="flex gap-1.5 items-center text-left">
										<Check className="h-5 w-5 shrink-0 text-green-600" />
										Highly queality, durable material
									</li>
									<li className="flex gap-1.5 items-center text-left">
										<Check className="h-5 w-5 shrink-0 text-green-600" />5 year print quarantee
									</li>
									<li className="flex gap-1.5 items-center text-left">
										<Check className="h-5 w-5 shrink-0 text-green-600" />
										Modern IPhone models support
									</li>
								</div>
							</ul>
							<div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
								<div className="flex -space-x-4">
									<img
										src="/users/user-1.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 "
									/>
									<img
										src="/users/user-2.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 "
									/>
									<img
										src="/users/user-3.png"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 "
									/>
									<img
										src="/users/user-4.jpg"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 "
									/>
									<img
										src="/users/user-5.jpg"
										alt="user image"
										className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100 "
									/>
								</div>
								<div className="flex flex-col justify-between items-center sm:items-start">
									<div className="flex gap-0.5">
										<Star className="h-4 w-4 text-green-600 fill-green-600" />
										<Star className="h-4 w-4 text-green-600 fill-green-600" />
										<Star className="h-4 w-4 text-green-600 fill-green-600" />
										<Star className="h-4 w-4 text-green-600 fill-green-600" />
										<Star className="h-4 w-4 text-green-600 fill-green-600" />
									</div>
									<p>
										<span className="font-semibold">1.250</span> happy customers
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
						<div className="relative md:max-w-xl">
							<img
								src="/your-image.png"
								alt=""
								className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
							/>
							<img src="/line.png" alt="" className="absolute w-20 -left-6 -bottom-6 select-none" />
							<Phone src="/testimonials/1.jpg" className="w-64" />
						</div>
					</div>
				</MaxWidthWrapper>
			</section>

			<section className="bg-slate-100 py-24">
				<MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
					<div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
						<h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-600">
							What our
							<span className="relative px-2">
								customers
								<Underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500" />
							</span>
							say
						</h2>
						<img src="/snake-2.png" alt="" className="w-24 order-0 lg:order-2" />
					</div>
					<div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
						<div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
							<div className="flex gap-0.5 mb-2">
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
							</div>
							<div className="text-lg leading-8">
								<p>
									"The case feels durable and I event got a compliment on the design. Had the case
									for two and a half months now and
									<span className="p-0.5 bg-slate-800 text-white">the image is super clear</span>,
									on the case I hade before, the image started fading into yellow-ish color after a
									couple weeks.Love it."
								</p>
							</div>
							<div className="flex gap-4 mt-2">
								<img
									src="/users/user-1.png"
									alt="user comment"
									className="rounded-full h-12 w-12 object-cover"
								/>
								<div className="flex flex-col">
									<p className="font-semibold">Jonathan</p>
									<div className="flex gap-1.5 items-center text-zinc-600">
										<Check className="h-4 w-4 stroke-[3px] text-green-600" />
										<p className="text-sm">Verified Purchase</p>
									</div>
								</div>
							</div>
						</div>

						<div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
							<div className="flex gap-0.5 mb-2">
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
								<Star className="h-5 w-5 text-green-600 fill-green-600" />
							</div>
							<div className="text-lg leading-8">
								<p>
									"I usually keep my phone together with my krya in py pocket and that let to some
									preaty heavy scratchmarks on all os my last phone case. This one, besided a barely
									noticeable scratch on the corner,
									<span className="p-0.5 bg-slate-800 text-white">
										looks brand new about half a year.
									</span>
									"
								</p>
							</div>
							<div className="flex gap-4 mt-2">
								<img
									src="/users/user-4.jpg"
									alt="user comment"
									className="rounded-full h-12 w-12 object-cover"
								/>
								<div className="flex flex-col">
									<p className="font-semibold">Tom</p>
									<div className="flex gap-1.5 items-center text-zinc-600">
										<Check className="h-4 w-4 stroke-[3px] text-green-600" />
										<p className="text-sm">Verified Purchase</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
				<div className="pt-16">
					<Reviews />
				</div>
			</section>

			<section>
				<MaxWidthWrapper className="py-24">
					<div className="mb-12 px-6 lg:px-8">
						<div className="mx-auto mx-w-2xl sm:text-center">
							<h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-600">
								Upload your photo and get
								<span className="relative px-2 bg-green-600 text-white">your own case</span>
								now
							</h2>
						</div>
					</div>
					<div className="mx-auto max-w-6xl px-6 lg:px-8">
						<div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
							<img
								src="/arrow.png"
								alt=""
								className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
							/>
							<div className="realtive h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900 ring-inset ring-gray-900/10 lg:rounded-2xl">
								<img
									src="/horse.jpg"
									alt=""
									className="rouded-md object-cover bg-white shadow-2xl ring-1 rong-gray-900 h-full w-full"
								/>
							</div>
							<Phone className="w-60" src="/horse_phone.jpg" />
						</div>
					</div>
					<ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
						<li className="w-fit">
							<Check className="h-5 w-5 text-green-500 inline mr-1.5" />
							High-quality silicone materials
						</li>
						<li className="w-fit">
							<Check className="h-5 w-5 text-green-500 inline mr-1.5" />
							Scretch and fingerprint resistant coating
						</li>
						<li className="w-fit">
							<Check className="h-5 w-5 text-green-500 inline mr-1.5" />
							Wirales charging compatible
						</li>
						<li className="w-fit">
							<Check className="h-5 w-5 text-green-500 inline mr-1.5" />5 year print quarantee
						</li>
						<div className="flex justify-center">
							<Link
								className={buttonVariants({
									size: 'lg',
									className: 'max-auto mt-8',
								})}
								href="/configure/upload">
								Create your case now
								<ArrowRight className="h-4 w-4 ml-1" />
							</Link>
						</div>
					</ul>
				</MaxWidthWrapper>
			</section>
		</div>
	);
}
