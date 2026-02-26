import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Star, Info } from 'lucide-react';

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                // Fetching a list of shows to simulate "trending"
                const response = await fetch('https://api.tvmaze.com/shows?page=1');
                const data = await response.json();
                // Randomly pick some shows or just take the first few
                setTrending(data.slice(0, 8));
            } catch (error) {
                console.error("Error fetching trending shows:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="pb-5">
            {/* Hero Section */}
            <div className="relative overflow-hidden mb-5" style={{ height: '70vh', minHeight: '500px' }}>
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
                        alt="Background Hero"
                        className="w-100 h-100 object-fit-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
                </div>

                <div className="container h-100 d-flex flex-column justify-content-center position-relative z-1">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="col-lg-7"
                    >
                        <span className="badge bg-primary px-3 py-2 mb-3 rounded-pill fw-bold">EXPERIENCE PREMIER TV</span>
                        <h1 className="display-2 fw-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            The Universe of <span className="text-primary text-gradient">Stories</span> Awaits.
                        </h1>
                        <p className="fs-5 text-secondary mb-5 opacity-80">
                            Discover the most popular TV shows, explore detailed actor profiles, and keep track of everything you love in one premium platform.
                        </p>
                        <div className="d-flex gap-3">
                            <Link to="/search" className="btn btn-premium d-flex align-items-center gap-2 px-4 py-3">
                                <SearchIcon size={20} />
                                <span>Browse Shows</span>
                            </Link>
                            <button className="btn glass d-flex align-items-center gap-2 px-4 py-3 text-white border-white border-opacity-20">
                                <Play size={20} />
                                <span>Watch Trailer</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Trending Section */}
            <div className="container">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <div className="d-flex align-items-center gap-2 text-primary fw-bold mb-2">
                            <TrendingUp size={20} />
                            <span className="text-uppercase tracking-wider small">Currently Popular</span>
                        </div>
                        <h2 className="fw-bold text-white m-0">Trending Shows</h2>
                    </div>
                </div>

                <div className="row g-4">
                    {loading ? (
                        [...Array(8)].map((_, i) => (
                            <div key={i} className="col-md-3">
                                <div className="glass card-premium" style={{ height: '450px', opacity: 0.1 }}></div>
                            </div>
                        ))
                    ) : (
                        trending.map((show, index) => (
                            <motion.div
                                className="col-md-3"
                                key={show.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="glass card-premium h-100 d-flex flex-column">
                                    <div className="position-relative">
                                        <img
                                            src={show.image?.medium}
                                            className="w-100 object-fit-cover"
                                            style={{ height: "340px" }}
                                            alt={show.name}
                                        />
                                        <div className="position-absolute top-0 end-0 m-3 px-2 py-1 glass rounded-2 d-flex align-items-center gap-1">
                                            <Star size={14} className="text-warning fill-warning" />
                                            <span className="fw-bold small">{show.rating?.average || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="text-white mb-2 line-clamp-1">{show.name}</h5>
                                            <p className="text-description line-clamp-2 mb-3">
                                                {show.summary?.replace(/<[^>]*>?/gm, '').slice(0, 100)}...
                                            </p>
                                        </div>
                                        <a
                                            href={show.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2"
                                        >
                                            <Info size={16} />
                                            Details
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
