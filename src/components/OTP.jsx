/* eslint-disable react/prop-types */
import { Fragment, useEffect, useRef } from 'react';
import ReactInput from './ReactInput';
import { bound } from '../utils';

export default function OTP({
  value,
  placeholder,
  separator,
  onChange,
  length,
  isNumeric,
  isDisabled,
  hasError,
  isSecured,
}) {
  const itemsRef = useRef({
    focusIndex: null,
    refs: [],
  });
  useEffect(() => {
    itemsRef.current.refs = itemsRef.current.refs.slice(0, length);
    itemsRef.current.focusIndex = null;
  }, [length]);

  const getStartIndex = () => {
    const currentFocusIndex = itemsRef.current.focusIndex;
    const isEmptyFocus = !value[currentFocusIndex];
    return isEmptyFocus ? value.findIndex((v) => !v) : currentFocusIndex;
  };

  const updateFocus = (moveBy) => {
    const finalIndex = bound(
      itemsRef.current.focusIndex + moveBy,
      0,
      length - 1
    );
    itemsRef.current.focusIndex = finalIndex;
    itemsRef.current.refs[finalIndex].focus();
  };

  const handleBeforeInput = (e) => {
    e.target.value = '';
  };

  const handleChange = (e) => {
    if (isNumeric && !isNaN(e.target.value)) return;
    const input = e.target.value.split('');
    const startIndex = getStartIndex();
    onChange(
      [
        ...value.slice(0, startIndex),
        ...input,
        ...value.slice(startIndex + input.length),
      ].slice(0, length)
    );

    updateFocus(input.length);
  };

  const handleFocus = (e) => {
    itemsRef.current.focusIndex = Number(e.target.name);
    e.target.select();
  };

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowRight': {
        e.preventDefault();
        updateFocus(1);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        updateFocus(-1);
        break;
      }
      case 'Backspace': {
        e.preventDefault();
        const clearIndex = Number(e.target.name);
        updateFocus(-1);
        onChange([
          ...value.slice(0, clearIndex),
          ...value.slice(clearIndex + 1),
          '',
        ]);
        break;
      }
      default:
        break;
    }
  };

  const renderInputBoxes = () => {
    const boxes = [];
    for (let index = 0; index < length; index++) {
      const refCallback = (el) => (itemsRef.current.refs[index] = el);
      boxes.push(
        <Fragment key={index}>
          {index !== 0 && separator}
          <ReactInput
            ref={refCallback}
            value={value[index]}
            placeholder={placeholder[index]}
            disabled={isDisabled}
            type={isSecured ? 'password' : undefined}
            className={`inputBox ${hasError ? 'error' : ''}`}
            name={index}
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            onBeforeInput={handleBeforeInput}
            onChange={handleChange}
          />
        </Fragment>
      );
    }
    return boxes;
  };

  return <div className="otp_container">{renderInputBoxes()}</div>;
}
