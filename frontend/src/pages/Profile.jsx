// components/UserProfile.js
import React,{useContext, useEffect, useState} from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import '../styles/profile.css'
import userImg from '../assets/images/user1.png'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from './../utils/config';
import axios from 'axios'; // Import axios
import { FaTrash } from 'react-icons/fa';

const UserProfile = () => {
  const {user} = useContext(AuthContext);
  const [balance, setbalance] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [busbookings, setBusBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/booking/user/book?userId=${user.data._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 200) {
          setBookings(res.data.data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchBusBookings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/busbooking/user/book?userId=${user.data._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.status === 200) {
          setBusBookings(res.data.data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBusBookings();
  }, []);


  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
    try {
      const res = await axios.delete(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 200) {
        // Remove the canceled booking from the state
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error canceling booking:', error.message);
    }
  }
  };

  const handleCancelBusBooking = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
    try {
      const res = await axios.delete(`${BASE_URL}/busbooking/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 200) {
        // Remove the canceled booking from the state
        setBusBookings(busbookings.filter((booking) => booking._id !== bookingId));
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error canceling booking:', error.message);
    }
  }
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/wallet/balance?userId=${user.data._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 200) {
          setbalance(res.data.data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchWallet();
  }, []);



  return (
    <div className="profile-container">
    <div className="left-container">
      <img src={userImg} alt="" />
              <p>Name: {user.data.username}</p>
              <p>Email: {user.data.email}</p>
              <p>Phone: {user.data.phone}</p>
              <p>Wallet: {balance}</p>      
    </div>
    <div className="right-container">
      <div className="top-right-container">
      <div className="top-right-container">
          <h2>Tour Bookings</h2>
          <Row>
            <Col><strong>Tour Name</strong></Col>
            <Col><strong>Guest Size</strong></Col>
            <Col><strong>Booked At</strong></Col>
            <Col><strong>Cancel</strong></Col>
          </Row>
          {bookings.length > 0 ? (
          bookings.map((bookings) => (
            <Row key={bookings._id}>
              <Col>{bookings.tourName}</Col>
              <Col>{bookings.guestSize}</Col>
              <Col>{new Date(bookings.bookAt).toLocaleDateString()}</Col>
              <Col>
                <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleCancelBooking(bookings._id)} />
              </Col>
            </Row>
          ))
        ):(<h4>No Bookings</h4>)}
        </div>
      </div>
      <div className="bottom-right-container">
      <h2>Bus Bookings</h2>
          <Row>
            <Col><strong>Name</strong></Col>
            <Col><strong>Phone</strong></Col>
            <Col><strong>Seats</strong></Col>
            <Col><strong>Booked At</strong></Col>
            <Col><strong>Cancel</strong></Col>
          </Row>
          {busbookings.length > 0 ? (
          busbookings.map((busbookings) => (
            <Row key={busbookings._id}>
              <Col>{busbookings.fullName}</Col>
              <Col>{busbookings.phone}</Col>
              <Col>{busbookings.seatsBooked.join(', ')}</Col>
              <Col>{new Date(busbookings.createdAt).toLocaleDateString()}</Col>
              <Col>
                <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleCancelBusBooking(busbookings._id)} />
              </Col>
            </Row>
          ))
        ):(<h4>No Bookings</h4>)}
      </div>
    </div>
  </div>
  );
};

export default UserProfile;

