import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { API_URL } from "@/lib/configs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? "";

  try {
    const backendRes = await fetch(`${API_URL}request/service/pdf/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: "Алдаа гарлаа" },
        { status: backendRes.status }
      );
    }

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers: {
        "Content-Type":
          backendRes.headers.get("content-type") || "application/pdf",
        "Content-Disposition":
          backendRes.headers.get("content-disposition") ||
          `inline; filename=report-${id}.pdf`,
      },
    });
  } catch {
    return NextResponse.json({ message: "Алдаа гарлаа" }, { status: 500 });
  }
}
