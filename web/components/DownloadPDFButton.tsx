"use client";

import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface DownloadPDFButtonProps {
  pdfUrl: string;
  fileName?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export default function DownloadPDFButton({
  pdfUrl,
  fileName = "document.pdf",
  children = "Download PDF",
  className,
  variant = "primary",
}: DownloadPDFButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
      alert("Kon het PDF bestand niet downloaden. Probeer het later opnieuw.");
    } finally {
      setIsDownloading(false);
    }
  };

  const baseStyles =
    "flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 px-6 py-3";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    outline: "border border-gray-300 hover:bg-gray-50 text-gray-700",
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={twMerge(
        clsx(baseStyles, variants[variant]),
        className,
        "text-faect-blue border-faect-blue hover:bg-faect-blue focus:bg-faect-blue transition-transform: 0.3s nav-item-sweep mt-20 w-full rounded-xl border-2 bg-white py-2 text-center text-[1.1rem]/6 font-semibold transition-colors duration-400 ease-in-out hover:scale-95 hover:text-white focus:scale-95 focus:text-white md:my-6 xl:py-2",
      )}
    >
      {isDownloading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Bezig met downloaden...
        </>
      ) : (
        <>
          <Download size={20} />
          {children}
        </>
      )}
    </button>
  );
}
