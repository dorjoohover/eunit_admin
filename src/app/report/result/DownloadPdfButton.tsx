"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DownloadPdfButton({ id }: { id: string }) {
  const onClick = async () => {
    try {
      const res = await fetch(`/api/pdf/${id}`);
      if (!res.ok) return;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // алдаа гарвал чимээгүй орхино — товч дахин дарж болно
    }
  };

  return (
    <Button onClick={onClick} className="bg-blue hover:bg-blue/70 gap-2">
      <Download className="w-4 h-4" />
      Татаж авах (PDF)
    </Button>
  );
}
