import React, { forwardRef, useState } from "react";
import { splitFormProps, useField } from "react-form";
import { Input } from "reactstrap";
import spinner from "./spinner.gif";

interface InputFieldProps {
  field: string;
  disabled: boolean;
  name: string;
  placeholder: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: { error, isTouched, isValidating, message },
    getInputProps,
  } = useField(field, fieldOptions);
  const [value, setValue] = useState(fieldOptions.placeholder);

  return (
    <>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...getInputProps({ ref, ...rest })}
      />
      {isValidating ? (
        <img src={spinner} />
      ) : isTouched && error ? (
        <strong>{error}</strong>
      ) : (
        <small>{message}</small>
      )}
    </>
  );
});

export default InputField;
