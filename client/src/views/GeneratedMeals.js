import Navigation from "../components/Navigation";
import ChooseAMeal from "../components/ChooseAMeal";
import { useLocation } from "react-router-dom";

const GeneratedMeals = () => {

  const { state } = useLocation();
  const { tags } = state;
  console.log("Tags array:", tags);
  console.log("Tags for axios query:", tags.join(','));

  return (
    <div>
      <Navigation />
      <ChooseAMeal />
    </div>
  );
};

export default GeneratedMeals;
