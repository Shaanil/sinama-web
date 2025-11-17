export default async function handler(req, res) {
    const { type, id } = req.query;
    if (!type || !id) return res.status(400).json({ error: 'Missing type or id' });

    const url =
        type === 'tv'
            ? `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
            : `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
