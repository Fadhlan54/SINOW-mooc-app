"use client";

export default function Button({
  children,
  padding,
  type,
  color,
  bgColor,
  additionalClass,
  onClick = () => {},
}) {
  return (
    <button
      className={`${color || "text-white"} ${bgColor || "bg-primary-01"} ${padding || "p-3"} rounded-2xl ${additionalClass} text-sm`}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
