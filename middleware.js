export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/recipes/new",
        "/recipes",
        "/shopping-list"

    ]
}