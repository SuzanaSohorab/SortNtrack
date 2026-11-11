import { Link } from "react-router";

const NotFound = () => (
  <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
    <p className="text-6xl font-extrabold text-green-600">404</p>
    <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
    <p className="mt-2 max-w-md text-gray-500">
      The page you are looking for does not exist or has been moved.
    </p>
    <Link to="/" className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700">
      Back to Home
    </Link>
  </section>
);

export default NotFound;
