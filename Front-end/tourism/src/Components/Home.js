import React, { useState } from "react";
import { CCarousel, CCarouselItem, CCarouselCaption, CImage } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import { faUserMd } from "@fortawesome/free-solid-svg-icons";
import { faHospitalAlt } from "@fortawesome/free-solid-svg-icons";
import { FaHeart, FaAward, FaBrain, FaCapsules, FaPrescriptionBottleAlt, FaThumbsUp } from "react-icons/fa";
import {
  faGithub,
  faGooglePlusG,
  faPinterestP,
  faTwitter,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';
import NavBar from "./Navbar";

import { faEnvelopeSquare, faPhoneSquare, faBars } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const captionStyles = {
    opacity: isHovered ? 1 : 0, // Show caption when hovered
  };

  return (
    <>
    <NavBar/>
    <CCarousel onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} controls indicators dark>
          <CCarouselItem>
              <CImage className="d-block w-100" src="/img/slider/slider_1.jpg" alt="slide 1" />
              <CCarouselCaption className="d-none d-md-block" style={captionStyles}>
                  <h5>Best Free Clinic Template</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque,
                      aliquet sit amet elementum vel, vehicula eget eros. Vivamus arcu metus, mattis
                      sed sagittis at, sagittis quis neque. Praesent.</p>
              </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
              <CImage className="d-block w-100" src="/img/slider/slider_2.jpg" alt="slide 2" />
              <CCarouselCaption className="d-none d-md-block" style={captionStyles}>
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
              </CCarouselCaption>
          </CCarouselItem>
          <CCarouselItem>
              <CImage className="d-block w-100" src="/img/slider/slider_3.jpg" alt="slide 3" />
              <CCarouselCaption className="d-none d-md-block" style={captionStyles}>
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
              </CCarouselCaption>
          </CCarouselItem>
      </CCarousel><section className="key-features">
              <div className="row no-margin">
                  <div className="col-lg-3 kvxol col-md-6">
                      <div className="single-key ky-1">
                      <FontAwesomeIcon icon={faHospitalAlt} size="4x"/>
                          <h5>Newest Technologies</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.</p>
                      </div>
                  </div>

                  <div className="col-lg-3 kvxol col-md-6">
                      <div className="single-key ky-2">
                      <FontAwesomeIcon icon={faUserMd} size="4x"/>
                          <h5>Experienced Doctors</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.</p>
                      </div>
                  </div>

                  <div className="col-lg-3 kvxol col-md-6">
                      <div className="single-key ky-1">
                      <FontAwesomeIcon icon={faBriefcaseMedical} size="4x" />
                          <h5>High Customer Satisfaction</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.</p>
                      </div>
                  </div>

                  <div className="col-lg-3 kvxol col-md-6">
                      <div className="single-key ky-2">
                      <FontAwesomeIcon icon={faCapsules} size="4x" />
                          <h5>Pharma Pipeline</h5>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.</p>
                      </div>
                  </div>
              </div>
          </section>
          <section className="with-medical">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 txtr">
            <h4>
              Why choose Health Care with <br />
              <span>Medical Hospital</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              neque libero, pulvinar et elementum quis, facilisis eu ante.
              Mauris non placerat sapien. Pellentesque tempor arcu non odio
              scelerisque ullamcorper. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nam varius eros consequat auctor gravida. Fusce
              tristique lacus at urna sollicitudin pulvinar. Suspendisse
              hendrerit ultrices mauris.
            </p>
            <p>
              Ut ultricies lacus a rutrum mollis. Orci varius natoque penatibus
              et magnis dis parturient montes, nascetur ridiculus mus. Sed porta
              dolor quis felis pulvinar dignissim. Etiam nisl ligula,
              ullamcorper non metus vitae, maximus efficitur mi. Vivamus ut ex
              ullamcorper, scelerisque lacus nec, commodo dui. Proin massa urna,
              volutpat vel augue eget, iaculis tristique dui.
            </p>
          </div>
          <div className="col-lg-6 col-md-12">
            <img src="/img/why.jpg" width={550} height={420} alt="" />
          </div>
        </div>
      </div>
    </section>
    <section className="key-features department">
      <div className="container">
        <div className="inner-title">
          <h2>Our Key Features</h2>
          <p>Take a look at some of our key features</p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="single-key">
              <FaHeart size={40} color="#0085bc"/>
              <h5>Cardiology</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut erat nec leo lobortis blandit.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-key">
              <FaAward size={40} color="#0085bc"/>
              <h5>Orthopaedic</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut erat nec leo lobortis blandit.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-key">
              <FaBrain size={40} color="#0085bc"/>
              <h5>Neurologist</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut erat nec leo lobortis blandit.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-key">
              <FaCapsules size={40} color="#0085bc"/>
              <h5>Pharma Pipeline</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut erat nec leo lobortis blandit.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-key">
              <FaPrescriptionBottleAlt size={40} color="#0085bc"/>
              <h5>Pharma Team</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut erat nec leo lobortis blandit.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-key">
              <FaThumbsUp size={40} color="#0085bc"/>
              <h5>High Quality treatments</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ut erat nec leo lobortis blandit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section className="our-blog">
      <div className="container">
        <div className="row session-title">
          <h2>Our Blog</h2>
          <p>Take a look at what people say about us</p>
        </div>
        <div className="blog-row row">
          <div className="col-lg-4 col-md-6">
            <div className="single-blog">
              <figure>
                <img src="/img/blog/blog_01.jpg" alt="" />
              </figure>
              <div className="blog-detail">
                <small>By Admin | August 10 2018</small>
                <h4>Methods of Recruitments</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam justo neque, aliquet sit amet elementum vel,
                  vehicula eget eros. Vivamus arcu metus, mattis sed sagittis
                  at, sagittis quis neque. Praesent.
                </p>
                <div className="link">
                  <a href="">Read more</a>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-blog">
              <figure>
                <img src="/img/blog/blog_02.jpg" alt="" />
              </figure>
              <div className="blog-detail">
                <small>By Admin | August 10 2018</small>
                <h4>Methods of Recruitments</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam justo neque, aliquet sit amet elementum vel,
                  vehicula eget eros. Vivamus arcu metus, mattis sed sagittis
                  at, sagittis quis neque. Praesent.
                </p>
                <div className="link">
                  <a href="">Read more</a>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-blog">
              <figure>
                <img src="/img/blog/blog_03.jpg" alt="" />
              </figure>
              <div className="blog-detail">
                <small>By Admin | August 10 2018</small>
                <h4>Methods of Recruitments</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam justo neque, aliquet sit amet elementum vel,
                  vehicula eget eros. Vivamus arcu metus, mattis sed sagittis
                  at, sagittis quis neque. Praesent.
                </p>
                <div className="link">
                  <a href="">Read more</a>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <div className="copy">
      <div className="container">
        <a href="">
          2023 &copy; All Rights Reserved | Designed and Developed by Jeswant
        </a>
        <span>
          <a href="#">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faPinterestP} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </span>
      </div>
    </div></>
          
  );
};

export default Slider;
