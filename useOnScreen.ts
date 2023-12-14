import {RefObject, useEffect, useState} from 'react';

export default function useOnScreen(ref: RefObject<Element>, rootMargin: string = '0px', threshold: undefined | number | number[] = undefined, once: boolean = false) {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], observer) => {
                setIntersecting(entry.isIntersecting);

                if (once && entry.isIntersecting) {
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold,
            },
        );

        if (ref.current)
            observer.observe(ref.current);

        return () => {
            if (ref.current)
                observer.unobserve(ref.current);
        };
    }, []);

    return isIntersecting;
};
