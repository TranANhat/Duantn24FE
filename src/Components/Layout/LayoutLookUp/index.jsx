import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { Phone, X } from "lucide-react";
import DefaultLogo from '../../../assets/logo.png';
import ScrolledLogo from '../../../assets/logo.png';
import "./LayoutLookUp.scss";

export default function LayoutLookUp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);

  const [phone, setPhone] = useState('');
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null); // Thêm state để lưu phản hồi
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const [feedbackText, setFeedbackText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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

  // useEffect để theo dõi sự thay đổi của item và gọi lại API lấy phản hồi mới
  useEffect(() => {
    if (item && item.data[0]?.hoadonId) {
      axios.get(`http://localhost:3000/api/hd/feedback/${item.data[0].hoadonId}`)
        .then(response => {
          setFeedback(response.data.feedback); // Cập nhật phản hồi khi có thay đổi hóa đơn
        })
        .catch(error => {
          console.error("Lỗi khi lấy phản hồi:", error);
        });
    }
  }, [item]); // Khi item thay đổi, gọi lại API

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setItem(null);

    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/hd/hoadon/check/${phone}`);
      setItem(response.data); // Lưu thông tin user và hóa đơn
      setError(null); // Reset lỗi nếu có

    } catch (err) {
      if (err.response) {
        console.error(err.response); // Log chi tiết lỗi response
        if (err.response.status === 404) {
          setError("Không tìm thấy số điện thoại này.");
        } else {
          setError("Đã xảy ra lỗi khi tìm kiếm.");
        }
      } else {
        setError("Lỗi kết nối mạng hoặc server không phản hồi.");
      }
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem có nhập đánh giá hay không
    if (!feedbackText) {
      alert("Vui lòng nhập đánh giá.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/hd/hoadon/${item.data[0].hoadonId}`,
        { hoadonId: item.data[0].hoadonId, comment: feedbackText }
      );

      if (response.data.status === 200 || response.data.status === 201) {
        alert("Đánh giá đã được gửi thành công.");
        setIsFeedbackOpen(false);
        setFeedbackText(""); // Reset nội dung đánh giá sau khi gửi
      } else {
        alert("Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi kết nối với server:", err);
    }

    // Nếu chưa có đánh giá, gửi đánh giá mới

  };

  const handleEditFeedback = () => {

    setIsFeedbackOpen(true);
    setFeedbackText(feedback.comment); // Load nội dung đánh giá cũ vào form
  };
  const handleViewFeeback = () => {
    setIsOpen(!isOpen);
  };

  async function handleDeleteFeedback(id) {
    if (!id) {
      alert("Không tìm thấy ID của đánh giá!");
      return;
    }

    if (window.confirm("Bạn có chắc muốn xóa đánh giá này không?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/hd/feedback/${id}`);
        
        if (response.status === 200) {
          setFeedback(null);
          alert("Đánh giá đã được xóa thành công.");
        }
      } catch (err) {
        console.error("Lỗi khi xóa đánh giá:", err);
        alert("Không thể xóa đánh giá. Vui lòng kiểm tra kết nối mạng.");
      }
    }
  };
  
  
  return (
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
              <NavLink style={({ isActive }) => isActive ? activebar : {}} to="/lookup">Lookup</NavLink>
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
        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <h2>Tra cứu đơn hàng</h2>
            <div className="search-form">
              <div className="input-wrapper">
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <button type="submit">Tìm kiếm</button>
            </div>
          </div>
        </form>

        {item && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Tên khách hàng</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                  <th>Phương thức thanh toán</th>
                  <th>Chi tiết hóa đơn</th>
                  <th>Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.data[0].tenKhachHang}</td>
                  <td>{item.data[0].trangThai}</td>
                  <td>{item.data[0].tongTien}</td>
                  <td>{item.data[0].phuongThucThanhToan}</td>
                  <td>{/* Chi tiết hóa đơn có thể được hiển thị ở đây */}</td>
                  <td>
                    <p>{item.danhGia ? item.danhGia : 'Chưa đánh giá'}</p>
                 

                      <button onClick={() => handleEditFeedback()} className="titledg">
                        Đánh giá ngay
                      </button>
                      <button onClick={() => handleViewFeeback()} className="titledg">
                      {isOpen ? 'Ẩn đánh giá' : 'Xem đánh giá'}
                      </button>


                  </td>
                </tr>
              </tbody>
            </table>
            {error && <p>{error}</p>}
            {isOpen && (
            <form className="table-comment" onSubmit={handleFeedbackSubmit}>

              {feedback ? (
                <div className="view-comment">

                  <div className="backg">
                    <p>Đánh giá ngày: {new Date(feedback.created_at).toLocaleDateString()}</p>
                    <p>{feedback.comment}</p>
                  </div>
                  <p>Đã sửa</p>
                </div>
              ) : (<p>....</p>)}
              <div className="handle-comment">
                <button type="button" onClick={handleEditFeedback}>Sửa</button>
                {/* onClick={handleEdit} */}
                <button type="button" onClick={handleDeleteFeedback}>Xóa</button>
                {/* onClick={handleDelete} */}
              </div>
            </form>
     )}
            {isFeedbackOpen && (
              <form className="ctm-comment" onSubmit={handleFeedbackSubmit}>
                <div className="form-input">
                  <textarea
                    value={feedbackText || item.danhGia}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Nhập nội dung đánh giá của bạn"
                    required
                    className="textarea"
                    readOnly={item.danhGia} // Nếu đã có đánh giá, không cho sửa
                  />
                </div>
                <div className="handle-form">
                  <button type="button" className="dong-button" onClick={() => setIsFeedbackOpen(false)}>Đóng</button>
                  <button type="submit" className="luu-button">Gửi</button>
                </div>
              </form>
            )}
          </div>
        )}

        {error && (
          <div style={{ marginTop: '20px', color: 'red' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}