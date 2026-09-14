import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center px-5 text-center font-sans">
      <h1 className="m-0 text-7xl font-bold text-black">
        404
      </h1>

      <h2 className="mb-5 mt-2.5 text-3xl font-semibold text-gray-800">
        Page does not exist
      </h2>

      <p className="mb-8 max-w-[500px] text-gray-500">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="rounded-md bg-red-600 px-6 py-3 font-bold text-white no-underline transition-colors duration-300 hover:bg-red-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
