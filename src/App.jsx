/* eslint-disable react/prop-types */
import { useState } from 'react';
import OTP from './components/OTP';

function App({ length, answer }) {
  const [value, setValue] = useState(Array(length).fill(''));
  const isValidValue = value.join('').length === length;

  const handleClear = () => {
    setValue(Array(length).fill(''));
  };

  const handleSubmit = () => {
    if (answer === value.join('')) alert('SUCCESS');
    else alert('INCORRECT OTP');
  };

  return (
    <div className="container">
      <form className="form">
        <p>Enter received code</p>
        <OTP
          value={value}
          placeholder={Array(length).fill(0)}
          separator="-"
          onChange={setValue}
          length={length}
          isNumeric={false}
          isDisabled={false}
          hasError={false}
          isSecured={false}
        />
        <div className="submission">
          <button type="button" onClick={handleClear}>
            Clear
          </button>
          <button onClick={handleSubmit} disabled={!isValidValue}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
