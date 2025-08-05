import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...Values, [name]: value });
  };
  const login = async (e) => {
    console.log("register clicked");
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/login",
        Values,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("userLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      console.log(`error at RegisterForm: ${err.response.data.error}`);
      alert(err.response.data.error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbea] relative">
      <div className="w-full max-w-sm p-8 bg-[#fefce8] rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-[#78350f] mb-2">
          Task Manager
        </h2>
        <p className="text-sm text-center text-[#92400e] mb-6">
          Login with Task Manager
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="email"
            required
            name="email"
            value={Values.email}
            onChange={change}
            className="w-full px-4 py-2 border border-[#facc15] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97706] bg-white"
          />
          <input
            type="password"
            placeholder="password"
            required
            name="password"
            value={Values.password}
            onChange={change}
            className="w-full px-4 py-2 border border-[#facc15] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d97706] bg-white"
          />
          <button
            type="submit"
            onClick={login}
            className="w-full bg-[#facc15] text-[#78350f] font-semibold py-2 rounded-md hover:bg-[#eab308] transition"
          >
            Login
          </button>
          <p className="text-sm text-center text-[#92400e] mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#b45309] hover:underline font-semibold"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
      <div className="absolute bottom-4 w-full text-center text-[#78350f] font-medium text-sm">
        Looking for college projects? Whatsapp Us On +91-9592023223
      </div>
    </div>
  );
}

export default Login;
