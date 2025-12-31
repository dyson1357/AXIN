"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-normal"
  
  const variantStyles = {
    default: "bg-[#EEF2FF] text-[#4F46E5]",
    secondary: "bg-[#F1F5F9] text-[#64748b]",
    destructive: "bg-[#FEF2F2] text-[#DC2626]",
    outline: "text-[#64748b] border border-[#e2e8f0]"
  }
  
  return (
    <span
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  )
}
