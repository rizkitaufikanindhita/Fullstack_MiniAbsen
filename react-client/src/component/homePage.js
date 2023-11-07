import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <div className="items-center justify-center mt-10 text-3xl font-semibold text-center">
        {props.title}
      </div>
      <div className="items-center justify-center mt-10 text-lg font-semibold text-center ">
        <a
          href="/login"
          className="p-4 text-white bg-blue-400 border-2 shadow-xl w-fit rounded-xl"
        >
          LOGIN PAGE
        </a>
      </div>
    </Fragment>
  );
};

export default HomePage;
