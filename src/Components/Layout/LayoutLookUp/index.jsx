import { Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./LayoutLookUp.scss";
import DefaultLogo from '../../../assets/logo.png';
import ScrolledLogo from '../../../assets/logo.png';
export default function LayoutLookUp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  let stt = 1;


  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
      setLogoSrc(ScrolledLogo);
    } else {
      setIsScrolled(false);
      setLogoSrc(DefaultLogo);
    }
  };

  const handleSearch = () => {
    if (phoneNumber.trim()) {
      // sau này có api sẽ trả về dạng object như này hiện tại cố định chỉ 1 object
      const newResult = {
        id: Date.now(),
        name: 'Đỗ Thị Mẫn',
        phone: phoneNumber,
        service: 'Massage Body 60p',
        appointmentDate: '10/11/2024',
        price: '0 đồng'
      };
      setSearchHistory(prevHistory => [newResult, ...prevHistory]);
      setPhoneNumber('');
    }
  };
  // Xử lý khi nhấn Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const slides = [
    {
      id: 1,
      url: 'https://calista.qodeinteractive.com/wp-content/uploads/2024/06/services-img-4.jpg',
      title: <>Lookup</>,
      cta: 'DISCOVER MORE'
    },
  ];


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
    <div className="LayoutLookUp">
      <div className="header">
        <div className="header__topbar">
          <div className="header__topbar-container">
            <div>1 Tháng 10, Đà Nẵngk</div>
            <div className="header__topbar-special">SChào mừng bạn đến với Sun spa & massage</div>
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

        <div className={`header__panel ${isPanelOpen ? 'open' : ''}`}>
          <div className="header__panel-contents">
            <button className="header__panel-close" onClick={togglePanel}>
              <X />
            </button>

            <div className="header__panel-logo">
              <img
                src={DefaultLogo}
                alt="Calista Spa"
              />
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
      <div className="container-box">
        <div className="search-box">
          <h2>Tra cứu đơn hàng</h2>
          <div className="search-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập số điện thoại"
              />
            </div>
            <button onClick={handleSearch}>Tìm kiếm</button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Dịch vụ</th>
                <th>Ngày hẹn</th>
                <th>Giá tiền</th>
              </tr>
            </thead>
            <tbody>
              {searchHistory.map((result) => (
                <tr key={result.id}>
                  <td>{stt++}</td>
                  <td>{result.name}</td>
                  <td>{result.phone}</td>
                  <td>{result.service}</td>
                  <td>{result.appointmentDate}</td>
                  <td>{result.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}