import React, {useEffect, useRef, useState, useContext} from 'react'
import '../styles/vendor.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import VendorForm from '../components/Booking/VendorForm'
import Newsletter from '../shared/Newsletter'
import useFetch from './../hooks/useFetch'
import { BASE_URL } from './../utils/config'
import {AuthContext} from './../context/AuthContext'
import heroImg from '../assets/images/vendor.jpg'

const Vendor = () => {
  return (
    <section>
        <Row className='p-3'>
        <Col lg='7' className='p-2'>
        <Container>
          <div className="hero_content">
            <h1>Now 
            <span className='highlight'> Earn </span>
             at your DoorStep
            </h1>
            <p>
            Service providers, ready to grow your business? 
            Join our platform and connect with travelers worldwide. 
            Showcase your offerings, manage bookings effortlessly, 
            and earn more. Join us now and expand your opportunities!"
            </p>
          </div>
          <div className="hero_subtitle d-flex align-items-center">
              <img src={heroImg} />
            </div>
            </Container>
        </Col>

        <Col lg='4'>
          <div>
            <VendorForm/>
          </div>
        </Col>
        </Row>
        <Newsletter/>
    </section>
    
  )

};

export default Vendor