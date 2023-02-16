import * as React from "react";
import {
  faTwitter,
  faTelegram,
  faFacebookSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Logo } from "components";

const Footer = () => {
  const year = moment().format("YYYY");
  const launchpadVersion = process.env.REACT_APP_CACHE_BUST;

  return (
    <footer>
      <div className="footer pb-2 mt-4 ">
        <div className="spacer"></div>
        <div className="container">
          <div className="row justify-content-md-between">
            <div className="col-12 col-md-4 mt-3">
              <div className="d-flex flex-column">
                <Logo />
                <span className="tagline small text-secondary mt-3">
                  The strategic launchpad for projects with a high chance of
                  making a lasting impact on the world using Elrond, the
                  internet-scale blockchain technology.
                </span>
                <div className="social mt-4">
                  <a
                    target="_blank"
                    className="mr-spacer mb-2"
                    href="https://twitter.com/elrondnetwork"
                    aria-label="Twitter"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    target="_blank"
                    className="mr-spacer mb-2"
                    href="https://t.me/MaiarLaunchpad"
                    aria-label="Telegram"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faTelegram} />
                  </a>
                  <a
                    target="_blank"
                    className="mr-spacer mb-2"
                    href="https://www.facebook.com/ElrondNetwork/"
                    aria-label="Facebook"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faFacebookSquare} />
                  </a>
                  <a
                    target="_blank"
                    className="mr-spacer mb-2"
                    href="https://mt.linkedin.com/company/elrondnetwork"
                    aria-label="LinkedIn"
                    rel="noreferrer nofollow"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row">
                <div className="col-md-4 mt-3">
                  <p className="font-weight-normal">Launchpad</p>
                  <ul className="list-unstyled footer-column">
                    <li>
                      <a href="/history" rel="noopener noreferrer nofollow">
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://elrond.com/blog/maiar-launchpad-mpad/"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 mt-3">
                  <p className="font-weight-normal">Legal</p>
                  <ul className="list-unstyled footer-column">
                    <li>
                      <a
                        href="/Maiar Launchpad - Privacy Policy.pdf"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="/Maiar Launchpad T&Cs.pdf"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        Terms & conditions
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4 mt-3">
                  <p className="font-weight-normal">Support</p>
                  <ul className="list-unstyled footer-column">
                    <li>
                      <a
                        href="https://form.typeform.com/to/TzeoE5SU"
                        rel="noopener noreferrer nofollow"
                        target="_blank"
                      >
                        Startups Apply
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column mt-2 mb-4 text-center">
            <div className="small text-secondary mb-3">
              We and our affiliates are not affiliated with or commercially
              related to Saul Zaentz Company or The Tolkien Estate
              <br className="d-none d-md-block" />
              (owners of intellectual property rights relating to the works of
              J.R.R. Tolkien).
            </div>
            <div className="small text-secondary">
              &copy; {year} Maiar Launchpad. All rights reserved.
            </div>
            {launchpadVersion && (
              <small className="text-secondary version mt-1">
                Build {launchpadVersion}
              </small>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
