import Link from "next/link";


const Navbar = () => {
    return (
        
        <div className="flex items-center justify-between p-4 bg-secondary text-secondary-foreground container mx-auto">
            <h1>Orchestr Res</h1>
            <div className="flex space-x-4">
                <Link href="/">KOT</Link>
                <Link href="/about">Menu</Link>
                <Link href="/contact">Dashboard</Link>
            </div>
        </div>
    );
};

export default Navbar;