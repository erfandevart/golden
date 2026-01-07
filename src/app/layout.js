import "./globals.css";
import Layout from "./components/layout/Layout";

export const metadata = {
  title: "قیمت لحظه‌ای",
  description:
    "جواهری ابوطالبیه، ارائه‌دهنده زیباترین و باکیفیت‌ترین جواهرات دست‌ساز و مدرن. انواع حلقه، گردنبند و زیورآلات لوکس برای هر سلیقه.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" dir="rtl">
      <body className="font-YekanBakhRegular relative">
        <div className="relative z-10">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
