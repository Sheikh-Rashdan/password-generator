import { useRef } from 'react';

import "./IncludeCheckbox.css";

function IncludeCheckbox({ value, useValue, setUseValue }) {
  const checkboxRef = useRef();

  function updateValue(value) {
    setUseValue(value);
  }

  function toggleCheckbox() {
    if (checkboxRef.current !== undefined) {
      checkboxRef.current.checked = !checkboxRef.current.checked;
      updateValue(checkboxRef.current.checked);
    }
  }

  return (
    <div className="includeCheckboxContainer">
      <input type="checkbox" checked={useValue} ref={checkboxRef}
        onChange={(e) => updateValue(e.target.checked)} />
      <p onClick={toggleCheckbox}>{value}</p>
    </div>
  );
}

export default IncludeCheckbox;