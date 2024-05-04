import React, {useRef} from 'react'
import './search-bar.css'
import { Col, Form, FormGroup } from "reactstrap";

import { BASE_URL } from './../utils/config.js';
import { useNavigate } from 'react-router-dom';


const BusSearchBar = () => {

    const priceRef = useRef('');
    const destinationRef = useRef('');
    const distanceRef = useRef('');
    const navigate = useNavigate();

    const searchHandler = async() => {

        const price = priceRef.current.value
        const destination = destinationRef.current.value
        const distance = distanceRef.current.value

       console.log("price= ",price)
        if(price ==='' || destination ==='' || distance ===''){
            return alert('All fields are required!')
        }

        if(price <= 0 || distance <= 0) {
            return alert("Incorrect inputs, try Again")
        }

        const res = await fetch(`${BASE_URL}/buses/search/getBusBySearch?
        price=${price}&drop_address=${destination}&distance=${distance}`);

        if(!res.ok) alert('Something went wrong');

        const result = await res.json();

        navigate(`/bus/search?price<=${price}&drop_address=${destination}&distance<=
        ${distance}`, 
        {state: result.data}
        );
    }


    return<Col lg='12'> 
    <div className='search_bar'>
        <Form className="d-flex align-items-center gap-4">
            
            <FormGroup className="d-flex gap-3 form_group form_group-fast">
                <span><i class="ri-map-pin-line"></i></span>
                <div>
                    <h6>Price</h6>
                    <input type="number" placeholder='Price?' ref={priceRef}/>
                </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form_group form_group-last">
                 <span><i class="ri-map-pin-time-line"></i></span>
                    <div>
                        <h6>Destination</h6>
                        <input type="text" placeholder='Destination' ref={destinationRef}/>
                    </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form_group form_group-fast">
                <span><i class="ri-group-line"></i></span>
                <div>
                    <h6>Distance</h6>
                        <input type="number" placeholder='Distance' ref={distanceRef} />
                    </div>
            </FormGroup>

            <span className="search_icon" type='submit' onClick={searchHandler} >
            <i class="ri-search-line"></i>
            </span>
        </Form>
    </div>
</Col>
};


export default BusSearchBar;