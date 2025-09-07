import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="sm:hidden">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
