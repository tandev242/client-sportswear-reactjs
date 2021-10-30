import React from "react";
import { Link } from "react-router-dom";
import { CustomerCare, About, SocialNetwork, Contact } from "./FooterData";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Customer Care */}
          <div className="col-3">
            <div className="footer-action">
              <h4 className="footer-action__heading">{CustomerCare.name}</h4>
              <ul className="footer-action__list">
                {CustomerCare.policy.map((item) => {
                  return (
                    <li className="footer-action__list-item">
                      <Link to="#" className="footer-action__list-item-link">
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* About DoubleT Sport */}
          <div className="col-3">
            <div className="footer-action">
              <h4 className="footer-action__heading">{About.name}</h4>
              <ul className="footer-action__list">
                {About.list.map((item) => {
                  return (
                    <li className="footer-action__list-item">
                      <Link to="#" className="footer-action__list-item-link">
                        {item.item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Follow  */}
          <div className="col-3">
            <div className="footer-action">
              <h4 className="footer-action__heading">{SocialNetwork.name}</h4>
              <ul className="footer-action__list">
                {SocialNetwork.media.map((item) => (
                  <li className="footer-action__list-item">
                    <Link
                      to="#"
                      className="footer-action__list-item-link link-flex"
                    >
                      <span className="footer-action__list-item-link-icon">
                        {item.icon}
                      </span>
                      <p className="footer-action__list-item-link-text">
                        {item.name}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="col-3">
            <div className="footer-action">
              <h4 className="footer-action__heading">{Contact.name}</h4>
              <ul className="footer-action__list">
                {Contact.information.map((item) => (
                  <li className="footer-action__list-item">
                    <a
                      href=""
                      className="footer-action__list-item-link link-flex"
                    >
                      <span className="footer-action__list-item-link-icon">
                        {item.icon}
                      </span>
                      <p className="footer-action__list-item-link-text">
                        {item.name}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="footer-copyright">
          © Bản quyền thuộc về <h4>DOUBLET SPORT</h4>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
