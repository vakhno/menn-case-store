import { useState, useEffect } from 'react';

export const useScroll = () => {
	const [state, setState] = useState({
		scrollY: document.body.getBoundingClientRect().top,
		scrollX: document.body.getBoundingClientRect().left,
	});

	useEffect(() => {
		window.history.scrollRestoration = 'manual';
		const scrollListener = () => {
			const bodyOffset = document.body.getBoundingClientRect();
			setState({
				scrollY: -bodyOffset.top,
				scrollX: bodyOffset.left,
			});
		};
		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return {
		scrollY: state.scrollY,
		scrollX: state.scrollX,
	};
};

export default useScroll;
