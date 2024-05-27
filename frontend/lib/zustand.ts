import { create } from 'zustand';
import axios from 'axios';

type signinAuth = {
	email: string;
	password: string;
};

type signupAuth = signinAuth & {
	name: string;
};

type User = {
	name: string;
	avatar: string;
	email: string;
	isSocial: boolean;
};

export type State = {
	user: User | null;
};

export type Actions = {
	signin: (value: signinAuth) => Promise<void>;
	signup: (value: signupAuth) => Promise<void>;
	google: () => Promise<void>;
	logout: () => void;
};

export const userStore = create<State & Actions>()((set) => ({
	user: null,
	signin: async (data) => {
		const result = await axios.post('http://localhost:8080/auth/login', data);
		const { success, user } = result.data;
		if (success) {
			set(() => ({
				user,
			}));
		}
	},
	signup: async (data) => {
		const result = await axios.post('http://localhost:8080/auth/signup', data);
		const { success, user } = result.data;
		if (success) {
			set(() => ({
				user,
			}));
		}
	},
	google: async () => {
		try {
			const result = await axios.get('http://localhost:8080/auth/google');
			const { url, success } = result.data;
			if (success) {
				window.location.href = url;
			}
		} catch (error) {}
	},
	logout: () => {
		set(() => ({
			user: null,
		}));
		document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	},
}));
