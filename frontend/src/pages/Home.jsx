import React from 'react'
import '../styles/home.css'

import { Container, Row, Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import experienceImg from '../assets/images/experience.png'
import Subtitle from './../shared/Subtitle'

import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-Items/FeaturedTourList';
import MasonryImageGallery from '../components/Image-gallery/MasonryImageGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';


const Home = () => {
  return <>
  
  {/*================hero section start=================*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero_content">
            <div className="hero_subtitle d-flex align-items-center">
              <Subtitle subtitle={'Know Before You Go'}/>
              </div>
            <h1>Traveling opens the door to creating
            <span className='highlight'> memories</span>
            </h1>
            <p>
              Hunza Movers is your trusted partner for unforgettable travel experiences. As a premier
              provider of tour and travel services, we specialize in offering comfortable and
              exhilarating journeys through our fleet of modern buses.
            </p>
          </div>
        </Col>

        <Col lg='2'>
          <div className="hero_img-box">
            <img src={heroImg} alt="" />
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero_img-box mt-4">
            <video src={heroVideo} alt="" controls/>
          </div>
        </Col>
        <Col lg='2'>
          <div className="hero_img-box mt-5">
            <img src={heroImg02} alt="" />
          </div>
        </Col>
  {/*================Search Bar start=================*/}
        <SearchBar />
  {/*================Search Bar end=================*/}
      </Row> 
    </Container>
  </section> 
  {/*================hero section end=================*/}
  <section>
    <Container>
      <Row>
        <Col lg='3'>
          <h5 className='services_subtitle'>What we Offer</h5>
          <h2 className='services_title'>We offer our best services</h2>
        </Col>

        <ServiceList/>
      </Row>
    </Container>
  </section>

  {/*====================feature tour section start========================*/}
  <section>
    <Container>
      <Row>
        <Col lg='12' className='mb-5'>
          <Subtitle subtitle={"Explore"} />
          <h2 className='feature_tour-title'>Our featured tours</h2>
        </Col>
        <FeaturedTourList/>
      </Row>
    </Container>
  </section>
  {/*====================feature tour section end==========================*/}

  {/*====================Experince section start==========================*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="experience_content">
            <Subtitle subtitle={'Experience'}/>

            <h2>With our all experience <br/> we will serve you</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              <br />
              Dolorem in quos odio maxime est ratione sit deleniti nihil.
            </p>
          </div>

          <div className="counter_wrapper d-flex align-items-center gap-5">
            <div className="counter_box">
            <span>5K+</span>
            <h6>Successful Trips</h6>
            </div>

            <div className="counter_box">
            <span>400+</span>
            <h6>Regular Clients</h6>
            </div>

            <div className="counter_box">
            <span>3</span>
            <h6>Years Experience</h6>
            </div>

          </div>
        </Col>
        <Col lg='6'>
          <div className="experience_img">
            <img src={experienceImg} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  {/*====================Experince section end==========================*/}
  
  {/*====================Gallery section start==========================*/}
  <section>
    <Container>
      <Row>
        <Col lg='12'>
          <Subtitle subtitle={'Gallery'}/>
          <h2 className="gallery_title">
            Visit our customer tour gallery
          </h2>
        </Col>

        <Col lg='12'>
          <MasonryImageGallery />
        </Col>
      </Row>
    </Container>
  </section>
  {/*====================Gallery section end==========================*/}

  {/*====================testimonial section start==========================*/}
    <section>
      <Container>
        <Row>
          <Col lg='12' >
            <Subtitle subtitle={'Customers Love'} />
            <h2 className='testimonial_title'>What our customers say about us</h2>
          </Col>
          <Col lg='12'>
            <Testimonials/>
          </Col>
        </Row>
      </Container>
    </section>

  {/*====================testimonial section end==========================*/}
  
  <Newsletter/>
  </>
}

export default Home