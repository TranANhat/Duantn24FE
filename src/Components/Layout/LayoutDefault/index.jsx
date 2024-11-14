import Header from '../../Header/index';
import { useEffect, useState } from 'react';
import './LayoutDefault.scss';
import MapComponent from '../../Map/map';

export default function LayoutDefault() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideProduct, setCurrentSlideProduct] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const slides = [
    {
      image: 'https://chamspamassage.com/wp-content/uploads/2023/03/Doi-ngu-Cham-2.png',
      content: 'Sun Spa & Massage sở hữu đội ngũ lành nghề, giàu kinh nghiệm được đào tạo chuyên sâu từ các trường y dược hàng đầu Việt Nam.',
      name: 'Xem thêm',
    },
    {
      image: 'https://tse4.mm.bing.net/th?id=OIP.zHz1ubYp2sOIl9E6ON99vgHaFf&pid=Api&P=0&h=180',
      content: 'Đội ngũ spa là những chuyên gia có kinh nghiệm và kiến thức sâu rộng trong nhiều lĩnh vực khác nhau. Chúng tôi cam kết mang đến cho bạn những bài viết chất lượng và hữu ích nhất..',
      name: 'Xem thêm',
    },
  ];

  const products = [
    {
      id: 1,
      name: 'Massage Body 60 phút',
      price: 20.00,
      originalPrice: 400.000,
      image: 'https://i.pinimg.com/564x/00/92/ad/0092ad62eca2b1f5cc5d93941b143796.jpg',
      onSale: true,
    },
    {
      id: 2,
      name: 'Massage Body 90 phút',
      price: 600.000,
      image: 'https://i.pinimg.com/564x/ca/6c/6a/ca6c6a4c49d4cb4641d0cccbf197e414.jpg',
      onSale: false,
    },
    {
      id: 3,
      name: 'Massage Body 120 phút',
      price: 800.000,
      image: 'https://i.pinimg.com/564x/69/6a/bb/696abbc06bfd88cdb6fdfcc7c7f5e8f2.jpg',
      onSale: false,
    },
    {
      id: 4,
      name: 'Massage Body 140 phút',
      price: 900.000,
      image: 'https://i.pinimg.com/564x/b1/66/91/b16691c96acd3e1e260f4c3942d3d1fa.jpg',
      onSale: false,
    }
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


  const rotateArray = (arr, count) => {
    const rotatedPart = arr.slice(count);
    const remainingPart = arr.slice(0, count);
    return [...rotatedPart, ...remainingPart];
  };

  const getVisibleProducts = () => {
    return rotateArray([...products], currentSlideProduct);
  };

  // Handle next slide
  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlideProduct((prev) => (prev + 1) % products.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with CSS transition duration
  };

  // Handle previous slide
  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlideProduct((prev) => (prev - 1 + products.length) % products.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <>
      <div className="Layout">
        <header className="Layout__header">
          <Header />
        </header>
        <main className="Layout__main">
          <div className="mains">
            <div className="mains-grid">
              <div className="mains-grid__content">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="61.686" height="61.757"><path d="M29.159 38.67h-1V17.457L22.183 3.928l-.236-.452a4.973 4.973 0 0 0-9.274 2.5v7.395h-1V5.724h.005a5.973 5.973 0 0 1 11.139-2.735l.011.019.262.505 6.067 13.736ZM54.164 45.505h-1V17.457L47.188 3.928l-.236-.452a4.973 4.973 0 0 0-9.273 2.5v7.395h-1V5.976a5.973 5.973 0 0 1 11.144-2.987l.011.019.262.505 6.067 13.736Z"></path><path d="M53.665 33.925H28.659v-1h25.006ZM53.665 24.465h-21.11v-1h21.11ZM61.666 49.504a46.056 46.056 0 0 1-12.892-2.522c-4.48-1.439-9.2-3.362-13.761-5.222-6.161-2.511-12.531-5.108-18.456-6.577-6.592-1.635-11.9-1.663-16.214-.085L0 34.159a21.767 21.767 0 0 1 8.046-1.224 39.779 39.779 0 0 1 8.752 1.278c5.995 1.487 12.4 4.1 18.593 6.622 9.051 3.69 18.411 7.5 26.3 7.67ZM52.186 61.758a152.4 152.4 0 0 1-17.17-6.232c-11.431-4.66-23.252-9.478-32.6-7.281l-.229-.973a24.6 24.6 0 0 1 7.667-.481 45.226 45.226 0 0 1 8.225 1.518A155.62 155.62 0 0 1 35.395 54.6a151.7 151.7 0 0 0 17.052 6.192Z"></path></svg>
                </div>
                <div className="content-desc">
                  <h3>Massage Body </h3>
                  <p>Massage body là kỹ năng cơ bản của kỹ thuật viên spa, giúp giải tỏa căng thẳng, xoa tan mệt mỏi, và trấn an tinh thần bằng cách áp dụng các động tác xoa bóp, day ấn lên huyệt đạo và cơ bắp.</p>
                </div>
              </div>
              <div className="mains-grid__content">
                <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-8.jpg" alt="" />
              </div>
              <div className="mains-grid__content">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="65.885" height="61.817"><g fill="#002c36"><path d="M20.498 6.553a6.58 6.58 0 1 1 5.963 7.144 6.587 6.587 0 0 1-5.963-7.144Zm12.11 1.092A5.58 5.58 0 1 0 26.55 12.7a5.586 5.586 0 0 0 6.058-5.056ZM24.071 22.14a.5.5 0 0 1-.5-.565 5.25 5.25 0 0 0 .017-1.32.5.5 0 0 1 .993-.119 6.233 6.233 0 0 1-.018 1.569.5.5 0 0 1-.492.435Z"></path><path d="M.5 37.499a.5.5 0 0 1-.419-.772l12.366-19.122a8.041 8.041 0 0 1 2.455-2.3 5.967 5.967 0 0 1 6.643.348 6.142 6.142 0 0 1 3.039 4.479.5.5 0 0 1-.993.119 5.19 5.19 0 0 0-2.589-3.758 5 5 0 0 0-5.592-.326 7.071 7.071 0 0 0-2.123 1.98L.92 37.266a.5.5 0 0 1-.42.233ZM11.43 42.989a.5.5 0 0 1-.271-.08.5.5 0 0 1-.148-.691l7.127-11.021a.5.5 0 0 1 .692-.148.5.5 0 0 1 .148.691L11.85 42.761a.5.5 0 0 1-.42.228Z"></path><path d="M18.557 31.969a.5.5 0 0 1-.488-.394 29.453 29.453 0 0 1-.558-7.692.502.502 0 0 1 1 .078 28.985 28.985 0 0 0 .538 7.4.5.5 0 0 1-.489.607Z"></path><path d="M31.787 45.098a.5.5 0 0 1-.271-.08l-8.933-5.778c-2.2-1.42-3.714-4-4.513-7.665a.5.5 0 0 1 .977-.213c.741 3.4 2.113 5.767 4.079 7.038l8.933 5.773a.5.5 0 0 1-.272.92ZM24.087 20.693h-.022a.5.5 0 0 1-.478-.52.5.5 0 0 1 .522-.48.5.5 0 0 1 .478.522.5.5 0 0 1-.5.478Z"></path><path d="M24.071 22.14a.5.5 0 0 1-.5-.5c0-.741.011-1.262.017-1.452v-.006a.5.5 0 0 1 1 .012s0 .01 0 .026c-.006.184-.019.692-.017 1.417a.5.5 0 0 1-.5.5Z"></path><path d="M34.817 39.913 27.16 34.96c-1.422-.92-2.44-3.04-3.026-6.3a42.132 42.132 0 0 1-.564-7.019.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5 41.124 41.124 0 0 0 .549 6.845c.527 2.935 1.421 4.885 2.585 5.637l7.657 4.953ZM21.309 61.817a.5.5 0 0 1-.5-.5V43.579H1.551a.5.5 0 0 1 0-1h19.758a.5.5 0 0 1 .5.5v18.239a.5.5 0 0 1-.5.499ZM65.386 55.737H53.227c-2.251 0-3.782-2.2-5.4-4.526-1.995-2.866-4.256-6.113-8.277-6.113h-7.6a.5.5 0 0 1 0-1h7.6a8.078 8.078 0 0 1 5.51 2.182 23.863 23.863 0 0 1 3.588 4.36c1.53 2.2 2.852 4.1 4.581 4.1h12.159a.5.5 0 0 1 0 1ZM61.524 61.817H50.187c-3.247 0-4.867-1.62-6.433-3.186-1.488-1.488-2.893-2.893-5.726-2.893h-15.2a.5.5 0 1 1 0-1h15.2c3.247 0 4.867 1.62 6.433 3.186 1.488 1.488 2.893 2.893 5.726 2.893h11.337a.5.5 0 0 1 0 1Z"></path><path d="M56.267 36.499a6.58 6.58 0 1 1-6.58 6.58 6.587 6.587 0 0 1 6.58-6.58Zm0 12.159a5.58 5.58 0 1 0-5.58-5.579 5.586 5.586 0 0 0 5.58 5.579Z"></path></g></svg>
                </div>
                <div className="content-desc">
                  <h3>Massage dưới xương quai xanh</h3>
                  <p>Dùng đầu ngón tay hoặc lòng bàn tay, massage nhẹ nhàng vùng dưới xương quai xanh để giúp giảm đau nhức và giữ cho cơ thể được thư giãn..</p>
                </div>
              </div>


              <div className="mains-grid__content">
                <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-9.jpg" alt="" />
              </div>

              <div className="mains-grid__content">
                <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-10.jpg" alt="" />
              </div>
              <div className="mains-grid__content">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="71.595" height="64.783"><g fill="#002c36"><path d="M51.269 13.442a.5.5 0 0 1-.474-.342c-.841-2.523.633-3.775 1.933-4.88 1.125-.956 2.188-1.859 2.188-3.573a.5.5 0 0 1 1 0c0 2.176-1.35 3.323-2.541 4.335-1.262 1.072-2.259 1.92-1.632 3.8a.5.5 0 0 1-.474.658ZM58.827 13.442a.5.5 0 0 1-.474-.342c-.841-2.523.633-3.775 1.933-4.88 1.125-.956 2.188-1.859 2.188-3.573a.5.5 0 0 1 1 0c0 2.176-1.35 3.323-2.541 4.335-1.262 1.072-2.259 1.92-1.632 3.8a.5.5 0 0 1-.474.658ZM9.371 13.442a.5.5 0 0 1-.474-.342c-.841-2.523.633-3.775 1.933-4.88 1.125-.956 2.188-1.859 2.188-3.573a.5.5 0 0 1 1 0c0 2.176-1.35 3.323-2.541 4.335-1.262 1.072-2.259 1.92-1.632 3.8a.5.5 0 0 1-.474.658ZM16.93 13.442a.5.5 0 0 1-.474-.342c-.841-2.523.633-3.775 1.933-4.88 1.125-.956 2.188-1.859 2.188-3.573a.5.5 0 0 1 1 0c0 2.176-1.35 3.323-2.541 4.335-1.262 1.072-2.259 1.92-1.632 3.8a.5.5 0 0 1-.474.658ZM36.062 0a6.03 6.03 0 1 1-6.03 6.03A6.037 6.037 0 0 1 36.062 0Zm0 11.059a5.03 5.03 0 1 0-5.03-5.029 5.035 5.035 0 0 0 5.03 5.029ZM15.324 38.325a.5.5 0 0 1-.035-1c2.108-.15 3.426-.809 4.276-2.134.831-1.3 1.221-3.176 1.715-5.554.145-.7.3-1.423.469-2.193 1.21-5.356 2.663-8.375 4.859-10.1 2.277-1.785 5.305-2.143 9.453-2.143a.5.5 0 0 1 0 1c-3.934 0-6.785.323-8.836 1.93-2 1.567-3.346 4.417-4.5 9.529-.172.762-.321 1.48-.466 2.176-.515 2.479-.921 4.437-1.852 5.89-1.023 1.6-2.626 2.419-5.046 2.592Z"></path><path d="M56.798 38.325h-.036c-2.42-.173-4.024-1-5.046-2.592-.931-1.453-1.338-3.411-1.852-5.89-.144-.7-.294-1.414-.466-2.176-1.155-5.112-2.5-7.962-4.5-9.529-2.051-1.607-4.9-1.93-8.837-1.93a.5.5 0 0 1 0-1c4.148 0 7.176.359 9.453 2.143 2.2 1.721 3.65 4.74 4.859 10.1.174.77.324 1.493.469 2.193.494 2.378.884 4.256 1.715 5.554.849 1.325 2.168 1.983 4.276 2.134a.5.5 0 0 1-.035 1ZM26.088 64.781c-1.475 0-2.967-1.187-2.967-3.456a10.226 10.226 0 0 0-1.335-3.7 22.3 22.3 0 0 1-2.813-10.127c0-3.892 2.887-6.149 5.434-8.141 2.182-1.705 4.242-3.316 4.242-5.683v-8.293a.5.5 0 1 1 1 0v8.3a5.558 5.558 0 0 1-1.482 3.674 21.167 21.167 0 0 1-3.144 2.8c-2.483 1.941-5.05 3.948-5.05 7.353a21.15 21.15 0 0 0 2.712 9.689 10.5 10.5 0 0 1 1.436 4.135c0 1.688 1.02 2.456 1.967 2.456a2.191 2.191 0 0 0 1.7-.874 4.658 4.658 0 0 0 .866-2.965 23.612 23.612 0 0 0-.811-7.015 13.917 13.917 0 0 1-.576-4.053c0-1.488 1.026-3.025 2.815-4.218a11.049 11.049 0 0 1 5.98-1.812.5.5 0 0 1 0 1 10.024 10.024 0 0 0-5.425 1.644c-1.484.989-2.369 2.255-2.369 3.386a12.914 12.914 0 0 0 .539 3.791 24.476 24.476 0 0 1 .843 7.269 5.628 5.628 0 0 1-1.09 3.6 3.213 3.213 0 0 1-2.472 1.24Z"></path><path d="M46.035 64.781a3.213 3.213 0 0 1-2.471-1.242 5.628 5.628 0 0 1-1.09-3.6 24.476 24.476 0 0 1 .843-7.269 12.915 12.915 0 0 0 .539-3.791c0-1.131-.886-2.4-2.37-3.386a10.025 10.025 0 0 0-5.425-1.644.5.5 0 0 1 0-1 11.05 11.05 0 0 1 5.98 1.812c1.789 1.193 2.815 2.73 2.815 4.218a13.918 13.918 0 0 1-.572 4.044 23.612 23.612 0 0 0-.811 7.015 4.658 4.658 0 0 0 .866 2.965 2.191 2.191 0 0 0 1.7.874c.948 0 1.967-.769 1.967-2.456a10.5 10.5 0 0 1 1.436-4.135 21.15 21.15 0 0 0 2.712-9.689c0-3.4-2.567-5.412-5.05-7.353a21.169 21.169 0 0 1-3.144-2.8 5.558 5.558 0 0 1-1.482-3.674v-8.289a.5.5 0 0 1 1 0v8.3c0 2.367 2.061 3.978 4.242 5.683 2.547 1.991 5.434 4.248 5.434 8.141a22.3 22.3 0 0 1-2.813 10.127 10.226 10.226 0 0 0-1.335 3.7c-.003 2.264-1.496 3.449-2.971 3.449ZM20.855 43.856H.5a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h20.355a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5Z"></path><path d="M71.094 43.856H51.268a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h19.826a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5Z"></path></g></svg>
                </div>
                <div className="content-desc">
                  <h3>Massage xương quai xanh </h3>
                  <p>Dịch vụ massage cổ vai gáy Đà Nẵng tại Sun Spa & Massage sử dụng hình thức xoa bóp được thực hiện trên vùng cổ, vai và gáy nhằm thúc đẩy quá trình lưu thông máu, giảm đau mỏi và cải thiện sức khỏe chung.</p>
                </div>
              </div>

              <div className="mains-grid__content">
                <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-11.jpg" alt="" />
              </div>
              <div className="mains-grid__content">
                <div className="svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30.513" height="67.612"><g fill="#002c36"><path d="M14.276 67.612a7.806 7.806 0 0 1-8.245-8.246 15.953 15.953 0 0 1 1.827-6.73 10.65 10.65 0 0 0 1.271-4.114c0-2.539-1.36-4.558-2.934-6.9a32.985 32.985 0 0 1-3.132-5.41 20.755 20.755 0 0 1-1.679-7.818c-.108-3.967.9-7.067 2.985-9.213a11.386 11.386 0 0 1 5.049-2.892 22.963 22.963 0 0 1 6.408-.8 14.817 14.817 0 0 1 10.518 3.81 12.3 12.3 0 0 1 2.91 4.332 14.731 14.731 0 0 1 1.014 5.509c0 4.166-1.1 7.311-3.258 9.349-1.911 1.8-4.637 2.728-8.1 2.753h-.061a8.853 8.853 0 0 1-3.494-.729 9.953 9.953 0 0 1-3.046-2.046 10.63 10.63 0 0 1-3.177-6.955c-.193-3.053.369-5.3 1.67-6.689a5.369 5.369 0 0 1 4.1-1.588 4.594 4.594 0 0 1 3.522 1.433 4.665 4.665 0 0 1 1 3.775.5.5 0 0 1-.993-.122 3.7 3.7 0 0 0-.758-2.991 3.568 3.568 0 0 0-2.773-1.1 4.413 4.413 0 0 0-3.367 1.272c-1.1 1.176-1.576 3.175-1.4 5.942.307 4.861 4.212 8.794 8.719 8.794h.055c6.878-.049 10.366-3.785 10.366-11.1 0-7.567-5.4-12.651-13.442-12.651-4.937 0-8.55 1.141-10.74 3.391-1.893 1.945-2.8 4.8-2.7 8.488.164 6.048 2.543 9.581 4.641 12.7 1.666 2.474 3.1 4.611 3.1 7.455a11.486 11.486 0 0 1-1.359 4.524 15.146 15.146 0 0 0-1.739 6.32c0 4.4 2.844 7.246 7.245 7.246 4.971 0 8.437-2 10.595-6.122 1.916-3.658 2.848-9.093 2.848-16.614a.5.5 0 0 1 1 0 60.1 60.1 0 0 1-.66 9.593 24.469 24.469 0 0 1-2.3 7.486 12.153 12.153 0 0 1-4.47 4.917 13.447 13.447 0 0 1-7.016 1.741ZM8.079 10.295a.5.5 0 0 1-.475-.657c.012-.037 1.219-3.75.522-6.314a.5.5 0 1 1 .965-.262c.777 2.857-.483 6.727-.537 6.891a.5.5 0 0 1-.475.342Z"></path><path d="M1.883 14.943a.5.5 0 0 1-.474-.342c-.122-.367-2.961-9.02-.217-12.827A4.389 4.389 0 0 1 4.981 0a3.9 3.9 0 0 1 4.11 3.061.5.5 0 1 1-.965.262A2.912 2.912 0 0 0 4.981.999a3.4 3.4 0 0 0-2.978 1.359c-1 1.381-1.256 3.866-.753 7.187a32.125 32.125 0 0 0 1.107 4.739.5.5 0 0 1-.474.658ZM20.371 11.68a.5.5 0 0 1-.494-.579 23.368 23.368 0 0 0 .31-4.131.502.502 0 1 1 1-.089 23.8 23.8 0 0 1-.319 4.379.5.5 0 0 1-.497.42ZM14.47 5.808a.5.5 0 0 1-.5-.449 4.942 4.942 0 0 0-.175-.95.5.5 0 1 1 .956-.293 5.89 5.89 0 0 1 .214 1.141.5.5 0 0 1-.446.548Z"></path><path d="M14.175 10.295a.5.5 0 0 1-.5-.574 24.989 24.989 0 0 0 .293-4.362.5.5 0 0 1 .995-.1 25.336 25.336 0 0 1-.3 4.612.5.5 0 0 1-.488.424ZM14.276 4.763a.5.5 0 0 1-.478-.354 2.45 2.45 0 0 0-2.62-1.859 2.508 2.508 0 0 0-2.168.942.5.5 0 1 1-.8-.6 3.486 3.486 0 0 1 2.969-1.344 3.43 3.43 0 0 1 3.576 2.568.5.5 0 0 1-.479.646Z"></path><path d="M20.684 7.425a.5.5 0 0 1-.5-.455c-.173-1.932-1.093-2.871-2.812-2.871a2.426 2.426 0 0 0-2.45 1.419.5.5 0 0 1-.909-.417 3.422 3.422 0 0 1 3.359-2c2.237 0 3.59 1.343 3.808 3.782a.5.5 0 0 1-.453.543ZM25.119 13.393a.5.5 0 0 1-.486-.619 9.489 9.489 0 0 0 .2-2.706.502.502 0 1 1 1-.089 10.353 10.353 0 0 1-.225 3.034.5.5 0 0 1-.489.38Z"></path><path d="M25.331 10.523a.5.5 0 0 1-.5-.455c-.174-1.932-1.094-2.871-2.813-2.871a3.3 3.3 0 0 0-1.163.2.5.5 0 0 1-.347-.938 4.276 4.276 0 0 1 1.511-.259c2.237 0 3.589 1.343 3.809 3.781a.5.5 0 0 1-.453.543Z"></path><path d="M29.767 30.433a.5.5 0 0 1-.5-.5V19.089c0-.6.055-1.293.113-2.031.169-2.148.378-4.822-.75-6.042a2.518 2.518 0 0 0-1.961-.721 3.3 3.3 0 0 0-1.163.2.5.5 0 0 1-.347-.938 4.278 4.278 0 0 1 1.51-.259 3.5 3.5 0 0 1 2.7 1.042c1.425 1.541 1.2 4.457 1.012 6.8-.056.718-.11 1.4-.11 1.953v10.844a.5.5 0 0 1-.504.496Z"></path></g></svg>
                </div>
                <div className="content-desc">
                  <h3>Massage cổ tay </h3>
                  <p>Dijxh vụ massage cổ tay Đà Nẵng tại Sun Spa sử dụng hình thức xoa bóp các cổ tay bằng các phương pháp điều trị thích ứng cho cổ tay </p>
                </div>
              </div>
            </div>
            <div className="New_solutions">
              <div className="New_solutions__content">
                <div className="New_solutions__content-left">
                  <div className="image-mini">
                    <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-2.jpg" alt="" />
                  </div>
                  <div className="image-big">
                    <img src="https://calista.qodeinteractive.com/wp-content/uploads/2024/06/h1-img-3.jpg" alt="" />
                  </div>
                </div>
                <div className="New_solutions__content-right">
                  <h2>Dịch vụ massage cổ vai gáy Đà Nẵng tại Sun Spa & Massage</h2>
                  <p>Tại Sun Spa & Massage, dưới đôi tay điêu luyện giàu kinh nghiệm của đội ngũ KTV, bạn hoàn toàn yên tâm tận hưởng và thư giãn cơ thể. Chúng tôi cung cấp đa dạng gói dịch vụ massage cổ vai gáy tại Đà Nẵng phù hợp với mọi đối tượng.

                    Các bài massage cổ vai gáy đều được truyền thụ từ các bậc thầy, bác sĩ hàng đầu chuyên môn Y học cổ truyền. Massage từ thư giãn đến chuyên sâu kết hợp các thảo dược quý hiếm an toàn cho da và sức khỏe..</p>
                  <button className="btn">Liên hệ ngay nhận ưu đãi lên đến 40%</button>
                  <div className="svg-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="53.604" height="40.67"><g fill="#1a1718"><path d="m34.266 32.64-.1-.8c-.049-.379-1.145-9.372 3.906-15.2s14.108-6.011 14.491-6.016l.809-.011.1.8c.049.379 1.145 9.372-3.906 15.2s-14.108 6.011-14.491 6.016ZM52.49 11.627a24.367 24.367 0 0 0-5.159.787 14.9 14.9 0 0 0-12.136 13.994 24.355 24.355 0 0 0-.05 5.219 24.356 24.356 0 0 0 5.159-.788A14.9 14.9 0 0 0 52.44 16.846a24.355 24.355 0 0 0 .049-5.219ZM19.34 32.64l-.809-.011c-.383-.005-9.441-.192-14.492-6.016S.084 11.796.133 11.413l.1-.8.809.011c.383.005 9.441.193 14.492 6.016a15.157 15.157 0 0 1 2.757 4.8 21.512 21.512 0 0 1 1.11 4.85 24.914 24.914 0 0 1 .039 5.544ZM1.115 11.627a24.36 24.36 0 0 0 .05 5.219 14.9 14.9 0 0 0 12.136 13.993 24.358 24.358 0 0 0 5.16.788c.109-.967.869-9.085-3.68-14.331a17 17 0 0 0-8.507-4.882 24.367 24.367 0 0 0-5.159-.787ZM26.802 31.58l-.6-.536a27.035 27.035 0 0 1-3.918-4.581 23.378 23.378 0 0 1-2.542-4.772 16.453 16.453 0 0 1-1.154-5.9c0-8.368 7.3-14.975 7.613-15.252l.6-.539.6.539c.311.277 7.614 6.883 7.614 15.252a16.45 16.45 0 0 1-1.154 5.9 23.374 23.374 0 0 1-2.543 4.772 27.03 27.03 0 0 1-3.917 4.58Zm0-30.239c-.755.691-7.217 6.826-7.217 14.45 0 7.6 6.46 13.755 7.217 14.45.752-.69 7.218-6.846 7.218-14.45 0-7.626-6.464-13.761-7.218-14.45Z"></path><path d="M27.366 40.67h-1V12.629h1Z"></path><path d="m26.535 23.584-2.641-2.301.658-.754 2.641 2.3ZM27.122 17.25l-.512-.859 3.439-2.049.511.86ZM35.077 32.468l-.746-.666 10.505-11.759.746.666Z"></path><path d="m41.623 28.793-3.502-.058.017-1 3.5.058ZM41.925 23.636l-1.183-3.823.955-.3 1.183 3.828ZM18.529 32.468 8.024 20.709l.746-.666 10.5 11.758Z"></path><path d="m11.982 28.793-.017-1 3.503-.058.017 1ZM11.681 23.636l-.955-.3 1.182-3.819.955.3Z"></path></g></svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="Allabout">
              <h2>ĐỘI NGŨ KỸ THUẬT VIÊN</h2>
              <div className="carousel">
                <div className="slide-container">
                  <img src={slides[currentSlide].image} alt={slides[currentSlide].name} />
                  <p>{slides[currentSlide].content}</p>
                  <h3>{slides[currentSlide].name}</h3>

                  <div className="controls">
                    <button
                      className="prev"
                      onClick={() =>
                        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
                      }
                    >
                      Prev
                    </button>
                    <button
                      className="next"
                      onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
                    >
                      Next
                    </button>
                  </div>
                </div>

              </div>
            </div>
            <div className="collection-container">
              <div className="collection-header">
                <h1> UƯ ĐÃI </h1>
                <div className="navigation">
                  <button className="nav-btn" onClick={prevSlide} disabled={isAnimating}>
                    PREV
                  </button>
                  <button className="nav-btn" onClick={nextSlide} disabled={isAnimating}>
                    NEXT
                  </button>
                </div>
              </div>

              <div className="products-grid">
                {getVisibleProducts().map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className={`product-card ${isAnimating ? 'sliding' : ''}`}
                    style={{
                      '--order': index,
                      '--slide-direction': currentSlideProduct === (currentSlideProduct + 1) % products.length ? 1 : -1
                    }}
                  >
                    <div className="product-image">
                      {product.onSale && <span className="sale-tag">SALE</span>}
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <div className="price">
                        {product.originalPrice && (
                          <span className="original-price">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="current-price">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="map">
              <h1 style={{ textAlign: 'center' }}><MapComponent />


              </h1>
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
        </main>
        {/* <footer className="Layout__footer">
          <Footer />
        </footer> */}
      </div>
    </>
  )
}