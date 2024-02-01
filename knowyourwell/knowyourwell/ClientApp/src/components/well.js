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
    // const [schoolid, setSchoolid] = useState("")

    // useEffect(() => {
    //     setSchoolid('school_id = 15');
    //   }, []);

    // const counties = <div><button onClick={() => setFilter("undefined")} style={{ backgroundColor: filter === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Filter</button>
    //     {countyOptions.map((county, index) => (
    //         <button
    //             key={index}
    //             onClick={() => setFilter(`county_id = '${index + 1}'`)}
    //             style={{ backgroundColor: filter === `county_id = '${index + 1}'` ? 'yellow' : 'transparent' }}
    //             className="dropdown-item"
    //         >
    //             {county}
    //         </button>
    //     ))}
    // </div>
    const counties = <div><button onClick={() => setFilter("undefined")} style={{ backgroundColor: filter === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Filter</button>
    <button onClick={() => setFilter("county_id = '1'")} style={{ backgroundColor: filter === "county_id = '1'" ? 'yellow' : 'transparent' }} className="dropdown-item">Adams</button>
    <button onClick={() => setFilter("county_id = '2'")} style={{ backgroundColor: filter === "county_id = '2'" ? 'yellow' : 'transparent' }} className="dropdown-item">Antelop</button>
    <button onClick={() => setFilter("county_id = '3'")} style={{ backgroundColor: filter === "county_id = '3'" ? 'yellow' : 'transparent' }} className="dropdown-item">Arthur</button>
    <button onClick={() => setFilter("county_id = '4'")} style={{ backgroundColor: filter === "county_id = '4'" ? 'yellow' : 'transparent' }} className="dropdown-item">Banner</button>
    <button onClick={() => setFilter("county_id = '5'")} style={{ backgroundColor: filter === "county_id = '5'" ? 'yellow' : 'transparent' }} className="dropdown-item">Blaine</button>
    <button onClick={() => setFilter("county_id = '6'")} style={{ backgroundColor: filter === "county_id = '6'" ? 'yellow' : 'transparent' }} className="dropdown-item">Boone</button>
    <button onClick={() => setFilter("county_id = '7'")} style={{ backgroundColor: filter === "county_id = '7'" ? 'yellow' : 'transparent' }} className="dropdown-item">Box Butte</button>
    <button onClick={() => setFilter("county_id = '8'")} style={{ backgroundColor: filter === "county_id = '8'" ? 'yellow' : 'transparent' }} className="dropdown-item">Boyd</button>
    <button onClick={() => setFilter("county_id = '9'")} style={{ backgroundColor: filter === "county_id = '9'" ? 'yellow' : 'transparent' }} className="dropdown-item">Brown</button>
    <button onClick={() => setFilter("county_id = '10'")} style={{ backgroundColor: filter === "county_id = '10'" ? 'yellow' : 'transparent' }} className="dropdown-item">Buffalo</button>
    <button onClick={() => setFilter("county_id = '11'")} style={{ backgroundColor: filter === "county_id = '11'" ? 'yellow' : 'transparent' }} className="dropdown-item">Burt</button>
    <button onClick={() => setFilter("county_id = '12'")} style={{ backgroundColor: filter === "county_id = '12'" ? 'yellow' : 'transparent' }} className="dropdown-item">Butler</button>
    <button onClick={() => setFilter("county_id = '13'")} style={{ backgroundColor: filter === "county_id = '13'" ? 'yellow' : 'transparent' }} className="dropdown-item">Cass</button>
    <button onClick={() => setFilter("county_id = '14'")} style={{ backgroundColor: filter === "county_id = '14'" ? 'yellow' : 'transparent' }} className="dropdown-item">Cedar</button>
    <button onClick={() => setFilter("county_id = '15'")} style={{ backgroundColor: filter === "county_id = '15'" ? 'yellow' : 'transparent' }} className="dropdown-item">Chase</button>
    <button onClick={() => setFilter("county_id = '16'")} style={{ backgroundColor: filter === "county_id = '16'" ? 'yellow' : 'transparent' }} className="dropdown-item">Cherry</button>
    <button onClick={() => setFilter("county_id = '17'")} style={{ backgroundColor: filter === "county_id = '17'" ? 'yellow' : 'transparent' }} className="dropdown-item">Cheyenne</button>
    <button onClick={() => setFilter("county_id = '18'")} style={{ backgroundColor: filter === "county_id = '18'" ? 'yellow' : 'transparent' }} className="dropdown-item">Clay</button>
    <button onClick={() => setFilter("county_id = '19'")} style={{ backgroundColor: filter === "county_id = '19'" ? 'yellow' : 'transparent' }} className="dropdown-item">Colfax</button>
    <button onClick={() => setFilter("county_id = '20'")} style={{ backgroundColor: filter === "county_id = '20'" ? 'yellow' : 'transparent' }} className="dropdown-item">Cuming</button>
    <button onClick={() => setFilter("county_id = '21'")} style={{ backgroundColor: filter === "county_id = '21'" ? 'yellow' : 'transparent' }} className="dropdown-item">Custer</button>
    <button onClick={() => setFilter("county_id = '22'")} style={{ backgroundColor: filter === "county_id = '22'" ? 'yellow' : 'transparent' }} className="dropdown-item">Dakota</button>
    <button onClick={() => setFilter("county_id = '23'")} style={{ backgroundColor: filter === "county_id = '23'" ? 'yellow' : 'transparent' }} className="dropdown-item">Dawes</button>
    <button onClick={() => setFilter("county_id = '24'")} style={{ backgroundColor: filter === "county_id = '24'" ? 'yellow' : 'transparent' }} className="dropdown-item">Dawson</button>
    <button onClick={() => setFilter("county_id = '25'")} style={{ backgroundColor: filter === "county_id = '25'" ? 'yellow' : 'transparent' }} className="dropdown-item">Dixon</button>
    <button onClick={() => setFilter("county_id = '26'")} style={{ backgroundColor: filter === "county_id = '26'" ? 'yellow' : 'transparent' }} className="dropdown-item">Dodge</button>
    <button onClick={() => setFilter("county_id = '27'")} style={{ backgroundColor: filter === "county_id = '27'" ? 'yellow' : 'transparent' }} className="dropdown-item">Douglas</button>
    <button onClick={() => setFilter("county_id = '28'")} style={{ backgroundColor: filter === "county_id = '28'" ? 'yellow' : 'transparent' }} className="dropdown-item">Deuel</button>
    <button onClick={() => setFilter("county_id = '29'")} style={{ backgroundColor: filter === "county_id = '29'" ? 'yellow' : 'transparent' }} className="dropdown-item">Dundy</button>
    <button onClick={() => setFilter("county_id = '30'")} style={{ backgroundColor: filter === "county_id = '30'" ? 'yellow' : 'transparent' }} className="dropdown-item">Fillmore</button>
    <button onClick={() => setFilter("county_id = '31'")} style={{ backgroundColor: filter === "county_id = '31'" ? 'yellow' : 'transparent' }} className="dropdown-item">Franklin</button>
    <button onClick={() => setFilter("county_id = '32'")} style={{ backgroundColor: filter === "county_id = '32'" ? 'yellow' : 'transparent' }} className="dropdown-item">Frontier</button>
    <button onClick={() => setFilter("county_id = '33'")} style={{ backgroundColor: filter === "county_id = '33'" ? 'yellow' : 'transparent' }} className="dropdown-item">Furnas</button>
    <button onClick={() => setFilter("county_id = '34'")} style={{ backgroundColor: filter === "county_id = '34'" ? 'yellow' : 'transparent' }} className="dropdown-item">Gage</button>
    <button onClick={() => setFilter("county_id = '35'")} style={{ backgroundColor: filter === "county_id = '35'" ? 'yellow' : 'transparent' }} className="dropdown-item">Garden</button>
    <button onClick={() => setFilter("county_id = '36'")} style={{ backgroundColor: filter === "county_id = '36'" ? 'yellow' : 'transparent' }} className="dropdown-item">Garfield</button>
    <button onClick={() => setFilter("county_id = '37'")} style={{ backgroundColor: filter === "county_id = '37'" ? 'yellow' : 'transparent' }} className="dropdown-item">Gosper</button>
    <button onClick={() => setFilter("county_id = '38'")} style={{ backgroundColor: filter === "county_id = '38'" ? 'yellow' : 'transparent' }} className="dropdown-item">Grant</button>
    <button onClick={() => setFilter("county_id = '39'")} style={{ backgroundColor: filter === "county_id = '39'" ? 'yellow' : 'transparent' }} className="dropdown-item">Greeley</button>
    <button onClick={() => setFilter("county_id = '40'")} style={{ backgroundColor: filter === "county_id = '40'" ? 'yellow' : 'transparent' }} className="dropdown-item">Hall</button>
    <button onClick={() => setFilter("county_id = '41'")} style={{ backgroundColor: filter === "county_id = '41'" ? 'yellow' : 'transparent' }} className="dropdown-item">Hamilton</button>
    <button onClick={() => setFilter("county_id = '42'")} style={{ backgroundColor: filter === "county_id = '42'" ? 'yellow' : 'transparent' }} className="dropdown-item">Harlan</button>
    <button onClick={() => setFilter("county_id = '43'")} style={{ backgroundColor: filter === "county_id = '43'" ? 'yellow' : 'transparent' }} className="dropdown-item">Hayes</button>
    <button onClick={() => setFilter("county_id = '44'")} style={{ backgroundColor: filter === "county_id = '44'" ? 'yellow' : 'transparent' }} className="dropdown-item">Hitchcock</button>
    <button onClick={() => setFilter("county_id = '45'")} style={{ backgroundColor: filter === "county_id = '45'" ? 'yellow' : 'transparent' }} className="dropdown-item">Holt</button>
    <button onClick={() => setFilter("county_id = '46'")} style={{ backgroundColor: filter === "county_id = '46'" ? 'yellow' : 'transparent' }} className="dropdown-item">Hooker</button>
    <button onClick={() => setFilter("county_id = '47'")} style={{ backgroundColor: filter === "county_id = '47'" ? 'yellow' : 'transparent' }} className="dropdown-item">Howard</button>
    <button onClick={() => setFilter("county_id = '48'")} style={{ backgroundColor: filter === "county_id = '48'" ? 'yellow' : 'transparent' }} className="dropdown-item">Jefferson</button>
    <button onClick={() => setFilter("county_id = '49'")} style={{ backgroundColor: filter === "county_id = '49'" ? 'yellow' : 'transparent' }} className="dropdown-item">Johnson</button>
    <button onClick={() => setFilter("county_id = '50'")} style={{ backgroundColor: filter === "county_id = '50'" ? 'yellow' : 'transparent' }} className="dropdown-item">Kearney</button>
    <button onClick={() => setFilter("county_id = '51'")} style={{ backgroundColor: filter === "county_id = '51'" ? 'yellow' : 'transparent' }} className="dropdown-item">Keith</button>
    <button onClick={() => setFilter("county_id = '52'")} style={{ backgroundColor: filter === "county_id = '52'" ? 'yellow' : 'transparent' }} className="dropdown-item">Keya Paha</button>
    <button onClick={() => setFilter("county_id = '53'")} style={{ backgroundColor: filter === "county_id = '53'" ? 'yellow' : 'transparent' }} className="dropdown-item">Kimball</button>
    <button onClick={() => setFilter("county_id = '54'")} style={{ backgroundColor: filter === "county_id = '54'" ? 'yellow' : 'transparent' }} className="dropdown-item">Knox</button>
    <button onClick={() => setFilter("county_id = '55'")} style={{ backgroundColor: filter === "county_id = '55'" ? 'yellow' : 'transparent' }} className="dropdown-item">Lancaster</button>
    <button onClick={() => setFilter("county_id = '56'")} style={{ backgroundColor: filter === "county_id = '56'" ? 'yellow' : 'transparent' }} className="dropdown-item">Lincoln</button>
    <button onClick={() => setFilter("county_id = '57'")} style={{ backgroundColor: filter === "county_id = '57'" ? 'yellow' : 'transparent' }} className="dropdown-item">Logan</button>
    <button onClick={() => setFilter("county_id = '58'")} style={{ backgroundColor: filter === "county_id = '58'" ? 'yellow' : 'transparent' }} className="dropdown-item">Loup</button>
    <button onClick={() => setFilter("county_id = '59'")} style={{ backgroundColor: filter === "county_id = '59'" ? 'yellow' : 'transparent' }} className="dropdown-item">Madison</button>
    <button onClick={() => setFilter("county_id = '60'")} style={{ backgroundColor: filter === "county_id = '60'" ? 'yellow' : 'transparent' }} className="dropdown-item">McPherson</button>
    <button onClick={() => setFilter("county_id = '61'")} style={{ backgroundColor: filter === "county_id = '61'" ? 'yellow' : 'transparent' }} className="dropdown-item">Merrick</button>
    <button onClick={() => setFilter("county_id = '62'")} style={{ backgroundColor: filter === "county_id = '62'" ? 'yellow' : 'transparent' }} className="dropdown-item">Morrill</button>
    <button onClick={() => setFilter("county_id = '63'")} style={{ backgroundColor: filter === "county_id = '63'" ? 'yellow' : 'transparent' }} className="dropdown-item">Nance</button>
    <button onClick={() => setFilter("county_id = '64'")} style={{ backgroundColor: filter === "county_id = '64'" ? 'yellow' : 'transparent' }} className="dropdown-item">Nemaha</button>
    <button onClick={() => setFilter("county_id = '65'")} style={{ backgroundColor: filter === "county_id = '65'" ? 'yellow' : 'transparent' }} className="dropdown-item">Nuckolls</button>
    <button onClick={() => setFilter("county_id = '66'")} style={{ backgroundColor: filter === "county_id = '66'" ? 'yellow' : 'transparent' }} className="dropdown-item">Otoe</button>
    <button onClick={() => setFilter("county_id = '67'")} style={{ backgroundColor: filter === "county_id = '67'" ? 'yellow' : 'transparent' }} className="dropdown-item">Pawnee</button>
    <button onClick={() => setFilter("county_id = '68'")} style={{ backgroundColor: filter === "county_id = '68'" ? 'yellow' : 'transparent' }} className="dropdown-item">Perkins</button>
    <button onClick={() => setFilter("county_id = '69'")} style={{ backgroundColor: filter === "county_id = '69'" ? 'yellow' : 'transparent' }} className="dropdown-item">Phelps</button>
    <button onClick={() => setFilter("county_id = '70'")} style={{ backgroundColor: filter === "county_id = '70'" ? 'yellow' : 'transparent' }} className="dropdown-item">Pierce</button>
    <button onClick={() => setFilter("county_id = '71'")} style={{ backgroundColor: filter === "county_id = '71'" ? 'yellow' : 'transparent' }} className="dropdown-item">Platte</button>
    <button onClick={() => setFilter("county_id = '72'")} style={{ backgroundColor: filter === "county_id = '72'" ? 'yellow' : 'transparent' }} className="dropdown-item">Polk</button>
    <button onClick={() => setFilter("county_id = '73'")} style={{ backgroundColor: filter === "county_id = '73'" ? 'yellow' : 'transparent' }} className="dropdown-item">Red Willow</button>
    <button onClick={() => setFilter("county_id = '74'")} style={{ backgroundColor: filter === "county_id = '74'" ? 'yellow' : 'transparent' }} className="dropdown-item">Richardson</button>
    <button onClick={() => setFilter("county_id = '75'")} style={{ backgroundColor: filter === "county_id = '75'" ? 'yellow' : 'transparent' }} className="dropdown-item">Rock</button>
    <button onClick={() => setFilter("county_id = '76'")} style={{ backgroundColor: filter === "county_id = '76'" ? 'yellow' : 'transparent' }} className="dropdown-item">Saline</button>
    <button onClick={() => setFilter("county_id = '77'")} style={{ backgroundColor: filter === "county_id = '77'" ? 'yellow' : 'transparent' }} className="dropdown-item">Sarpy</button>
    <button onClick={() => setFilter("county_id = '78'")} style={{ backgroundColor: filter === "county_id = '78'" ? 'yellow' : 'transparent' }} className="dropdown-item">Saunders</button>
    <button onClick={() => setFilter("county_id = '79'")} style={{ backgroundColor: filter === "county_id = '79'" ? 'yellow' : 'transparent' }} className="dropdown-item">Scotts Bluff</button>
    <button onClick={() => setFilter("county_id = '80'")} style={{ backgroundColor: filter === "county_id = '80'" ? 'yellow' : 'transparent' }} className="dropdown-item">Seward</button>
    <button onClick={() => setFilter("county_id = '81'")} style={{ backgroundColor: filter === "county_id = '81'" ? 'yellow' : 'transparent' }} className="dropdown-item">Sheridan</button>
    <button onClick={() => setFilter("county_id = '82'")} style={{ backgroundColor: filter === "county_id = '82'" ? 'yellow' : 'transparent' }} className="dropdown-item">Sherman</button>
    <button onClick={() => setFilter("county_id = '83'")} style={{ backgroundColor: filter === "county_id = '83'" ? 'yellow' : 'transparent' }} className="dropdown-item">Sioux</button>
    <button onClick={() => setFilter("county_id = '84'")} style={{ backgroundColor: filter === "county_id = '84'" ? 'yellow' : 'transparent' }} className="dropdown-item">Stanton</button>
    <button onClick={() => setFilter("county_id = '85'")} style={{ backgroundColor: filter === "county_id = '85'" ? 'yellow' : 'transparent' }} className="dropdown-item">Thayer</button>
    <button onClick={() => setFilter("county_id = '86'")} style={{ backgroundColor: filter === "county_id = '86'" ? 'yellow' : 'transparent' }} className="dropdown-item">Thomas</button>
    <button onClick={() => setFilter("county_id = '87'")} style={{ backgroundColor: filter === "county_id = '87'" ? 'yellow' : 'transparent' }} className="dropdown-item">Thurston</button>
    <button onClick={() => setFilter("county_id = '88'")} style={{ backgroundColor: filter === "county_id = '88'" ? 'yellow' : 'transparent' }} className="dropdown-item">Valley</button>
    <button onClick={() => setFilter("county_id = '89'")} style={{ backgroundColor: filter === "county_id = '89'" ? 'yellow' : 'transparent' }} className="dropdown-item">Washington</button>
    <button onClick={() => setFilter("county_id = '90'")} style={{ backgroundColor: filter === "county_id = '90'" ? 'yellow' : 'transparent' }} className="dropdown-item">Wayne</button>
    <button onClick={() => setFilter("county_id = '91'")} style={{ backgroundColor: filter === "county_id = '91'" ? 'yellow' : 'transparent' }} className="dropdown-item">Webster</button>
    <button onClick={() => setFilter("county_id = '92'")} style={{ backgroundColor: filter === "county_id = '92'" ? 'yellow' : 'transparent' }} className="dropdown-item">Wheeler</button>
    <button onClick={() => setFilter("county_id = '93'")} style={{ backgroundColor: filter === "county_id = '93'" ? 'yellow' : 'transparent' }} className="dropdown-item">York</button></div>

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

                    <div style={{ flex: 30, textAlign: 'center' }}>
                        <div>
                            <button onClick={() => {setSortDropdownVisibility(!isSortDropdownVisible); setSort("undefined");}} className="btn btn-primary">Sort Wells</button>
                            {isSortDropdownVisible && (
                                <div style={{
                                    border: '1px solid #ccc',
                                    marginTop: '10px',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                    boxSizing: 'border-box'
                                }}>
                                    <button onClick={() => setSort("undefined")} style={{ backgroundColor: sort === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Sort</button>
                                    <button onClick={() => setSort("well_id")} style={{ backgroundColor: sort === "well_id" ? 'yellow' : 'transparent' }} className="dropdown-item">Oldest-Newest</button>
                                    <button onClick={() => setSort("well_id DESC")} style={{ backgroundColor: sort === "well_id DESC" ? 'yellow' : 'transparent' }} className="dropdown-item">Newest-Oldest</button>
                                </div>
                            )}  
                            <button onClick={() => {setFilterDropdownVisibility(!isFilterDropdownVisible); setFilter("undefined");}} className="btn btn-primary">Filter By County</button>
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

                </div>
            );
        }

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <div style={{ flex: 30, textAlign: 'center' }}>
                <div>
                    <button onClick={() => {setSortDropdownVisibility(!isSortDropdownVisible); setSort("undefined");}} className="btn btn-primary">Sort Wells</button>
                    {isSortDropdownVisible && (
                        <div style={{
                            border: '1px solid #ccc',
                            marginTop: '10px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            boxSizing: 'border-box'
                        }}>
                            <button onClick={() => setSort("undefined")} style={{ backgroundColor: sort === "undefined" ? 'yellow' : 'transparent' }} className="dropdown-item">Clear Sort</button>
                            <button onClick={() => setSort("well_id")} style={{ backgroundColor: sort === "well_id" ? 'yellow' : 'transparent' }} className="dropdown-item">Oldest-Newest</button>
                            <button onClick={() => setSort("well_id DESC")} style={{ backgroundColor: sort === "well_id DESC" ? 'yellow' : 'transparent' }} className="dropdown-item">Newest-Oldest</button>
                        </div>
                    )}  
                    <button onClick={() => {setFilterDropdownVisibility(!isFilterDropdownVisible); setFilter("undefined");}} className="btn btn-primary">Filter By County</button>
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

        </div>
    );
}