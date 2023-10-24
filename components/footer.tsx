import Container from "./container";
import { FiInstagram } from "react-icons/fi";
import { RiTiktokFill } from "react-icons/ri";
const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl flex mb-10 lg:mb-0 lg:pr-4 lg:w-1/2 ">
            <a
              href="https://instagram.com/two_rookie_cooks?igshid=OGQ5ZDc2ODk2ZA=="
              target="_blank"
              className="px-4"
            >
              <FiInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@two.rookie.cooks?_t=8gmEtVH4p9t&_r=1"
              target="_blank"
              className="px-4"
            >
              <RiTiktokFill />
            </a>
          </h3>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
