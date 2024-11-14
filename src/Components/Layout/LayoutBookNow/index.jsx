import './LayoutBookNow.scss';
import { Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Calendar, DatePicker } from 'antd';
import axios from 'axios';
import DefaultLogo from '../../../assets/logo.png';
import ScrolledLogo from '../../../assets/logo.png';



export default function LayoutBookNow() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedService, setSelectedService] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [services, setServices] = useState([]);  // danh sách dịch vụ
  const [chosenService, setChosenService] = useState(null);  // dịch vụ đã chọn
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [sale, setSale] = useState('')
  const [diachi, setDiachi] = useState('')

  //load sp
  async function handledichvu() {
    try {
      const res = await axios.get(`http://localhost:3000/api/dv/dichvu`);
      setServices(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handledichvu();
  }, [])
  //them hd
  const handleAddInvoice = async (event) => {
    event.preventDefault();


    const invoiceData = {
      username: name,
      phone: phone,
      email: email,
      diaChi: diachi,
      phuongThucThanhToan: paymentMethod,
      tongTien: totalAmount,
      dichVu_id: selectedService?.id,
      soLuong: 1,
    };

    try {

      const response = await axios.post('http://localhost:3000/api/hd/hoadon', invoiceData);
      alert(response.data.message || 'Đã thêm hóa đơn thành công!');
    } catch (error) {
      console.error("Lỗi khi thêm hóa đơn:", error);
      alert("Đã xảy ra lỗi khi thêm hóa đơn. Vui lòng thử lại.");
    }
  };

  const handleServiceSelection = (service) => {
    setChosenService(service);
    setSelectedService(service)
    setTotalAmount(service.gia);
    setShowServiceModal(false);
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(false);
  };

  // const formatPrice = (price) => {
  //   return new Intl.NumberFormat('vi-VN').format(price) + ' đồng';
  // };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
      setLogoSrc(ScrolledLogo);
    } else {
      setIsScrolled(false);
      setLogoSrc(DefaultLogo);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <>
      <div className="LayoutBookNow">
        <div className="header">
          <div className="header__topbar">
            <div className="header__topbar-container">
              <div>1 Tháng 10, Đà Nẵng</div>
              <div className="header__topbar-special">Chào mừng bạn đến với Sun spa & massage</div>
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
                <h3>Chúng tôi mở cửa vào lúc:</h3>
                <p>Thứ 2- Thứ 7: 08:00-22:00</p>
                <p>Chủ nhật : 10:00-22:00</p>
              </div>

              <div className="header__panel-contact">
                <a href="mailto:calista@example.com">calista@example.com</a>
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
            <div className="header__carousel-slide active">
              <div className="header__carousel-slide-overlay" />
              <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/09/inner-img-9.jpg" alt="" />

              <div className="header__carousel-content">
                <div className="header__carousel-content-wrapper">
                  <div className="calendar-section">
                    <Calendar fullscreen={false} />
                    <DatePicker />
                  </div>
                </div>
                <div className="working">
                  <div className="booking-container">
                    <h2 className="booking-title">Đặt lịch</h2>

                    <form className="booking-form">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Tên"
                          value={name}
                          onChange={(e) => (setName(e.target.value))} />
                      </div>

                      <div className="form-group">
                        <input
                          type="tel"
                          placeholder="SĐT"
                          value={phone}
                          onChange={(e) => (setPhone(e.target.value))} />

                      </div>

                      <div className="form-group">
                        <input
                          type="tel"
                          placeholder="Địa chỉ"
                          value={diachi}
                          onChange={(e) => (setDiachi(e.target.value))} />

                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => (setEmail(e.target.value))} />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Mã giảm giá"
                          value={sale}
                          onChange={(e) => (setSale(e.target.value))} />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          value={`${totalAmount} đồng`}
                          placeholder="Tổng tiền"
                          readOnly
                        />
                      </div>

                      <div className="action-container">
                        <div className="service-payment-row">
                          <button
                            type="button"
                            onClick={() => setShowServiceModal(true)}
                          >
                            {chosenService ? chosenService.tenDichVu
                              : 'Chọn dịch vụ'}
                          </button>
                          <button
                            type="button"
                            onClick={() => chosenService && setShowPaymentModal(true)}
                          >
                            {paymentMethod ?
                              `Thanh toán ${paymentMethod === 'atm' ? 'ATM' : 'tiền mặt'}` :
                              'Phương thức thanh toán'}
                          </button>
                        </div>
                        <button onClick={handleAddInvoice} type="submit" className="submit-button">
                          Đặt lịch
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={`modal ${showServiceModal ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setShowServiceModal(false)}>
            <X size={24} />
          </button>
          <h3>Chọn dịch vụ</h3>
          <div className="service-list">
            {services.map((dv) => (
              <button
                key={dv.id}
                className="service-item"
                onClick={() => handleServiceSelection(dv)}
              >
                <span>{dv.tenDichVu}</span>
                <span className="service-price">{dv.gia}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`modal ${showPaymentModal ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
            <X size={24} />
          </button>
          <h3>Chọn phương thức thanh toán</h3>
          <div className="payment-options">
            <button onClick={() => handlePaymentSelection('atm')}>
              Thanh toán ATM
            </button>
            <button onClick={() => handlePaymentSelection('cash')}>
              Thanh toán tiền mặt
            </button>
          </div>
          {selectedService && (
            <div className="summary">
              <div className="total">
                <span>Tổng tiền: </span>
                <span>{totalAmount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}