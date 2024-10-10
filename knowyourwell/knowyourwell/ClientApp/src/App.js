import { Routes, Route } from "react-router-dom";
import React from "react";
import "./components/css/custom.css";
import "./components/css/style.css";
import Axios from "axios";
import Login from "./components/login";
import NavMenu from "./components/navmenu";
import Well from "./components/well";
import EditWell from "./components/editwell";
import WellInfo from "./components/wellinfo";
import Field from "./components/field";
import ClassLab from "./components/classlab";
import PreviousEntries from "./components/previousentries";
import AboutProject from "./components/aboutproject";
import ViewField from "./components/viewfield";
import ViewClassLab from "./components/viewclasslab";
import ViewWell from "./components/viewwell";
import FieldSelection from "./components/fieldselection";
import FormSubmission from "./components/formsubmission";
import WellFieldLabContext from "./components/reusable/WellFieldLabContext";
import { useState, useEffect } from "react";
import { openDB } from 'idb';

function createLocalDB() {
  openDB('localDB', 1, {
    upgrade(db) {
      db.createObjectStore('tooltips');
    }
  });
}

export async function putInDB(database, objectStore, key, value) {
  // Using put() rather than add() means that existing values will be overwritten

  const db = await openDB(database);
  db.put(objectStore, value, key);
  db.close();
}

export async function getFromDB(database, objectStore, key) {
  const db = await openDB(database);
  const value = db.get(objectStore, key);
  db.close();
  return value;
}

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  createLocalDB();
  // TODO: Remove next line and instead set default values from a file, to be overridden by what is on remote DB
  putInDB('localDB', 'tooltips', 'wellname', {text: 'Unique text for Well Name.'});

  const [fieldQueue, setFieldQueue] = useState(() => {
    const storedQueue = localStorage.getItem("fieldQueue");
    return storedQueue && storedQueue !== "undefined"
      ? JSON.parse(storedQueue)
      : [];
  });

  const setLocalFieldQueue = (newValue) => {
    setFieldQueue(newValue);
    localStorage.setItem("fieldQueue", JSON.stringify(newValue));
  };

  const [wellInfoQueue, setWellInfoQueue] = useState(() => {
    const storedQueue = localStorage.getItem("wellInfoQueue");
    return storedQueue && storedQueue !== "undefined"
      ? JSON.parse(storedQueue)
      : [];
  });

  const setLocalWellInfoQueue = (newValue) => {
    setWellInfoQueue(newValue);
    localStorage.setItem("wellInfoQueue", JSON.stringify(newValue));
  };

  const handleOnline = () => {
    setIsOnline(true);
    setWellInfoQueue(localStorage.getItem("wellInfoQueue"));
    wellInfoQueue?.forEach((wellInfo) => {
      console.log(wellInfo);
    });
    setFieldQueue(localStorage.getItem("fieldQueue"));
    fieldQueue?.forEach((field) => {
      Axios.post("/api/insert", {
        well_id: field.well_id,
        fa_latitude: field.fa_latitude,
        fa_longitude: field.fa_longitude,
        fa_genlatitude: field.fa_genlatitude,
        fa_genlongitude: field.fa_genlongitude,
        weather: field.conditions,
        wellcovercondition: field.wellcover,
        wellcoverdescription: field.wellcoverdescription,
        topography: field.topography,
        surfacerunoff: field.evidence,
        pooling: field.pooling,
        groundwatertemp: field.temp,
        ph: field.ph,
        conductivity: field.conductivity,
        name: field.name,
        observations: field.observations,
        datecollected: field.dateentered,
      }).then(() => {
        console.log("success");
      });
      setFieldQueue([]);
    });
    setFieldQueue([]);
    localStorage.setItem("fieldQueue", "");
    setWellInfoQueue([]);
    localStorage.setItem("wellInfoQueue", "");
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", () => setIsOnline(false));

  return (
    <>
      <NavMenu />
      <WellFieldLabContext.Provider
        value={{
          wellInfoQueue,
          setLocalWellInfoQueue,
          fieldQueue,
          setLocalFieldQueue,
        }}
      >
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/well" element={<Well />} />
          <Route exact path="/editwell" element={<EditWell />} />
          <Route exact path="/wellinfo" element={<WellInfo />} />
          <Route exact path="/field" element={<Field />} />
          <Route exact path="/classlab" element={<ClassLab />} />
          <Route exact path="/previousentries" element={<PreviousEntries />} />
          <Route exact path="/aboutproject" element={<AboutProject />} />
          <Route exact path="/viewfield" element={<ViewField />} />
          <Route exact path="/viewclasslab" element={<ViewClassLab />} />
          <Route exact path="/viewwell" element={<ViewWell />} />
          <Route exact path="/fieldselection" element={<FieldSelection />} />
          <Route exact path="/formsubmission" element={<FormSubmission />} />
        </Routes>
      </WellFieldLabContext.Provider>
    </>
  );
}

const CachedPreviousEntries = () => {
  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const getCachedData = async () => {
      const cache = await caches.open("previous-entries");
      const cachedResponse = await cache.match("/previousentries");

      if (cachedResponse) {
        const data = await cachedResponse.json();
        setCachedData(data);
      }
    };

    getCachedData();
  }, []);

  return (
    <div>
      <h2>Previous Entries (Cached)</h2>
      {cachedData && (
        <ul>
          {cachedData.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
