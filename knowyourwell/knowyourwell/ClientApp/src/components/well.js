import React, { useEffect, useState, useRef } from 'react';
import { List } from 'semantic-ui-react'
import countyOptions from './resources/counties';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import csvKey from './resources/csvkey';

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

function exportCSV() {
    Axios.get('/csvqueries', {
        responseType: "json",
    })
        .then(function (response) {
            let csv = [""]
            let flag = 0;
            for (let i = 0; i < response.data.Data.length; i++) {
                csv[i + 1] = ""
                for (const [key, value] of Object.entries(response.data.Data[i])) {
                    if (flag == 0) {
                        csv[0] += csvKey[key] + ","
                    }
                    csv[i + 1] += value + ","
                }
                csv[i + 1] += "\n"
                flag = 1;
            }
            csv[0] += "\n"
            const file = new File(csv, 'test.csv', {
                type: 'text/csv',
            })
            const link = document.createElement('a')
            const url = URL.createObjectURL(file)

            link.href = url
            link.download = file.name
            document.body.appendChild(link)
            link.click()

            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        })
        .catch(function (error) {
            // Handle error
            console.error("Error fetching data:", error);
        });

}


export default function Well() {
    const [isLoading, setLoading] = useState(true);
    const [isSortDropdownVisible, setSortDropdownVisibility] = useState(false);
    const [isFilterDropdownVisible, setFilterDropdownVisibility] = useState(false);
    // const [isCountyDropdownVisible, setCountyDropdownVisibility] = useState(false)
    const [filter, setFilter] = useState(String);
    const [sort, setSort] = useState(String);
    const [wellList, setWells] = useState([]);

    const containerRef = useRef(null);
    const navigate = useNavigate();
    // const [schoolid, setSchoolid] = useState("")

    useEffect(() => { // login check
        Axios.get('/userinfo', {
            responseType: "json"
        }).then(function (response) {
            let displayname = response.data.displayn;
            if (displayname == "") {
                window.alert("You are not yet logged in. Please log in.");
                navigate("/");
            }

        }).catch(function (error) {
            console.error("Failed to fetch school id:", error);
        });
    }, [navigate]);

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
                debugger;
                localStorage.setItem("wellData", JSON.stringify(response.data))
                if (response.data) {
                    setWells(responseDataToHTMLList(response.data.Wells));
                }

                setLoading(false);
            }).catch(function (error) {
                console.error("An error occurred while fetching the wells:", error);
                // Here, you can also set isLoading to false to stop the loading indicator
                setLoading(true);
                // Optionally, handle the error more gracefully, such as showing an error message to the user
            });
    }, [filter, sort]);

    // if (isLoading) {
    //     return <h1>Loading</h1>
    // }

    const handleBlur = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.relatedTarget)) {
            setFilterDropdownVisibility(false);
        }
    };

    if (isLoading) {
        return (
            <List style={{ textAlign: 'center' }}>
                <h2> <strong> Wells from localStorage</strong></h2>
                {responseDataToHTMLList(JSON.parse(localStorage.getItem("wellData"))?.Wells)}
            </List>
        );
    }
    else {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div style={{ flex: 30, textAlign: 'center' }}>
                    <div ref={containerRef}>
                        <button onClick={() => { setSortDropdownVisibility(!isSortDropdownVisible); }} className="btn btn-primary">Sort Wells</button>
                        {isSortDropdownVisible && (
                            <div style={{
                                border: '1px solid #ccc',
                                marginTop: '10px',
                                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                boxSizing: 'border-box',
                                maxHeight: '150px',
                                overflow: 'auto'
                            }}>
                                <button onClick={() => setFilter("undefined")} style={{ backgroundColor: filter === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Filter</button>
                                {countyOptions.map(county => (
                                    <button key={county.key}
                                        onClick={() => setFilter(`county_id = '${county.key}'`)}
                                        style={{ backgroundColor: filter === `county_id = '${county.key}'` ? 'yellow' : 'transparent' }}
                                        className="dropdown-item">
                                        {county.value}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <List>
                        <h2><strong>Wells</strong></h2>
                        <List.Item key={-1}>
                            <List.Content>
                                <a href={`/WellInfo`} style={{ width: "45%", height: "17%", border: "dashed" }} className="btn btn-light btn-lg btn-block">Create New Well</a>
                            </List.Content>
                            <br />
                        </List.Item>
                        {responseDataToHTMLList(JSON.parse(localStorage.getItem("wellData"))?.Wells)}
                    </List>
                </div>

            </div>
        );
    }

}