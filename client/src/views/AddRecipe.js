import Navigation from "../components/Navigation";
import RecipeForm from "../components/RecipeForm";

const AddRecipe = () => {
    return (
    <div>
        <Navigation />
        <div className="profile-background">
        <RecipeForm />
        </div>
    </div>
    );
};

export default AddRecipe;