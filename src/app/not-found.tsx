import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-4">
      <h1 className="text-7xl font-bold text-[#C2F800]">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-400 text-center">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#C2F800] px-6 py-3 font-semibold text-black hover:bg-[#b5eb00] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;