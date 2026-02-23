import { useState, useEffect } from "react";

const roles = [
  "Machine Learning",
  "Business Analytics",
  "Full Stack Development",
  "Data Science",
];

const TypeWriter = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="font-mono text-lg md:text-2xl text-accent">
      {text}
      <span className="border-r-2 border-accent animate-typing-cursor ml-0.5">&nbsp;</span>
    </span>
  );
};

export default TypeWriter;
