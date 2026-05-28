import React, { useCallback, useState } from "react";
import "./App.css";
import { generateContent, purifyCode } from "./helper";

const App = () => {
  // console.log(import.meta.env.VITE_GOOGLE_API_KEY);

  const [Info, setInfo] = useState({
    userQuery: "",
    error: "",
    generatedComponent: "",
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
    }));

    try {
      const response = await generateContent(Info?.userQuery);
      let componentCode = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      componentCode = purifyCode(componentCode);
      let Component = new Function(
        "React",
        `
        try{
          ${componentCode}
          return GeneratedComponent
        }catch(error){
          throw(error)
        }

        `,
      )(React);

      setInfo((prev) => ({
        ...prev,
        generatedComponent: <Component />,
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

  return (
    <div className="codeGeneratorParentContainer">
      <div className="inputSectionContainer">
        <textarea
          className="textAreaInput"
          placeholder="Describe your React Component..."
          onChange={handleonChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevents new line
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
          Info.generatedComponent
        ) : (
          <div className="emptyMessageContainer">
            {Info?.loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <span>Generating Component</span>
              </div>
            ) : (
              <p>
                Describe your component in the input field and click Generate.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
