import { useState } from "react";
import { Link, useNavigate } from "react-router";

const initial = { name: "", email: "", phone: "", address: "", password: "", confirm: "" };

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Full name is required.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!/^(\+?88)?01[3-9]\d{8}$/.test(v.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid Bangladeshi mobile number.";
  if (!v.address.trim()) e.address = "Address is required.";
  if (v.password.length < 8) e.password = "Password must be at least 8 characters.";
  if (v.confirm !== v.password) e.confirm = "Passwords do not match.";
  return e;
};

const Field = ({ label, name, type = "text", values, errors, onChange, placeholder }) => (
  <div>
    <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={name} name={name} type={type} value={values[name]} onChange={onChange} placeholder={placeholder}
      className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500 ${errors[name] ? "border-red-400" : "border-gray-200"}`}
    />
    {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name]}</p>}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    // TODO: POST /api/auth/register (UC-01). Password must be hashed on the server.
    // Self-registration always creates a Resident account (UC-01 business rule 4).
    setSuccess(true);
    setTimeout(() => navigate("/login"), 1500);
  };

  const props = { values, errors, onChange };

  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-500">Register as a resident to classify waste and request pickups.</p>

        {success && (
          <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-700" role="status">
            Account created successfully! Redirecting to login…
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
          <Field label="Full Name" name="name" {...props} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" name="email" type="email" {...props} />
            <Field label="Phone" name="phone" placeholder="01XXXXXXXXX" {...props} />
          </div>
          <Field label="Address" name="address" {...props} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Password" name="password" type="password" {...props} />
            <Field label="Confirm Password" name="confirm" type="password" {...props} />
          </div>
          <button type="submit" className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="font-semibold text-green-700">Login</Link>
        </p>
        <p className="mt-3 text-center text-xs text-gray-400">
          Manager, collector, industry and scrap business accounts are created or approved by an administrator.
        </p>
      </div>
    </div>
  );
};

export default Register;
