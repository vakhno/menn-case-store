'use client';
import React from 'react';
import MaxWidthWrapper from '../MaxWidthWrapper/MaxWidthWrapper';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import axios from 'axios';

type Props = {};

const Navbar = (props: Props) => {
	// const { getUser } = getKindeServerSession();
	// const user = await getUser();
	// const isAdmin = user?.email === process.env.ADMIN_EMAIL;

	// const handleSignIn = async () => {
	// 	try {
	// 		await axios.get('http://localhost:8080/auth/login', { withCredentials: true });
	// 	} catch (error) {
	// 		console.log('error', error);
	// 	}
	// };

	return (
		<nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-14 items-center justify-between border-b border-zinc-200">
					<Link href="/" className="flex z-40 font-semibold">
						case<span className="text-green-600">cobra</span>
					</Link>
					<div className="h-full flex items-center space-x-4">
						{false ? (
							<>
								<Link
									href="/auth/logout"
									className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
									Sign Out
								</Link>
								{false ? (
									<Link
										href="/api/auth/logout"
										className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
										Dashboard
									</Link>
								) : null}
								<Link
									href="/configure/upload"
									className={buttonVariants({
										className: 'hidden sm:flex items-center gap-1',
										size: 'sm',
									})}>
									Create Case
									<ArrowRight className="ml-1.5 h-5 w-5" />
								</Link>
							</>
						) : (
							<>
								<Link
									href="/auth/signup"
									className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
									Sign Up
								</Link>
								<Link
									href="/auth/signin"
									className={buttonVariants({
										size: 'sm',
										variant: 'ghost',
									})}>
									Sign In
									<ArrowRight className="ml-1.5 h-5 w-5" />
								</Link>
								<div className="h-8 w-px bg-zing-200 hidden sm:block" />
								<Link
									href="/configure/upload"
									className={buttonVariants({
										className: 'hidden sm:flex items-center gap-1',
										size: 'sm',
									})}>
									Create Case
									<ArrowRight className="ml-1.5 h-5 w-5" />
								</Link>
							</>
						)}
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	);
};

export default Navbar;
