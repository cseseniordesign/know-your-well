import React, { useEffect, useState, useRef } from "react";
import { List } from "semantic-ui-react";
import countyOptions from "./resources/counties";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

const Well = () => {
  const [isLoading, setLoading] = useState(true);
  const [isSortDropdownVisible, setSortDropdownVisibility] = useState(false);
  const [isFilterDropdownVisible, setFilterDropdownVisibility] =
    useState(false);
  // const [isCountyDropdownVisible, setCountyDropdownVisibility] = useState(false)
  const [filter, setFilter] = useState(String);
  const [sort, setSort] = useState(String);
  const [wellList, setWells] = useState([]);
  const { user, setUser } = useUser();

  const containerRef = useRef(null);
  const navigate = useNavigate();
  // const [schoolid, setSchoolid] = useState("")

  const [tabIndex, setTabIndex] = useState(0);

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
      mapRef.current?.invalidateSize();
      console.log('resize');
    });
    const container = document.getElementById('map-container');
    if (container) {
      resizeObserver.observe(container);
    }
  }

  const getMapView = () => {
    return (
      <MapContainer id='map-container' ref={mapRef} whenReady={() => resizeMap(mapRef)} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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
                setSort("undefined");
              }}
              className="btn btn-primary"
            >
              Sort Wells
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
                  onClick={() => setSort("undefined")}
                  style={{
                    backgroundColor:
                      sort === "undefined" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Clear Sort
                </button>
                <button
                  onClick={() => setSort("well_id")}
                  style={{
                    backgroundColor:
                      sort === "well_id" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Oldest-Newest
                </button>
                <button
                  onClick={() => setSort("well_id DESC")}
                  style={{
                    backgroundColor:
                      sort === "well_id DESC" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Newest-Oldest
                </button>
              </div>
            )}
            <button
              onClick={() => {
                setFilterDropdownVisibility(!isFilterDropdownVisible);
                setFilter("undefined");
              }}
              className="btn btn-primary"
            >
              Filter By County
            </button>
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
                  onClick={() => setFilter("undefined")}
                  style={{
                    backgroundColor:
                      filter === "undefined" ? "yellow" : "transparent",
                  }}
                  className="dropdown-item"
                >
                  Clear Filter
                </button>
                {countyOptions.map((county) => (
                  <button
                    key={county.key}
                    onClick={() => setFilter(`county_id = '${county.key}'`)}
                    style={{
                      backgroundColor:
                        filter === `county_id = '${county.key}'`
                          ? "yellow"
                          : "transparent",
                    }}
                    className="dropdown-item"
                  >
                    {county.value}
                  </button>
                ))}
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
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} style={{ height: '100%'}}>
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
