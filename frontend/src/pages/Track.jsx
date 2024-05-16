import React, { useState, useEffect } from 'react';
import { Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import Newsletter from '../shared/Newsletter';
import MapGL, { Marker, Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


const TOKEN = "pk.eyJ1IjoiYWZ0YWItdWRkaW4iLCJhIjoiY2x0NGd2MGwyMDJ4YjJpbW5kZGxyenRrbiJ9.-YGcy6Zaop8TkR-1Wb3tLA";
const code = 'y';

const Track = () => {

    const [viewport, setViewPort] = useState({
        longitude: 73.06636,
        latitude: 33.692748,
        zoom: 3.05,
    });

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { longitude, latitude } = position.coords;
                setViewPort((prevViewport) => ({
                    ...prevViewport,
                    longitude,
                    latitude,
                    zoom: 15, // Optionally, adjust the zoom level as needed
                }));
            },
            (error) => console.error('Error getting the location:', error),
            {
                enableHighAccuracy: true,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []); // Run this effect only once on component mount

    const [manualLocation, setManualLocation] = useState({
        longitude: '',
        latitude: '',
    });

/*    const handleManualLocationSubmit = (e) => {
        e.preventDefault();
        const { longitude, latitude } = manualLocation;
        if (code !== 'y') {
            alert('Incorrect code, try again');
        } else {
            setViewPort((prevViewport) => ({
                ...prevViewport,
                longitude: parseFloat(longitude),
                latitude: parseFloat(latitude),
                zoom: 15, // Optionally, adjust the zoom level as needed
            }));
        }
    };*/

    const busStations = [
        { name: "Karachi", longitude: 67.0011, latitude: 24.8607 },
        { name: "Islamabad", longitude: 73.0479, latitude: 33.6844 },
        { name: "Lahore", longitude: 74.3587, latitude: 31.5204 },
        { name: "Chitral", longitude: 71.7483, latitude: 35.8508 },
        { name: "Hunza", longitude: 74.5103, latitude: 36.3167 }
    ];

    const routeCoordinates = busStations.map(station => [station.longitude, station.latitude]);

    return (
        <>
            <CommonSection title={"Always be Updated"} />
{/*            <section>
                <Container>
                    <Row>
                        <Form onSubmit={handleManualLocationSubmit}>
                            <FormGroup>
                                <Label for="code">Enter Code:</Label>
                                <Input
                                    type="string"
                                    id="code"
                                    name="code"
                                    value={manualLocation.code}
                                    onChange={(e) => setManualLocation({ ...manualLocation, code: e.target.value })}
                                    placeholder="Enter Code"
                                />
                            </FormGroup>
                            <Button className='flex' type="submit">Locate</Button>
                        </Form>
                    </Row>
                </Container>
            </section>*/}

            <MapGL
                mapboxAccessToken={TOKEN}
                initialViewState={viewport}
                style={{ width: 1798, height: 600 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onViewportChange={(viewport) => setViewPort(viewport)}// Update viewport on map interaction
            >
                {/* Render bus station markers */}
                {busStations.map(station => (
                    <Marker
                        key={station.name}
                        longitude={station.longitude}
                        latitude={station.latitude}
                        offsetTop={-20}
                        offsetLeft={-10}
                    >
                        <div style={{ color: 'blue', fontSize: '20px' }}>🚌</div>
                    </Marker>
                ))}

                {/* Render user's marker */}
                <Marker
                    longitude={viewport.longitude}
                    latitude={viewport.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                >
                    <div style={{ color: 'red', fontSize: '20px' }}>📍</div>
                </Marker>

                {/* Highlight route between bus stations */}
                <Source type="geojson" data={{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: routeCoordinates,
                    },
                }}>
                    <Layer
                        type="line"
                        paint={{
                            'line-color': '#007bff',
                            'line-width': 2,
                        }}
                    />
                </Source>
            </MapGL>
            <Newsletter />
        </>
    );
}

export default Track;
