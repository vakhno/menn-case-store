import React from 'react';
import Phone from '../Phone/Phone';
import { cn, formatedPrice } from '@/lib/utils';
import { ArrowRight, Check, Divide } from 'lucide-react';
import { Button } from '../ui/button';
import { stripe } from '@/lib/stripe';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

type Props = { imgSrc: string | null };

const DesignPreview = ({ imgSrc }: Props) => {
	const router = useRouter();
	const { user } = useKindeBrowserClient();
	const caseModel = JSON.parse(window.localStorage.getItem('caseModel') || 'null');
	const caseColor = JSON.parse(window.localStorage.getItem('caseColor') || 'null');
	const caseMaterial = JSON.parse(window.localStorage.getItem('caseMaterial') || 'null');
	const caseFinish = JSON.parse(window.localStorage.getItem('caseFinish') || 'null');
	const price = caseModel.price + caseMaterial.price + caseFinish.price;

	const handleApproveClick = async () => {
		if (user) {
			const product = stripe.products.create({
				name: 'Custom IPhone Case',
				default_price_data: {
					currency: 'USD',
					unit_amount: price,
				},
			});

			const stripeSession = await stripe.checkout.sessions.create({
				success_url: `${process.env.NEXT_PUBLIC_ROOT}/thank-you`,
				cancel_url: `${process.env.NEXT_PUBLIC_ROOT}/configure/preview`,
				payment_method_types: ['card'],
				mode: 'payment',
				shipping_address_collection: { allowed_countries: ['UA', 'US', 'PL'] },
				metadata: {},
			});
			const stripeSessionURL = stripeSession.url;
			if (stripeSessionURL) {
				router.push(stripeSessionURL);
			}
		} else {
			router.push('/api/auth/login');
		}
	};

	return (
		<div className="mt-20 flex flex-col items-center text-sm md:grid sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
			<div className="md:col-span-4 ld:col-span-3 md:row-span-2 md:row-end-2">
				{imgSrc ? (
					<Phone src={imgSrc} className={cn(`${caseColor.tw_bg}`, 'max-w-[150px] md:max-w-full')} />
				) : null}
			</div>
			<div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
				<h3 className="text-3xl font-bold tracking-tight text-gray-900">
					Your {caseModel.label} case
				</h3>
				<div className="mt-3 flex items-center gap-1.5 text-base">
					<Check className="h-4 w-4 text-green-500" />
					In stock and ready to ship
				</div>
				<div className="sm:col-span-12 md:col-span-9 text-base">
					<div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
						<div>
							<p className="font-medium text-zinc-900">Highlights</p>
							<ol className="mt-3 text-zinc-700 list-disc list-inside">
								<li>Wireless charging compatible</li>
								<li>TPU shock absorption</li>
								<li>Packaging made from recycled materials</li>
								<li>5 year print warranty</li>
							</ol>
						</div>
						<div>
							<p className="font-medium text-zinc-900">Materials</p>
							<ol className="mt-3 text-zinc-700 list-disc list-inside">
								<li>Hight-quality, durable material</li>
								<li>Scratch and fingerpint resistant coating</li>
							</ol>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
						<div className="text-sm">
							<div className="flex items-center justify-between py-1 mt-2">
								<p className="text-gray-600">Model price</p>
								<p className="font-medium text-gray-900">{formatedPrice(caseModel.price)}</p>
							</div>
							<div className="flex items-center justify-between py-1 mt-2">
								<div className="flex flex-col sm:flex-row">
									<p className="text-gray-600 mr-2">Texture:</p>
									<span className="text-gray-800 font-medium">{caseFinish.label}</span>
								</div>
								<p className="font-medium text-gray-900">{formatedPrice(caseFinish.price)}</p>
							</div>
							<div className="flex items-center justify-between py-1 mt-2">
								<div className="flex flex-col sm:flex-row">
									<span className="text-gray-600 mr-2">Material:</span>
									<span className="text-gray-800 font-medium">{caseMaterial.label}</span>
								</div>
								<p className="font-medium text-gray-900">{formatedPrice(caseMaterial.price)}</p>
							</div>
							<div className="my-2 h-px bg-gray-200" />
							<div className="flex items-center justify-between py-2">
								<span className="font-semibold text-gray-900">Order total</span>
								<span className="font-semibold text-gray-900">{formatedPrice(price)}</span>
							</div>
						</div>
					</div>
					<div className="mt-8 flex justify-end pb-12">
						<Button className="pb-x-4 sm:px-6 lg:px-9" onClick={handleApproveClick}>
							Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DesignPreview;
