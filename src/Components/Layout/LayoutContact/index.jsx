import { useEffect, useRef, useState } from 'react';
import './LayoutContact.scss'
import { Phone, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import DefaultLogo from '../../../assets/logo.png';
import ScrolledLogo from '../../../assets/logo.png';
export default function LayoutContact() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);
  const [formData, setFormData] = useState({
    email: '',
    date: '',
    treatment: ''
  });

  const activebar = {
    borderBottom: "1px solid white",
    color: "white",
    padding: "5px 0px"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const dateInputRef = useRef(null);

  const handleDateIconClick = (e) => {
    e.preventDefault();
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const slides = [
    {
      id: 1,
      url: 'https://calista.qodeinteractive.com/wp-content/uploads/2024/09/inner-img-7.jpg',
      title: <>
        Contact Us
      </>,
      cta: 'DISCOVER MORE'
    },
  ];

  const images = [
    {
      src: "https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-15.jpg",
      alt: "Spa massage"
    },
    {
      src: "https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-14.jpg",
      alt: "Indoor pool"
    },
    {
      src: "https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-12.jpg",
      alt: "Follow us text",
      isText: true,
      text: "Follow us on instagram"
    },
    {
      src: "https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-12.jpg",
      alt: "Woman by pool"
    },
    {
      src: "https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-13.jpg",
      alt: "Tea pouring"
    }
  ];
  // là khi cuộn xuống sẽ thay đôi logo
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
      setLogoSrc(ScrolledLogo);
    } else {
      setIsScrolled(false);
      setLogoSrc(DefaultLogo);
    }
  };

  // Đăng ký sự kiện cuộn khi component mount và hủy khi component unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };
  return <>
    <div className="LayoutContact">
      <div className="header">
        {/* Top Bar */}
        <div className="header__topbar">
          <div className="header__topbar-container">
            <div>1 Tháng 10, Đà Nẵng</div>
            <div className="header__topbar-special">Chào mừng bạn đến với Sun spa & massage</div>
            <div className="header__topbar-contact">
              <div className="header__topbar-phone">
                <Phone />
                +653 4715 163
              </div>
              <a href="/">FAQ</a>
              <a href="/">Gift Vouchers</a>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={`header__nav ${isScrolled ? 'scrolled' : ''}`}>
          <div className="header__nav-container">
            <div className="header__nav-menu">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/service">Service</NavLink>
              <NavLink to="/introduce">Introduce</NavLink>
              <NavLink style={({ isActive }) => isActive ? activebar : {}} to="/contact">Contact</NavLink>
              <NavLink to="/lookup">Lookup</NavLink>
            </div>

            <div className={`header__nav-logo ${isScrolled ? 'scrolled' : ''}`}>
              <a href="/">
                <img
                  src={logoSrc}
                  alt="Calista Spa"
                  className="max-w-[120px] h-auto"
                />
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

        {/* Side Panel */}
        <div className={`header__panel ${isPanelOpen ? 'open' : ''}`}>
          <div className="header__panel-content" >
            <button className="header__panel-close" onClick={togglePanel}>
              <X />
            </button>

            <div className="header__panel-logo">
              <a href="/">
                <img
                  src={DefaultLogo}
                  alt="Calista Spa"
                  className="max-w-[150px] h-auto"
                />
              </a>
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
                <NavLink key={social} href="#" className="header__panel-social-link">
                  {social}
                </NavLink>
              ))}
            </div>
          </div>

        </div>


        {/* Carousel */}
        <div className="header__carousel">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`header__carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
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

      <div className='icon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginTop: '100px' }}>
        <img style={{ width: '250px', height: '200px' }} src="https://i.pinimg.com/564x/35/dc/66/35dc669c80e79103c5c1f1d18a82e381.jpg" alt="" />
      </div>
      <section className="appointment-section">
        <div className="appointment-container">
          <div className="appointment-form">
            <h2>SUN SPA & MASSAGE </h2>
            <p>Sự hài lòng của quý khách là niềm vinh hạnh của chúng tôi </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <span className="icon">✉️</span>
              </div>

              <div className="form-group">
                <input
                  ref={dateInputRef}
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{ colorScheme: 'dark' }}
                />
                <span
                  className="icon"
                  onClick={handleDateIconClick}
                  style={{ cursor: 'pointer' }}
                >
                  📅
                </span>
              </div>

              <div className="form-group">
                <select
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                >
                  <option value="">Treatment</option>
                  <option value="massage">Massage</option>
                  <option value="facial">Facial</option>
                  <option value="spa">Spa</option>
                </select>
                <span className="icon">▼</span>
              </div>

              <button type="submit" className="submit-btn">
                SUBMIT
              </button>
            </form>
          </div>

          <div className="working-hours">
            <h2>Chúng tôi mở cửa vào lúc </h2>

            <div className="hours-list">
              <div className="hours-item">
                <span>Thứ 2 - Thứ 7 </span>
                <span>10:30-21:00</span>
              </div>

              <div className="hours-item">
                <span>Chủ nhật </span>
                <span>8:00-22:00</span>
              </div>

              <div className="hours-item">
                <span>Các ngày lễ </span>
                <span>8:00-22:00</span>
              </div>
            </div>

            <p className="note">
              * Tại sun spa chúng tôi sẽ phục vụ các bạn hài lòng nhất có thể, nếu nhân viên có thái độ không tốt xin liên hệ với chúng tôi *
            </p>
          </div>
        </div>
      </section>

      <div className='icon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', margin: '100px 0' }}>
        <img style={{ width: '250px', height: '200px' }} src="https://i.pinimg.com/564x/35/dc/66/35dc669c80e79103c5c1f1d18a82e381.jpg" alt="" />
      </div>

      <div className="container">
        <div className="imageWrapper">
          {images.map((image, index) => (
            <div
              key={index}
              className={`imageContainer ${image.isText ? 'isText' : ''}`}
            >
              {image.isText ? (
                <div className="imageText">
                  <h2 className="imageTitle">{image.text}</h2>
                  <div className="imageSvg">
                    <svg viewBox="0 0 100 20" className="w-full h-full">
                      <path
                        d="M0 10 Q25 0, 50 10 T100 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="image"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
}