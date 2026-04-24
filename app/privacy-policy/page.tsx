import type { Metadata } from "next";
import {
  ListItem,
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";
import { LanguageText } from "@/components/i18n/LanguageText";

export const metadata: Metadata = {
  title: "Privacy Policy — HEBREW",
  description:
    "How HEBREW collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title={<LanguageText en="PRIVACY POLICY" vi="CHÍNH SÁCH BẢO MẬT" />}
      subtitle={<LanguageText en="DATA PROTECTION" vi="BẢO VỆ DỮ LIỆU" />}
    >
      <SectionHeading>1. INTRODUCTION</SectionHeading>
      <Paragraph>
        HEBREW respects your privacy. This policy describes how we collect, use,
        and protect your personal information when you shop with us.
      </Paragraph>

      <SectionHeading>2. INFORMATION WE COLLECT</SectionHeading>
      <ListItem>Full name, email address, phone number when ordering</ListItem>
      <ListItem>Delivery address</ListItem>
      <ListItem>Order history and payment records</ListItem>
      <ListItem>Browser data (cookies) to improve your experience</ListItem>

      <SectionHeading>3. HOW WE USE YOUR INFORMATION</SectionHeading>
      <ListItem>Process and fulfill your orders</ListItem>
      <ListItem>Send order updates, promotions, and drop notifications</ListItem>
      <ListItem>Improve our service quality and website</ListItem>
      <ListItem>Comply with Vietnamese legal requirements</ListItem>

      <SectionHeading>4. DATA PROTECTION</SectionHeading>
      <Paragraph>
        All data is encrypted with 256-bit SSL. We do not sell or share personal
        information with third parties, except with delivery partners required
        to fulfill your order.
      </Paragraph>

      <SectionHeading>5. YOUR RIGHTS</SectionHeading>
      <ListItem>Request access to your stored personal data</ListItem>
      <ListItem>Request correction of inaccurate information</ListItem>
      <ListItem>Request account and data deletion</ListItem>
      <ListItem>Unsubscribe from marketing emails at any time</ListItem>

      <SectionHeading>6. COOKIES</SectionHeading>
      <Paragraph>
        This website uses cookies to save your cart and improve your experience.
        You can disable cookies in your browser settings at any time.
      </Paragraph>

      <SectionHeading>7. CONTACT</SectionHeading>
      <Paragraph>For privacy concerns: privacy@hebrew.vn</Paragraph>
    </PolicyLayout>
  );
}
