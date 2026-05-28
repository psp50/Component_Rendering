import React, { useCallback, useState } from "react";
import "./App.css";
import { generateContent, purifyCode } from "./helper";

const App = () => {
  const [Info, setInfo] = useState({
    userQuery: "",
    error: "",
    generatedComponent: "",
    rawCode: "",
    showCode: false,
    loading: false,
  });

  const handleonChange = useCallback((e) => {
    setInfo((prev) => ({ ...prev, userQuery: e.target.value, error: "" }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (Info?.loading) return;

    if (!Info?.userQuery?.length) {
      return setInfo((prev) => ({
        ...prev,
        error: "Please enter a valid query",
      }));
    }

    setInfo((prev) => ({
      ...prev,
      loading: true,
      error: "",
      generatedComponent: null,
      rawCode: "",
      showCode: false,
    }));

    try {
      const response = await generateContent(Info?.userQuery);
      let componentCode = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      componentCode = purifyCode(componentCode);

      const savedCode = componentCode;

      let Component = new Function(
        "React",
        `
        try {
          ${componentCode}
          return GeneratedComponent
        } catch(error) {
          throw(error)
        }
        `
      )(React);

      setInfo((prev) => ({
        ...prev,
        generatedComponent: <Component />,
        rawCode: savedCode, // ← store the raw code string
        error: "",
        userQuery: "",
      }));
    } catch (error) {
      console.log("Error: ", error);
      setInfo((prev) => ({
        ...prev,
        error: error?.message || "Something went wrong, please try again",
      }));
    } finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  }, [Info?.userQuery, Info?.loading]);

  const toggleCode = useCallback(() => {
    setInfo((prev) => ({ ...prev, showCode: !prev.showCode }));
  }, []);

  return (
    <div className="codeGeneratorParentContainer">
      <div className="inputSectionContainer">
        <textarea
          className="textAreaInput"
          placeholder="Describe your React Component..."
          value={Info.userQuery}
          onChange={handleonChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
        />
        <button className="generateButtonContainer" onClick={handleGenerate}>
          Generate
        </button>
      </div>

      <div className="previewSectionContainer">
        {Info?.error && <div className="error-message">{Info?.error}</div>}

        {Info?.generatedComponent ? (
          <div className="componentWrapper">
            <div className="componentToolbar">
              <button className="viewCodeBtn" onClick={toggleCode}>
                {Info.showCode ? "Hide Code" : "View Code"}
              </button>
            </div>

            {Info.showCode && (
              <pre className="codePanel">
                <code>{Info.rawCode}</code>
              </pre>
            )}

            <div className="componentContent">
            {Info.generatedComponent}
            </div>

          </div>
        ) : (
          <div className="emptyMessageContainer">
            {Info?.loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <span>Generating Component</span>
              </div>
            ) : (
              <p>Describe your component in the input field and click Generate.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;