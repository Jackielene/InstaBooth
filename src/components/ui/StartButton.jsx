import { Link } from "react-router-dom";

const StartButton = ({ text, href, isLink }) => {
  return isLink ? (
    <Link
      to={href}
      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md text-center inline-block"
    >
      {text}
    </Link>
  ) : (
    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md">
      {text}
    </button>
  );
};

export default StartButton;
