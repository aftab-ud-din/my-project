import React,{useContext, useEffect, useState} from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import '../styles/profile.css'
import userImg from '../assets/images/user1.png'
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from './../utils/config';
import axios from 'axios'; // Import axios
import { FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const {user} = useContext(AuthContext);
  const [Users, setUsers] = useState([]);
  const [Tours, setTours] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (res.status === 200) {
          setUsers(res.data.data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBusBookings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tours`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (res.status === 200) {
          setTours(res.data.data);
        } else {
          console.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBusBookings();
  }, []);


  const handleCancelBooking = async (UserId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this User?');
    if (confirmCancel) {
    try {
      const res = await axios.delete(`${BASE_URL}/users/${UserId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 200) {
        // Remove the canceled booking from the state
        setUsers(Users.filter((User) => User._id !== UserId));
      } else {
        console.error('Failed to cancel User');
      }
    } catch (error) {
      console.error('Error canceling User:', error.message);
    }
  }
  };

  const handleCancelBusBooking = async (tourId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmCancel) {
    try {
      const res = await axios.delete(`${BASE_URL}/tours/${tourId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status === 200) {
        // Remove the canceled booking from the state
        setTours(Tours.filter((tour) => tour._id !== tourId));
      } else {
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error canceling booking:', error.message);
    }
  }
  };


  return (
    <div className="profile-container">
    <div className="left-container">
      <img src={userImg} alt="" />
              <p>Name: {user.data.username}</p>
              <p>Email: {user.data.email}</p>     
    </div>
    <div className="right-container">
      <div className="top-right-container">
      <div className="top-right-container">
          <h2>User's</h2>
          <Row>
            <Col><strong>Name</strong></Col>
            <Col><strong>Email</strong></Col>
            <Col><strong>Since</strong></Col>
            <Col><strong>Vendor</strong></Col>
            <Col><strong>Cancel</strong></Col>
          </Row>
          {Users.length > 0 ? (
          Users.map((Users) => (
            <Row key={Users._id}>
              <Col>{Users.username}</Col>
              <Col>{Users.email}</Col>
              <Col>{new Date(Users.createdAt).toLocaleDateString()}</Col>
              <Col>{Users.isVendor?(<div>yes</div>):(<div>No</div>)}</Col>
              <Col>
                <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleCancelBooking(Users._id)} />
              </Col>
            </Row>
          ))
        ):(<h4>No Users</h4>)}
        </div>
      </div>
      <div className="bottom-right-container">
      <h2>Bus Bookings</h2>
          <Row>
            <Col><strong>title</strong></Col>
            <Col><strong>price</strong></Col>
            <Col><strong>maxGroupSize</strong></Col>
            <Col><strong>Featured</strong></Col>
            <Col><strong>Cancel</strong></Col>
          </Row>
          {Tours.length > 0 ? (
          Tours.map((Tours) => (
            <Row key={Tours._id}>
              <Col>{Tours.title}</Col>
              <Col>{Tours.price}</Col>
              <Col>{Tours.maxGroupSize}</Col>
              <Col>{Tours.featured?(<div>yes</div>):(<div>No</div>)}</Col>
              <Col>
                <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleCancelBusBooking(Tours._id)} />
              </Col>
            </Row>
          ))
        ):(<h4>No tours</h4>)}
      </div>
    </div>
  </div>
  );
};

export default AdminDashboard;

