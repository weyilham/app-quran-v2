import React, { forwardRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type PropsType = {
  label: string;
  children: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// Menggunakan forwardRef untuk meneruskan ref
const Select = forwardRef<HTMLSelectElement, PropsType>(
  ({ label, children, onChange }, ref) => {
    return (
      <div className="ayat">
        <label
          htmlFor="ayat"
          className="text-sm text-slate-500 font-primarySemibold"
        >
          {label}
        </label>
        <select
          name="ayat"
          id="ayat"
          className="w-full bg-slate-100 p-2 rounded-sm mt-3"
          ref={ref} // Meneruskan ref ke elemen select
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    );
  }
);

export default Select;
