import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { listVoucherSignups } from "@/lib/voucherSignups";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const allowed = await isAdminRequest(req);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const limitRaw = req.nextUrl.searchParams.get("limit");
    const limit = Math.min(
      1000,
      Math.max(1, parseInt(limitRaw || "500", 10) || 500),
    );
    const rows = await listVoucherSignups(limit);
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/vouchers/admin-list:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
