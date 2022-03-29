import Navigation from "../components/Navigation";
import ChooseAMeal from "../components/ChooseAMeal";
import { useLocation } from "react-router-dom";

const GeneratedMeals = () => {
    const { state } = useLocation();
    if (state) {
      var { tags, query } = state;
    } else {
      var tags = []
      var query = ""
    }
  console.log("Tags array:", tags);
  console.log("Tags for axios query:", tags.join(","), "query:", query);

  return (
    <div>
      <Navigation />
      <div className="profile-background">
      <ChooseAMeal tags={tags} />
      </div>
    </div>
  );
};

export default GeneratedMeals;
