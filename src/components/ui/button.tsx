"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
  
  const variantStyles = {
    default: "bg-white text-[#1A2B4B] border border-[#e2e8f0] hover:bg-[#F8FAFC] shadow-sm",
    primary: "bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm",
    outline: "border border-[#e2e8f0] bg-transparent text-[#64748b] hover:bg-[#F8FAFC]",
    ghost: "text-[#64748b] hover:bg-[#F8FAFC] hover:text-[#1A2B4B]",
    link: "text-[#4F46E5] underline-offset-4 hover:underline"
  }
  
  const sizeStyles = {
    default: "h-9 px-4 py-2 text-sm",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9"
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
}
