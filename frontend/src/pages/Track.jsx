import {React,useState,useEffect} from 'react';
import { Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import CommonSection from '../shared/CommonSection';
import BusSearchBar from '../shared/BusSearchBar';
import Newsletter from '../shared/Newsletter';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN="pk.eyJ1IjoiYWZ0YWItdWRkaW4iLCJhIjoiY2x0NGd2MGwyMDJ4YjJpbW5kZGxyenRrbiJ9.-YGcy6Zaop8TkR-1Wb3tLA";
const code = 'y';

const Track = () => {

    const [newplace, setNewPlace] = useState(null)
    const[viewport, setViewPort] = useState({
        longitude: 73.06636, 
        latitude: 33.692748,
        zoom: 10.05,
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

    const handleManualLocationSubmit = (e) => {
        e.preventDefault();
        const { longitude, latitude } = manualLocation;
        if(code != 'y')
        {alert('Incorrect code, try again')} 
        else       
        {
        setViewPort((prevViewport) => ({
            ...prevViewport,
            longitude: parseFloat(longitude),
            latitude: parseFloat(latitude),
            zoom: 15, // Optionally, adjust the zoom level as needed
        }));
    }
    };

    return (
        <>
        <CommonSection title={"Always be Updated"}/>
         <section>
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
          </section>

                <MapGL
                    mapboxAccessToken={TOKEN}
                    initialViewState={viewport}
                    style={{width: 1798, height: 600}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    onViewportChange={(viewport) => setViewPort(viewport)}// Update viewport on map interaction
                    >
                     <Marker
                        longitude={viewport.longitude}
                        latitude={viewport.latitude}
                        offsetTop={-20}
                        offsetLeft={-10}
                    >
                        <div style={{ color: 'red', fontSize: '20px' }}>📍</div>
                    </Marker>
                </MapGL>     
          <Newsletter /> 
        </>
      );
}

export default Track
