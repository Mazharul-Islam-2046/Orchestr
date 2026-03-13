import { auth } from "@/auth";
import { CreateRestaurantForm } from "@/components/forms/createRestaurant-form";


const Dashboard = async () => {

    const user = await auth();
    console.log("User in Dashboard", user)


    return (
        <div>
            <h1>Dashboard</h1>
            <CreateRestaurantForm/>
        </div>
    );
};

export default Dashboard;