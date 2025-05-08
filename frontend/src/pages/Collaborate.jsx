import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { languages } from "../constants.js";
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import axios from 'axios';  // Import axios

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState(languages.javascript.boilerplate);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [memory, setMemory] = useState('');
  const [cpuTime, setCpuTime] = useState('');
  const [stdin, setStdin] = useState('');
  const [activeTab, setActiveTab] = useState('output');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const languageExtensions = {
    javascript: javascript(),
    cpp: cpp(),
    python: python(),
    java: java(),
  };

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
  
      // Map 'python' to 'python3' for backend compatibility
      const mappedLanguage = language === 'python' ? 'python3' : language;
  
      const response = await axios.post('http://localhost:3000/api/compiler/execute', {
        language: mappedLanguage,
        code: value,
        input: stdin,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
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
      console.error("API Error:", error.response ? error.response.data : error.message);
      setOutput("Error executing code. Please check the console.");
      setMemory("N/A");
      setCpuTime("N/A");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1E293B] to-[#111827] pt-12 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/grid.svg')] opacity-10" />
        <div 
          className="absolute inset-0 animate-shimmer"
          style={{
            background: `linear-gradient(
              to right,
              transparent 0%,
              rgba(255, 255, 255, 0.05) 50%,
              transparent 100%
            )`,
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative w-full max-w-6xl transition-all duration-50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {/* Glassmorphic effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl transform -rotate-6 transition-all duration-50"></div>
        
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 transition-all duration-50 hover:shadow-purple-500/25">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent transition-all duration-50">
              Online Code Editor
            </h2>
            <p className="text-gray-400 mt-2 transition-opacity duration-50">Write, compile, and run code in multiple languages</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Editor */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 transition-all duration-50 hover:bg-white/10">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="px-3 py-2 bg-white/5 text-white border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-25 hover:bg-white/10"
                  >
                    {Object.keys(languages).map((lang) => (
                      <option key={lang} value={lang} className="bg-[#1E293B]">
                        {languages[lang].name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleExecuteCode}
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Running...
                      </span>
                    ) : 'Run Code'}
                  </button>
                </div>
              </div>
              
              <div className="h-[500px] rounded-b-xl overflow-hidden">
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

            {/* Right Panel - Input/Output */}
            <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 transition-all duration-50 hover:bg-white/10">
              <div className="border-b border-white/10">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('input')}
                    className={`${
                      activeTab === 'input'
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-all duration-25`}
                  >
                    Input
                  </button>
                  <button
                    onClick={() => setActiveTab('output')}
                    className={`${
                      activeTab === 'output'
                        ? 'border-purple-500 text-purple-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-all duration-25`}
                  >
                    Output
                  </button>
                </nav>
              </div>

              <div className="p-4">
                {activeTab === 'input' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Standard Input
                    </label>
                    <textarea
                      rows={10}
                      value={stdin}
                      onChange={(e) => setStdin(e.target.value)}
                      className="w-full bg-white/5 text-white border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-25 hover:bg-white/10"
                      placeholder="Enter your input here..."
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-300 mb-2">Output</h3>
                      <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-auto max-h-[200px] text-sm text-gray-300 transition-all duration-25 hover:bg-white/10">
                        {output || 'No output'}
                      </pre>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Memory Usage</h3>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300 transition-all duration-25 hover:bg-white/10">
                          {memory || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">CPU Time</h3>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300 transition-all duration-25 hover:bg-white/10">
                          {cpuTime || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
