import { Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DefaultLogo from '../../../assets/logo.png';
import ScrolledLogo from '../../../assets/logo.png';
import axios from 'axios';

import './LayoutService.scss'

export default function LayoutService() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);
  const [selectedService, setSelectedService] = useState(null);
  const [listService, SetlistService] = useState([])

  const activebar = {
    borderBottom: "1px solid white",
    color: "white",
    padding: "5px 0px"
  };
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
      setLogoSrc(ScrolledLogo);
    } else {
      setIsScrolled(false);
      setLogoSrc(DefaultLogo);
    }
  };

  const slides = [
    {
      id: 1,
      url: 'https://calista.qodeinteractive.com/wp-content/uploads/2024/06/inner-img-1.jpg',
      title: <>Service</>,
      cta: 'DISCOVER MORE'
    },
  ];

  // Register scroll event on mount and unregister on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleToggle = (service) => {
    setSelectedService((prev) => (prev === service ? null : service));
  };

  async function LoadService() {
    try {
      const res = await axios.get(`http://localhost:3000/api/dv/dichvu`);
      SetlistService(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoadService();
  }, []);


  return (
    <>
      <div className="LayoutService">
        <div className="header">
          <div className="header__topbar">
            <div className="header__topbar-container">
              <div>1 Tháng 10, Đà Nẵng</div>Chào mừng bạn đến với Sun spa & massage
              <div className="header__topbar-special"></div>
              <div className="header__topbar-contact">
                <div className="header__topbar-phone">
                  <Phone />
                  +653 4715 163
                </div>
                <NavLink to="/">FAQ</NavLink>
                <NavLink to="/">Gift Vouchers</NavLink>
              </div>
            </div>
          </div>

          <nav className={`header__nav ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header__nav-container">
              <div className="header__nav-menu">
                <NavLink to="/">Home</NavLink>
                <NavLink style={({ isActive }) => isActive ? activebar : {}} to="/service">Service</NavLink>
                <NavLink to="/introduce">Introduce</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/lookup">Lookup</NavLink>
              </div>

              <div className={`header__nav-logo ${isScrolled ? 'scrolled' : ''}`}>
                <a href="/">
                  <img src={logoSrc} alt="Calista Spa" className="max-w-[120px] h-auto" />
                </a>
              </div>

              <div className="header__nav-actions">
                <NavLink to="/booknow">
                  <button className="header__nav-button">
                    BOOK NOW
                    <span className="one"></span>
                    <span className="two"></span>
                  </button>
                </NavLink>
                <button className="header__nav-toggle" onClick={togglePanel}>
                  <span></span>
                </button>
              </div>
            </div>
          </nav>

          <div className={`header__panel ${isPanelOpen ? 'open' : ''}`}>
            <div className="header__panel-contents">
              <button className="header__panel-close" onClick={togglePanel}>
                <X />
              </button>

              <div className="header__panel-logo">
                <img src={DefaultLogo} alt="Calista Spa" />
              </div>

              <div className="header__panel-hours">
                <h3>Chúng tôi mở cửa vào lúc</h3>
                <p>Thứ 2- Thứ 7: 08:00-22:00</p>
                <p>Chủ nhật : 10:00-22:00</p>
              </div>

              <div className="header__panel-contact">
                <a href="mailto:calista@example.com">sunspadanang@example.com</a>
                <a href="tel:+6534715168">+653 4715 168</a>
              </div>

              <div className="header__panel-social">
                {['Fb', 'Ln', 'Be', 'Ig'].map((social) => (
                  <NavLink key={social} to="#" className="header__panel-social-link">
                    {social}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          <div className="header__carousel">
            {slides.map((slide, index) => (
              <div key={slide.id} className={`header__carousel-slide ${index === currentSlide ? 'active' : ''}`}>
                <div className="header__carousel-slide-overlay" />
                <img src={slide.url} alt="" />
                <div className="header__carousel-content">
                  <div className="header__carousel-content-wrapper">
                    <h3 className="header__carousel-content-title" style={{ fontSize: '48px', width: '700px' }}>
                      {slide.title}
                    </h3>
                    <button className="header__carousel-content-button">
                      {slide.cta}
                      <span className="one"></span>
                      <span className="two"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="header__carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`header__carousel-indicators-dot ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="service-container">
          {listService.map((dv) => (
            <div key={dv.id} className="service-card">
              <img src={`http://localhost:3000${dv.hinhanh}`} alt="Service Image" />
              <div className="service-content">
                <h3>{dv.tenDichVu}</h3>
                <hr />
                <p>(90 phút) {dv.gia}</p>
                <hr />
                {selectedService === dv.id && <p> Mô tả : {dv.moTa}</p>}
                <div className="service-buttons">
                  <button className="btn-call">Gọi ngay</button>
                  <button className="btn-book" onClick={() => handleToggle(dv.id)}>Mô tả</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Placeholder component for DVCT
function DVCT() {
  return <div className="modal">Booking details...</div>;
}