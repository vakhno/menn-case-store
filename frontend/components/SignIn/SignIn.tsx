'use client';
import React, { useEffect } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import ValueBetweenSeparates from '@/components/ValueBetweenSeparates/ValueBetweenSeparates';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { userStore } from '@/lib/zustand';

const validationSchema = z.object({
	email: z
		.string()
		.min(5, { message: 'Email is too short!' })
		.email({ message: 'Email format is invalid!' }),
	password: z.string(),
});

const SignIn = () => {
	const router = useRouter();
	const { toast } = useToast();
	const google = userStore((state) => state.google);

	const form = useForm({
		defaultValues: {
			email: window.sessionStorage.getItem('signin_email') || '',
			password: window.sessionStorage.getItem('signin_password') || '',
		},
		resolver: zodResolver(validationSchema),
	});

	const watchAllFields = form.watch();

	useEffect(() => {
		window.sessionStorage.setItem('signin_email', watchAllFields.email);
		window.sessionStorage.setItem('signin_password', watchAllFields.password);
	}, [watchAllFields]);

	const handleSubmit = async (data: z.infer<typeof validationSchema>) => {
		userStore((state) => state.signin(data));
		// try {
		// 	const result = await axios.post('http://localhost:8080/auth/login', data);
		// 	const { success } = result.data;
		// 	if (success) {
		// 		router.push('/');
		// 	} else {
		// 		toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
		// 	}
		// } catch (error) {
		// 	toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
		// }
	};

	const handleGoogleAuth = async () => {
		await google();
		// try {
		// 	const result = await axios.get('http://localhost:8080/auth/google');
		// 	const { success, url } = result.data;
		// 	if (success) {
		// 		window.location.href = url;
		// 	} else {
		// 		toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
		// 	}
		// } catch (error) {
		// 	toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
		// }
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>Already have an account.</CardDescription>
			</CardHeader>
			<Button
				onClick={() => {
					window.location.href =
						'https://www.google.com/accounts/Logout?continue=http://appengine.google.com/_ah/logout?continue=http://localhost:3000/';
				}}>
				Logout
			</Button>
			<CardContent className="space-y-2">
				<Button onClick={handleGoogleAuth} variant="outline" className="w-full m-auto flex">
					<img src="/social/google-logo.webp" className="w-5 h-5 mr-3" />
					Google
				</Button>
				<ValueBetweenSeparates text="OR" />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormControl>
										<Input type="email" placeholder="Enter email..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormControl>
										<Input type="password" placeholder="Enter password..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full self-end sm:w-auto flex flex-end">
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center gap-2 sm:flex-row">
				<span>Dont have an account?</span>
				<Link href="/auth/signup" className="font-bold hover:text-gray-600">
					Sign Up
				</Link>
			</CardFooter>
		</Card>
	);
};

export default SignIn;
