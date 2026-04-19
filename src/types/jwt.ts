import type { JWTPayload } from "jose"

export interface JwtPayload extends JWTPayload {
    id: string
    email: string
    username: string
}
