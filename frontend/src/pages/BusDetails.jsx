import React, {useEffect, useRef, useState, useContext} from 'react'
import '../styles/bus-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'

import calculatingAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Newsletter from '../shared/Newsletter'
import BusBooking from '../components/BusBooking/BusBooking'
import axios from 'axios'
import { BASE_URL } from './../utils/config'
import {AuthContext} from './../context/AuthContext'
import temImg from './../assets/images/login1.png'

const BusDetails = () => {
  
  const {id} = useParams();
  const revieweMsgRef = useRef('');
  const[busRating, setBusRating]=useState(null);
  const {user} = useContext(AuthContext);
  const [loading , setLoading]=useState(true)
  const [bus , setBus]=useState([])


useEffect(()=>{

axios.get(`${BASE_URL}/buses/${id}`)
 .then(res=>{
  setBus(res.data.data)
   setLoading(false)  
 }).catch(err=>{
  console.log(err)
 })
},[])
  

  // destructure properties from bus object
  const {
    title, 
    desc, 
    price, 
    pickup_address, 
    drop_address,
    reviews
  } = bus;

  const {totalRating, avgRating} = calculatingAvgRating(reviews);

  const options = {day : "numeric", month : "long", year: "numeric"};

  //submit request to the server  
  const submitHandler = async e=>{
    e.preventDefault()
    const reviewText = revieweMsgRef.current.value;

      try{

        if(!user || user===undefined || user === null){
          alert('Please sign in');
        }

        const reviewObj = {
          username:user?.data?.username,
          reviewText,
          rating:busRating
        }

        const res = await fetch(`${BASE_URL}/busreview/${id}`,{
          method:'post',
          headers:{
            'content-type':'application/json'
          },
          credentials:'include',
          body:JSON.stringify(reviewObj)
        })

        const result = await res.json();
        if(!res.ok) {
          console.log(reviewObj);
          return alert(result.message);
        }

        alert(result.message);
      } catch(err) {
        alert(err.message);
      }
    };




  return <>
    <section>
      <Container>
      {
          loading && <h4 className='text-center pt-5'>Loading...........</h4>
        }
        {
          <h4 className='text-center pt-5'></h4>
        }
        {
          !loading && 
        <Row>
          <Col lg='8'>
            <div className="bus_content">
              <img src={temImg} alt="" />

              <div className="bus_info">
                <h2>{title}</h2>
                <div className='d-flex align-items-center gap-5'>
                  <span className='bus_rating d-flex align-items-center gap-1'>
                  <i className="ri-star-fill" style={{color :'var(--secondary-color)'}}></i> 
                  {avgRating === 0 ? null : avgRating}
                  {totalRating === 0 ? (
                      "Not rated"
                      ) : (
                  <span>({reviews?.length})</span>
                  )}
                  </span>

                  <span>
                  <i className="ri-map-pin-user-fill"></i>
                  {title}
                  </span>
                </div>

                <div className="bus_extra-details">
                      <span><i className="ri-map-pin-2-fill"></i>{pickup_address}</span>
                      <span><i className="ri-map-pin-2-fill"></i>{drop_address}</span>
                      <span><i className="ri-money-dollar-circle-line"></i>{price} rs /per seat</span>
                </div>

                <h5>Description</h5>
                <p>{desc}</p>
              </div>

              {/*===============bus reviews section start==============*/}
              <div className="bus_reviews mt-4">
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className='d-flex align-items-center gap-3 mb-4
                  rating_group'>
                    <span onClick={()=> setBusRating(1)}>
                      1 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setBusRating(2)}>
                      2 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setBusRating(3)}>
                      3 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setBusRating(4)}>
                      4 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setBusRating(5)}>
                      5 <i className="ri-star-s-fill"></i>
                    </span>
                  </div>

                  <div className="review_input">
                    <input type="text" 
                      ref={revieweMsgRef}
                      placeholder='share your thoughts' 
                      required
                    />
                    <button className='btn primary_btn text-white' type='submit'>
                      Submit
                    </button>
                  </div>
                </Form>

                <ListGroup className='user_reviews'>
                  {
                    reviews?.map(busreview=>(
                      <div className="review_item">
                        <img src={avatar} alt="" />

                        <div className="w-100">
                          <div className="d-flex align-items-center 
                          justify-content-between">
                            <div>
                            <h5>{busreview.username}</h5>
                            <p>
                            {new Date(busreview.createdAt
                              ).toLocaleDateString("en-US",options)}
                            </p>
                            </div>
                              <span className="d-flex align-items-center">
                                5<i className="ri-star-s-fill"></i>
                              </span>
                              </div>  
                              <h6>{busreview.reviewText}</h6>
                        </div>
                      </div>
                    ))
                  }
                </ListGroup>
              </div>
              {/*===============bus reviews section end==============*/}
            </div>
          </Col>

          <Col lg='4'>
            <BusBooking bus ={bus} avgRating={avgRating} />

          </Col>
        </Row>
        }
      </Container>
    </section>
    <Newsletter />
  </>
};

export default BusDetails