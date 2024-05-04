import React from 'react'
import CommonSection from '../shared/CommonSection'

import '../styles/booking.css';
import Newsletter from './../shared/Newsletter';
import { Container, Row } from 'reactstrap';

const booking = () => {
  return (
    <>
    <CommonSection title={"My Booking's"}/>
      <section className='bookingSection'>
        <Container className='tourBookings'>
          <Row>
            <div className='title'>tour booking</div>
            <div className='heading'>
              <div>Name</div>
              <div>Date</div>
              <div>price</div>
              <div>Phone</div>
              <div>Cancel</div>
            </div>
            <div className='results'>tour booking</div>
            
          </Row>
        </Container>
        <Container className='busBookings'>
          <Row>
            <div className='title'>bus booking</div><div className='heading'>
              <div>Name</div>
              <div>Date</div>
              <div>price</div>
              <div>Phone</div>
              <div>Cancel</div>
            </div>
            <div className='results'>bus booking</div>
            
          </Row>
        </Container>
      </section>
      <Newsletter /> 
      
    </>
  );
};

export default booking