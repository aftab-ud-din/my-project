import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import calculatingAvgRating from '../utils/avgRating'
import temImg from './../assets/images/login1.png'

import './bus-card.css'

const BusCard = ({bus}) => {

    const {_id, title, pickup_address, drop_address, photo, price, reviews } = bus;
    const {totalRating, avgRating} = calculatingAvgRating(reviews);

  return <div className='bus_card'>
    <Card>
        <div className="bus_img">
            <img src={temImg} alt="bus-img" />
        </div>

        <CardBody>
            <div className="card_top d-flex align-items-center 
            justify-content-between">
                <span className='bus_location d-flex align-items-center gap-1'>
                <i class="ri-map-pin-line"></i> {pickup_address}
                </span>

                <span className='bus_arrow d-flex align-items-center gap-1'>
                <i class="ri-arrow-right-fill"></i>
                </span>

                <span className='bus_location d-flex align-items-center gap-1'>
                <i class="ri-map-pin-line"></i> {drop_address}
                </span>
            </div>

            <span className='bus_rating d-flex align-items-center gap-1'>
                <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? (
                    "Not rated"
                    ) : (
                <span>({reviews.length})</span>
                )}
                </span>

        <h5 className='bus_title'>
            <Link to={`/bus/${_id}`}>
                {title}
            </Link>
        </h5>

        <div className="card_bottom d-flex align-items-center '
        justify-content-between mt-3">
            <h5>
                {price} <span> Rs /per seat</span>
            </h5>

            <button className="btn booking_btn">
                <Link to={`/bus/${_id}`}>Book Your Seat</Link>
            </button>
        </div>
        </CardBody>
    </Card>
  </div>
}

export default BusCard