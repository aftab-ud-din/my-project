
import React from 'react'
import BusCard from '../../shared/BusCard'
import busData from '../../assets/data/buses'
import {Col} from 'reactstrap'

const FeaturedBusList = () => {
  return <>
    {
        busData?.map(bus=>(
            <Col lg='3' className='md-4' key={bus.id}>
                <BusCard bus={bus}/>
            </Col>
        ))
    }
  </>
}

export default FeaturedBusList