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
              <h6 className="inner-title">Introduction</h6>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="beta-breadcrumb font-large">
                <a href="/">Home</a> / <span>Introduction</span>
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
                      <b>470 Tran Dai Nghia Street, Ngu Hanh Son, Da Nang</b>
                    </p>
                    <div className="space20">&nbsp;</div>
                    <p>
                      Fall Shop is not just about beautiful fashion; we are
                      eager to create social values and become a lifestyle to
                      accompany everyone on the journey to understand their own
                      beauty.
                    </p>
                    <p>
                      Fall Shop is a trusted online shopping channel with a
                      professional team, committed to providing the best
                      products at reasonable prices, reliable quality, and the
                      best service for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="achievements text-center mb-5">
            <h2>Achievements</h2>
            <p>
              We thank our loyal customers for their comments and feedback. We
              take all suggestions into account and strive to improve to bring
              the best products and services to our customers.
            </p>
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-user"></i>
                  </p>
                  <p className="beta-counter-value">19855</p>
                  <p className="beta-counter-title">Annual Customers</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-picture-o"></i>
                  </p>
                  <p className="beta-counter-value">3568</p>
                  <p className="beta-counter-title">Customer Photos</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-clock-o"></i>
                  </p>
                  <p className="beta-counter-value">258934</p>
                  <p className="beta-counter-title">Operating Hours</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="beta-counter">
                  <p className="beta-counter-icon">
                    <i className="fa fa-pencil"></i>
                  </p>
                  <p className="beta-counter-value">150</p>
                  <p className="beta-counter-title">Shared Posts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="team mb-5">
            <h2 className="text-center">Position</h2>
            <h5 className="text-center">Founder of Fall Shop</h5>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="beta-person media">
                  <img
                    className="mr-3 img-fluid rounded-circle"
                    src="/images/im13.jpg"
                    alt="Hoàng Đình Hiếu"
                  />
                  <div className="media-body">
                    <h5>Hoang Dinh Hieu</h5>
                    <p>Shop Owner</p>
                    <p>
                      I hope the shop continues to grow and bring the best
                      experience to customers.
                    </p>
                    <a href="https://www.facebook.com/hieufall/">Facebook</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="beta-person media">
                  <img
                    className="mr-3 img-fluid rounded-circle"
                    src="/images/im12.jpg"
                    alt="Hoàng Đình Hiếu"
                  />
                  <div className="media-body">
                    <h5>Hoang Dinh Hieu</h5>
                    <p>Marketing staff</p>
                    <p>
                      I hope the store will reach more customers and achieve
                      good sales.
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
