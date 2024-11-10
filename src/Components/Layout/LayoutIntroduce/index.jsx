import { Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DefaultLogo from '../../../assets/logo.png';
import ScrolledLogo from '../../../assets/logo.png';
import './layoutIntroduce.scss';
export default function LayoutIntroduce() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideUser, setCurrentSlideUser] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(DefaultLogo);


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
      title: <>
        Introduce
      </>,
      cta: 'XEM THÊM'
    },
  ];

  const slidesUser = [
    {
      image: 'https://chamspamassage.com/wp-content/uploads/2023/03/Anh-Duc-2-280x280.jpg',
      content: 'Nhân viên ở đây vô cùng nhiệt tình và dễ thương, đẳng cấp 5 sao nếu có dịp tôi sẽ quay trở lại Sun spa .',
      name: 'XEM THÊM',
    },
    {
      image: 'https://chamspamassage.com/wp-content/uploads/2023/03/4-280x280.jpg',
      content: 'Massage Body là dịch vụ tuyệt vời nhất mà tôi tuefng đượ trải nghiệm ở Sun spa. Thư giản thât sự cảm giác được giống như đang chìm vào sapa. Thật sự ai cũng nên thử một lần .',
      name: 'Sarah johanson',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideUser((prevSlide) => (prevSlide + 1) % slidesUser.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slidesUser.length]);

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
  return (
    <>
      {/* Top Bar */}
      <div className="LayoutService">
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
        <div className="LayoutService-main" >
          <div className="introduct__service" style={{ height: '90vh' }}>
            <h3 className="introduct__service__title">
            Đến với Sun là đến nơi lý tưởng để bạn tận hưởng cuộc sống với không gian phảng phất văn hóa hồn dân tộc, in đậm dấu ấn kiến trúc Chăm Pa cổ kính.Tự hào là đại diện Việt Nam liên tiếp 2 lần được trao tặng giải thưởng Top “Spa Asean”.
            </h3>
            <div className="introduct__service-content">
              <div className="introduct__service-content-background">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="82" height="82"><g fill="#ccdbe8"><path d="m23.807 15.465 1.069.26a28.444 28.444 0 0 1 10.411 5.518 24.725 24.725 0 0 1 6.767 8.777 28.671 28.671 0 0 1 2.234 14.345l-.1 1.246-1.194-.371a28.67 28.67 0 0 1-12.48-7.418 24.723 24.723 0 0 1-5.624-9.55 28.444 28.444 0 0 1-1.241-11.718Zm18.568 27.463c.372-8.409-2.419-15.166-8.307-20.1a27.675 27.675 0 0 0-8.536-4.813 27.673 27.673 0 0 0 1.286 9.715c2.383 7.303 7.615 12.411 15.557 15.199ZM61.865 77.723l-.829-1.82a30.4 30.4 0 0 0 8.409-6.523c3.953-4.24 8.915-11.718 10.106-23.268s-2.143-19.883-5.149-24.84a32.03 32.03 0 0 0-6.433-7.723 32.029 32.029 0 0 0-7.872 6.248c-3.953 4.24-8.915 11.718-10.106 23.268a45.056 45.056 0 0 0-.07 8.757l-1.991.185a47.062 47.062 0 0 1 .072-9.147 44.512 44.512 0 0 1 4.077-14.809 38.707 38.707 0 0 1 6.622-9.695 31.67 31.67 0 0 1 8.974-6.906l.533-.243.472.346a31.671 31.671 0 0 1 7.378 8.591 38.706 38.706 0 0 1 4.509 10.838 46.494 46.494 0 0 1-3.106 30.139 38.7 38.7 0 0 1-6.624 9.691 31.668 31.668 0 0 1-8.972 6.911Z"></path><path d="M44.338 82a46.651 46.651 0 0 1-27.639-9.489 38.7 38.7 0 0 1-8.052-8.542 31.67 31.67 0 0 1-4.83-10.243l-.123-.573.439-.388a28.2 28.2 0 0 1 6.052-3.766 37.61 37.61 0 0 1 7.105-2.553 39.229 39.229 0 0 1 9.507-1.159 46.637 46.637 0 0 1 27.637 9.489 38.708 38.708 0 0 1 8.052 8.542 31.672 31.672 0 0 1 4.83 10.243l.123.573-.439.388a28.188 28.188 0 0 1-6.051 3.766 37.594 37.594 0 0 1-7.1 2.552A39.219 39.219 0 0 1 44.338 82ZM5.924 53.888a32.029 32.029 0 0 0 4.423 9.026c3.3 4.768 9.543 11.213 20.573 14.843A42.948 42.948 0 0 0 44.337 80a36.592 36.592 0 0 0 15.745-3.515 29.15 29.15 0 0 0 5.121-3.083 32.028 32.028 0 0 0-4.423-9.027c-3.3-4.768-9.543-11.213-20.572-14.844a42.943 42.943 0 0 0-13.415-2.242 36.628 36.628 0 0 0-15.677 3.482 29.4 29.4 0 0 0-5.193 3.117Z"></path><path d="m64.791 73.433-.453-37.153 2-.024.453 37.153Z"></path><path d="M64.596 73.925 26.991 62.598l.576-1.916L65.173 72.01ZM.658 48.456A41.418 41.418 0 0 1 0 41.094a40.927 40.927 0 0 1 8.03-24.408 41.406 41.406 0 0 1 5.7-6.251l1.332 1.492A39.167 39.167 0 0 0 2.627 48.1ZM63.058 8.745a39.136 39.136 0 0 0-41.215-1.683l-.986-1.74a41.137 41.137 0 0 1 43.327 1.769Z"></path></g></svg>
                </div>
                <div className="title"> Massage body 60p </div>
                <div className="desc">Lorem ipsum dolor sit amet, consec tetur adipiscing elit, seddo eiusmod </div>
              </div>
              <div className="introduct__service-content-background">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="115" height="82"><g fill="#ccdbe8"><path d="M38.257 76.83a37.771 37.771 0 0 1-14.894-3.032A38.461 38.461 0 0 1 0 38.448v-.062A38.518 38.518 0 0 1 23.363 3.034a38.227 38.227 0 0 1 53.151 35.224v.316a38.229 38.229 0 0 1-17.7 32.27 1 1 0 0 1-1.076-1.686 36.13 36.13 0 0 0 16.775-30.544V38.215a36.257 36.257 0 1 0-72.514.2v.005a36.378 36.378 0 0 0 36.257 36.412 36.75 36.75 0 0 0 5.416-.4 1 1 0 0 1 .3 1.978 38.758 38.758 0 0 1-5.715.42Z"></path><path d="M56.934 52.617a1 1 0 0 1-.648-.239l-17.6-14.993a1 1 0 0 1-.113-1.409 1 1 0 0 1 1.409-.113l17.6 14.993a1 1 0 0 1-.649 1.761ZM56.935 35.017a1 1 0 0 1-.684-.271c-7.839-7.353-14.15-12.312-14.213-12.361a1 1 0 1 1 1.234-1.574c.064.05 6.445 5.064 14.348 12.477a1 1 0 0 1-.684 1.729Z"></path><path d="M56.935 52.617a1 1 0 0 1-.762-.352 1 1 0 0 1 .113-1.41l17.602-14.992a1 1 0 0 1 1.41.113 1 1 0 0 1-.113 1.41L57.583 52.379a1 1 0 0 1-.648.238ZM56.935 35.017a1 1 0 0 1-.684-1.729c7.9-7.413 14.283-12.427 14.347-12.477a1 1 0 0 1 1.234 1.574c-.063.049-6.379 5.013-14.212 12.361a1 1 0 0 1-.685.271Z"></path><path d="M75.777 76.83a37.77 37.77 0 0 1-14.894-3.032 38.461 38.461 0 0 1-23.365-35.35v-.062a38.492 38.492 0 0 1 18.6-32.917 1 1 0 1 1 1.034 1.712 36.437 36.437 0 0 0 18.617 67.65 36.3 36.3 0 0 0 36.258-36.2v-.435A36.269 36.269 0 0 0 70.457 2.39a1 1 0 0 1-.293-1.978 38.4 38.4 0 0 1 5.605-.411 38.226 38.226 0 0 1 38.258 38.257v.316a38.226 38.226 0 0 1-38.25 38.256Z"></path><path d="M56.935 70.871a1 1 0 0 1-1-1V6.638a1 1 0 0 1 1-1 1 1 0 0 1 1 1v63.233a1 1 0 0 1-1 1Z"></path></g></svg>
                </div>
                <div className="title">
                Massage body 60p
                </div>
                <div className="desc">
                  Lorem ipsum dolor sit amet, consec tetur adipiscing elit, seddo eiusmod
                </div>
              </div>
              <div className="introduct__service-content-background">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="76" height="82"><g fill="#ccdbe8"><path d="M50.284 4.931a35.029 35.029 0 0 0-26.576-.606l-.719-1.866a37.029 37.029 0 0 1 28.1.642ZM71.576 51.045l-1.866-.719a35.029 35.029 0 0 0-.607-26.575l1.831-.8a37.029 37.029 0 0 1 .641 28.1ZM35.354 37.622l-.031-1c0-.073 0-.147-.005-.22 0-.1 0-.2-.008-.285l-.05-1.069 2.183.045-.048 1.026c0 .086-.006.178-.007.274v.227l-.029.941Z"></path><path d="M37.353 37.775h-2c0-.3-.01-.594-.021-.906q0-.125-.008-.249l-.032-1 2.125-.062-.034 1.063q0 .137-.009.274c-.011.302-.021.59-.021.88Z"></path><path d="M36.186 37.065A36.9 36.9 0 0 1 .165 1.884L.115.815l1.07.023a36.995 36.995 0 0 1 33.33 22.718l.42 1.005-1.038.332a19.525 19.525 0 0 1-8.96.277 19.745 19.745 0 0 1-8.052-3.578 26.586 26.586 0 0 1-7.61-9.391l1.78-.912c3.448 6.731 8.247 10.741 14.266 11.918a18.51 18.51 0 0 0 6.875.038A35.3 35.3 0 0 0 18.23 7.707a34.919 34.919 0 0 0-16-4.832 34.933 34.933 0 0 0 34 32.189Z"></path><path d="M72.31.818c.156 0 .305.005.449.01l.251.007 1.027.02-.048 1.026a36.915 36.915 0 0 1-36.913 35.2c-.154 0-.3-.005-.443-.01l-.257-.008-1.027-.02.048-1.026A36.934 36.934 0 0 1 72.31.817ZM37.458 35.084A34.95 34.95 0 0 0 71.928 2.82a34.965 34.965 0 0 0-34.47 32.264Z"></path><path d="m35.354 35.762 2 .06.029.94v.227c0 .1 0 .188.007.274l.049 1.047h-1.096l-1.086.033.051-1.079c0-.09.006-.185.008-.285 0-.074 0-.147.005-.22Z"></path><path d="M35.353 35.603h2c0 .29.01.579.021.884q0 .137.009.274l.034 1.063-2.125-.063.032-1q0-.123.008-.246c.01-.316.021-.613.021-.912Z"></path><path d="m37.358 36.29-.05 1.069A36.9 36.9 0 0 1 1.184 72.542l-1.07.023.05-1.069a36.908 36.908 0 0 1 36.124-35.183ZM2.23 70.502a34.929 34.929 0 0 0 33.013-32.151A34.932 34.932 0 0 0 2.23 70.502Z"></path><path d="M72.31 72.561a36.982 36.982 0 0 1-34.436-23.527l1.863-.728a34.982 34.982 0 0 0 32.191 22.252 34.948 34.948 0 0 0-34.852-32.265h-.2l-.069-2h.266a36.917 36.917 0 0 1 36.913 35.2l.048 1.026-1.027.02-.252.007c-.14.01-.289.015-.445.015ZM2.458 51.044a37.029 37.029 0 0 1 .642-28.1l1.831.8a35.029 35.029 0 0 0-.607 26.575ZM36.259 74.034a36.775 36.775 0 0 1-13.27-2.458l.719-1.866a35.029 35.029 0 0 0 26.576-.607l.8 1.831a36.661 36.661 0 0 1-14.825 3.1Z"></path></g></svg>
                </div>
                <div className="title">
              Massage body 60p
                </div>
                <div className="desc">
                  Lorem ipsum dolor sit amet, consec tetur adipiscing elit, seddo eiusmod
                </div>
              </div>
            </div>
          </div>

          <div className="introduct__user">
            <div className="introduct__user-grid">
              <div className="introduct__user-background">
                <div className="content-user">
                  <img src="https://htmediagroup.vn/wp-content/uploads/2022/03/Anh-ba-si-2.jpg" alt="" />
                  <div className="content-user-hover">
                    <div className="list">
                      <a href="/">fb</a>
                      <a href="/">ln</a>
                      <a href="/">be</a>
                      <a href="/">Ig</a>
                    </div>
                  </div>
                </div>
                <div className="introduct__user-fullname">
                  <h3> Huỳnh Thị Hoàng</h3>
                  <p>Bác sĩ chuyên gia về Massage</p>
                </div>
              </div>
              <div className="introduct__user-background">
                <div className="content-user">
                  <img src="https://htmediagroup.vn/wp-content/uploads/2022/09/Anh-bac-si-3-min.jpg" alt="" />
                  <div className="content-user-hover">
                    <div className="list">
                      <a href="/">fb</a>
                      <a href="/">ln</a>
                      <a href="/">be</a>
                      <a href="/">Ig</a>
                    </div>
                  </div>
                </div>
                <div className="introduct__user-fullname">
                  <h3>Trần Thị Nhật</h3>
                  <p> Chuyên gia tư vấn y khoa da liễu</p>
                </div>
              </div>
              <div className="introduct__user-background">
                <div className="content-user">
                  <img src="https://s1.media.ngoisao.vn/news/2022/12/30/bac-si-ngueyn-thi-duyen-2-ngoisaovn-w575-h863.png" alt="" />
                  <div className="content-user-hover">
                    <div className="list">
                      <a href="/">fb</a>
                      <a href="/">ln</a>
                      <a href="/">be</a>
                      <a href="/">Ig</a>
                    </div>
                  </div>
                </div>
                <div className="introduct__user-fullname">
                  <h3> Đặng Thị Chiến </h3>
                  <p>
                 Bác sĩ y khoa spa
                  </p>
                </div>
              </div>
              <div className="introduct__user-background">
                <div className="content-user">
                  <img src="https://cf.shopee.vn/file/sg-11134201-22120-rvmv6jfvnjkv82" alt="" />
                  <div className="content-user-hover">
                    <div className="list">
                      <a href="/">fb</a>
                      <a href="/">ln</a>
                      <a href="/">be</a>
                      <a href="/">Ig</a>
                    </div>
                  </div>
                </div>
                <div className="introduct__user-fullname">
                  <h3>Phạm Thị Lộc 
                  </h3>
                  <p> Bac sĩ spa hàng đầu Việt Nam</p>
                </div>
              </div>
            </div>
          </div>

          <div className="Allabout">
            <h1> Đánh giá của khách hàng </h1>
            <div className="carousel">
              <div className="slide-container">
                <img src={slidesUser[currentSlideUser].image} alt={slidesUser[currentSlideUser].name} />
                <p>{slidesUser[currentSlideUser].content}</p>
                <h3>{slidesUser[currentSlideUser].name}</h3>

                <div className="controls">
                  <button
                    className="prev"
                    onClick={() =>
                      setCurrentSlideUser((prevSlide) => (prevSlide - 1 + slidesUser.length) % slidesUser.length)
                    }
                  >
                    Prev
                  </button>
                  <button
                    className="next"
                    onClick={() => setCurrentSlideUser((prevSlide) => (prevSlide + 1) % slidesUser.length)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}