import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/api/user";
import { toast } from "sonner";
import { CircleX, LogOut } from "lucide-react";


export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
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
        <NavigationMenu {...props}>
            <NavigationMenuList className=" gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/">Home</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/ideas">Ideas</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/about">About</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link to="/contact">Contact</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <div className="md:hidden w-[50vw] md:w-[100%] flex flex-col justify-center items-center p-4 gap-4">
                    {user ? (
                        <Button onClick={handleLogout} variant={'destructive'} className="w-full cursor-pointer shadow-lg hover:shadow-none">
                            Logout
                        </Button>
                    ) : (<>
                        <Link to="/register" className="w-full ">
                            <Button className="w-full cursor-pointer shadow-lg hover:shadow-none">
                                Register
                            </Button>
                        </Link>
                        <Link to="/login" className="w-full">
                            <Button className="w-full cursor-pointer shadow-lg hover:shadow-none">
                                Login
                            </Button>
                        </Link>
                    </>)
                    }
                </div>
            </NavigationMenuList>
        </NavigationMenu>
    )

};
