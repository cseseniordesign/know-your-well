import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react'
import countyOptions from './resources/counties';
import Axios from 'axios'


function responseDataToHTMLList(responseData) {
    let HTMLList = []
    try {
        for (const element of responseData) {
            HTMLList.push(
                <List.Item key={element.well_id}>
                    <List.Content>
                        <a href={`/EditWell?id=${element.well_id}&wellName=${element.wi_wellname}`} style={{ width: "45%", height: "17%" }} className="btn btn-primary btn-lg btn-block">{element.wi_wellname} </a>
                    </List.Content>
                    <br />
                </List.Item>
            );
        }
    }
    catch (e) {
        console.log("Error Parsing Data into HTML List.")
    }
    return HTMLList
}

export default function Well() {
    const [isLoading, setLoading] = useState(true);
    const [isSortDropdownVisible, setSortDropdownVisibility] = useState(false);
    const [isFilterDropdownVisible, setFilterDropdownVisibility] = useState(false);
    // const [isCountyDropdownVisible, setCountyDropdownVisibility] = useState(false)
    const [filter, setFilter] = useState(String);
    const [sort, setSort] = useState(String);
    const [wellList, setWells] = useState([]);
    const counties = <div><button onClick={() => setFilter("undefined")} style={{ backgroundColor: filter === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Filter</button>
        {countyOptions.map((county, index) => (
            <button
                key={index}
                onClick={() => setFilter(`county_id = '${index + 1}'`)}
                style={{ backgroundColor: filter === `county_id = '${index + 1}'` ? 'yellow' : 'transparent' }}
                className="dropdown-item"
            >
                {county}
            </button>
        ))}
    </div>

    //credit to https://codewithnico.com/react-wait-axios-to-render/ for conditional rendering
    useEffect(() => {

        const queryParams = {};

        if (filter) {
            queryParams.filterBy = filter;
        }

        if (sort) {
            queryParams.sortBy = sort;
        }

        Axios.get("/Wells", {
            params: queryParams,
            responseType: "json",
        })
            .then(function (response) {
                localStorage.setItem("wellData", JSON.stringify(response.data))
                setWells(responseDataToHTMLList(response.data.Wells));
                setLoading(false);
            });

        const wellCookie = localStorage.getItem("wellData");
        if (wellCookie && !wellList) {
            try {
                const wellData = JSON.parse(wellCookie)
                setWells(responseDataToHTMLList(wellData.Wells));
            }
            catch (e) {
                console.log("wellData is Invalid JSON")
            }
        }
    }, [filter, sort]);

    if (isLoading) {
        if (wellList.length > 0) {
            return (
                <List style={{ textAlign: 'center' }}>
                    <h2> <strong> Wells from localStorage</strong></h2>
                    {wellList}
                </List>
            );
        }
        else {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div style={{ flex: 10 }}></div>

                    {/* Left Side: List of Wells and Create Well Button */}
                    <div style={{ flex: 30, textAlign: 'center' }}>
                        <List>
                            <h2><strong>Wells</strong></h2>
                            <List.Item key={-1}>
                                <List.Content>
                                    <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well</a>
                                </List.Content>
                                <br />
                            </List.Item>
                            {wellList}
                        </List>
                    </div>

                    <div style={{ flex: 3, textAlign: 'center' }}>
                        <div>
                            <button onClick={() => setSortDropdownVisibility(!isSortDropdownVisible)} className="btn btn-primary">Sort Wells</button>
                            {isSortDropdownVisible && (
                                <div style={{
                                    border: '1px solid #ccc',
                                    marginTop: '10px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    boxSizing: 'border-box'
                                }}>
                                    <button onClick={() => setSort("undefined")} style={{ backgroundColor: sort === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Sort</button>
                                    <button onClick={() => setSort("TRIM(wi_wellname)")} style={{ backgroundColor: sort === "TRIM(wi_wellname)" ? 'yellow' : 'transparent' }} className="dropdown-item">A-Z</button>
                                    <button onClick={() => setSort("TRIM(wi_wellname) DESC")} style={{ backgroundColor: sort === "TRIM(wi_wellname) DESC" ? 'yellow' : 'transparent' }} className="dropdown-item">Z-A</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ flex: 3, textAlign: 'center' }}>
                        <div>
                            <button onClick={() => setFilterDropdownVisibility(!isFilterDropdownVisible)} className="btn btn-primary">Filter By County</button>
                            {isFilterDropdownVisible && (
                                <div style={{
                                    border: '1px solid #ccc',
                                    marginTop: '10px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    boxSizing: 'border-box',
                                    maxHeight: '150px',
                                    overflow: 'auto'
                                }}>
                                    {counties}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ flex: 4 }}></div>

                </div>
            );
        }

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div style={{ flex: 10 }}></div>

            <div style={{ flex: 30, textAlign: 'center' }}>
                <List>
                    <h2><strong>Wells</strong></h2>
                    <List.Item key={-1}>
                        <List.Content>
                            <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well</a>
                        </List.Content>
                        <br />
                    </List.Item>
                    {wellList}
                </List>
            </div>

            <div style={{ flex: 3, textAlign: 'center' }}>
                <div>
                    <button onClick={() => setSortDropdownVisibility(!isSortDropdownVisible)} className="btn btn-primary">Sort Wells</button>
                    {isSortDropdownVisible && (
                        <div style={{
                            border: '1px solid #ccc',
                            marginTop: '10px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            boxSizing: 'border-box'
                        }}>
                            <button onClick={() => setSort("undefined")} style={{ backgroundColor: sort === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Sort</button>
                            <button onClick={() => setSort("TRIM(wi_wellname)")} style={{ backgroundColor: sort === "TRIM(wi_wellname)" ? 'yellow' : 'transparent' }} className="dropdown-item">A-Z</button>
                            <button onClick={() => setSort("TRIM(wi_wellname) DESC")} style={{ backgroundColor: sort === "TRIM(wi_wellname) DESC" ? 'yellow' : 'transparent' }} className="dropdown-item">Z-A</button>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ flex: 3, textAlign: 'center' }}>
                <div>
                    <button onClick={() => setFilterDropdownVisibility(!isFilterDropdownVisible)} className="btn btn-primary">Filter By County</button>
                    {isFilterDropdownVisible && (
                        <div style={{
                            border: '1px solid #ccc',
                            marginTop: '10px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            boxSizing: 'border-box',
                            maxHeight: '150px',
                            overflow: 'auto'
                        }}>
                            {counties}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ flex: 4 }}></div>
        </div>
    );
}