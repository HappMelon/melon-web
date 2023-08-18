import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // https://clerk.com/docs/nextjs/middleware#making-pages-public-using-public-routes
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
