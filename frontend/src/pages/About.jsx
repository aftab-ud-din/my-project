import React from 'react'
import '../styles/home.css'

import { Container, Row, Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import aboutImg1 from '../assets/images/about1.jpeg'
import aboutImg2 from '../assets/images/about2.jpeg'
import aboutImg3 from '../assets/images/about3.jpg'
import policyImg from '../assets/images/policy.jpeg'
import Subtitle from './../shared/Subtitle'

import ServiceList from '../services/ServiceList';
import Newsletter from '../shared/Newsletter';


const About = () => {
  return <>
  
  {/*================hero section start=================*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="hero_content">
            <div className="hero_subtitle d-flex align-items-center">
              <Subtitle subtitle={'Who We Are'}/>
              </div>
            <h1>Welcome to 
            <span className='highlight'> Hunza Movers</span>
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

  {/*====================right section========================*/}
  <section>
    <Container>
      <Row>
        <Col>
        <div className="experience_img ">
            <img src={aboutImg1} alt="" />
          </div>
        </Col>
        <Col>
        <Subtitle subtitle={'Hunza Miles'}/>
            <h2>With our all experience <br/> we will serve you</h2>
            At Hunza Movers, we understand the importance of seamless travel, and our dedicated team
            works tirelessly to ensure that every trip is a memorable one. Whether you're planning a
            family vacation, a group tour, or a corporate outing, we have the expertise to make your
            journey enjoyable and stress-free.
        </Col>
      </Row>
    </Container>
  </section>
  {/*====================right section==========================*/}

  {/*====================left section==========================*/}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
          <div className="experience_content">
            <Subtitle subtitle={'Our Policies'}/>

            <h2>With our all experience <br/> we will serve you</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              <br />
              Our commitment to safety, reliability, and customer satisfaction sets us apart in the
              industry. Each of our buses is meticulously maintained to the highest standards, and our
              professional drivers are experienced and dedicated to providing a smooth and secure travel
              experience.
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
        <Col>
        <div className="experience_img">
            <img src={policyImg} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  {/*====================left section==========================*/}
  
  {/*====================right section==========================*/}
  <section>
    <Container>
      <Row>
        <Col>
        <div className="experience_img">
            <img src={aboutImg2} alt="" />
          </div>
        </Col>
        <Col>
        <Subtitle subtitle={'Experienc'}/>
            <h2>With our all experience <br/> we will serve you</h2>
            Discover new destinations, create lasting memories, and embark on exciting adventures with
            Hunza Movers. We look forward to being a part of your travel story.
        </Col>
      </Row>
    </Container>
  </section>
  {/*====================right section==========================*/}


  {/*====================left section==========================*/}
  <section>
    <Container>
      <Row>
        <Col>
        <Subtitle subtitle={'Experienc'}/>
            <h2>With our all experience <br/> we will serve you</h2>
            Discover new destinations, create lasting memories, and embark on exciting adventures with
            Hunza Movers. We look forward to being a part of your travel story.
        </Col>
        <Col>
        <div className="experience_img">
            <img src={aboutImg3} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  {/*====================left section==========================*/}


  {/*====================map image==========================*/}
    <section>
      <Container>
       <img src="" alt="" />
      </Container>
    </section>

  {/*====================map image==========================*/}
  
  <Newsletter/>
  </>
}

export default About