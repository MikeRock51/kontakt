import FormSide from "../components/FormSide";
import { useFormik } from "formik";
import { SignInValidationSchema } from "../utilities/Validators";
import { LoginUser } from "../utilities/Connector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/authStore";

export default function SignInPage() {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const {setCurrentUser, setAuthToken } = useUserStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async (values) => {
    setLoading(true);
    const data = await LoginUser(values);
    console.log(data)
    if (data) {
      setCurrentUser(data.user);
      setAuthToken(data.auth_token);
      setLoading(false);
      navigate("/contacts");
    }
    },
  });
    return (
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
          <div className="md:flex w-full">
            <FormSide />
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <form onSubmit={formik.handleSubmit}>
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
                  <p>Enter your log in information</p>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="email" className="text-xs font-semibold px-1">
                      Email
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label htmlFor="email" className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                        placeholder="************"
                      />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                    ) : null}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button type="submit" disabled={loading} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-gray-500">
                      {loading ? "Signing in..." : "SIGN IN NOW"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}
