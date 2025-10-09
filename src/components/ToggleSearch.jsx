import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { useTheme } from "../context/AppContext.jsx"

export default function ToggleSearch() {
    const { showSearch, toggleSearch } = useTheme();

    return (
        <button className='nav-control' onClick={toggleSearch}>{showSearch === "true" ? <SearchOffIcon fontSize="large" /> : <SearchIcon fontSize="large" />}</button>
    )
}