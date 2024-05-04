import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './seat-selection.css'; // Make sure to import or define your styles

const SeatSelection = (setSelectedSeats,selectedSeats) => {
  const totalRows = 4;
  const seatsPerRow = 8;

  // Assuming some seats are already reserved
  const initiallyReservedSeats = ['1-2', '3-4', '4-3', '4-4'];

 // const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seatNumber) => {
    const seatId = `${row}-${seatNumber}`;

    // Check if the seat is reserved
    if (initiallyReservedSeats.includes(seatId)) {
      alert('This seat is already reserved!');
      return;
    }

    if (selectedSeats.includes(seatId)) {
      // If the seat is already selected, remove it
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
      // handleSeatSelectionChange(selectedSeats)
    } else {
      // Otherwise, add it to the selected seats
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const isSeatSelected = (row, seatNumber) => {
    const seats = Array.isArray(selectedSeats) ? selectedSeats : [];
    return seats.includes(`${row}-${seatNumber}`);
  };

  const renderSeats = () => {
    const seats = [];

    for (let row = 1; row <= totalRows; row++) {
      const rowSeats = [];
      
      for (let seatNumber = 1; seatNumber <= seatsPerRow; seatNumber++) {
        const seatId = `${row}-${seatNumber}`;
        const isSelected = isSeatSelected(row, seatNumber);

        rowSeats.push(
          <Col
            key={seatId}
            className={`seat ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSeatClick(row, seatNumber)}
          >
            {<span>
                <i class="ri-user-fill"></i>
            </span>}
          </Col>
        );
      }

      seats.push(
        <Row key={row} className={`seat-row ${row === 2 ? 'mb-4' : ''}`}>
          {rowSeats}
        </Row>
      );
    }

    return seats;
  };

  return (
    <Container >
      <h4 className='mt-5 mb-3'>Bus Seat Booking</h4>
      <div className="seat_booking_32 p-4 mb-3">
      <Row >
            <span className='driver'><i class="ri-steering-fill"></i></span>
        </Row>
        <Row>
        {renderSeats()}
        </Row>
        </div>
      <div>
        <h4>Selected Seats: {()=>{
           const seats = Array.isArray(selectedSeats) ? selectedSeats : [];
          seats.join(', ')}}</h4>
     </div>
    </Container>
  );
};

export default SeatSelection;



