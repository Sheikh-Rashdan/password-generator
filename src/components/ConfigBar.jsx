import IncludeCheckbox from "./IncludeCheckbox";
import Slider from "./Slider";

import "../App.css";
import "./ConfigBar.css";

function ConfigBar({ passwordLength, setPasswordLength, useNumbers, setUseNumbers, useSymbols, setUseSymbols, useUppercase, setUseUppercase, generatePassword }) {
  return (
    <div className="configBar container column spaced">
      <div className="column">
        <p>Length: {passwordLength}</p>
        <Slider startValue={passwordLength} setValue={setPasswordLength} min={8} max={24} />
        {/* <input type="number" min={8} max={24} value={passwordLength}
          onKeyDown={(e) => e.preventDefault()}
          onInput={(e) => setPasswordLength(e.target.value)} /> */}
      </div>

      <hr />

      <div>
        <p>Include:</p>
        <div className="row">
          <IncludeCheckbox value="Uppercase" useValue={useUppercase} setUseValue={setUseUppercase} />
          <p>&nbsp;|&nbsp;</p>
          <IncludeCheckbox value="Numbers" useValue={useNumbers} setUseValue={setUseNumbers} />
          <p>&nbsp;|&nbsp;</p>
          <IncludeCheckbox value="Symbols" useValue={useSymbols} setUseValue={setUseSymbols} />
        </div>
      </div>

      <hr />

      <button className="textButton" onClick={generatePassword}>Regenerate 🔄️</button>
    </div>
  );
}

export default ConfigBar;