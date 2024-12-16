import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Introduce = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="inner-header bg-light py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h6 className="inner-title">Giới thiệu</h6>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="beta-breadcrumb font-large">
                <a href="/">Home</a> / <span>Giới thiệu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mt-4">
        <div id="content">
          {/* History Section */}
          <div className="our-history mb-5">
            <h2 className="text-center">Fall Shop</h2>
            <div className="space35">&nbsp;</div>
            <div className="history-slider">
              <div className="history-slides">
                <div className="row">
                  <div className="col-sm-5">
                    <img
                      src="https://lh3.google.com/u/0/d/1u2O6EXVbl8h0HCuFMzlk_1ZGBAOLdtbO=w1365-h640-iv1"
                      alt="Fall Shop"
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-sm-7">
                    <p>
                      <b>470 Đường Trần Đại Nghĩa, Ngũ Hành Sơn, Đà Nẵng</b>
                    </p>
                    <div className="space20">&nbsp;</div>
                    <p>
                      Fall Shop chúng tôi không đơn thuần là cái đẹp thời trang,
                      chúng tôi khao khát kiến tạo những giá trị xã hội nhân
                      văn, trở thành một lối sống để đồng hành cùng mọi người
                      trên hành trình thấu cảm vẻ đẹp của chính mình.
                    </p>
                    <p>
                      Fall Shop là kênh mua sắm online uy tín hàng đầu, cùng với
                      đội ngũ nhân viên chuyên nghiệp, chúng tôi cam kết đem
                      những sản phẩm tốt nhất, với giá cả phải chăng, uy tín và
                      chất lượng với dịch vụ tốt nhất đến với mọi người.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="achievements text-center mb-5">
            <h2>Thành tích</h2>
            <p>
              Cảm ơn những khách hàng lâu năm đã để lại những bình luận và góp ý
              đến Fall Shop chúng tôi, chúng tôi xin tiếp thu và ghi nhận ý kiến
              của mọi người để hoàn thiện hơn và ngày càng tốt hơn để mang lại
              những sản phẩm, dịch vụ tốt nhất đến khách hàng.
            </p>
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-user"></i>
                  </p>
                  <p className="beta-counter-value">19855</p>
                  <p className="beta-counter-title">Khách hàng hàng năm</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-picture-o"></i>
                  </p>
                  <p className="beta-counter-value">3568</p>
                  <p className="beta-counter-title">Ảnh khách hàng</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-clock-o"></i>
                  </p>
                  <p className="beta-counter-value">258934</p>
                  <p className="beta-counter-title">Giờ hoạt động</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-pencil"></i>
                  </p>
                  <p className="beta-counter-value">150</p>
                  <p className="beta-counter-title">Bài viết chia sẻ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="team mb-5">
            <h2 className="text-center">Vị trí</h2>
            <h5 className="text-center">Người sáng lập Fall Shop</h5>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="beta-person media">
                  <img
                    className="mr-3 img-fluid rounded-circle"
                    src="https://lh3.google.com/u/0/d/1wmysT5VjpQjo1tpJVwiKtz0eTGruGM0p=w1365-h291-iv1"
                    alt="Hoàng Đình Hiếu"
                  />
                  <div className="media-body">
                    <h5>Hoàng Đình Hiếu</h5>
                    <p>Chủ shop</p>
                    <p>
                      Hy vọng Shop ngày càng phát triển và đem lại được trải
                      nghiệm tốt nhất cho khách hàng
                    </p>
                    <a href="https://www.facebook.com/hieufall/">Facebook</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
