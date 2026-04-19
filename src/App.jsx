import { useState, useEffect } from "react";

import ConfigBar from "./components/ConfigBar";
import StrengthMeter from "./components/StrengthBar";

import "./App.css";
import StrengthBar from "./components/StrengthBar";

function App() {
  const [passwordLength, setPasswordLength] = useState(12);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useUppercase, setUseUppercase] = useState(true);
  const [copiedTooltipVisible, setCopiedTooltipVisible] = useState(false);
  const [password, setPassword] = useState("Password");

  function getRandom(characters) {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  function hasCharacter(characters, string) {
    for (let i = 0; i < characters.length; i++) {
      if (string.includes(characters.charAt(i))) {
        return true;
      }
    }
    return false;
  }

  function generatePassword() {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]|<>?~";

    let combination = lowercase;
    if (useUppercase) combination += uppercase;
    if (useNumbers) combination += numbers;
    if (useSymbols) combination += symbols;

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      password += getRandom(combination);
    }

    if ((useNumbers && !hasCharacter(numbers, password)) || (useSymbols && !hasCharacter(symbols, password)) || (useUppercase && !hasCharacter(uppercase, password))) {
      generatePassword();
    } else {
      setPassword(password);
    }
  }

  useEffect(() => {
    generatePassword();
  }, [passwordLength, useNumbers, useSymbols, useUppercase]);

  function copyToClipboard() {
    navigator.clipboard.writeText(password)
      .then(() => setCopiedTooltipVisible(true))
      .catch(() => alert("Failed to Copy!"));
  }

  useEffect(() => {
    if (!copiedTooltipVisible) return;

    const timeout = setTimeout(() => setCopiedTooltipVisible(false), 1000);

    return () => clearTimeout(timeout);
  }, [copiedTooltipVisible]);

  return (
    <>
      <p className="title">Password Generator</p>
      <ConfigBar
        passwordLength={passwordLength}
        setPasswordLength={setPasswordLength}
        useNumbers={useNumbers}
        setUseNumbers={setUseNumbers}
        useSymbols={useSymbols}
        setUseSymbols={setUseSymbols}
        useUppercase={useUppercase}
        setUseUppercase={setUseUppercase}
        generatePassword={generatePassword}
      />

      <div className="container center">
        <p className="password">{password}</p>
        <button onClick={copyToClipboard} className={`iconButton clipboard ${copiedTooltipVisible ? "isVisible" : ""}`}>
          {copiedTooltipVisible ? "☑️" : "📋"}
        </button>
      </div>

      <div className="container spaced column">
        <StrengthBar
          passwordLength={passwordLength}
          useUppercase={useUppercase}
          useNumbers={useNumbers}
          useSymbols={useSymbols}
        />
      </div>
    </>
  );
}

export default App