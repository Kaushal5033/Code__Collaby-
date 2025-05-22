import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { languages } from "../constants.js";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import axios from "axios";
import RoomMembers from "../components/RoomMembers.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { initSocket } from "../socket.jsx";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/utilities.css";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Editor = () => {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(languages.javascript.boilerplate);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [memory, setMemory] = useState("");
  const [cpuTime, setCpuTime] = useState("");
  const [stdin, setStdin] = useState("");
  const [activeTab, setActiveTab] = useState("output");
  const [roomMembers, setRoomMembers] = useState([]);

  const socketref = useRef(null);
  const location = useLocation();
  const { RoomId: roomId } = useParams();
  const navigate = useNavigate();

  const languageExtensions = { javascript: javascript(), cpp: cpp(), python: python(), java: java() };

  const inputOutputStyles = "bg-white/5 border border-white/10 rounded-lg";
  const buttonStyles = "w-full px-4 py-2 text-white rounded-lg font-medium transition-colors";
  const tabButton = "flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors";

  useEffect(() => {
    setValue(languages[language].boilerplate);
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setValue(languages[selectedLanguage].boilerplate);
  };

  const handleExecuteCode = async () => {
    setLoading(true);
    try {
      const mappedLanguage = language === "python" ? "python3" : language;
      const response = await axios.post(`${BASE_URL}/api/compiler/execute`, { language: mappedLanguage, code: value, input: stdin });
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
      console.error("API Error:", error);
      setOutput("Error executing code. Please check the console.");
      setMemory("N/A");
      setCpuTime("N/A");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please log in to collaborate!",{
        id: "login-error",
        duration: 3000,
      });
      navigate("/login");
      return;
    }

    const init = async () => {
      socketref.current = await initSocket();
      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later",{
          id: "socket-error",
          duration: 3000,
        });
        navigate("/");
      };

      socketref.current.on("connect_error", handleErrors);
      socketref.current.on("connect_failed", handleErrors);
      socketref.current.on("connect", () => console.log("Connected to the server"));

      socketref.current.emit("join-room", { roomId, userName: location.state?.userName });

      socketref.current.on("clients-in-room", ({ clientsInRoom, userName }) => {
        if (userName !== location.state?.userName) toast.success(`${userName} joined the room`);
        setRoomMembers(clientsInRoom);
      });

      socketref.current.on("user-disconnected", ({ socketId, userName }) => {
        toast.success(`${userName} left the room`);
        setRoomMembers((prev) => prev.filter((member) => member.socketId !== socketId));
      });

      socketref.current.on("code-update", ({ code: newCode, language: newLang }) => {
        setValue(newCode);
        setLanguage(newLang);
      });
    };

    init();

    return () => {
      socketref.current.disconnect();
    };
  }, []);

  if (!location.state?.userName) navigate("/");

  const CopyRoomId = async () => {
    if (!roomId) return toast.error("Room ID is not available");
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard",{
        id: "room-id-copied",
        duration: 3000,
      });
    } catch (err) {
      console.error("Failed to copy room ID:", err);
      toast.error("Failed to copy room ID. Please try copying manually.",{
        id: "room-id-copy-error",
        duration: 3000,
      });
    }
  };

  const LeaveRoom = () => navigate("/collaborate");

  const handleCodeChange = (editorValue) => {
    setValue(editorValue);
    if (socketref.current) {
      socketref.current.emit("code-change", { roomId, code: editorValue, language });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-800 text-white">
      <Navbar />
      <div className="flex min-h-screen flex-1 overflow-hidden">
        <aside className="w-64 mt-16 bg-slate-900 border-r border-white/10 flex flex-col">
          <div className="p-4 flex-1">
            <h3 className="text-lg font-semibold mb-4">Room Members</h3>
            <div className="space-y-2">
              {roomMembers.map((member) => <RoomMembers key={member.socketId} username={member.userName} />)}
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <button onClick={CopyRoomId} className={`${buttonStyles} mt-2 bg-blue-500 hover:bg-blue-600`}>Copy Room ID</button>
            <button onClick={LeaveRoom} className={`${buttonStyles} mt-2 bg-red-500 hover:bg-red-600`}>Leave Room</button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <section className="flex-1 bg-white/5 mt-16 backdrop-blur-sm border-b border-white/10 flex flex-col">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <select value={language} onChange={handleLanguageChange} className="px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {Object.keys(languages).map((lang) => <option key={lang} value={lang} className="bg-slate-800">{languages[lang].name}</option>)}
              </select>
              <button onClick={handleExecuteCode} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
                {loading ? "Running..." : "Run Code"}
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <CodeMirror value={value} onChange={handleCodeChange} height="100%" theme={oneDark} extensions={[languageExtensions[language]]} className="h-full" />
            </div>
          </section>

          <section className="h-1/3 bg-white/5 backdrop-blur-sm flex flex-col">
            <div className="border-b border-white/10">
              <nav className="flex">
                <button onClick={() => setActiveTab("input")} className={`${tabButton} ${activeTab === "input" ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-transparent text-slate-400 hover:text-slate-300"}`}>Input</button>
                <button onClick={() => setActiveTab("output")} className={`${tabButton} ${activeTab === "output" ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-transparent text-slate-400 hover:text-slate-300"}`}>Output</button>
              </nav>
            </div>

            <div className="flex-1 p-4 overflow-auto">
              {activeTab === "input" ? (
                <div className="h-full">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Standard Input</label>
                  <textarea rows={10} value={stdin} onChange={(e) => setStdin(e.target.value)} placeholder="Enter your input here..." className={`w-full h-[calc(100%-2rem)] ${inputOutputStyles} p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 resize-none`} />
                </div>
              ) : (
                <div className="h-full flex flex-col space-y-6">
                  <div className="flex-1 min-h-0">
                    <h3 className="compiler-input-output">Output</h3>
                    <pre className={`h-[calc(100%-2rem)] ${inputOutputStyles} p-4 text-sm text-white overflow-auto`}>{output || "No output"}</pre>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="compiler-input-output">Memory Usage</h3>
                      <div className={`${inputOutputStyles} p-3 text-sm`}>{memory || "N/A"}</div>
                    </div>
                    <div>
                      <h3 className="compiler-input-output">CPU Time</h3>
                      <div className={`${inputOutputStyles} p-3 text-sm`}>{cpuTime || "N/A"}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Editor;