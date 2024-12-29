import React from "react";
import "../css/Contact.css"; // Ensure you have imported this CSS file into your component.

const Contact = () => {
  return (
    <div>
      {/* Inner header */}
      <div className="inner-header">
        <div className="container">
          <div className="pull-left">
            <h6 className="inner-title">Contact, Feedback</h6>
          </div>
          <div className="pull-right">
            <div className="beta-breadcrumb font-large">
              <a href="/">Home</a> / <span>Contact</span>
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
              <h2>Contact Information</h2>
              <div className="space20">&nbsp;</div>
              <h6 className="contact-title">Address</h6>
              <p>
                470 Tran Dai Nghia Street, Hoa Hai, Ngu Hanh Son, Da Nang
                <br />
              </p>
              <div className="space20">&nbsp;</div>
              <h6 className="contact-title">Cooperation Request</h6>
              <p>
                If you have any suggestions or questions, please contact us via
                email{" "}
                <a href="mailto:hdhieu.20it3@vku.udn.vn">
                  hdhieu.20it3@vku.udn.vn
                </a>
              </p>
              <div className="space20">&nbsp;</div>
              <h6 className="contact-title">Apply for Jobs</h6>
              <p>
                When there is a recruitment notice, you can contact us via email{" "}
                <a href="mailto:hdhieu.20it3@vku.udn.vn">
                  hdhieu.20it3@vku.udn.vn
                </a>
              </p>
            </div>

            {/* Contact Form */}
            <div className="col-sm-8">
              <h2>Send Feedback to Us Here</h2>
              <div className="space20">&nbsp;</div>
              <p>
                For any questions or feedback, please send them to us for the
                fastest support.
              </p>
              <div className="space20">&nbsp;</div>
              <form action="#" method="post" className="contact-form">
                <div className="form-block">
                  <input
                    name="your-name"
                    type="text"
                    placeholder="Your Name (required)"
                  />
                </div>
                <div className="form-block">
                  <input
                    name="your-email"
                    type="email"
                    placeholder="Email (required)"
                  />
                </div>
                <div className="form-block">
                  <input
                    name="your-subject"
                    type="text"
                    placeholder="Subject"
                  />
                </div>
                <div className="form-block">
                  <textarea
                    name="your-message"
                    placeholder="Message"
                  ></textarea>
                </div>
                <div className="form-block">
                  <button type="submit" className="beta-btn primary">
                    Send Message<i className="fa fa-chevron-right"></i>
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
