
## Learn Next Auth(Version 5)

This repository contains the source code for the educational video on the [tapaScript YouTube Channel](https://www.youtube.com/tapasadhikary). You will find various Next-Auth implementation details and the source code in this repository.

## The Implementations:

- [Integrate Google OAUTH](https://github.com/tapascript/learn-next-auth/tree/01-integrate-google-provider) => [Watch the Video Tutorial](https://www.youtube.com/watch?v=O8Ae6MC5bf4)
- [Integrate GitHub OAUTH](https://github.com/tapascript/learn-next-auth/tree/02-integrate-github-provider) => [Watch the Video Tutorial](https://www.youtube.com/watch?v=O8Ae6MC5bf4)
- [Next-Auth Credential Provider](https://github.com/tapascript/learn-next-auth/tree/03-credential-auth) => [Watch the Video Tutorial](https://www.youtube.com/watch?v=4m7u7zGbdTI)
- [Next.js Authentication || Register User To MongoDB With Next-Auth V5](https://github.com/tapascript/learn-next-auth/tree/04-persist-auth-mongo) => [Watch the Video Tutorial](https://www.youtube.com/watch?v=5kmZAqc2Jeg)
- [Next.js Middleware Crash Course || App Router Protected Routes](https://github.com/tapascript/learn-next-auth/tree/05-middleware) => [Watch the Video Tutorial](https://www.youtube.com/watch?v=jHrjnZM26i4)

## 🫶 Support
Liked my work? You can show your support with a STAR(⭐).

### Many Thanks to all the `Stargazers` who have supported this project with stars(⭐)

[![Thanks to all stargazers](https://git-lister.onrender.com/api/stars/tapascript/learn-next-auth?limit=15)](https://github.com/tapascript/learn-next-auth/stargazers)

## 🙏 Please Sponsor My Work

> I am an independent educator who creates meaningful projects to teach programming. You can support me further by [sponsoring me on GitHub](https://github.com/sponsors/atapas).


## How to Set up and Run Locally
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- First, install dependencies using,
  
  ```bash
  npm install
  ```

- Create a `.env` file at the root of the project folder with the following content:
  
  ```bash
  GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
  GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_ID>
  GITHUB_CLIENT_ID=<YOUR_GITHUB_CLIENT_ID>
  GITHUB_CLIENT_SECRET=<YOUR_GITHUB_CLIENT_ID>
  AUTH_SECRET="Auth Secret"
  ```
- Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

