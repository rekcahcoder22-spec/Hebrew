import type { Metadata } from "next";
import {
  ListItem,
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { B } from "@/components/i18n/B";
import { BilingualPolicyTable } from "@/components/i18n/BilingualPolicyTable";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Delivery Policy | HEBREW",
  description: "Shipping methods, timeframes and fees for HEBREW Store.",
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyLayout
      title={<LanguageText en="DELIVERY POLICY" vi="CHÍNH SÁCH GIAO HÀNG" />}
      subtitle={<LanguageText en="SHIPPING INFORMATION" vi="THÔNG TIN VẬN CHUYỂN" />}
    >
      <SectionHeading>
        <B en="1. COVERAGE" vi="1. PHẠM VI GIAO HÀNG" />
      </SectionHeading>
      <ListItem>
        <B
          en="Nationwide delivery to all 63 provinces"
          vi="Giao hàng toàn quốc 63 tỉnh thành"
        />
      </ListItem>
      <ListItem>
        <B
          en="International shipping available (contact for quote)"
          vi="Giao hàng quốc tế (liên hệ để báo giá)"
        />
      </ListItem>

      <SectionHeading>
        <B en="2. DELIVERY TIMEFRAMES" vi="2. THỜI GIAN GIAO HÀNG" />
      </SectionHeading>
      <BilingualPolicyTable
        headers={{
          en: ["REGION", "STANDARD", "EXPRESS"],
          vi: ["KHU VỰC", "TIÊU CHUẨN", "NHANH"],
        }}
        rows={[
          {
            en: ["Major cities", "1 to 2 days", "Same day (where available)"],
            vi: ["Thành phố lớn", "1–2 ngày", "Trong ngày (nếu có)"],
          },
          {
            en: ["Other provinces", "3 to 5 days", "2 to 3 days"],
            vi: ["Tỉnh khác", "3–5 ngày", "2–3 ngày"],
          },
          {
            en: ["Remote areas", "5 to 7 days", "3 to 5 days"],
            vi: ["Vùng xa", "5–7 ngày", "3–5 ngày"],
          },
        ]}
      />
      <Paragraph>
        <B
          en="Note: Times are calculated from order confirmation, excluding weekends and public holidays."
          vi="Lưu ý: Thời gian tính từ khi xác nhận đơn, không bao gồm cuối tuần và ngày lễ."
        />
      </Paragraph>

      <SectionHeading>
        <B en="3. SHIPPING FEES" vi="3. PHÍ VẬN CHUYỂN" />
      </SectionHeading>
      <BilingualPolicyTable
        headers={{
          en: ["METHOD", "PRICE", "FREE SHIPPING FROM"],
          vi: ["HÌNH THỨC", "PHÍ", "MIỄN PHÍ TỪ"],
        }}
        rows={[
          {
            en: ["Standard", "30,000 ₫", "Orders over 1,000,000 ₫"],
            vi: ["Tiêu chuẩn", "30.000 ₫", "Đơn từ 1.000.000 ₫"],
          },
          {
            en: ["Express", "50,000 ₫", "Orders over 2,000,000 ₫"],
            vi: ["Nhanh", "50.000 ₫", "Đơn từ 2.000.000 ₫"],
          },
          {
            en: ["Store Pickup", "Free", "Da Nang & Ha Tinh stores"],
            vi: ["Nhận tại cửa hàng", "Miễn phí", "Cửa hàng Đà Nẵng & Hà Tĩnh"],
          },
        ]}
      />

      <SectionHeading>
        <B en="4. DELIVERY PARTNERS" vi="4. ĐỐI TÁC VẬN CHUYỂN" />
      </SectionHeading>
      <ListItem>GHN (Giao Hàng Nhanh)</ListItem>
      <ListItem>GHTK (Giaohangtietkiem)</ListItem>
      <ListItem>Viettel Post</ListItem>
      <ListItem>J&amp;T Express</ListItem>

      <SectionHeading>
        <B en="5. ORDER TRACKING" vi="5. THEO DÕI ĐƠN HÀNG" />
      </SectionHeading>
      <Paragraph>
        <B
          en="After your order is picked up, you will receive a tracking link via SMS and email. Track your order on the carrier's website using your tracking number."
          vi="Sau khi đơn được lấy hàng, bạn nhận link theo dõi qua SMS và email. Tra cứu trên website đơn vị vận chuyển bằng mã vận đơn."
        />
      </Paragraph>

      <SectionHeading>
        <B en="6. LOST OR DAMAGED PACKAGES" vi="6. THẤT LẠC HOẶC HƯ HỎNG" />
      </SectionHeading>
      <ListItem>
        <B
          en="100% refund if package is lost due to carrier error"
          vi="Hoàn 100% nếu mất hàng do lỗi đơn vị vận chuyển"
        />
      </ListItem>
      <ListItem>
        <B en="Processing time: 3 to 7 business days" vi="Xử lý trong 3–7 ngày làm việc" />
      </ListItem>
      <ListItem>
        <B
          en="Contact us within 24 hours if you notice any issue"
          vi="Liên hệ trong 24 giờ nếu phát hiện sự cố"
        />
      </ListItem>
    </PolicyLayout>
  );
}
