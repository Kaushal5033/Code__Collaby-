import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          About Code Collaby
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Code Collaby is a collaborative platform designed to bring
              developers together. Our mission is to create a space where
              programmers can work together seamlessly, share knowledge, and
              build amazing projects as a team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Real-time code collaboration</li>
              <li>Instant messaging and communication</li>
              <li>Project management tools</li>
              <li>Version control integration</li>
              <li>Code sharing and review</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Get Started
            </h2>
            <p className="text-gray-600 mb-4">
              Ready to join our community of developers? Start collaborating
              today!
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Join Now
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
