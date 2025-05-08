import axios from 'axios';

// JDoodle API URL
const JUDGE0_API_URL = "https://api.jdoodle.com/v1/execute";

// Mapping of languages for JDoodle API
const languageVersions = {
  python3: "4",    // Python 3.9.4
  java: "3",       // JDK 17.0.4
  c: "4",          // GCC 11.1.0
  cpp14: "3",      // G++ 11.1.0
  nodejs: "3"      // Node.js 18.15.0
};

// Mapping frontend language to JDoodle's expected language
const languageMapping = {
  python3: "python3",
  java: "java",
  c: "c",
  cpp: "cpp14",
  javascript: "nodejs"
};

const executeCode = async (language, code, stdin = "") => {
  // Access API keys from Vite environment variables
  const clientId = import.meta.env.VITE_JDOODLE_CLIENT_ID; 
  const clientSecret = import.meta.env.VITE_JDOODLE_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    return { error: "API clientId and clientSecret are not set." };
  }

  // Set the JDoodle API request data
  const data = {
    script: code,
    language: languageMapping[language] || language,
    stdin,
    versionIndex: languageVersions[languageMapping[language]] || "0",
    clientId,
    clientSecret,
  };

  try {
    // Make the API call to JDoodle
    const response = await axios.post(JUDGE0_API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Check if response data is valid
    if (response.data && response.data.output !== undefined) {
      return {
        output: response.output || "No output",  // Handle empty output
        memory: response.data.memory || "N/A",        // Handle missing memory
        cpuTime: response.data.cpuTime || "N/A"       // Handle missing cpuTime
      };
    } else {
      return {
        error: "Unexpected response from JDoodle API. Please check your API request."
      };
    }
  } catch (error) {
    console.error("Error executing code:", error);

    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      return {
        error: `Server Error: ${error.response.status} - ${error.response.data.message || error.response.data.error || 'Unknown error'}`
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        error: "No response received from the server. Please check your internet connection and try again."
      };
    } else {
      // Something happened while setting up the request
      return {
        error: `Configuration Error: ${error.message}`
      };
    }
  }
};

export { executeCode };
