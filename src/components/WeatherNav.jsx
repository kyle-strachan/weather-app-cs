import CitySearch from "./CitySearch";
import ToggleUnits from "./ToggleUnits";
import ToggleSearch from "./ToggleSearch";
import { useTheme } from "../context/AppContext.jsx";
import { CSSTransition } from "react-transition-group";
import { useRef, useState, useEffect } from "react";
import './WeatherNav.css'


export default function WeatherNav() {

    const { showSearch } = useTheme();
    const nodeRef = useRef(null);
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <div className="nav">
            <div className="nav-flex">
                <div className="nav-brand">
                    <div className="nav-logo">Currents</div>
                    <div className="logo"><img src="/brand/wind-icon-white-100-transparent.png" alt="Wind Logo" height="35px" width="35px" /></div>
                </div>
                <div className="nav-controls">
                    <ToggleUnits />
                    <ToggleSearch />
                </div>
            </div>
            <div className="city-search-full-width">
                <CSSTransition
                    in={hasMounted && showSearch === "true"}
                    timeout={1000}
                    classNames="slide"
                    unmountOnExit
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef}>
                        <CitySearch />
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
}
