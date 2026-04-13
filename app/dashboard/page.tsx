import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";


const Dashboard = async () => {

    const user = await auth();
    console.log("User in Dashboard", user)


    return (
        <div>
            <h1>Dashboard</h1>
            <LogoutButton/>
        </div>
    );
};

export default Dashboard;