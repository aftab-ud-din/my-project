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
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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
  },[page, busCount, buses,isSearching])

  const handleSearch = async (query) => {
    setIsSearching(true);
    try {
      const response = await fetch(`${BASE_URL}/buses/search/getBusBySearch?${query}&page=${page}`);
      if (!response.ok) throw new Error('Search failed');
      const result = await response.json();
      setSearchResults(result.data);
      const pages = Math.ceil(result.total / 8);
      setPageCount(pages);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <CommonSection  title={isSearching ? "Search Results" : "All Buses"}/>
      <section>
        <Container>
          <Row>
            <BusSearchBar onSearch={handleSearch} setIsSearching={setIsSearching} isSearching={isSearching}/>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
  <Container>
    {loading && <h4 className='text-center pt-5'>Loading...........</h4>}
    {error && <h4 className='text-center pt-5'>{error}</h4>}
    {!loading && !error && (
      isSearching ? (
        searchResults && searchResults.length > 0 ? (  // Check if searchResults is not null and has length
          <Row>
            {searchResults.map(bus => (
              <Col lg='3' className='mb-4' key={bus._id}>
                <BusCard bus={bus} />
              </Col>
            ))}
            <Col lg='12'>
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map(number => (
                  <span key={number} onClick={() => setPage(number)} className={page === number ? "active_page" : ""}>
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        ) : <h4 className='text-center pt-5'>No results found</h4>
      ) : (
        <Row>
          {buses && buses.length > 0 ? (  // Check if buses is not null and has items
            buses.map(bus => (
              <Col lg='3' className='mb-4' key={bus._id}>
                <BusCard bus={bus} />
              </Col>
            ))
          ) : <h4 className='text-center pt-5'>No buses available</h4>}
          <Col lg='12'>
            <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
              {[...Array(pageCount).keys()].map(number => (
                <span key={number} onClick={() => setPage(number)} className={page === number ? "active_page" : ""}>
                  {number + 1}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      )
    )}
  </Container>
</section>



      <Newsletter /> 
    </>
  );
};

export default Bus