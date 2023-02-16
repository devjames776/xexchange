import {
  faTwitter,
  faLinkedin,
  faInstagram,
  faFacebook,
  faYoutube,
  faTelegram,
  faTelegramPlane,
  faMediumM,
  faMedium,
  faDiscord,
  faGithub,
  faGithubSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faBrain, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faGlobe, faChartBar } from "@fortawesome/pro-regular-svg-icons";
import {
  faBullhorn,
  faGlobeEurope,
  faBoxHeart,
  faLightbulbOn,
} from "@fortawesome/pro-solid-svg-icons";

export const getIcon = (icon?: string) => {
  switch (icon) {
    case "twitter":
      return faTwitter;

    case "instagram":
      return faInstagram;

    case "linkedin":
      return faLinkedin;

    case "youtube":
      return faYoutube;

    case "facebook":
      return faFacebook;

    case "telegram-plane":
      return faTelegramPlane;

    case "telegram":
      return faTelegram;

    case "medium-m":
      return faMediumM;

    case "medium":
      return faMedium;

    case "discord":
      return faDiscord;

    case "github":
      return faGithub;

    case "github-square":
      return faGithubSquare;

    case "bullhorn":
      return faBullhorn;

    case "earth":
      return faGlobeEurope;

    case "brain":
      return faBrain;

    case "chartBar":
      return faChartBar;

    case "lightbulbOn":
      return faLightbulbOn;

    case "boxHeart":
      return faBoxHeart;

    case "info-circle":
    case "infoCircle":
      return faInfoCircle;

    case "website":
    default:
      return faGlobe;
  }
};

export default getIcon;
