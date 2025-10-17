import { refreshAccessToken } from "@/api/user";
import type { User } from "@/types";
import { setStoredAccessToken } from "@/utils/helper";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


type AuthContextType = {
    accessToken: string | null,
    setAccessToken: (token: string | null) => void,
    user: User | null,
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const refreshAuth = async () => {
            try {
                const { newAccessToken: newToken, user } = await refreshAccessToken()
                setAccessToken(newToken)
                setUser(user)
                setStoredAccessToken(newToken)

            } catch (err: any) {
                console.log('failed to refresh access token')
            }
        }

        refreshAuth()
    }, [])

    useEffect(() => {
        setStoredAccessToken(accessToken)
    }, [accessToken])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('Use AuthContext inside a provider')
    return ctx
}