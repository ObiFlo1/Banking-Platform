"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Form } from "react-hook-form";

interface CustomInput {
  control: Control;
  name: string;
  label: string;
  placeholder: string;
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <div className="form-item">
            <FormLabel className="form-label">{label}</FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default CustomInput;
