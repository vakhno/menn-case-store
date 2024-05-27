'use client';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useLocalStorage = (
	key: string,
	value?: string,
): [string | undefined, SetValue<string | undefined>] => {
	const [localStore, setLocalStore] = useState(() => {
		const existValue = localStorage.getItem(key) || '';
		return existValue || value;
	});

	useEffect(() => {
		if (localStore) {
			localStorage.setItem(key, localStore);
		}
	}, [key, localStore]);

	return [localStore, setLocalStore];
};

export default useLocalStorage;
