import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import VendorForm from '../components/Booking/VendorForm';
import VendorTour from './VendorTour';
import Newsletter from '../shared/Newsletter';
import heroImg from '../assets/images/vendor.jpg';
import { AuthContext } from '../context/AuthContext';

const Vendor = () => {
    const { user } = useContext(AuthContext);
    console.log("user=>",user.data)

    return (
        <>
            {user && user.isVendor ? (
                <section>
                    <Row className='p-3'>
                        <Col lg='7' className='p-2'>
                            <Container>
                                <div className="hero_content">
                                    <h1>Now 
                                        <span className='highlight'> Earn </span>
                                        at your DoorStep
                                    </h1>
                                    <p>
                                        Service providers, ready to grow your business? 
                                        Join our platform and connect with travelers worldwide. 
                                        Showcase your offerings, manage bookings effortlessly, 
                                        and earn more. Join us now and expand your opportunities!
                                    </p>
                                </div>
                                <div className="hero_subtitle d-flex align-items-center">
                                    <img src={heroImg} alt="Hero" />
                                </div>
                            </Container>
                        </Col>
                        <Col lg='4'>
                        <div>
                            <VendorForm />
                        </div>
                    </Col>
                    </Row>
                    <Newsletter />
                </section>
            ) : (
                <VendorTour />
            )}
        </>
    );
};

export default Vendor;




/*import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import VendorForm from '../components/Booking/VendorForm';
import VendorTour from './VendorTour';
import Newsletter from '../shared/Newsletter';
import heroImg from '../assets/images/vendor.jpg';
import { AuthContext } from '../context/AuthContext';

const Vendor = () => {
    const { user } = useContext(AuthContext);

    return (
      {user && user.isVendor ? (
        <section>
            <Row className='p-3'>
                <Col lg='7' className='p-2'>
                    <Container>
                        <div className="hero_content">
                            <h1>Now 
                                <span className='highlight'> Earn </span>
                                at your DoorStep
                            </h1>
                            <p>
                                Service providers, ready to grow your business? 
                                Join our platform and connect with travelers worldwide. 
                                Showcase your offerings, manage bookings effortlessly, 
                                and earn more. Join us now and expand your opportunities!
                            </p>
                        </div>
                        <div className="hero_subtitle d-flex align-items-center">
                            <img src={heroImg} alt="Hero" />
                        </div>
                    </Container>
                </Col>
                
               
                {user && user.isVendor ? (
                    <Col lg='4'>
                        <div>
                            <VendorForm />
                        </div>
                    </Col>
                ) : (
                    <Col lg='4'>
                        <div>
                            <VendorTour />
                        </div>
                    </Col>
                )}
            </Row>
            <Newsletter />
        </section>}
        
    );
};

export default Vendor;*/
