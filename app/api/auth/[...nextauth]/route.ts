import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',

      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        // console.log("credentials",credentials)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if (!user) {
          throw new Error("No user found");
        }
        // console.log(user)
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return { id: String(user.id ), name: user.firstName, email: user.email ,Role:user.Role,image:user.image};
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.Role = user.Role
        token.image = user.image
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.Role = token.Role as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  // pages: {
  //   signIn: "/auth/signin",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  
})

export { handler as GET, handler as POST } 