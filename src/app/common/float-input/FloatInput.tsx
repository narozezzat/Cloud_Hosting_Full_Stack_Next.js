"use client";
import React, { useState, ChangeEvent } from "react";
import { Input } from "antd";

import "./index.css";

interface FloatInputProps {
    label: string;
    value?: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    name?: string;
    className?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FloatInput: React.FC<FloatInputProps> = (props) => {
    const [focus, setFocus] = useState(false);
    const { label, value, placeholder, type, required, name, className, onChange } = props;

    const actualPlaceholder = placeholder || label;
    const isOccupied = focus || (value && value.length !== 0);
    const labelClass = isOccupied ? "label as-label" : "label as-placeholder";
    const requiredMark = required ? <span className="text-danger">*</span> : null;

    return (
        <div
            className="float-label"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            <Input
                onChange={onChange}
                type={type}
                defaultValue={value}
                name={name}
                className={className}
            />
            <label className={labelClass}>
                {isOccupied ? label : actualPlaceholder} {requiredMark}
            </label>
        </div>
    );
};

export default FloatInput;
