import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { languages } from "../constants.js";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";


const Editor = () => {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(languages.javascript.boilerplate);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [memory, setMemory] = useState("");
  const [cpuTime, setCpuTime] = useState("");
  const [stdin, setStdin] = useState("");
  const [activeTab, setActiveTab] = useState("output");

  const languageExtensions = {
    javascript: javascript(),
    cpp: cpp(),
    python: python(),
    java: java(),
  };
  const roomMembers = [
    { id: 1, name: "John Doe", color: "blue" },
    { id: 2, name: "Jane Smith", color: "green" },
    { id: 3, name: "Mike Johnson", color: "purple" },
  ];
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setValue(languages[selectedLanguage].boilerplate);
  };

  useEffect(() => {
    setValue(languages[language].boilerplate);
  }, [language]);

  const handleExecuteCode = async () => {
    setLoading(true);
    try {
      console.log("Sending Request:", { language, code: value, input: stdin });

      const mappedLanguage = language === "python" ? "python3" : language;

      const response = await axios.post(
        "http://localhost:3000/api/compiler/execute",
        {
          language: mappedLanguage,
          code: value,
          input: stdin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      const result = response.data;

      if (result.error) {
        setOutput(result.error);
        setMemory("N/A");
        setCpuTime("N/A");
      } else {
        setOutput(result.output || "No output");
        setMemory(result.memory || "N/A");
        setCpuTime(result.cpuTime || "N/A");
      }
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      setOutput("Error executing code. Please check the console.");
      setMemory("N/A");
      setCpuTime("N/A");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white">
      <Navbar />
      <div className="flex min-h-screen flex-1 overflow-hidden">
        {/* Left Sidebar - Room Members */}
        <div className="w-64 mt-16 bg-slate-900 border-r border-white/10 flex flex-col">
          <div className="p-4 flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Room Members</h3>
            <div className="space-y-2">
              {roomMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-2 p-2 rounded-lg bg-white/5">
                  <div className={`w-8 h-8 rounded-full bg-${member.color}-500`}></div>
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
            <button className="p-4 border-t border-white/10 mt-5 w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
              Leave Room
            </button>
          </div>
          
          {/* <div className="p-4 border-t border-white/10">
            
          </div> */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Section */}
          <div className="flex-1 bg-white/5 mt-16 backdrop-blur-sm border-b border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <select 
                value={language} 
                onChange={handleLanguageChange}
                className="px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.keys(languages).map((lang) => (
                  <option key={lang} value={lang} className="bg-slate-800">
                    {languages[lang].name}
                  </option>
                ))}
              </select>
              <button 
                onClick={handleExecuteCode} 
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                {loading ? (
                  <span className="flex items-center">
                    Running...
                  </span>
                ) : (
                  "Run Code"
                )}
              </button>
            </div>
            
            <div className="flex-1 min-h-0">
              <CodeMirror
                value={value}
                onChange={(editorValue) => setValue(editorValue)}
                height="100%"
                theme={oneDark}
                extensions={[languageExtensions[language]]}
                className="h-full"
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="h-1/3 bg-white/5 backdrop-blur-sm flex flex-col">
            <div className="border-b border-white/10">
              <nav className="flex">
                <button 
                  onClick={() => setActiveTab("input")}
                  className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "input"
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-transparent text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Input
                </button>
                <button 
                  onClick={() => setActiveTab("output")}
                  className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "output"
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-transparent text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Output
                </button>
              </nav>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              {activeTab === "input" ? (
                <div className="h-full">
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Standard Input
                  </label>
                  <textarea
                    rows={10}
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter your input here..."
                    className="w-full h-[calc(100%-2rem)] bg-white/5 text-white border border-white/10 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 resize-none"
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col space-y-6">
                  <div className="flex-1 min-h-0">
                    <h3 className="text-sm font-medium text-slate-400 mb-2">
                      Output
                    </h3>
                    <pre className="h-[calc(100%-2rem)] bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white overflow-auto">
                      {output || "No output"}
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-2">
                        Memory Usage
                      </h3>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white">
                        {memory || "N/A"}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-2">
                        CPU Time
                      </h3>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white">
                        {cpuTime || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Editor;
