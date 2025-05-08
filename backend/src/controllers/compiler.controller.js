import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


// Language versions as per JDoodle's latest supported versions
const languageVersions = {
  python3: "4",    // Python 3.9.4
  java: "3",       // JDK 17.0.4
  c: "4",          // GCC 11.1.0
  cpp14: "3",      // G++ 11.1.0
  nodejs: "3"      // Node.js 18.15.0
};

// Mapping frontend language values to JDoodle's expected values
const languageMapping = {
  python3: "python3",
  java: "java",
  c: "c",
  cpp: "cpp14",
  javascript: "nodejs"
};

// JDoodle API credentials from environment variables
const CLIENT_ID = process.env.JDOODLE_CLIENT_ID;
const CLIENT_SECRET = process.env.JDOODLE_CLIENT_SECRET;
const JUDGE0_API_URL = process.env.JDOODLE_API_URL || "https://api.jdoodle.com/v1/execute";

// Backend function to execute code
const executeCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;

    if (!language || !code) {
      return res.status(400).json({ error: "Language and code are required." });
    }

    const mappedLanguage = languageMapping[language] || language;
    const versionIndex = languageVersions[mappedLanguage] || "0";

    const requestData = {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      script: code,
      language: mappedLanguage,
      versionIndex,
      stdin: input || ""
    };

    // console.log("Sending request to JDoodle:", requestData);

    const response = await axios.post(JUDGE0_API_URL, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // console.log("JDoodle API Response:", response.data); 

    if (response.data && response.data.output !== undefined) {
      res.json({
        output: response.data.output || "No output",
        memory: response.data.memory || "N/A",
        cpuTime: response.data.cpuTime || "N/A"
      });
    } else {
      res.status(500).json({ error: "Unexpected response from JDoodle API." });
    }
  } catch (error) {
    console.error("Execution Error:", error);

    if (error.response) {
      res.status(500).json({
        error: `Server Error: ${error.response.status} - ${
          error.response.data.message || error.response.data.error || 'Unknown error'
        }`
      });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from the server." });
    } else {
      res.status(500).json({ error: `Configuration Error: ${error.message}` });
    }
  }
};

export { executeCode };
