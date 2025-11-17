import { useState } from 'react';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';

export default function Home({ popularMovies, topRatedMovies, upcomingMovies, popularTV }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [type, setType] = useState('movie');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&type=${type}`);
        const data = await res.json();
        setSearchResults(data.results || []);
    };

    const safe = (x) => x?.results || [];
    const heroMovie = popularMovies?.results?.[0];

    return (
        <div className="bg-netflixBg min-h-screen text-white">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                type={type}
                setType={setType}
            />

            {/* --- HERO BANNER --- */}
            {heroMovie && (
                <div
                    className="w-full h-[60vh] bg-cover bg-center mb-10"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`
                    }}
                >
                    <div className="w-full h-full bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
                        <h1 className="text-4xl font-bold">Featured: {heroMovie.title}</h1>
                    </div>
                </div>
            )}

            {/* --- SEARCH GRID --- */}
            {searchResults.length > 0 && (
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {searchResults.map((item) => (
                            <MovieCard key={item.id} movie={item} type={type} />
                        ))}
                    </div>
                </div>
            )}

            {/* --- CATEGORY ROWS --- */}
            <CategoryRow title="Popular Movies" items={safe(popularMovies)} type="movie" />
            <CategoryRow title="Top Rated Movies" items={safe(topRatedMovies)} type="movie" />
            <CategoryRow title="Upcoming Movies" items={safe(upcomingMovies)} type="movie" />
            <CategoryRow title="Popular TV Shows" items={safe(popularTV)} type="tv" />
        </div>
    );
}

function CategoryRow({ title, items, type }) {
    return (
        <div className="mb-10 px-6">
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {items.map((item) => (
                    <MovieCard key={item.id} movie={item} type={type} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const key = process.env.TMDB_API_KEY;

    const urls = [
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
        `https://api.themoviedb.org/3/tv/popular?api_key=${key}`
    ];

    const [a, b, c, d] = await Promise.all(urls.map((u) => fetch(u).then((r) => r.json())));

    return {
        props: {
            popularMovies: a || { results: [] },
            topRatedMovies: b || { results: [] },
            upcomingMovies: c || { results: [] },
            popularTV: d || { results: [] }
        }
    };
}
