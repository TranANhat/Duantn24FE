import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, X } from 'lucide-react';
import './header.scss';
import { Link, NavLink } from 'react-router-dom';
import DefaultLogo from '../../assets/logo.png';
import ScrolledLogo from '../../assets/logo.png';
const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);



  const slides = [
    {
      id: 1,
      url: 'https://calista.qodeinteractive.com/wp-content/uploads/2024/07/h1-img-17.jpg',
      title: <>
        Sun spa làm đẹp & massage  <em>  SỐNG KHỎE – SỐNG ĐẸP- SỐNG CHẤT LƯỢNG</em>
      </>,
      cta: 'Xem thêm'
    },
    {
      id: 2,
      url: 'https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-1.jpg',
      title: <>
       Sun spa  <em> uy tín, chất lượng cao.</em> Tạo nên thương hiệu <em></em>
      </>,
      cta: 'Xem thêm'
    },
    {
      id: 3,
      url: 'https://calista.qodeinteractive.com/wp-content/uploads/2024/07/h1-img-16.jpg',
      title: <>
     Đặt lịch ngay <em> với nhiều ưu đãi</em> giá học sinh, sinh viên <em></em>
      </>,
      cta: 'Đặt ngay '
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

  useEffect(() => {
    let timer;
    if (isAutoSliding) {
      timer = setInterval(() => {
        nextSlide();
      }, 5000);
    } else {
      timer = setTimeout(() => setIsAutoSliding(true), 1000);
    }
    return () => (isAutoSliding ? clearInterval(timer) : clearTimeout(timer));
  }, [currentSlide, isAutoSliding]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsAutoSliding(false);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsAutoSliding(false);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };



  return (
    <div className="header">
      {/* Top Bar */}
      <div className="header__topbar">
        <div className="header__topbar-container">
          <div>21 Tháng 10, Đà Nẵng</div>
          <div className="header__topbar-special"> Chào mừng bạn đến với Sun spa & massage</div>
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
            <NavLink to="/contact">Contact</NavLink>
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
              />
            </a>
          </div>

          <div className="header__panel-hours">
            <h3> Chúng tôi mở cửa vào lúc: </h3>
            <p> Thứ 2- Thứ 7: 08:00-22:00</p>
            <p> Chủ nhật : 10:00-22:00</p>
          </div>

          <div className="header__panel-contact">
            <a href="mailto:calista@example.com">sunspadanang@example.com</a>
            <a href="tel:+6534715168">+653 4715 168</a>
          </div>

          <div className="header__panel-social">
            {['Fb', 'Ln', 'Be', 'Ig'].map((social) => (
              <Link key={social} href="#" className="header__panel-social-link">
                {social}
              </Link>
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

        {/* Navigation */}
        <div className="header__carousel-navigation">
          <button
            className="header__carousel-navigation-button"
            onClick={prevSlide}
          >
            <ChevronLeft />
            PREV
          </button>

          <div className="header__carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`header__carousel-indicators-dot ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>

          <button
            className="header__carousel-navigation-button"
            onClick={nextSlide}
          >
            NEXT
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;