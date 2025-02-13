import React, { useEffect, useState, useRef } from "react";
import { List } from "semantic-ui-react";
import countyOptions from "./resources/counties";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from '../components/images/wellIcon.png';
import magicBlueDot from '../components/images/magicBlueDot.png';
import { Icon } from 'leaflet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { useUser } from "./usercontext";
import axios from "axios";

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
        <Marker key={element.wi_wellcode} position={[element.wi_estlatitude, element.wi_estlongitude]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [30, 30], iconAnchor: [15, 30] })}>
          <Popup>
            <a href={`/EditWell?id=${element.well_id}&wellName=${element.wi_wellname}&wellcode=${element.wi_wellcode}`}>{element.wi_wellcode}</a><br />
          </Popup>
        </Marker>
      )
    }
    markerList.push(
      <Marker key="currentLocation" position={[sessionStorage.getItem("lat"), sessionStorage.getItem("long")]} icon={new Icon({ iconUrl: magicBlueDot, iconSize: [15, 15], iconAnchor: [15, 30] })} />
    )
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
  const [sort, setSort] = useState(undefined);
  const [wellList, setWells] = useState([]);
  const [distance, setDistance] = useState(0);
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
    console.log(filter);
    const queryParams = {};
    if (filter) {
      // The filter is now an object that maps each of the filter types to the value, so we need to parse it into something that can be used in the queryParams
      queryParams.filterBy = filter;
    }
    if (sort) {
      queryParams.sortBy = sort;
    }
    console.log(queryParams);
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
        console.error("An error occurred while fetching the wells:", error);
        setLoading(true);
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

  function calculateDistance(wellLatitude, wellLongitude) {
    const userLatitude = sessionStorage.getItem("lat");
    const userLongitude = sessionStorage.getItem("long");
    var R = 3959; // Radius of earth in miles
    var dLat = userLatitude * Math.PI / 180 - wellLatitude * Math.PI / 180;
    var dLon = userLongitude * Math.PI / 180 - wellLongitude * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLatitude * Math.PI / 180) * Math.cos(wellLatitude * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in miles
    return d;
  }

  const filterWellsByDistance = async (distance) => {
    await Axios.get("/Wells", {
      params: {},
      responseType: "json",
    })
      .then(function (response) {
        localStorage.setItem("wellData", JSON.stringify(response.data));
        setWells(responseDataToHTMLList(response.data.Wells));
        setLoading(false);
      })
      .catch(function (error) {
        console.error("An error occurred while fetching the wells:", error);
        setLoading(true);
      });
    const allWells = JSON.parse(localStorage.getItem("wellData"))?.Wells;
    if (allWells.length === 0 || distance < 0) {
      return [];
    }
    if (sessionStorage.getItem("lat") === null || sessionStorage.getItem("long") === null) {
      return allWells;
    }
    const filteredWells = allWells.filter(well => {
      const wellLat = well.wi_estlatitude;
      const wellLong = well.wi_estlongitude;
      const distanceBetween = calculateDistance(wellLat, wellLong);
      return distanceBetween <= distance;
    });
    const extractedIDs = filteredWells.map(well => well.well_id);
    const sqlString = 'well_id IN (' + extractedIDs.join(', ') + ')';
    setFilter({ ...filter, byDistance: sqlString });
    console.log(sqlString);
    console.log(extractedIDs);
    console.log(filteredWells);
    return extractedIDs;
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
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 30, textAlign: "center" }}>
          <div ref={containerRef}>
            <button
              onClick={() => {
                setSortDropdownVisibility(!isSortDropdownVisible);
              }}
              className="btn btn-primary"
            >
              Sort
            </button>
            <button
              onClick={() => {
                setFilterDropdownVisibility(!isFilterDropdownVisible);
              }}
              className="btn btn-primary"
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
                  onClick={() => setSort()}
                  style={{
                    backgroundColor:
                      sort === undefined ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Alphabetical (By Well Code)
                </button>
                <button
                  onClick={() => setSort("well_id")}
                  style={{
                    backgroundColor:
                      sort === "well_id" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Oldest
                </button>
                <button
                  onClick={() => setSort("well_id DESC")}
                  style={{
                    backgroundColor:
                      sort === "well_id DESC" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Newest
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
                  onClick={() => {
                    setFilter({ county_id: -1 });
                  }}
                >
                  Clear Filters
                </button>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}
                >
                  <p>County: </p>
                  <select value={filter.county_id} onChange={(e) => setFilter({ ...filter, county_id: e.target.value })}>
                    {[{ key: -1, value: '' }, ...countyOptions].map((county, index) =>
                      <option key={index} value={county.key}>{county.value}</option>
                    )}
                  </select>
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}
                >
                  <p>Filter by distance: </p>
                  <input type="number" id="filterByNumber" onChange={(e) => setDistance(Number(e.target.value))} />
                  <button onClick={() => filterWellsByDistance(distance)}>Submit</button>
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

  if (sessionStorage.getItem("lat") === null || sessionStorage.getItem("long") === null) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        sessionStorage.setItem("lat", position.coords.latitude);
        sessionStorage.setItem("long", position.coords.longitude);
      }, function (error) {
        console.log("Error getting location: ", error);
      });
    }
  }


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
