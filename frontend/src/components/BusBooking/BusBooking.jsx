import React, {useState, useContext} from 'react'
import './bus-booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button} from "reactstrap";

import SeatSelection from '../../shared/SeatSelection';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const BusBooking = ({ bus, avgRating }) => {

    const {scheduledAt, pick_up_time, price, id, reviews} = bus;
    const navigate =useNavigate();

    const {user} = useContext(AuthContext);

    const [busbooking, setBusBooking] = useState({
        userId: user && user.data._id,
        userEmail:user && user.data.email,
        busId:id,
        fullName:'',
        phone:'',
        seatsBooked:[],
        bootAt:'',
    });

    const [selectedSeats, setSelectedSeats] = useState(null);

 //   const handleSeatSelectionChange = (selectedSeats) => {
 //       setSelectedSeats(selectedSeats);
 //   };
    

    
    const showDate = scheduledAt.substring(0, 10);
 //   console.log("date : ",showDate);

    const handleChange = e =>{
        setBusBooking(prev=>({...prev, [e.target.id]: e.target.value }));
    };

    const serviceFee = 10;
    console.log("selectedSeats = ",selectedSeats);
   //console.log("selected length = ",selectedSeats.length);
   const totalAmount = Number(price) * 4 + Number(serviceFee);

    const handleClick = async e=>{
        e.preventDefault();

        console.log(busbooking);

        try {
            if(!user || user === undefined || user===null){
                return alert('please sign in')
            }

            const res = await fetch(`${BASE_URL}/busbooking`,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(busbooking)
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
        <h3>
            {price}<span>Rs /per person</span>
        </h3>
        <span className='bus_rating d-flex align-items-center'>
            <i class="ri-star-fill"></i> 
            {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
    </div>

    {/*=====================Booking form========================*/}
    <div className="booking_form">
        <h5>Information</h5>
        <Form className='booking_info-form' onSubmit={handleClick}>
            <FormGroup>
                <input type="text" placeholder='Full Name' id='fullName'
                required onChange={handleChange} />
            </FormGroup>
            
            <FormGroup>
                <input type="Number" placeholder='Phone' id='phone'
                required onChange={handleChange} />
            </FormGroup>

            <div className='time_info d-flex align-items-end gap-5'>
                <span>
                    <i class="ri-calendar-todo-fill"> {showDate}</i>
                </span>
                <span>
                <i class="ri-time-line"> {pick_up_time}</i>
                </span>
            </div>
        </Form>
    </div>
    {/*=====================seat selecton========================*/}
    <SeatSelection />
    {/*=====================seat selecton========================*/}
    {/*=====================Booking Bottom========================*/}
        <div className="booking_bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>
                        {price} <i class="ri-close-line"></i> Rs 1 person
                    </h5>
                    <span> {price} Rs</span>
                </ListGroupItem>

                <ListGroupItem className='border-0 px-0'>
                    <h5>Service Charges</h5>
                    <span> {serviceFee} Rs</span>
                </ListGroupItem>

                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span> {totalAmount} Rs</span>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary_btn w-100 mt-4' 
            onClick={handleClick}>Book Now</Button>
        </div>
    {/*=====================Booking Bottom========================*/}
  </div>
}

export default BusBooking