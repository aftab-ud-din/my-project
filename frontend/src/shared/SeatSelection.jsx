import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './seat-selection.css'; // Make sure to import or define your styles
import convertToLinearIndices from '../utils/seatToNumber';
import { BASE_URL } from '../utils/config';
import axios from 'axios';

const SeatSelection = ({ setSelectedSeats, selectedSeats, bus ,setSeats,seats}) => {
    let totalRows = 2;
    let seatsPerRow = 10; // Default configuration

    if (bus?.totalSeats === 32) {
        totalRows = 8;
        seatsPerRow = 4;
    } else if (bus?.totalSeats === 16) {
        totalRows = 8;
        seatsPerRow = 2;
    } else if (bus?.totalSeats === 20) {
        totalRows = 5;
        seatsPerRow = 4;
    }

  
    
    useEffect(()=>{
        setSeats(convertToLinearIndices(selectedSeats,seatsPerRow))
       
    },[selectedSeats])

      const [initiallyReservedSeats, setInitiallyReservedSeats] = useState([]);

    useEffect(() => {
      const fetchBookedSeats = async () => {
          try {
              const res = await axios.get(`${BASE_URL}/busbooking/getAll/seats/${bus._id}`);
              setInitiallyReservedSeats(res.data.data);

              if (res==200) {
                  setInitiallyReservedSeats(res.data.data);
                  
              } else {
                  console.error("Failed to fetch booked seats:", res.message);
              }
          } catch (err) {
            alert(err.message)
          }
      };

      fetchBookedSeats();
  }, []);

  const convertFromLinearIndices = (indices, colsPerRow) => {
    return indices.map(index => {
        const row = Math.floor((index - 1) / colsPerRow) + 1;
        const col = (index - 1) % colsPerRow + 1;
        return `${row}-${col}`;
    });
}
let reservedSeats=[]
    const handleSeatClick = (row, seatNumber) => {
       reservedSeats=convertFromLinearIndices(initiallyReservedSeats,seatsPerRow)
    
        const seatId = `${row}-${seatNumber}`;
        
        if (reservedSeats.includes(seatId)) {
            alert('This seat is already reserved!');
            return;
        }
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const isSeatSelected = (row, seatNumber) => selectedSeats.includes(`${row}-${seatNumber}`);

    const renderSeats = () => {
        const seats = [];
        for (let row = 1; row <= totalRows; row++) {
            const rowSeats = [];
            for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
                const seatId = `${row}-${seatNumber}`;
                const isSelected = isSeatSelected(row, seatNumber);
                const isReserved = reservedSeats.includes(seatId);
              
                rowSeats.push(
                    
                    <Col
                        key={seatId}
                        className={`seat ${isSelected ? 'selected' : ''} ${isReserved ? 'reserved' : ''} ${bus?.totalSeats === 20 ? 'twenty-seater' : ''}`}
                        onClick={() => handleSeatClick(row, seatNumber)}
                    >
                        <span><i className="ri-user-fill"></i></span>
                    </Col>
                );
                
            }
            seats.push(<Row key={row} className={`seat-row`}>{rowSeats}</Row>);
        }
        return seats;
    };


    return (
        <Container>
            <h4 className='mt-5 mb-3'>Bus Seat Booking</h4>
            <div className="seat_booking_32 p-4 mb-3">
                <Row><span className='driver'><i className="ri-steering-fill"></i></span></Row>
                <Row>{renderSeats()}</Row>
            </div>
            <div> <h4>Selected seats Number: </h4><div>
            {seats.length > 0 ? (
                seats.map((seat, index) => (
                    <span key={index} className="seat-number">
                        {seat}{index < seats.length - 1 ? ', ' : ''}
                    </span>
                ))
            ) : (
                <span>No seats selected</span>
            )}
        </div></div>
        </Container>
    );
};

export default SeatSelection;
