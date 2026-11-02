const PagePlaceholder = ({ title, description }) => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="text-3xl font-bold text-green-700">
        {title}
      </h1>

      <p className="mt-3 max-w-lg text-gray-500">
        {description || "This page is under development."}
      </p>
    </section>
  );
};

export default PagePlaceholder;