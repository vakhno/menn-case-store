'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type Theme = 'dark' | 'light';

type Props = { className: string };

const ThemeSwitcher = ({ className }: Props) => {
	const [theme, setTheme] = useLocalStorage('theme');

	useEffect(() => {
		if (!theme || theme === 'light') {
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		} else {
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		}
	}, [theme]);

	const handleDarkMode = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<Button size="icon" onClick={handleDarkMode} className={className}>
			{theme === 'light' ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ThemeSwitcher;
