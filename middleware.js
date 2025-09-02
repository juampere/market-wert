// middleware.js
export { default } from "next-auth/middleware"

export const config = { 
  matcher: [
    "/admin",
    "/admin/productos",
    "/admin/productos/nuevo",
    "/admin/productos/editar/:path*",
  ] 
}