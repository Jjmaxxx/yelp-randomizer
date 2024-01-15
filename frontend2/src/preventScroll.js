import React from 'react';

export default function usePreventScrollOnFocus() {
    const scrollPos = React.useRef([0, 0]);

    React.useEffect(() => {
        const scrollHandler = () => {
            scrollPos.current[0] = window.scrollX;
            scrollPos.current[1] = window.scrollY;
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    const handleFocus = React.useCallback(() => {
        window.scrollTo(...scrollPos.current);
    }, []);
    return handleFocus;
}