import FormSide from "../components/FormSide";
import { useFormik } from "formik";
import { ContactValidationSchema } from "../utilities/Validators";
import { CreateUser } from "../utilities/Connector";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CreateContact } from "../utilities/Retriever";
import { useUserStore } from "../stores/authStore";
import { useContactStore } from "../stores/contactStore";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { authToken } = useUserStore();
  const { setShowContactForm, updated, setUpdated } = useContactStore();
  const [ avatar, setAvatar] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      title: "",
      relationship: "",
      phoneNumbers: { mobile: "", home: "" },
      avatar: null,
    },
    validationSchema: ContactValidationSchema,
    onSubmit: async (values) => {
        setLoading(true);
      values.phoneNumbers = JSON.stringify({ mobile: values.mobile, home: values.home });
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value)
      }

      const success = await CreateContact(authToken, formData);
      console.log(success)
      if (success) {
        setUpdated(!updated);
        setShowContactForm(false);
      }
      setLoading(false);
    },
  });

  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-gray-900">NEW CONTACT</h1>
          <p>Enter contact details</p>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-5">
            <label htmlFor="firstName" className="text-xs font-semibold px-1">
              First Name*
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="John"
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.firstName}
              </div>
            ) : null}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-5">
            <label htmlFor="lastName" className="text-xs font-semibold px-1">
              Last Name
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="Doe"
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.lastName}
              </div>
            ) : null}
          </div>

          {/* Email */}
          <div className="w-full md:w-1/2 px-3 mb-5">
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
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="johndoe@example.com"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-5">
            <label htmlFor="title" className="text-xs font-semibold px-1">
              Title
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="Mr."
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.title}
              </div>
            ) : null}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-5">
            <label
              htmlFor="relationship"
              className="text-xs font-semibold px-1"
            >
              Relationship
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="text"
                id="relationship"
                name="relationship"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.relationship}
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="Doe"
              />
            </div>
            {formik.touched.relationship && formik.errors.relationship ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.relationship}
              </div>
            ) : null}
          </div>

          {/* Mobile */}
          <div className="w-full md:w-1/2 px-3 mb-5">
            <label htmlFor="mobile" className="text-xs font-semibold px-1">
              Mobile*
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="+2348020585698"
              />
            </div>
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.mobile}
              </div>
            ) : null}
          </div>

          {/* Home */}
          <div className="w-full md:w-1/2 px-3 mb-12">
            <label htmlFor="home" className="text-xs font-semibold px-1">
              Home
            </label>
            <div className="flex">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="tel"
                id="home"
                name="home"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.home}
                className="w-full -ml-10 px-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
                placeholder="+015265895"
              />
            </div>
            {formik.touched.home && formik.errors.home ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.home}
              </div>
            ) : null}
          </div>
        </div>

         {/* Avatar */}
         <div className="w-full px-3 mb-5">
            <label htmlFor="avatar" className="text-xs font-semibold px-1">
              Avatar
            </label>
            <div className="flex items-center">
              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                <i className="mdi mdi-file-image-outline text-gray-400 text-lg"></i>
              </div>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={(e) => formik.setFieldValue("avatar", e.currentTarget.files[0])}
                className="w-full -ml-10 px-5 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500"
              />
            </div>
          </div>


        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <button
              type="submit"
              disabled={loading}
              className="block w-full max-w-xs mx-auto bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-gray-500"
            >
              {loading ? "Creating..." : "CREATE CONTACT"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
