import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DetailPage({ type }) {
    const router = useRouter();
    const { id } = router.query;
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/movies?type=${type}&id=${id}`)
            .then(res => res.json())
            .then(data => setItem(data));
    }, [id, type]);

    if (!item) return <p className="p-4">Loading...</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-2">{item.title || item.name}</h1>
            <p className="mb-4">{item.overview}</p>
            <iframe
                src={`https://www.vidking.net/embed/movie/${id}?autoPlay=true&color=ff0000`}
                width="100%"
                height="600"
                frameBorder="0"
                allowFullScreen
                className="rounded"
            />
        </div>
    );
}
