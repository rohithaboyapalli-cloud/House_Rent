import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", formData);

      toast.success(res.data.message);

      console.log(res.data);

      login(res.data.user, res.data.token);

if (res.data.user.role === "admin") {
  navigate("/admin");
} else if (res.data.user.role === "owner") {
  navigate("/owner");
} else {
  navigate("/");
}
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800"
        >
          Login
        </button>
        <div className="text-center mt-4">
  <Link
    to="/forgot-password"
    className="text-blue-700 hover:underline"
  >
    Forgot Password?
  </Link>
</div>
      </form>
    </div>
  );
}

export default Login;