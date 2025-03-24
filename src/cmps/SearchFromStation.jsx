import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom";
import { SongPreview } from "./SongPreview.jsx"
import songsData from "../Data/Newdata.json"
import { stationService } from "../services/station/station.service.local.js";


import  { useSelector, useDispatch } from 'react-redux'



export function SearchFromStation() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const currentSong = useSelector((storeState) => storeState.currentSong)
  const dispatch = useDispatch()


  function setSong(song) {
    dispatch({ type: 'SET_SONG', song})
    console.log('The song has been changed ');
    
  }



function addSongToPlaylist (song) {
    const stationId = useParams()    
    const station = stationService.getById(stationId.id)
    station.songs.push(song)

    stationService.save(station)

    console.log('song added', song)
  
}


function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}


function filterSongs(searchTerm, setResults) {
  if (!searchTerm) {
    setResults([]);
    return;
  }

  const filtered = songsData.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setResults(filtered);
}

  const handleSearch = useCallback(
    debounce((searchTerm) => filterSongs(searchTerm, setResults), 300),
    []
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <div className="playlist-search-container">
      <hr className="divider" />
      <div className="header">
        <h2>Let's find something for your playlist</h2>
      </div>

      <div className="search-bar-play">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for songs or episodes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {results.length > 0 && (
        <div className="results">
          {results.map((song) => (
            <SongPreview key={song.id} song={song} onAdd={addSongToPlaylist} />
          ))}
        </div>
      )}
    </div>
  );
}
