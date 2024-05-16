import React,{useState, useContext} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button} from "reactstrap";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';
import FileBase64 from 'react-file-base64';

const TourForm = ({vendor}) => {

    const navigate =useNavigate();

    const {user} = useContext(AuthContext);

    const [tour, setTour] =useState({
        title:'',
        city:'',
        address:'',
        distance:null,
        desc:'',
        price:null,
        photo:'',
        maxGroupSize:'',
        vendorId: user && user.data._id,
    });
console.log(tour);
   
    const handleChange = e =>{
        setTour(prev=>({...prev, [e.target.id]: e.target.value }));
    };

    const handleFileUpload = async (e) => {
        <FileBase64
        multiple={ false }
        onDone={ ({base64}) =>setTour(prev => ({...
            prev, photo: e.target.value})) } />
    }

    const handleClick = async e=>{
        e.preventDefault();

        try {
            if(!user || user === undefined || user===null){
                return alert('please sign in')
            }

            const res = await fetch(`${BASE_URL}/tours`,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(tour)
            })

            const result = await res.json();
            if(!res.ok) {
                return alert(result.message)
            }

            navigate("/thank-you");

        } catch(err) {
            alert(err.message)
        };
    };

  return <div className="booking">
    <div className="booking_top d-flex align-items-center
     justify-content-between">
    </div>

    {/*=====================Booking form========================*/}
    <div className="booking_form">
        <h5>Creat your Tour</h5>
        <Form className='booking_info-form' onSubmit={handleClick}>
            
            <FormGroup className='d-flex align-items-center gap-3'>
                <input type="text" placeholder='Title' id='title'
                required onChange={handleChange} />
                <input type="text" placeholder='City' id='city'
                required onChange={handleChange} />
            </FormGroup>

            <FormGroup className='d-flex align-items-center gap-3'>
                <input type="number" placeholder='Price' id='price'
                required onChange={handleChange} />
                <input type="number" placeholder='Max Group Size' id='maxGroupSize'
                required onChange={handleChange} />
            </FormGroup>

            <FormGroup className='d-flex align-items-center gap-3'>
                <input type="text" placeholder='Tour Distance ' id='distance'
                required onChange={handleChange} />
                <input type="text" placeholder='Pickup Spot' id='address'
                required onChange={handleChange} />
            </FormGroup>

            <FormGroup>
                <input type="text" placeholder='Tour Discription' id='desc'
                required onChange={handleChange} />
            </FormGroup>

            <FormGroup>
                <input type="file" placeholder='Vehicle Image' id='photo'
                accept='.jpeg, .png, .jpg'
                onChange={handleFileUpload} />
            </FormGroup>



        </Form>
    </div>
    {/*=====================Booking Bottom========================*/}
        <div className="booking_bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>
                     Service Charges will be applied
                    </h5>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary_btn w-100 mt-4' 
            onClick={handleClick}>Register Now</Button>
        </div>
    {/*=====================Booking Bottom========================*/}
  </div>
}

export default TourForm
