// Judge0 CE API - Free, no signup, no API key needed
// Docs: https://ce.judge0.com

const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_VERSIONS = {
  javascript: { language_id: 63, name: "JavaScript (Node.js 12.14.0)" },
  python: { language_id: 71, name: "Python (3.8.1)" },
  java: { language_id: 62, name: "Java (OpenJDK 13.0.1)" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @param {string} [stdin] - optional standard input
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code, stdin = "") {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${JUDGE0_API}/submissions?wait=true`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: languageConfig.language_id,
        source_code: code,
        stdin: stdin,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.stdout || "";
    const stderr = data.stderr || "";
    const compileError = data.compile_output || "";
    const status = data.status?.description || "";

    // Handle compile errors
    if (compileError) {
      return {
        success: false,
        output: output,
        error: compileError,
      };
    }

    // Handle runtime errors
    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    // Handle time limit / other statuses
    if (data.status?.id !== 3) {
      return {
        success: false,
        error: `Execution failed: ${status}`,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}

// function getFileExtension(language) {
//   const extensions = {
//     javascript: "js",
//     python: "py",
//     java: "java",
//   };

//   return extensions[language] || "txt";
// }