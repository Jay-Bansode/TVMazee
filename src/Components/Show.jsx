import React, { useState, useEffect } from "react";
import { Star, Info, Search as SearchIcon, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

function Show() {
  const [inputVal, setInputVal] = useState("");
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShowData = async () => {
      if (!inputVal) {
        setShowData([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${inputVal}`);
        const resData = await response.json();
        setShowData(resData);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      getShowData();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputVal]);

  return (
    <>
      <section className="mb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="position-relative">
                <SearchIcon className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="form-control premium-input ps-5"
                  placeholder="Search for series (e.g. Breaking Bad, Friends)..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row g-4">
            {loading ? (
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : showData.length > 0 ? (
              showData.map((element, index) => (
                <motion.div
                  className="col-md-3"
                  key={element.show.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="glass card-premium h-100 d-flex flex-column">
                    <div className="position-relative">
                      {element.show.image ? (
                        <img
                          src={element.show.image.medium}
                          className="w-100 object-fit-cover"
                          style={{ height: "380px" }}
                          alt={element.show.name}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center bg-dark" style={{ height: "380px" }}>
                          <Tv size={48} className="text-secondary opacity-20" />
                        </div>
                      )}
                      {element.show.rating?.average && (
                        <div className="position-absolute top-0 end-0 m-3 px-2 py-1 glass rounded-2 d-flex align-items-center gap-1">
                          <Star size={14} className="text-warning fill-warning" />
                          <span className="fw-bold small">{element.show.rating.average}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="text-white mb-2 line-clamp-1">{element.show.name}</h5>
                        <p className="text-description line-clamp-2 mb-2">
                          {element.show.summary?.replace(/<[^>]*>?/gm, '').slice(0, 80)}...
                        </p>
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {element.show.genres?.slice(0, 2).map(genre => (
                            <span key={genre} className="badge bg-secondary bg-opacity-25 text-secondary fw-normal">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a
                        href={element.show.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Info size={16} />
                        More Info
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : inputVal && (
              <div className="col-12 text-center py-5">
                <p className="text-secondary">No shows found for "{inputVal}"</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Show;
