import { useCallback, useEffect, useRef, useState } from 'react';
import './Slideshow.css';

const AUTO_ADVANCE_MS = 5000;

export default function Slideshow({ images, className, ariaLabel = 'Mustang Ball photos' }) {
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    const goTo = useCallback((next) => {
        setIndex(((next % images.length) + images.length) % images.length);
    }, [images.length]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = window.setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, AUTO_ADVANCE_MS);
    }, [images.length]);

    useEffect(() => {
        resetTimer();
        return () => window.clearInterval(timerRef.current);
    }, [resetTimer]);

    const handleManualNav = (next) => {
        goTo(next);
        resetTimer();
    };

    if (!images.length) return null;

    return (
        <div className={`slideshow${className ? ` ${className}` : ''}`} role="region" aria-label={ariaLabel}>
            <div className="slideshow-frame">
                {images.map((img, i) => (
                    <img
                        key={img.src}
                        src={img.src}
                        alt={img.alt || ''}
                        role="presentation"
                        className={`slideshow-slide${i === index ? ' is-active' : ''}`}
                        style={{ objectPosition: img.position || 'center' }}
                    />
                ))}
                <button
                    type="button"
                    className="slideshow-arrow slideshow-arrow-prev"
                    onClick={() => handleManualNav(index - 1)}
                    aria-label="Previous photo"
                >
                    &#8249;
                </button>
                <button
                    type="button"
                    className="slideshow-arrow slideshow-arrow-next"
                    onClick={() => handleManualNav(index + 1)}
                    aria-label="Next photo"
                >
                    &#8250;
                </button>
            </div>
            <div className="slideshow-dots" role="tablist" aria-label="Choose a photo">
                {images.map((img, i) => (
                    <button
                        key={img.src}
                        type="button"
                        className={`slideshow-dot${i === index ? ' is-active' : ''}`}
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Show photo ${i + 1} of ${images.length}`}
                        onClick={() => handleManualNav(i)}
                    />
                ))}
            </div>
        </div>
    );
}
