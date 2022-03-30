import { useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import OneMeal from "../components/OneMeal";

const OneRecipe = () => {

  return (
    <div>
      <Navigation />
      <OneMeal />
    </div>
  );
};

export default OneRecipe;
