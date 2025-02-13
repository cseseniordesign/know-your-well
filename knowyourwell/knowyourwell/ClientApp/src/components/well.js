import React, { useEffect, useState, useRef } from "react";
import { List } from "semantic-ui-react";
import countyOptions from "./resources/counties";
import nrdOptions from "./resources/nrds";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from '../components/images/wellIcon.png';
import { Icon } from 'leaflet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './css/wells.css';

import { useUser } from "./usercontext";

function responseDataToHTMLList(responseData) {
  let HTMLList = [];
  try {
    for (const element of responseData) {
      HTMLList.push(
        <List.Item key={element.well_id}>
          <List.Content>
            <a
              href={`/EditWell?id=${element.well_id}&wellName=${element.wi_wellname}&wellcode=${element.wi_wellcode}`}
              style={{ width: "45%", height: "17%" }}
              className="btn btn-primary btn-lg btn-block"
            >
              {element.wi_wellcode}: {element.wi_wellname}{" "}
            </a>
          </List.Content>
          <br />
        </List.Item>,
      );
    }
  } catch (e) {
    console.log("Error Parsing Data into HTML List.");
  }
  return HTMLList;
}

function responseDataToMarkerList(responseData) {
  let markerList = [];
  try {
    for (const element of responseData) {
      markerList.push(
        <Marker key={element.wi_wellcode} position={[element.wi_estlatitude, element.wi_estlongitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [30, 30], iconAnchor: [15, 30]})}>
          <Popup>
            <a href={`/EditWell?id=${element.well_id}&wellName=${element.wi_wellname}&wellcode=${element.wi_wellcode}`}>{element.wi_wellcode}</a><br />

          </Popup>
        </Marker>
      )
    }
  } catch (e) {
    console.log("Error Parsing Data into Marker List.");
  }
  return markerList;
}

const Well = () => {
  const [isLoading, setLoading] = useState(true);
  const [isSortDropdownVisible, setSortDropdownVisibility] = useState(false);
  const [isFilterDropdownVisible, setFilterDropdownVisibility] =
    useState(false);
  // const [isCountyDropdownVisible, setCountyDropdownVisibility] = useState(false)
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState('well_id');
  const [wellList, setWells] = useState([]);
  const { user, setUser } = useUser();

  const containerRef = useRef(null);
  const navigate = useNavigate();
  // const [schoolid, setSchoolid] = useState("")

  const [tabIndex, setTabIndex] = useState(0);
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    const validateUser = async () => {
      if (!user) {
        await Axios.get("/userinfo", {
          responseType: "json",
        })
          .then(function (response) {
            setUser(response.data);
          })
          .catch(function (response) {
            window.alert("The app encountered an error verifying that you are logged in.");
            navigate("/");
          });
      }
      if (user?.displayn === "") {
        window.alert("You are not yet logged in. Please log in.");
        navigate("/");
      }
    }

    validateUser();
  }, [navigate, user, setUser]);

  //credit to https://codewithnico.com/react-wait-axios-to-render/ for conditional rendering
  useEffect(() => {
    const queryParams = {};

    if (filter) {
      // The filter is now an object that maps each of the filter types to the value, so we need to parse it into something that can be used in the queryParams
      queryParams.filterBy = filter;
    }

    if (sort) {
      queryParams.sortBy = sort;
    }

    // queryParams.schoolid = schoolid

    Axios.get("/Wells", {
      params: queryParams,
      responseType: "json",
    })
      .then(function (response) {
        localStorage.setItem("wellData", JSON.stringify(response.data));
        setWells(responseDataToHTMLList(response.data.Wells));

        setLoading(false);
      })
      .catch(function (error) {
        // localStorage.setItem("wellData", [])
        console.error("An error occurred while fetching the wells:", error);
        // Here, you can also set isLoading to false to stop the loading indicator
        setLoading(true);
        // Optionally, handle the error more gracefully, such as showing an error message to the user
      });
  }, [filter, sort]);

  const handleBlur = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget)
    ) {
      setFilterDropdownVisibility(false);
    }
  };

  const mapRef = useRef();

  const resizeMap = (mapRef) => {
    const resizeObserver = new ResizeObserver(() => {
      const element = document.getElementById('map-container');
      if (element) {
        setMapHeight(document.body.getBoundingClientRect().bottom - element.getBoundingClientRect().top);
      }
      mapRef.current?.invalidateSize();
    });
    const container = document.getElementById('map-container');
    if (container) {
      resizeObserver.observe(container);
    }
  }

  const findMapCenter = () => {
    const allWells = JSON.parse(localStorage.getItem("wellData"))?.Wells;
    if (allWells.length > 0) { // Only adjusts center if there are wells to base it on
      const wellLatitudes = allWells.map(well => well.wi_estlatitude);
      const centerLatitude = (Math.max(...wellLatitudes) + Math.min(...wellLatitudes)) / 2;
      const wellLongitudes = allWells.map(well => well.wi_estlongitude);
      const centerLongitude = (Math.max(...wellLongitudes) + Math.min(...wellLongitudes)) / 2;
      return [centerLatitude, centerLongitude];
    } else {
      return [40.8202, -96.7005]; // Defaults to the coordinates of UNL
    }
  }

  const getMapView = () => {
    return (
      <MapContainer id='map-container' ref={mapRef} whenReady={() => resizeMap(mapRef)} center={findMapCenter()} zoom={7} maxZoom={12} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {responseDataToMarkerList(
          JSON.parse(localStorage.getItem("wellData"))?.Wells,
        )}
      </MapContainer>
    );
  }

  const getListView = () => {
    const wellsData = JSON.parse(localStorage.getItem("wellData"))?.Wells || [];
    const filteredWells = filter.search
      ? wellsData.filter((well) =>
          well.wi_wellname.toLowerCase().includes(filter.search.toLowerCase())
        )
      : wellsData;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 30, textAlign: "center" }}>
          <div ref={containerRef}>
            <button
              onClick={() => {
                setSortDropdownVisibility(!isSortDropdownVisible);
              }}
              className="btn btn-primary"
              style={{ margin: '0.5em', width: '5em' }}
            >
              Sort
            </button>
            <button
              onClick={() => {
                setFilterDropdownVisibility(!isFilterDropdownVisible);
              }}
              className="btn btn-primary"
              style={{ margin: '0.5em', width: '5em' }}
            >
              Filters
            </button>
            {isSortDropdownVisible && (
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                }}
              >
                <button
                  onClick={() => setSort("well_id")}
                  style={{
                    backgroundColor:
                      sort === "well_id" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Oldest First
                </button>
                <button
                  onClick={() => setSort("well_id DESC")}
                  style={{
                    backgroundColor:
                      sort === "well_id DESC" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Newest First
                </button>
                <button
                  onClick={() => setSort("wi_wellname")}
                  style={{
                    backgroundColor:
                      sort === "wi_wellname" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Alphabetical (By Well Name)
                </button>
                <button
                  onClick={() => setSort("field_activity")}
                  style={{
                    backgroundColor:
                      sort === "field_activity" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Most Recent Field Entry
                </button>
              </div>
            )}
            
            {isFilterDropdownVisible && (
              <div
                style={{
                  border: "1px solid #ccc",
                  marginTop: "10px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                <button
                  className="btn btn-primary"
                  style={{ margin: '0.5em' }}
                  onClick={() => {
                    setFilter({ county_id: -1, nrd_id: -1 });
                  }}
                >
                  Clear Filters
                </button>
                <div className="filter-container">
                  <p>County: </p>
                  <select value={filter.county_id} onChange={(e) => setFilter({ ...filter, county_id: e.target.value })}>
                  {[ { key: -1, value: '' }, ...countyOptions].map((county, index) =>
                    <option key={index} value={county.key}>{county.value}</option>
                  )}
                  </select>
                  <p>Natural Resource District: </p>
                  <select value={filter.nrd_id} onChange={(e) => setFilter({ ...filter, nrd_id: e.target.value })}>
                  {[ { key: -1, value: '' }, ...nrdOptions].map((nrd, index) =>
                    <option key={index} value={nrd.key}>{nrd.value}</option>
                  )}
                  </select>
                  <p>Search: </p>
                  <input
                    type="text"
                    placeholder="Search by well name"
                    value={filter.search || ""}
                    onChange={(e) =>
                      setFilter({ ...filter, search: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    style={{ marginLeft: "10px", padding: "4px", width: "250px" }}
                  />
                </div>
              </div>
            )}
          </div>

          <List>
            <h2>
              <strong>Wells</strong>
            </h2>
            <List.Item key={-1}>
              <List.Content>
                <a
                  href={`/WellInfo`}
                  style={{ width: "45%", height: "17%", border: "dashed" }}
                  className="btn btn-light btn-lg btn-block"
                >
                  Create New Well
                </a>
              </List.Content>
              <br />
            </List.Item>
            {responseDataToHTMLList(
              JSON.parse(localStorage.getItem("wellData"))?.Wells,
            )}
          </List>
        </div>
      </div>
    );
  };

  if (isLoading && JSON.parse(localStorage.getItem("wellData")) === null) {
    return <h1>Loading</h1>;
  } else if (isLoading) {
    return (
      <List style={{ textAlign: "center" }}>
        <h2>
          <strong>Cached Wells</strong>
        </h2>
        <List.Item key={-1}>
          <List.Content>
            <a
              href={`/WellInfo`}
              style={{ width: "45%", height: "17%", border: "dashed" }}
              className="btn btn-light btn-lg btn-block"
            >
              Create New Well
            </a>
          </List.Content>
          <br />
        </List.Item>
        {responseDataToHTMLList(
          JSON.parse(localStorage.getItem("wellData")).Wells,
        )}
      </List>
    );
  } else {
    return (
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} style={{ height: `${mapHeight}px` }}>
        <TabList>
          <Tab>Map View</Tab>
          <Tab>List View</Tab>
        </TabList>

        <TabPanel style={{ height: '100%' }}>
          {getMapView()}
        </TabPanel>
        <TabPanel>
          {getListView()}
        </TabPanel>
      </Tabs>
    );
  }
}

export default Well;
