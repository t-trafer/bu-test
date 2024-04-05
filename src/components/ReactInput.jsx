import { forwardRef } from 'react';

const ReactInput = forwardRef(function ReactInput({ ...rest }, ref) {
  return <input {...rest} ref={ref} />;
});

export default ReactInput;
