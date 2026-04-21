import type { Metadata } from "next";
import {
  HighlightBox,
  ListItem,
  Paragraph,
  PolicyLayout,
  SectionHeading,
} from "@/components/layouts/PolicyLayout";

export const metadata: Metadata = {
  title: "Payment Policy — HEBREW",
  description: "Payment instructions and methods accepted at HEBREW Store.",
};

export default function PaymentPolicyPage() {
  return (
    <PolicyLayout title="PAYMENT POLICY" subtitle="PAYMENT INSTRUCTIONS">
      <SectionHeading>1. ACCEPTED PAYMENT METHODS</SectionHeading>
      <Paragraph>We accept:</Paragraph>
      <ListItem>Cash on Delivery (COD) — nationwide</ListItem>
      <ListItem>Direct bank transfer</ListItem>
      <ListItem>E-wallets: MoMo, ZaloPay, VNPay</ListItem>
      <ListItem>Credit/Debit cards: Visa, Mastercard, JCB</ListItem>

      <SectionHeading>2. BANK TRANSFER DETAILS</SectionHeading>
      <HighlightBox>
        Bank: Vietcombank
        <br />
        Account No.: 1018264589
        <br />
        Account Name: PHAM DUY NHAT QUANG
        <br />
        Transfer note: [Order ID] + [Full name]
      </HighlightBox>

      <SectionHeading>3. PAYMENT RULES</SectionHeading>
      <ListItem>COD orders require confirmation via SMS/Zalo before dispatch</ListItem>
      <ListItem>
        Bank transfers must be confirmed with a screenshot within 24 hours
      </ListItem>
      <ListItem>Unconfirmed orders are automatically cancelled after 48 hours</ListItem>
      <ListItem>
        HEBREW is not responsible for transactions with incorrect info
      </ListItem>

      <SectionHeading>4. PAYMENT SECURITY</SectionHeading>
      <Paragraph>
        All payment information is encrypted with 256-bit SSL. HEBREW does not
        store card information.
      </Paragraph>

      <SectionHeading>5. PAYMENT SUPPORT</SectionHeading>
      <HighlightBox accent="gold">
        Email: hebreworiginal@gmail.com
        <br />
        Hotline: 032.668.9947 (Mon–Sun, 8AM–10PM)
      </HighlightBox>
    </PolicyLayout>
  );
}
