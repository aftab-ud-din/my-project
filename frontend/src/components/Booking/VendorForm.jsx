import React,{useState, useContext} from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button} from "reactstrap";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';


const VendorForm = () => {

    const navigate =useNavigate();

    const {user} = useContext(AuthContext);

    const [vendor, setVendor] =useState({
        userId: user && user.data ? user.data._id : null,
        fullName:'',
        phone: null,
        license: null,
    });
    
console.log(vendor);
const {dispatch} = useContext(AuthContext);
    const handleChange = e =>{
        setVendor(prev=>({...prev, [e.target.id]: e.target.value }));
    };
    
    const handleClick = async e=>{
        e.preventDefault();

        console.log(vendor);

        try {
            if(!user || user === undefined || user===null){
                return alert('please sign in')
            }
            //dispatch({type:"LOGIN_START"});
            const res = await fetch(`${BASE_URL}/vendors`,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(vendor)
            })
            
            const result = await res.json();

            if(!res.ok) {
                
                
                return alert(result.message)
            }else{
                
            }
            dispatch({type:"LOGIN_SUCCESS", payload:result});
            navigate("/vendor-tour");

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
        <h5>Regiter your Information</h5>
        <Form className='booking_info-form' onSubmit={handleClick}>
            <FormGroup>
                <input type="text" placeholder='Full Name' id='fullName'
                required onChange={handleChange} />
             </FormGroup>

             <FormGroup>   
                <input type="number" placeholder='Phone' id='phone'
                required onChange={handleChange} />
            </FormGroup>
            
            
            <FormGroup >
                <input type="number" placeholder='Driver License' id='license'
                required onChange={handleChange} />
            </FormGroup>
        </Form>
    </div>
    {/*=====================Booking Bottom========================*/}
        <div className="booking_bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>
                     be the change
                    </h5>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary_btn w-100 mt-4' 
            onClick={handleClick}>Register Now</Button>
        </div>
    {/*=====================Booking Bottom========================*/}
  </div>
}

export default VendorForm