import Navigation from "../components/Navigation";
import ChooseAMeal from "../components/ChooseAMeal";
import { useLocation } from "react-router-dom";

const GeneratedMeals = () => {
  const { state } = useLocation();
  const { tags, query } = state;
  console.log("Tags array:", tags);
  console.log("Tags for axios query:", tags.join(","), "query:", query);

  return (
    <div>
      <Navigation />
      <ChooseAMeal tags={tags} />
    </div>
  );
};

export default GeneratedMeals;
