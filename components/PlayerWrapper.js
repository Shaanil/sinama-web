import { useEffect } from 'react';

export default function PlayerWrapper({ id, type }) {
    useEffect(() => {
        const handleMessage = (event) => {
            if (typeof event.data === 'string') return;
            const data = event.data;
            if (data.type === 'PLAYER_EVENT') {
                localStorage.setItem(`${type}_${id}_progress`, data.data.progress);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [id, type]);

    const savedProgress = localStorage.getItem(`${type}_${id}_progress`) || 0;

    return (
        <iframe
            src={`https://www.vidking.net/embed/${type}/${id}?autoPlay=true&progress=${savedProgress}&color=ff0000&episodeSelector=true&nextEpisode=true`}
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
        ></iframe>
    );
}
