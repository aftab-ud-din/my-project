import React, {useEffect, useState} from 'react'
import CommonSection from '../shared/CommonSection'

import '../styles/bus.css';
import BusCard from './../shared/BusCard';
import BusSearchBar from './../shared/BusSearchBar';
import Newsletter from './../shared/Newsletter';
import { Container, Row, Col} from 'reactstrap';

import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

const Bus = () => {

  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)

  const {
    data:buses, 
    loading, 
    error
  } = useFetch(`${BASE_URL}/buses?page=${page}`);
  const {data:busCount} = useFetch(`${BASE_URL}/buses/search/getBusCount`);

  useEffect(()=>{
    const pages = Math.ceil(busCount/ 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  },[page, busCount, buses])

  return (
    <>
    <CommonSection title={"All Busses"}/>
      <section>
        <Container>
          <Row>
            <BusSearchBar/>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading...........</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {!loading && !error && 
          <Row>
            {
              buses?.map(bus=> (
              <Col lg='3' className='mb-4' key={bus._id}>
                <BusCard bus= {bus} />
              </Col>))
            }

            <Col lg='12'>
              <div className="pagination d-flex align-items-center 
              justify-content-center mt-4 gap-3">
                {
                  [...Array(pageCount).keys()].map(number=> (
                    <span key={number} 
                    onClick={() => setPage(number)}
                    className={page===number? "active_page" : ""}>
                      {number + 1}
                    </span>
                  ))
                }
              </div>
            </Col>
          </Row>
          }
        </Container>
      </section>
      <Newsletter /> 
    </>
  );
};

export default Bus