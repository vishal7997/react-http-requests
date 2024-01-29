import React, { useState } from "react";

function useHttp() {
  let [errorMessage, setErrorMessage] = useState(null);

  function sendHttpRequest(url, method, body, action) {
    fetch(
      url,
      {
        method: method,
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong. Please try again later.");
        }
        let data = response.json();
        action(data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return [errorMessage, sendHttpRequest];
}

export default useHttp;
