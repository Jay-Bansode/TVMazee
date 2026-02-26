import React, { useState, useEffect } from "react";
import { User, Info, Search as SearchIcon, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

function Actor() {
  const [inputVal, setInputVal] = useState("");
  const [actorsData, setActorsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getActorsData = async () => {
      if (!inputVal) {
        setActorsData([]);
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(`https://api.tvmaze.com/search/people?q=${inputVal}`);
        const resData = await response.json();
        setActorsData(resData);
      } catch (error) {
        console.error("Error fetching actors:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      getActorsData();
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
                  placeholder="Search for actors (e.g. Tom Cruise, Zendaya)..."
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
            ) : actorsData.length > 0 ? (
              actorsData.map((element, index) => (
                <motion.div
                  className="col-md-3"
                  key={element.person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="glass card-premium h-100 d-flex flex-column">
                    <div className="position-relative">
                      {element.person.image ? (
                        <img
                          src={element.person.image.medium}
                          className="w-100 object-fit-cover"
                          style={{ height: "380px" }}
                          alt={element.person.name}
                        />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center bg-dark" style={{ height: "380px" }}>
                          <User size={48} className="text-secondary opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="text-white mb-2 line-clamp-1">{element.person.name}</h5>
                        {element.person.birthday && (
                          <div className="d-flex align-items-center gap-2 text-secondary small mb-3">
                            <Calendar size={14} />
                            <span>Born: {element.person.birthday}</span>
                          </div>
                        )}
                        {element.person.country && (
                          <p className="text-secondary small mb-3">
                            From: {element.person.country.name}
                          </p>
                        )}
                      </div>
                      <a
                        href={element.person.url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-premium w-100 d-flex align-items-center justify-content-center gap-2"
                      >
                        <Info size={16} />
                        Profile
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : inputVal && (
              <div className="col-12 text-center py-5">
                <p className="text-secondary">No actors found for "{inputVal}"</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Actor;
