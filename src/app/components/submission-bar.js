import React from "react";
import { useState } from "react";

function SubmissionBar(visibility = true) {
  const [isVisible, setVisible] = useState(visibility);
  const [inputValue, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInput = async () => {
    console.log("got input: ", inputValue);
    document.getElementById("input-box").value = "";
    document.getElementById("input-box").style.border = "3px #40f540 solid";
    if (!inputValue.trim()) return; // Prevent empty input

    try {
      const response = await fetch("http://129.153.59.141:8000/predict", {
        method: "POST",
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "text": inputValue
        }),
      });

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      console.log("ML Response:", res);
      const dominantEmotion = Object.keys(res).reduce((a, b) =>
        res[a] > res[b] ? a : b
      );
      console.log("Dominant Emotion:", dominantEmotion);

      return { res, dominantEmotion };
    } catch (error) {
      console.error("Error in emotion detection:", error);
    }
  };

  return (
    <div id="input-submit" style={{}}>
      {isVisible && (
        <div
          style={{
            display: "grid",
            flexDirection: "row",
            margin: "auto",
            width: "100%",
            alignContent: "center",
          }}
        >
          <input
            type="text"
            id="input-box"
            style={{ justifySelf: "center" }}
            placeholder="What was your reaction? Leave a comment!"
            onChange={handleInputChange}
          ></input>
          <button
            type="submit"
            className="next"
            id="player-option"
            style={{ justifySelf: "center" }}
            onClick={() => handleInput()}
          >
            Next
          </button>
        </div>
      )}
      <button
        className="hide-show"
        style={{ justifySelf: "left", position: "absolute" }}
        onClick={() => setVisible(!isVisible)}
      >
        {isVisible ? "Hide UI" : "Show UI"}
      </button>
    </div>
  );
}

export default SubmissionBar;
