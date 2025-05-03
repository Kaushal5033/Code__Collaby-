import React from "react";
import { Link } from "react-router-dom";
import HomeBg from "../Assets/bg.svg";

const About = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="relative z-10 mx-auto max-w-4xl p-10 rounded-3xl bg-white/10 backdrop-blur-xl ring-1 ring-white/30 shadow-2xl text-center space-y-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          About{" "}
          <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Code
            <span className="text-blue-400">Collaby</span>
          </span>
        </h1>

        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Our Mission
            </h2>
            <p className="leading-relaxed">
              Code Collaby is a collaborative platform designed to bring
              developers together. Our mission is to create a space where
              programmers can work together seamlessly, share knowledge, and
              build amazing projects as a team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Real-time code collaboration</li>
              <li>Instant messaging and communication</li>
              <li>Project management tools</li>
              <li>Version control integration</li>
              <li>Code sharing and review</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Get Started
            </h2>
            <p className="mb-4">
              Ready to join our community of developers? Start collaborating
              today!
            </p>
            <Link
              to="/login"
              className="inline-block px-10 py-4 bg-blue-600/80 text-white text-lg font-bold rounded-xl shadow-md hover:bg-blue-700/90 hover:scale-105 transition-all duration-300"
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
