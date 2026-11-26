"use client";

import { useId } from "react";
import { Controller, type Control, type FieldPath } from "react-hook-form";
import { z } from "zod";

// import type { authFormSchema } from "@/lib/utils"
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

export default function CustomInput({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="form-item">
          <FieldLabel htmlFor={inputId} className="form-label">
            {label}
          </FieldLabel>

          <div className="flex w-full flex-col">
            <Input
              {...field}
              id={inputId}
              placeholder={placeholder}
              className="input-class"
              type={name === "password" ? "password" : "text"}
              aria-invalid={fieldState.invalid}
              aria-describedby={fieldState.error ? errorId : undefined}
            />

            {fieldState.error && (
              <FieldError
                id={errorId}
                className="form-message mt-2"
                errors={[fieldState.error]}
              />
            )}
          </div>
        </div>
      )}
    />
  );
}
