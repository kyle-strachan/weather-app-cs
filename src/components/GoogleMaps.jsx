import { useTheme } from "../context/AppContext.jsx";

export default function GoogleMaps() {
    const { selectedCity } = useTheme();
    return (
        <iframe
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}&center=${selectedCity.lat},${selectedCity.lon}&zoom=11&maptype=satellite`}

        ></iframe>
    )
}