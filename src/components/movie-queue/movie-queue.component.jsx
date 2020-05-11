import React from 'react';
import './movie-queue.styles.scss';

const MovieQueue = ({ movieQueue,handleClickMovieQueue }) => (
  <div className="movie-queue">
        <label className={ movieQueue.length > 0 ? 'show' : 'hide' }> Movie List Queue:</label>
            {
                movieQueue.map((movie, idx) => (
                    <div key={idx}>
                        <label  className="movie-to-play" onClick={handleClickMovieQueue} > {movie.name} </label>
                        <br></br>
                    </div>
                ))
            }
       
  </div>
)

export default MovieQueue;
