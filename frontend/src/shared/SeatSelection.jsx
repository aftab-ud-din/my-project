import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './seat-selection.css'; // Make sure to import or define your styles
import convertToLinearIndices from '../utils/seatToNumber';

const SeatSelection = ({ setSelectedSeats, selectedSeats, bus ,setSeats}) => {
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
        console.log(convertToLinearIndices(selectedSeats,seatsPerRow))
        setSeats(convertToLinearIndices(selectedSeats,seatsPerRow))
    })
    const initiallyReservedSeats = ['1-2', '3-4', '4-3', '4-4'];

    const handleSeatClick = (row, seatNumber) => {
        const seatId = `${row}-${seatNumber}`;
        if (initiallyReservedSeats.includes(seatId)) {
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
                rowSeats.push(
                    <Col
                        key={seatId}
                        className={`seat ${isSelected ? 'selected' : ''} ${bus?.totalSeats === 20 ? 'twenty-seater' : ''}`}
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
            <div><h4>Selected Seats: {selectedSeats.join(', ')}</h4></div>
        </Container>
    );
};

export default SeatSelection;
