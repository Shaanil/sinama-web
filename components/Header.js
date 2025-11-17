export default function Header({ searchQuery, setSearchQuery, handleSearch, type, setType }) {
    return (
        <header className="flex flex-col md:flex-row items-center justify-between p-6 bg-netflixBg shadow-lg">
            <h1 className="text-3xl font-bold text-netflixRed mb-4 md:mb-0">My Movie Site</h1>
            <div className="flex items-center gap-4">

                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="p-2 rounded-l bg-black text-white w-64 focus:outline-none"
                    />
                    <button type="submit" className="bg-netflixRed p-2 rounded-r hover:bg-red-700 transition-colors">Search</button>
                </form>
                <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 rounded bg-black text-white">
                    <option value="movie">Movies</option>
                    <option value="tv">TV Shows</option>
                </select>
            </div>
        </header>
    );
}
