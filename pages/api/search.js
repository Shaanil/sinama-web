export default async function handler(req, res) {
    const { query, type } = req.query;
    if (!query) return res.status(400).json({ error: 'Missing query' });

    const searchType = type === 'tv' ? 'tv' : 'movie';
    const url = `https://api.themoviedb.org/3/search/${searchType}?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`;

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
}
