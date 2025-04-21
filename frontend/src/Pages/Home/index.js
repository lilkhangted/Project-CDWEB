import CategoryList from "../../Components/Body/CategoryList";
import TeddyList from "../../Components/Body/TeddyList";
import TeddyList2 from "../../Components/Body/TeddyList2";
import CreateProduct from "../../Components/Body/CreateProduct";
const Home =()=>{
    return (
        <div className="home-page">
          <CategoryList />
          <TeddyList />
          <TeddyList2 />
          <CreateProduct />
        </div>
    );
};

export default Home;