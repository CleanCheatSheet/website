import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

const provider = GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  authorization:
    "https://github.com/login/oauth/authorize?scope=read:user+user:email+repo",
});

export default NextAuth({
  providers: [provider],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        return true;
      }
      return false;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
