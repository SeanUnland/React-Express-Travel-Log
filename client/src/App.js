import React, { useState, useEffect } from "react";
import ReactMapGl, { NavigationControl, Map, Marker } from "react-map-gl";
import { listLogEntries } from "./API";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [viewPort, setViewPort] = useState({
    zoom: 4,
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    })();
  }, []);
  return (
    <div>
      <Map
        // {...viewPort}
        onViewPortChange={setViewPort}
        initialViewState={{
          longitude: -95.3,
          latitude: 37.6,
          zoom: 4,
        }}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: "100vw", height: 400 }}
        mapStyle="mapbox://styles/seanunland/cl13rzvum000614o6otzy9gc9"
      >
        {logEntries.map((entry) => (
          <Marker
            key={entry._id}
            longitude={entry.latitude}
            latitude={entry.longitude}
            anchor="bottom"
          >
            <svg
              className="map-pin"
              style={{
                width: "24px",
                height: "24px",
              }}
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>{" "}
          </Marker>
        ))}
        <NavigationControl />
      </Map>
    </div>
  );
}
export default App;
