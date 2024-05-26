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
import { Form, FormField, FormControl, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ValueBetweenSeparates from '@/components/ValueBetweenSeparates/ValueBetweenSeparates';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { userStore } from '@/lib/zustand';

const validationSchema = z
	.object({
		name: z.string().min(5, { message: 'Name is too short!' }),
		email: z
			.string()
			.min(5, { message: 'Email is too short!' })
			.email({ message: 'Email format is invalid!' }),
		password: z.string().min(4, { message: 'Message is too short!' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password dont match!',
	});

const SignUp = () => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			name: window.sessionStorage.getItem('signup_name') || '',
			email: window.sessionStorage.getItem('signup_email') || '',
			password: window.sessionStorage.getItem('signup_password') || '',
			confirmPassword: window.sessionStorage.getItem('signup_confirmPassword') || '',
		},
		resolver: zodResolver(validationSchema),
	});

	const watchAllFields = form.watch();

	useEffect(() => {
		window.sessionStorage.setItem('signup_name', watchAllFields.name);
		window.sessionStorage.setItem('signup_email', watchAllFields.email);
		window.sessionStorage.setItem('signup_password', watchAllFields.password);
		window.sessionStorage.setItem('signup_confirmPassword', watchAllFields.confirmPassword);
	}, [watchAllFields]);

	const handleSubmit = async (data: z.infer<typeof validationSchema>) => {
		userStore((state) => state.signup(data));

		// try {
		// 	const result = await axios.post('http://localhost:8080/auth/signup', data, {
		// 		withCredentials: true,
		// 	});
		// 	const { success } = result.data;
		// 	if (success) {
		// 		// clearing sign up and sign in session storage (clear full session storage)
		// 		window.sessionStorage.clear();
		// 		router.push('/');
		// 	} else {
		// 		toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
		// 	}
		// } catch (error) {
		// 	toast({ title: 'Error', description: 'Something went wrong!', variant: 'destructive' });
		// }
	};

	const handleGoogleAuth = () => {};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create new account.</CardDescription>
			</CardHeader>
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
							name="name"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormControl>
										<Input type="text" placeholder="Enter name..." {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormControl>
										<Input type="email" placeholder="Enter email..." {...field} />
									</FormControl>
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
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormControl>
										<Input type="password" placeholder="Confirm password..." {...field} />
									</FormControl>
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
				<span>Already have an account?</span>
				<Link href="/auth/signin" className="font-bold hover:text-gray-600">
					Sign In
				</Link>
			</CardFooter>
		</Card>
	);
};

export default SignUp;
