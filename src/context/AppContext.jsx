import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    // Unit controls
    const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");
    function toggleUnit() {
        setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    };
    useEffect(() => {
        localStorage.setItem("unit", unit);
    }, [unit])


    // Display and toggle search box
    const [showSearch, setShowSearch] = useState(localStorage.getItem("showSearch") || "true");
    function toggleSearch() {
        setShowSearch((prevSearch) => (prevSearch) === "true" ? "false" : "true");
    };
    useEffect(() => {
        localStorage.setItem("showSearch", showSearch)
    }, [showSearch]);


    // Store selected location and resume last known search. Defaults to my hometown
    const [selectedCity, setSelectedCity] = useState(() => {
        const previouslySavedCity = localStorage.getItem("selectedCity");
        return previouslySavedCity ? JSON.parse(previouslySavedCity) : {
            name: "Linlithgow",
            state: "Scotland",
            country: "GB",
            lat: 55.977167,
            lon: -3.6006234
        };
    });
    useEffect(() => {
        localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    }, [selectedCity]);


    return (
        <AppContext.Provider value={{ unit, toggleUnit, showSearch, toggleSearch, selectedCity, setSelectedCity, setShowSearch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useTheme = () => useContext(AppContext);
