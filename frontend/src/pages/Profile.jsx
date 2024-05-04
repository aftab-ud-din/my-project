// components/UserProfile.js
import React,{useContext, useEffect, useState} from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import '../styles/profile.css'
import userImg from '../assets/images/user1.png'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from './../utils/config' 

const UserProfile = () => {
  const {user} = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/bookings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBookings();
  }, [user.token]);

  return (
    <section className='profileSeciton'>
      <Container >
      <Row>
        {/* Left Column - User Info */}
        <Col lg={4}>
          <div className='info'>
            <div className='divOne'>
        {/* Display other user information */}
              <div className="ImgDiv mb-4">
                <img src={userImg} alt="" />
              </div>
              <p>Name: {user.data.username}</p>
              <p>Email: {user.data.email}</p>
              <p>Phone: {user.data.phone}</p>
              <p>Wallet: {user.data.wallet}</p>
            </div>
          </div>
        </Col>

        {/* Right Column - Booking Sections */}
        <Col lg={8}>
          <Row>
            {/* First Row - Tour Booking */}
            <Col lg={6}>
              <div className='tourBookings'>
                <Row>
                  <div className='title'>tour booking</div>
                  <div className='heading'>
                    <div>Name</div>
                    <div>Date</div>
                    <div>price</div>
                    <div>Phone</div>
                    <div>Cancel</div>
                  </div>
                  <div className='results'>
                  {bookings.map((booking) => (
                  <div key={booking._id} className='results'>
                    <div>{booking.name}</div>
                    <div>{booking.date}</div>
                    <div>{booking.price}</div>
                    <div>{booking.phone}</div>
                    <Button className='primary-btn'>Cancel</Button>
                  </div>
                ))}
                  </div>   
                </Row>

             </div>
            

            {/* Second Row - Bus Booking */}
              <div className='busBookings'>
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
             </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default UserProfile;




