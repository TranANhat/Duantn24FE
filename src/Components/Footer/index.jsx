import { useState } from 'react';
import './footer.scss';
import DefaultLogo from '../../assets/logo.png';
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logo">
          <a href="/">
            <img src={DefaultLogo} alt="Logo" />
          </a>
          {/* <div className="logo-text">
            <h2>CALISTA SPA</h2>
            <p>WELLNESS</p>
          </div> */}
        </div>
      </div>

      <div className="footer-content">
        <div className="newsletter">
          <h3> SUN SPA & MASSAGE </h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <button type="submit">SEND</button>
            </div>
          </form>
          <p className="newsletter-note">
            Sự hài lòng của quý khách là niềm vinh hạnh của chúng tôi 
          </p>

          <div className="social">
            <h3>Follow us</h3>
            <div className="social-links">
              <a href="#" className="social-link">Fb</a>
              <span className="separator">•</span>
              <a href="#" className="social-link">Ln</a>
              <span className="separator">•</span>
              <a href="#" className="social-link">Be</a>
              <span className="separator">•</span>
              <a href="#" className="social-link">Ig</a>
            </div>
          </div>
        </div>

        <div className="quick-links">
          <h3>Thông tin liên hệ</h3>
          <ul>
            <li><a href="#">Hotline: 0348 727 070</a></li>
            <li><a href="#">Hoạt động: Thứ 2 - Chủ nhật</a></li>
            <li><a href="#">Mở cửa: 8:30 - 22:00</a></li>
            <li><a href="#">Địa chỉ: 05 Lê Quang Hoà, Hoà Xuân, Cẩm Lệ, Đà Nẵng</a></li>
            <li><a href="#">Email: sunspamassage@gmail.com</a></li>
          </ul>
        </div>

        <div className="informations">
          <h3>Dịch vụ massage tại Sun Spa & Massage</h3>
          <ul>
            <li><a href="#">Dịch vụ massage foot</a></li>
            <li><a href="#">Dịch vụ massage cổ vai gáy</a></li>
            <li><a href="#">Ngâm tắm lá thuốc người dao đỏ</a></li>
            <li><a href="#">Dịch vụ massage foot</a></li>
      
            <li><a href="#">Dịch vụ cổ tay </a></li>
          </ul>
        </div>

        <div className="customer-care">
          <h3>Chính sách & Điều Khoản</h3>
          <ul>
            <li><a href="#">Điều khoản dịch vụ</a></li>
            <li><a href="#">Chính sách đổi trả</a></li>
            <li><a href="#">Chính sách giao hàng</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Đặt lịch giao hàng</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Qode Interactive, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;