import { auth } from "@/auth";


const Dashboard = async () => {

    const user = await auth();
    console.log("User in Dashboard", user)


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default Dashboard;