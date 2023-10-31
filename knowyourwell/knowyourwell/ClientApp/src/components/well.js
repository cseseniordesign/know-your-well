import React, { useEffect, useState } from 'react';
import { Dropdown, List } from 'semantic-ui-react'
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
    const [filter, setFilter] = useState(String);
    const [sort, setSort] = useState(String);
    const [wellList, setWells] = useState([]);
    

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
            console.log(response.data)
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
                <List style={{ textAlign: 'center', position: 'relative' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h2><strong>Wells</strong></h2>
                    </div>
                    
                    <div style={{ position: 'absolute', top: '10px', right: '50px', display: 'flex' }}>
                
                    <div>
                        <button onClick={() => setSortDropdownVisibility(!isSortDropdownVisible)} className="btn btn-primary">Sort Wells</button>
                        {isSortDropdownVisible && (
                            <div style={{
                                border: '1px solid #ccc',
                                marginTop: '10px',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                boxSizing: 'border-box'
                            }}>
                                <button onClick={() => setSort("undefined")} style = {{backgroundColor: sort === "undefined" ? 'yellow' : 'transparent'}} className="dropdown-item">Clear Sort</button>
                                <button onClick={() => setSort("TRIM(wi_wellname)")} style = {{backgroundColor: sort === "TRIM(wi_wellname)" ? 'yellow' : 'transparent'}} className="dropdown-item">Alphabetically</button>
                                <button onClick={() => setSort("well_id")} style = {{backgroundColor: sort === "well_id" ? 'yellow' : 'transparent'}} className="dropdown-item">well_id</button>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginLeft: '20px' }}> {/* This marginLeft gives some space between the two components */}
                        <button onClick={() => setFilterDropdownVisibility(!isFilterDropdownVisible)} className="btn btn-primary">Filter Wells</button>
                        {isFilterDropdownVisible && (
                            <div style={{
                                border: '1px solid #ccc',
                                marginTop: '10px',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                boxSizing: 'border-box'
                            }}>
                                <button onClick={() => setFilter("undefined")} style = {{backgroundColor: filter === "undefined" ? 'yellow' : 'transparent'}} className="dropdown-item">Clear Filter</button>
                                <button onClick={() => setFilter("wi_topography = 'HillSlope'")} style = {{backgroundColor: filter === "wi_topography = 'HillSlope'" ? 'yellow' : 'transparent'}} className="dropdown-item">HillSlope</button>
                                <button onClick={() => setFilter("wi_topography = 'LevelLand'")} style = {{backgroundColor: filter === "wi_topography = 'LevelLand'" ? 'yellow' : 'transparent'}} className="dropdown-item">LevelLand</button>
                            </div>
                        )}
                    </div>
        
                </div>
        
                    <List.Item key={-1}>
                        <List.Content>
                            <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well</a>
                        </List.Content>
                        <br />
                    </List.Item>
                    {wellList}
                </List>
            );
            
            
        }

    }
    return (
        <List style={{ textAlign: 'center', position: 'relative' }}>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h2><strong>Wells</strong></h2>
            </div>
            
            <div style={{ position: 'absolute', top: '10px', right: '50px', display: 'flex' }}>
        
            <div>
                <button onClick={() => setSortDropdownVisibility(!isSortDropdownVisible)} className="btn btn-primary">Sort Wells</button>
                {isSortDropdownVisible && (
                    <div style={{
                        border: '1px solid #ccc',
                        marginTop: '10px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        boxSizing: 'border-box'
                    }}>
                        <button onClick={() => setSort("undefined")} style = {{backgroundColor: sort === "undefined" ? 'yellow' : 'transparent'}} className="dropdown-item">Clear Sort</button>
                        <button onClick={() => setSort("TRIM(wi_wellname)")} style = {{backgroundColor: sort === "TRIM(wi_wellname)" ? 'yellow' : 'transparent'}} className="dropdown-item">Alphabetically</button>
                        <button onClick={() => setSort("well_id")} style = {{backgroundColor: sort === "well_id" ? 'yellow' : 'transparent'}} className="dropdown-item">well_id</button>
                    </div>
                )}
            </div>
            
            <div style={{ marginLeft: '20px' }}> {/* This marginLeft gives some space between the two components */}
                <button onClick={() => setFilterDropdownVisibility(!isFilterDropdownVisible)} className="btn btn-primary">Filter Wells</button>
                {isFilterDropdownVisible && (
                    <div style={{
                        border: '1px solid #ccc',
                        marginTop: '10px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        boxSizing: 'border-box'
                    }}>
                        <button onClick={() => setFilter("undefined")} style = {{backgroundColor: filter === "undefined" ? 'yellow' : 'transparent'}} className="dropdown-item">Clear Filter</button>
                        <button onClick={() => setFilter("wi_topography = 'HillSlope'")} style = {{backgroundColor: filter === "wi_topography = 'HillSlope'" ? 'yellow' : 'transparent'}} className="dropdown-item">HillSlope</button>
                        <button onClick={() => setFilter("wi_topography = 'LevelLand'")} style = {{backgroundColor: filter === "wi_topography = 'LevelLand'" ? 'yellow' : 'transparent'}} className="dropdown-item">LevelLand</button>
                    </div>
                )}
            </div>

        </div>

            <List.Item key={-1}>
                <List.Content>
                    <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well</a>
                </List.Content>
                <br />
            </List.Item>
            {wellList}
        </List>
    );
}
