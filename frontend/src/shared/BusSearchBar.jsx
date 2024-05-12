import React, { useState } from 'react';
import { Col, Form, FormGroup, Input, Label,Button } from 'reactstrap';

const BusSearchBar = ({ onSearch,setIsSearching,isSearching }) => {
    const [price, setPrice] = useState('');
    const [destination, setDestination] = useState('');
    const [source, setSource] = useState('');
    const [distance, setDistance] = useState('');
    const [priceOption, setPriceOption] = useState('<=');
    const [distanceOption, setDistanceOption] = useState('<=');

    const searchHandler = () => {
        if (!source && !destination) {
            //alert('Please enter both source and destination to search.');
            //return;
        } else if (!source) {
            alert('Please enter a source location.');
            return;
        } else if (!destination) {
            alert('Please enter a destination location.');
            return;
        }

        let queryString = [];
        if (price) queryString.push(`price${priceOption}=${price}`);
        if (destination) queryString.push(`drop_address=${destination}`);
        if (source) queryString.push(`source_address=${source}`);
        if (distance) queryString.push(`distance${distanceOption}=${distance}`);

        if (queryString.length > 0) {
            onSearch(queryString.join('&'));
        } else {
            alert('Please provide at least one search parameter.');
        }
    };
    const resetSearch = () => {
        // Reset all state variables
            setPrice('');
        setDestination('');
        setSource('');
        setDistance('');
        setPriceOption('<=');
        setDistanceOption('<=');
        onSearch(null); 
        setIsSearching(false); // Optionally reset the search on the parent component
    };

    return (
        <Col lg='12'>
            <div className='search_bar'>
                <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form_group">
                        <span><i className="ri-money-dollar-circle-line"></i></span>
                        <div>
                            <Label for="priceInput">Price</Label>
                            <Input type="number" id="priceInput" placeholder='Enter price'
                                   value={price} onChange={(e) => setPrice(e.target.value)} />
                            <select value={priceOption} onChange={(e) => setPriceOption(e.target.value)}>
                                <option value="<=">Less than or equal</option>
                                <option value=">=">Greater than or equal</option>
                            </select>
                        </div>
                    </FormGroup>

                    <FormGroup className="d-flex gap-3 form_group">
                        <span><i className="ri-map-pin-line"></i></span>
                        <div>
                            <Label for="sourceInput">Source</Label>
                            <Input type="text" id="sourceInput" placeholder='Enter source'
                                   value={source} onChange={(e) => setSource(e.target.value)} />
                        </div>
                    </FormGroup>

                    <FormGroup className="d-flex gap-3 form_group">
                        <span><i className="ri-map-pin-time-line"></i></span>
                        <div>
                            <Label for="destinationInput">Destination</Label>
                            <Input type="text" id="destinationInput" placeholder='Enter destination'
                                   value={destination} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                    </FormGroup>

                    <FormGroup className="d-flex gap-3 form_group">
                        <span><i className="ri-roadster-line"></i></span>
                        <div>
                            <Label for="distanceInput">Distance</Label>
                            <Input type="number" id="distanceInput" placeholder='Enter distance'
                                   value={distance} onChange={(e) => setDistance(e.target.value)} />
                            <select value={distanceOption} onChange={(e) => setDistanceOption(e.target.value)}>
                                <option value="<=">Less than or equal</option>
                                <option value=">=">Greater than or equal</option>
                            </select>
                        </div>
                    </FormGroup>

                    <span className="search_icon" onClick={searchHandler}>
                        <i className="ri-search-line"></i>
                    </span>{isSearching&&<Button color="secondary" onClick={resetSearch}>Clear</Button>
                        
                    }
                    
                </Form>
            </div>
        </Col>
    );
};

export default BusSearchBar;
