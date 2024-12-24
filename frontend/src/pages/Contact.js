import React from "react";
import "../css/Contact.css"; // Đảm bảo bạn đã import file CSS này vào trong component của bạn.

const Contact = () => {
  return (
    <div>
      {/* Inner header */}
      <div className="inner-header">
        <div className="container">
          <div className="pull-left">
            <h6 className="inner-title">Liên hệ, góp ý</h6>
          </div>
          <div className="pull-right">
            <div className="beta-breadcrumb font-large">
              <a href="/">Trang chủ</a> / <span>Liên hệ</span>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="beta-map">
        <div className="abs-fullwidth beta-map wow flipInX">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.736468488049!2d108.2512875147148!3d15.975132788939106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108997dc971f%3A0x1295cb3d313469c9!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIFZp4buHdCAtIEjDoG4!5e0!3m2!1svi!2s!4v1638735537966!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container">
        <div id="content" className="space-top-none">
          <div className="space50">&nbsp;</div>
          <div className="row">
            <div className="col-sm-4">
              <h2>Thông tin liên hệ</h2>
              <div className="space20">&nbsp;</div>
              <h6 className="contact-title">Địa chỉ</h6>
              <p>
                470 Đường Trần Đại Nghĩa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng
                <br />
              </p>
              <div className="space20">&nbsp;</div>
              <h6 className="contact-title">Yêu cầu hợp tác</h6>
              <p>
                Nếu bạn có góp ý hay thắc mắc, vui lòng liên hệ qua email{" "}
                <a href="mailto:hdhieu.20it3@vku.udn.vn">
                  hdhieu.20it3@vku.udn.vn
                </a>
              </p>
              <div className="space20">&nbsp;</div>
              <h6 className="contact-title">Ứng tuyển</h6>
              <p>
                Khi có thông báo tuyển nhân viên, bạn có thể liên hệ qua email{" "}
                <a href="mailto:hdhieu.20it3@vku.udn.vn">
                  hdhieu.20it3@vku.udn.vn
                </a>
              </p>
            </div>

            {/* Contact Form */}
            <div className="col-sm-8">
              <h2>Gửi góp ý cho chúng tôi tại đây</h2>
              <div className="space20">&nbsp;</div>
              <p>
                Mọi thắc mắc, góp ý xin hãy gửi đến chúng tôi để có thể được hỗ
                trợ nhanh nhất.
              </p>
              <div className="space20">&nbsp;</div>
              <form action="#" method="post" className="contact-form">
                <div className="form-block">
                  <input
                    name="your-name"
                    type="text"
                    placeholder="Tên của bạn (bắt buộc)"
                  />
                </div>
                <div className="form-block">
                  <input
                    name="your-email"
                    type="email"
                    placeholder="Email (bắt buộc)"
                  />
                </div>
                <div className="form-block">
                  <input name="your-subject" type="text" placeholder="Chủ đề" />
                </div>
                <div className="form-block">
                  <textarea
                    name="your-message"
                    placeholder="Tin nhắn"
                  ></textarea>
                </div>
                <div className="form-block">
                  <button type="submit" className="beta-btn primary">
                    Gửi tin nhắn<i className="fa fa-chevron-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
