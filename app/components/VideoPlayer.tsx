"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    className?: string;
}

export default function VideoPlayer({ src, poster, className = "" }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const videoSrc = src.includes("#") ? src : `${src}#t=0.001`;

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play().catch(() => setIsPlaying(false));
        } else {
            video.pause();
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div
            className={`group relative w-full aspect-video overflow-hidden bg-black/20 cursor-pointer ${className}`}
            onClick={togglePlay}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                poster={poster}
                preload="metadata"
                loop
                muted={isMuted}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
            />

            <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full border border-[#E1D5BF]/50 backdrop-blur-sm bg-black/20 text-[#E1D5BF] transition-transform duration-300 hover:scale-110">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            <div className={`absolute bottom-4 right-4 flex items-center gap-3 transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-0"}`}>
                <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/40 backdrop-blur-md text-[#E1D5BF] hover:bg-black/60 transition-colors"
                    aria-label={isMuted ? "Ativar som" : "Desativar som"}
                >
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="22" x2="16" y1="9" y2="15"></line>
                            <line x1="16" x2="22" y1="9" y2="15"></line>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}