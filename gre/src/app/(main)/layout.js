import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/Footer";

const MainLayout = async ({ children }) => {

  

  return (
    <div className="h-[10%] w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
