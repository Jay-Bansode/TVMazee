import React, { useState } from 'react';
import Actor from './Actors';
import Show from './Show';
import { Users, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

const Search = () => {
    const [filter, setFilter] = useState('shows');

    return (
        <div className="container mt-5 pt-4">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-gradient mb-3">Explore your favorite content</h1>
                <p className="text-secondary fs-5 mx-auto" style={{ maxWidth: '600px' }}>
                    Search through thousands of TV shows and actors within the TVMaze database.
                </p>
            </div>

            <div className="d-flex justify-content-center mb-5">
                <div className="glass p-1 d-flex gap-1" style={{ borderRadius: '12px' }}>
                    <button
                        onClick={() => setFilter('actors')}
                        className={`btn d-flex align-items-center gap-2 px-4 py-2 border-0 transition-all ${filter === 'actors' ? 'btn-premium' : 'text-secondary'}`}
                        style={{ borderRadius: '8px' }}
                    >
                        <Users size={18} />
                        <span>Actors</span>
                    </button>
                    <button
                        onClick={() => setFilter('shows')}
                        className={`btn d-flex align-items-center gap-2 px-4 py-2 border-0 transition-all ${filter === 'shows' ? 'btn-premium' : 'text-secondary'}`}
                        style={{ borderRadius: '8px' }}
                    >
                        <Tv size={18} />
                        <span>Shows</span>
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                key={filter}
            >
                {filter === 'actors' ? <Actor /> : <Show />}
            </motion.div>
        </div>
    );
}

export default Search;
