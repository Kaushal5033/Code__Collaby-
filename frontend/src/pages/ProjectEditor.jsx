
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

import { languages } from "../constants";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const languageExtensions = {
  javascript: javascript(),
  cpp: cpp(),
  python: python(),
  java: java(),
};

const ProjectEditor = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [output, setOutput] = useState("");
  const [stdin, setStdin] = useState("");
  const [running, setRunning] = useState(false);

  const saveTimer = useRef(null);
  const isInitialLoad = useRef(true);

  // Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/projects/${projectId}`,
          { withCredentials: true }
        );

        const data = response.data;

        let projectFiles = data.files || [];

        // Fallback for projects without files
        if (projectFiles.length === 0) {
          projectFiles = [
            {
              name: "index.js",
              path: "index.js",
              content: data.code || languages.javascript.boilerplate,
              language: data.language || "javascript",
              type: "file",
            },
          ];
        }

        setProject(data);
        setFiles(projectFiles);
        setActiveFile(projectFiles[0]);

      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load project"
        );
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem("userId")) {
      navigate("/login");
      return;
    }

    fetchProject();

    return () => {
      clearTimeout(saveTimer.current);
    };
  }, [projectId, navigate]);

  // Update active file
  const handleCodeChange = (value) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.path === activeFile.path
          ? { ...file, content: value }
          : file
      )
    );

    setActiveFile((prev) => ({
      ...prev,
      content: value,
    }));
  };

  // Auto-save project
  useEffect(() => {
    if (isInitialLoad.current || !project) return;

    clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(async () => {
      try {
        setSaving(true);

        const mainFile = files.find(
          (file) => file.path === "index.js"
        ) || files[0];

        await axios.put(
          `${BASE_URL}/api/projects/update/${projectId}`,
          {
            files,
            code: mainFile?.content || "",
            language: mainFile?.language || "javascript",
          },
          { withCredentials: true }
        );

        setSaving(false);
      } catch (error) {
        console.error("Auto-save error:", error);
        setSaving(false);
        toast.error("Auto-save failed");
      }
    }, 1000);

    return () => clearTimeout(saveTimer.current);
  }, [files, project, projectId]);

  // Enable auto-save after initial project load
  useEffect(() => {
    if (!loading && project) {
      isInitialLoad.current = false;
    }
  }, [loading, project]);

  // Change language of active file
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    const updatedFile = {
      ...activeFile,
      language: selectedLanguage,
    };

    setActiveFile(updatedFile);

    setFiles((prev) =>
      prev.map((file) =>
        file.path === activeFile.path ? updatedFile : file
      )
    );
  };

  // Run code using existing compiler API
  const handleRunCode = async () => {
    if (!activeFile) return;

    try {
      setRunning(true);
      setOutput("Running code...");

      const mappedLanguage =
        activeFile.language === "python"
          ? "python3"
          : activeFile.language;

      const response = await axios.post(
        `${BASE_URL}/api/compiler/execute`,
        {
          language: mappedLanguage,
          code: activeFile.content,
          input: stdin,
        }
      );

      const result = response.data;

      if (result.error) {
        setOutput(result.error);
      } else {
        setOutput(result.output || "No output");
      }
    } catch (error) {
      console.error(error);
      setOutput(
        error.response?.data?.message || "Error executing code"
      );
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">
        Loading project...
      </div>
    );
  }

  if (!project || !activeFile) return null;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0F172A] text-white pt-24 px-4 pb-8">
        {/* Project Header */}
        <div className="max-w-7xl mx-auto mb-5 flex flex-wrap justify-between items-center gap-4">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-blue-400 hover:underline mb-2"
            >
              ← Back to Dashboard
            </button>

            <h1 className="text-2xl font-bold">
              {project.title}
            </h1>

            <p className="text-gray-400 text-sm">
              {project.description}
            </p>
          </div>

          <div className="text-sm">
            {saving ? (
              <span className="text-yellow-400">
                Saving changes...
              </span>
            ) : (
              <span className="text-green-400">
                All changes saved
              </span>
            )}
          </div>
        </div>

        {/* Editor Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* File Explorer */}
          <div className="lg:col-span-1 bg-[#1E293B] rounded-xl p-4 border border-white/10">
            <h2 className="font-semibold text-lg mb-4">
              Explorer
            </h2>

            <p className="text-gray-400 text-sm mb-3">
              Project Files
            </p>

            <div className="space-y-2">
              {files
                .filter((file) => file.type !== "folder")
                .map((file) => (
                  <button
                    key={file._id || file.path}
                    onClick={() => setActiveFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      activeFile.path === file.path
                        ? "bg-blue-600 text-white"
                        : "hover:bg-white/10 text-gray-300"
                    }`}
                  >
                    📄 {file.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-3 bg-[#1E293B] rounded-xl border border-white/10 overflow-hidden">

            {/* Editor Toolbar */}
            <div className="p-3 border-b border-white/10 flex flex-wrap justify-between items-center gap-3">
              <span className="text-sm text-gray-300">
                📄 {activeFile.name}
              </span>

              <div className="flex gap-3 items-center">
                <select
                  value={activeFile.language}
                  onChange={handleLanguageChange}
                  className="bg-[#0F172A] border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {Object.keys(languages).map((lang) => (
                    <option key={lang} value={lang}>
                      {languages[lang].name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleRunCode}
                  disabled={running}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-5 py-2 rounded-lg text-sm font-medium"
                >
                  {running ? "Running..." : "▶ Run"}
                </button>
              </div>
            </div>

            {/* CodeMirror */}
            <div className="min-h-[450px]">
              <CodeMirror
                value={activeFile.content}
                height="450px"
                theme={oneDark}
                extensions={[
                  languageExtensions[activeFile.language],
                ]}
                onChange={handleCodeChange}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  autocompletion: true,
                }}
              />
            </div>

            {/* Input and Output */}
            <div className="border-t border-white/10 p-4">
              <h3 className="font-semibold mb-2">
                Custom Input
              </h3>

              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter input here..."
                className="w-full bg-[#0F172A] border border-white/10 rounded-lg p-3 text-sm text-white"
                rows={3}
              />

              <h3 className="font-semibold mt-4 mb-2">
                Output
              </h3>

              <pre className="bg-black/30 rounded-lg p-4 min-h-20 whitespace-pre-wrap text-sm text-green-300">
                {output || "Your output will appear here..."}
              </pre>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectEditor;
