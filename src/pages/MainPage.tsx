import Cards from "./components/Cards";
import Header from "./components/Header";

function MainPage() {
  return (
    //@ts-ignore
    <div className="w-full min-h-screen px-3 bg-gray-200">
      <Header />
      <Cards />
    </div>
  );
}

export default MainPage;
