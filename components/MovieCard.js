import Link from 'next/link';

export default function MovieCard({ movie }) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : '/placeholder.png';

    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="cursor-pointer flex flex-col h-full">
                <div className="w-full aspect-[2/3] overflow-hidden rounded-lg">
                    <img
                        src={posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="text-sm text-center mt-2 truncate">{movie.title}</p>
            </div>
        </Link>
    );
}
