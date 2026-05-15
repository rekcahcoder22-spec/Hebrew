import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminSessionFromCookiesStore } from "@/lib/adminAuth";
import {
  countUniqueVoucherSignups,
  displayParticipantCount,
  getVoucherCampaignCode,
  listVoucherSignups,
  VOUCHER_CAMPAIGN_CAP,
  VOUCHER_DISPLAY_BASE_DEFAULT,
} from "@/lib/voucherSignups";

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminVouchersPage() {
  const allowed = await isAdminSessionFromCookiesStore();
  if (!allowed) redirect("/admin/login");

  const [rows, uniqueInDb] = await Promise.all([
    listVoucherSignups(500),
    countUniqueVoucherSignups(),
  ]);
  const displayTotal = displayParticipantCount(uniqueInDb);
  const campaignCode = getVoucherCampaignCode();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight text-gray-900">
            Voucher — SĐT đăng ký
          </h1>
          <p className="mt-2 font-mono text-xs text-gray-600">
            Mã ưu đãi đang dùng trên web:{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-900">
              {campaignCode}
            </code>{" "}
            (env{" "}
            <code className="rounded bg-gray-100 px-1">VOUCHER_CAMPAIGN_CODE</code>)
          </p>
          <p className="mt-1 font-mono text-sm text-gray-500">
            Số khác nhau trong DB: {uniqueInDb} · Hiển thị trên web:{" "}
            {displayTotal}/{VOUCHER_CAMPAIGN_CAP} (mặc định cộng thêm{" "}
            {VOUCHER_DISPLAY_BASE_DEFAULT} — đổi bằng env{" "}
            <code className="rounded bg-gray-100 px-1">VOUCHER_SIGNUP_BASE_COUNT</code>)
          </p>
        </div>
        <Link
          href="/admin"
          className="font-mono text-xs uppercase tracking-widest text-red-600 hover:underline"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 font-mono text-xs">
          <thead className="bg-gray-100 text-[10px] uppercase tracking-widest text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Số điện thoại</th>
              <th className="px-4 py-3 text-left">Thời gian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  Chưa có SĐT nào đăng ký.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={`${r.phone}-${r.createdAt}`}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.phone}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {formatWhen(r.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
