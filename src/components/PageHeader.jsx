const PageHeader = ({ eyebrow, title, description, action }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      {eyebrow && <p className="text-sm font-semibold text-green-700">{eyebrow}</p>}
      <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-gray-500">{description}</p>}
    </div>
    {action}
  </div>
);

export default PageHeader;
