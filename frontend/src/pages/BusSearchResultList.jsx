import React, { useState } from 'react';
import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { useLocation } from 'react-router-dom';
import BusCard from './../shared/BusCard';
import Newsletter from './../shared/Newsletter';

const BusSearchResultList = () => {

  const location = useLocation();

  const [data] = useState(location.state);


  return (
  <>
    <CommonSection title={"Bus Search Result"}/>
    <section>
      <Container>
        <Row>
          {
            data.length === 0? ( 
            <h4 className='text-center'>No bus found</h4> 
            ) : ( 
              data?.map(bus => (
                <Col lg='3' className='mb-4' key={bus._id}>
                  <BusCard bus={bus} />
                </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
    <Newsletter/>
  </>
  );
};

export default BusSearchResultList