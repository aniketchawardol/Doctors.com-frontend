import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  "Secure Patient Report Uploads",
  "Fast & Reliable Hospital Search",
  "Encrypted Medical Data",
  "Easy Report Submission",
  "Cloud Storage for Reports",
  "Effortless Hospital Management",
];

const reviews = [
  {
    name: "John Doe",
    text: "This platform made hospital visits stress-free! Highly recommended.",
  },
  {
    name: "Dr. Smith",
    text: "Managing patient reports has never been easier. Great service!",
  },
  {
    name: "Jane Roe",
    text: "Finding the right hospital is now quick and simple. Love it!",
  },
];

export default function HowItWorks() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <motion.div
      className="min-h-screen p-6 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: loaded ? 1 : 0, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-teal-500">
          Welcome to Doctors.com
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Seamless healthcare management for hospitals and patients.
        </p>
      </div>

      {/* Marquee Section */}
      <div className="mt-10 overflow-hidden border-y border-teal-200 py-4">
        <div className="flex space-x-4 animate-marquee whitespace-nowrap">
          {features.concat(features).map((feature, index) => (
            <div
              key={index}
              className="mx-4 text-lg font-semibold text-gray-700 bg-teal-200 px-6 py-2 rounded-lg shadow-md flex-shrink-0"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* User Guide Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Patient Guide */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-teal-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-teal-400">For Patients</h2>
          <ul className="mt-3 text-gray-700 space-y-2">
            <li>🔹 Upload and manage medical reports securely.</li>
            <li>🔹 Search for hospitals easily.</li>
            <li>🔹 Submit reports to hospitals.</li>
          </ul>
          <Link
            to="signup/patientsignup"
            className="bg-teal-200 mt-4 buttons"
          >
            Sign Up as Patient
          </Link>
        </motion.div>

        {/* Hospital Guide */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-amber-400"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-amber-500">
            For Hospitals
          </h2>
          <ul className="mt-3 text-gray-700 space-y-2">
            <li>🔹 View and manage patient reports.</li>
            <li>🔹 Access encrypted medical data.</li>
            <li>🔹 Provide efficient patient care.</li>
          </ul>
          <Link
            to="signup/hospitalsignup"
            className="mt-4 bg-amber-300 hover:bg-amber-400 buttons"
          >
            Sign Up as Hospital
          </Link>
        </motion.div>
      </div>

      {/* Sample Reviews Section */}
      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          What Our Users Say
        </h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal-300"
            >
              <p className="text-gray-700">"{review.text}"</p>
              <p className="mt-2 text-right font-semibold text-gray-900">
                - {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Messages */}
      <div className="mt-12 text-center text-lg font-medium text-gray-800">
        <p className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg inline-block shadow">
          🔍 Search for hospitals using the search bar at the top
        </p>
        {" "}
        <p className="mt-4 bg-teal-100 text-teal-800 px-4 py-2 rounded-lg inline-block shadow">
          ✨ New to Doctors.com?{" "}
          <Link to="signup" className="underline font-semibold">
            Signup
          </Link>
          {" "}to get started!
        </p>
      </div>
    </motion.div>
  );
}
