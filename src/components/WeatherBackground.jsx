import React from "react";

export default function WeatherBackground() {
    return (
        <div
            style={{
                // width: "400px",
                height: "200px",
                backgroundImage: "url('/images/light-rain.jpg')",
                backgroundSize: "cover",       // optional, makes it scale nicely
                backgroundPosition: "center",  // optional, centers the image
            }}>
        </div>
    );
}
