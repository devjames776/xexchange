import { ProjectsEnum } from "config";
import ashswap from "../../assets/content/ashswap.json";
import cantina from "../../assets/content/cantina-royale.json";
import holoride from "../../assets/content/holoride.json";
import itheum from "../../assets/content/itheum.json";

const getContent = (project: string) => {
  switch (project) {
    case ProjectsEnum.HOLORIDE:
      return holoride;
    case ProjectsEnum.ITHEUM:
      return itheum;
    case ProjectsEnum.CANTINA:
      return cantina;
    case ProjectsEnum.ASHSWAP:
    default:
      return ashswap;
  }
};

export default getContent;
