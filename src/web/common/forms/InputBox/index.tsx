import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
interface InputBoxProps {
  textarea?: any;
  value?: any;
  onChange: any;
  label: string;
  required?: boolean;
  className?: string;
  type?: string;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: any;
}
export function InputBox(props: InputBoxProps) {
  const { textarea, value, onChange, label, ...extraProps } = props;
  return (
    <FloatingLabel label={label}>
      <Form.Control
        value={value}
        onInput={(e) => onChange(e.currentTarget.value)}
        {...(textarea ? { as: 'textarea' } : { type: 'text' })}
        {...extraProps}
        className={`mb-2 ${extraProps.className || ''}`}
      />
    </FloatingLabel>
  );
}
