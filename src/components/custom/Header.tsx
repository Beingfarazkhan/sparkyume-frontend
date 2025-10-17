import { Button } from "@/components/ui/button";
import { NavMenu } from "./NavMenu";
import { NavSheet } from "./NavSheet";
import { CircleX, Lightbulb, LogOut, PlusCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { logoutUser } from "@/api/user";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/utils/helper";

const Header = () => {
    const { user, setUser, setAccessToken } = useAuth()

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser(null)
            setAccessToken(null)
            toast(
                <div className="text-lg font-semibold flex flex-row justify-center gap-4 p-6 mx-auto">
                    <LogOut className="w-10 text-green-500" />
                    <p>Logged Out Successfully</p>
                </div>
            )
        } catch (error: any) {
            console.log(error)
            toast(
                <div className="text-lg font-semibold flex flex-row justify-center gap-4 p-6 mx-auto">
                    <CircleX className="w-10 text-red-600" />
                    <p>{error.message}</p>
                </div>
            )
        }
    }

    return (
        <div className="bg-muted">
            <nav className="h-16 bg-background border-b">
                <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to='/' className="cursor-pointer">
                        <Lightbulb />
                    </Link>

                    {/* Desktop Menu */}
                    <NavMenu className="hidden md:block" />

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <Button onClick={handleLogout} variant='destructive' className="hidden cursor-pointer shadow-lg hover:shadow-none sm:inline-flex">
                                    Logout
                                </Button>
                                <Link to='/ideas/new'>
                                    <Button className="cursor-pointer shadow-md hover:shadow-none group">New Idea <PlusCircle className="transition transform duration-500 group-hover:rotate-90" /></Button>
                                </Link>
                            </>
                        ) : (
                            <div className="hidden md:flex flex-row justify-center items-center p-4 gap-4">
                                <Link to="/register" className="w-full">
                                    <Button className="w-full cursor-pointer shadow-md hover:shadow-none" variant={'outline'}>
                                        Register
                                    </Button>
                                </Link>
                                <Link to="/login" className="w-full">
                                    <Button className="w-full cursor-pointer shadow-md hover:shadow-none">
                                        Login
                                    </Button>
                                </Link>

                            </div>
                        )}


                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <NavSheet />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
