const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            Sort<span className="text-green-500">N</span>Track
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
            Making waste sorting easier and recyclable waste collection
            more transparent through technology.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href="#home" className="hover:text-green-400">Home</a>
            <a href="#how-it-works" className="hover:text-green-400">How It Works</a>
            <a href="#features" className="hover:text-green-400">Features</a>
            <a href="#about" className="hover:text-green-400">About Us</a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Our Mission</h3>

          <p className="mt-4 text-sm leading-7 text-gray-400">
            Helping communities make better waste-sorting decisions and
            connect with recyclable waste collection services.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 px-5 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SortNTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;