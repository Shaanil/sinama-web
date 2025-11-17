export default async function handler(req, res) {
    const { category, type } = req.query;

    let url = '';
    if (type === 'movie') {
        url =
            category === 'popular'
                ? `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
                : category === 'top_rated'
                    ? `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
                    : category === 'upcoming'
                        ? `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
                        : '';
    } else if (type === 'tv') {
        url =
            category === 'popular'
                ? `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
                : category === 'top_rated'
                    ? `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
                    : '';
    }

    if (!url) return res.status(400).json({ error: 'Invalid type or category' });

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
}
