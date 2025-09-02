// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Conectamos a la base de datos
        const client = await clientPromise;
        const db = client.db("catalogoDB");
        const usersCollection = db.collection("users");

        // Buscamos al usuario por su nombre de usuario
        const user = await usersCollection.findOne({ username: credentials.username });

        // Si no encontramos al usuario, el login falla
        if (!user) {
          return null;
        }
        
        // Comparamos la contraseña que ingresó el usuario con la encriptada en la base de datos
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        // Si la contraseña no coincide, el login falla
        if (!passwordMatch) {
          return null;
        }
        
        // Si todo está bien, devolvemos el objeto de usuario para iniciar la sesión
        return { id: user._id.toString(), name: user.username };
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }