import React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useSession from "../hooks/useSession";

function SubmissionBar() {
  const params = useSearchParams();
  const givenParams = params.get("sessionId");

  //const [isVisible, setVisible] = useState(visibility);
  const [inputValue, setInput] = useState("");
  const { data, loading, error, updateSession, sessionId } = useSession(givenParams);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInput = async () => {
    console.log("got input: ", inputValue);
    if (!inputValue.trim()) {
      document.getElementById("input-box").style.border = "none";
      return;
    }
    document.getElementById("input-box").value = "";
    document.getElementById("input-box").style.border = "3px #40f540 solid";

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
      //const dominantEmotion = Object.keys(res).reduce((a, b) =>
       // res[a] > res[b] ? a : b
      //);

      //console.log("Dominant Emotion:", dominantEmotion);

      updateSession({"emotion": "changed"});
      updateSession({"Emotions": res})
      

     // return { res, dominantEmotion };
    } catch (error) {
      console.error("Error in emotion detection:", error);
    }
  };

  return (
    <div id="input-submit" style={{}}>
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
            onKeyDown={(event) => {
              if (event.key === "Enter") handleInput();
            }}
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
    </div>
  );
}

export default SubmissionBar;
