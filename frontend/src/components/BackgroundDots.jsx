import { useMemo } from 'react';

export default function BackgroundDots() {
    const dots = useMemo(() => {
        return Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 10}s`,
            size: `${2 + Math.random() * 3}px`,
            opacity: 0.03 + Math.random() * 0.06,
        }));
    }, []);

    return (
        <div className="bg-dots">
            {dots.map(dot => (
                <span
                    key={dot.id}
                    style={{
                        left: dot.left,
                        width: dot.size,
                        height: dot.size,
                        opacity: dot.opacity,
                        animationDuration: dot.animationDuration,
                        animationDelay: dot.animationDelay,
                    }}
                />
            ))}
        </div>
    );
}
