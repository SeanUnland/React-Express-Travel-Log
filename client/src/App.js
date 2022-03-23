import React, { useState, useEffect } from "react";
import LogEntryForm from "./LogEntryForm";
import ReactMapGl, {
  NavigationControl,
  Map,
  Marker,
  Popup,
} from "react-map-gl";
import { listLogEntries } from "./API";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [viewPort, setViewPort] = useState({
    zoom: 4,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
    console.log(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    console.log(event);
    // const locationData = event.lngLat;
    setAddEntryLocation({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });
  };

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
        onDblClick={showAddMarkerPopup}
      >
        {logEntries.map((entry) => (
          <>
            <Marker
              key={entry._id}
              longitude={entry.latitude}
              latitude={entry.longitude}
              anchor="bottom"
            >
              <div
                onClick={() =>
                  setShowPopup({
                    // ...showPopup,
                    [entry._id]: true,
                  })
                }
              >
                <svg
                  className="map-pin"
                  style={{
                    width: `${6 * viewPort.zoom}px`,
                    height: `${6 * viewPort.zoom}px`,
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
              </div>
            </Marker>

            {showPopup[entry._id] ? (
              <Popup
                longitude={entry.latitude}
                latitude={entry.longitude}
                anchor="bottom"
                dynamicPosition={true}
                onClose={() => () => setShowPopup({})}
              >
                <div className="popup">
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>
                    Visited On: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </div>
              </Popup>
            ) : null}
          </>
        ))}
        {addEntryLocation ? (
          <>
            <Marker
              longitude={addEntryLocation.latitude}
              latitude={addEntryLocation.longitude}
              anchor="bottom"
            >
              <div>
                <svg
                  className="map-pin"
                  style={{
                    width: `${6 * viewPort.zoom}px`,
                    height: `${6 * viewPort.zoom}px`,
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
              </div>
            </Marker>
            <Popup
              longitude={addEntryLocation.latitude}
              latitude={addEntryLocation.longitude}
              anchor="bottom"
              dynamicPosition={true}
              onClose={() => () => setAddEntryLocation(null)}
            >
              <div className="popup">
                <LogEntryForm
                  onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation}
                />
              </div>
            </Popup>
          </>
        ) : null}
      </Map>
    </div>
  );
}
export default App;
