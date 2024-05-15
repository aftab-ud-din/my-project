import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import "./header.css";
import { AuthContext } from './../../context/AuthContext';

const navLinks = [
  {
    path:'/home',
    display :'Home'
  },
  {
    path:'/about',
    display :'About'
  },
  {
    path:'/bus',
    display :'Bus'
  },
  {
    path:'/tours',
    display :'Tours'
  },
  {
    path:'/track',
    display :'Track'
  },
  {
    path:'/chatbot',
    display :'ChatBot'
  },
  {
    path:'/vendor',
    display :'Vendor'
  }
]
;


const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const {user, dispatch} = useContext( AuthContext );
  

  const logout = ()=>{
    dispatch({type:'LOGOUT'});
    navigate('/');
  }

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const handleProfileClick = () => {
    if(user.data.isAdmin){
      navigate('/admin');
    }else{
      navigate('/profile');
    }
  
  };

  const handleAdminClick = () => {
  
  };



  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="navigations">
              <ul className="menu align-items-center gap-5">
                { navLinks.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass ? "active_link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          {/*  =============================menu end==========================*/}
            <div className="nav_right d-flex align-item-center gap-4">
                <div className="nav_btns d-flex align-items-center gap-4">

                  {
                    user? (
                    <>
                    {
                    user.isAdmin? (
                      <>
                    <button className='invisible-button' onClick={handleAdminClick}>
                      <h5 className="mb-0">{user.data.username}</h5>
                    </button> 
                      </> ):(<>
                        <button className='invisible-button' onClick={handleProfileClick}>
                        <h5 className="mb-0">{user.data.username}</h5>
                      </button> 
                        </> )
                      }
                      <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                    </>
                    ):(
                      <>
                        <Button className='btn secondary_btn' >
                          <Link to='/login'>Login</Link>
                        </Button>
                        <Button className='btn primary_btn'>
                          <Link to='/register'>Register</Link>
                        </Button>
                      </>
                    )}
                </div>

              <span className="mobile_menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

