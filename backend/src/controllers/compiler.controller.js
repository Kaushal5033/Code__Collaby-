import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// JDoodle API credentials
const { JDOODLE_CLIENT_ID, JDOODLE_CLIENT_SECRET, JUDGE0_API_URL } =
  process.env;

// Language mappings and version indices for JDoodle
const languageConfig = {
  python3: { jdoodleLang: "python3", version: "4" },
  java: { jdoodleLang: "java", version: "3" },
  c: { jdoodleLang: "c", version: "4" },
  cpp: { jdoodleLang: "cpp14", version: "3" },
  javascript: { jdoodleLang: "nodejs", version: "3" },
};

// Main function to execute code
const executeCode = async (req, res) => {
  const { language, code, input = "" } = req.body;

  if (!language || !code) {
    return res
      .status(400)
      .json({ error: "Both 'language' and 'code' are required." });
  }

  const config = languageConfig[language];

  if (!config) {
    return res.status(400).json({ error: `Unsupported language: ${language}` });
  }

  const payload = {
    clientId: JDOODLE_CLIENT_ID,
    clientSecret: JDOODLE_CLIENT_SECRET,
    script: code,
    language: config.jdoodleLang,
    versionIndex: config.version,
    stdin: input,
  };

  try {
    const { data } = await axios.post(JUDGE0_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const { output = "No output", memory = "N/A", cpuTime = "N/A" } = data;

    res.json({ output, memory, cpuTime });
  } catch (error) {
    console.error("JDoodle API Error:", error?.response?.data || error.message);

    if (error.response) {
      const errData = error.response.data;
      res.status(500).json({
        error: `JDoodle API Error: ${
          errData?.message || errData?.error || "Unknown error"
        }`,
      });
    } else if (error.request) {
      res.status(502).json({ error: "No response from JDoodle API." });
    } else {
      res
        .status(500)
        .json({ error: `Request configuration error: ${error.message}` });
    }
  }
};

export { executeCode };
