import QuestionsNav from "@/components/Questions/QuestionsNav";

const MainLayout = async ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* <QuestionsNav /> */}
      {children}
    </div>
  );
};

export default MainLayout;
