import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { stationService } from "../services/station/station.service.local";
import { MdAdd } from "react-icons/md";
import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { IconsSvg } from "../cmps/IconsSvg";

export function SideBar() {
  const [filterBy, setFilterBy] = useState("");
  const [stations, setStations] = useState([]);

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    try {
      const stationsFromService = await stationService.query();
      const stationsWithDates = stationsFromService.map((station) => ({
        ...station,
        addedAt: station.addedAt || getRandomDate(),
        lastPlayed: station.lastPlayed || "",
      }));
      setStations(stationsWithDates);
    } catch (err) {
      console.error("Failed to load stations:", err);
    }
  }

  function getRandomDate() {
    const day = Math.floor(Math.random() * 28) + 1;
    return `03.${day < 10 ? "0" + day : day}.2025`;
  }

  const filteredStations = stations.filter((station) =>
    station.title.toLowerCase().includes(filterBy.toLowerCase())
  );

  return (
    <aside className="side-bar">
      <div className="logo-section">
        <NavLink
          className="library-title bright-hover"
          onClick={() =>
            prompt(
              "TODO - clicking 'Your Library' should collapse the sidebar."
            )
          }
        >
          <IconsSvg svgName="library" />
          Your Library
        </NavLink>
        <div className="actions">
          <NavLink to={`/newStation`} className="plus-create-btn">
            <MdAdd size={16} />
            <span>Create</span>
          </NavLink>
          <button className="expand-btn" type="button" aria-label="Expand">
            <FiArrowLeft size={20} className="arrow-icon" />
          </button>
        </div>
      </div>

      <div className="search-recent-container">
        <div className="search-input-container">
          <FiSearch size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search in Your Library"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          />
        </div>
        <div className="recents-section">
          <span>Recents</span>
          <IconsSvg svgName="recents" className="recents-icon" />
        </div>
      </div>

      <div className="library-header-row">
        <span className="header-title">Title</span>
        <span className="header-date-added">Date Added</span>
        <span className="header-played">Played</span>
      </div>
      <div className="library-header-line"></div>

      <div className="library-section">
        <ul>
          {filteredStations.map((station) => (
            <li key={station._id}>
              <NavLink
                to={`/station/${station._id}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <img
                  src={station.songs?.[0]?.imgUrl || station.img}
                  alt={station.title}
                />
                <div className="station-info">
                  <span className="station-title">{station.title}</span>
                  <span className="station-description">
                    Playlist • {station.songs.length} songs
                  </span>
                </div>
                <span className="date-added">{station.addedAt}</span>
                <span className="last-played">{station.lastPlayed || "—"}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
