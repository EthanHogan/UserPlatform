This project is used as my starting point for most of my web application personal projects.

## Using this project as a starting point

1. Create a new repository for your new project. Do not create it with a README or any other files. Just name it and create it.
2. Select the `Import Code` option.
3. Paste in the GitHub url for this repo:

```sh
https://github.com/EthanHogan/UserPlatform.git
```

4. Click `Begin Import`.

## Main Technologies used in the UserPlatform

- [Next.js (React Framework)](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team/)
- [tRPC (TS-based framework for building typesafe APIs)](https://trpc.io)
- [PlanetScale (Serverless MySQL DB)](https://planetscale.com)
- [Clerk (Auth/User Management)](https://clerk.com)
- [Vercel (CI/CD, Hosting for Serverless Apps)](https://create.t3.gg/en/deployment/vercel)
- [Axiom (Logging)](https://app.axiom.co)
- [Upstash (Rate Limiter)](https://upstash.com)

## Steps to setting up a new project

- Run:

```sh
npm install
```

- `Next.js`, `Tailwind`, `Drizzle`, `tRPC`: These are already set up with the project.
- Ensure the project is in your GitHub.
- **PlanetScale (setting up your own database for the project):**
  1. Sign in to [PlanetScale](https://planetscale.com).
  2. Click `Create a New Database`.
  3. Select the region for your DB, ideally close to where your `Vercel` functions will be deployed.
  4. Name your DB (e.g., "userplatformdb").
  5. Click the `Connect` button.
  6. Change the `Connect with:` value to "Prisma" (at the time of writing this, "Drizzle" is not an option but this should still work with the "Prisma" option selected).
  7. Copy the `DATABASE_URL` environment variable and paste it into your project's `.env` file.
  8. In your terminal, run `npm run dbpush` to set the database schema based on the current schema in the `drizzle/schema.ts` file.
  9. Run `npx drizzle-kit studio` in the terminal to view your database tables and data in the browser.
- **PlanetScale (using the shared, multiproject hobbydb)**
  1. Add the `DATABASE_URL`, environment variable needed to connect to the hobbydb on [PlanetScale](https://planetscale.com). You can pull the variable from an existing project that also uses the hobbydb or go to PlanetScale and generate a new password for this application.
  2. Update the `dbTablePrefix` value in `config.json` with the prefix of what you want your tables to be named with in the database. Also update any other application specific configs in `config.json`.
  3. In your terminal, run `npm run dbpush` to set the database schema based on the current schema in the `drizzle/schema.ts` file.
  4. Run `npx drizzle-kit studio` in the terminal to view your database tables and data in the browser.
- **Clerk:**
  1. Navigate to [Clerk](https://dashboard.clerk.com) and sign in.
  2. Add an application (you may need to create a workspace first, e.g., "Personal").
  3. Set the application name (e.g., "userplatform").
  4. Select Identifiers, Auth strategy, and Social Connections as desired.
  5. Click `Create Application`.
  6. Navigate to `API Keys` on Clerk to get the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. Copy and paste both into your project's `.env` file.
  7. If you want to require users to have a username, in the Clerk side bar under "User & Authentication", select "Email, Phone, Username" and toggle on `Username`.
  - Note: some social connections will pass the username to the webhook without this toggled on, but for the ones that don't, when this is turned on, an additional popup will come up for the user, requiring them to enter a unique username. Or they made be required to enter a unique username if the username given by the social connection conflicts with an existing users username.
- **Upstash:**
  1. Navigate to [Upstash](https://upstash.com) and sign in.
  2. Click `Console` button to get the console or go to console [here](https://console.upstash.com).
  3. Click `Create Database`.
  4. Name the database (e.g., "userplatform-ratelimiter")
  5. Select type `Regional`.
  6. Select the Region closest to your DB and server (e.g., "US-EAST-1").
  7. Click `Create`.
  8. Once done creating, on the `Details` tab (should be the default tab), scroll down under the `REST API` section, you should see options to access your Upstash database (cURL, JavaScript (Fetch), @upstash/redis, .env).
  9. Select `.env`
  10. Copy both the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
  11. Paste both of the environment variables into your `.env`.
- **Vercel:**
  1. Create a new project in `Vercel` at https://vercel.com/new.
  2. Import your project from GitHub by finding it in the list and clicking "import."
  3. Add the `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables from your `.env` file to the `Environment Variables` section.
  4. Select `Production`, `Preview`, and `Development` environments (you can do this later after deployment at https://vercel.com/MyGitHubUsername/MyProjectName/settings/environment-variables if needed).
  5. Click `Deploy`.
  6. Set the function region to the region closest to your DB deployment at https://vercel.com/MyGitHubUsername/MyProjectName/settings/functions.
- **Axiom:**
  1. Create an `Axiom` account with your GitHub at https://app.axiom.co.
  2. Navigate to Vercel Integrations at https://vercel.com/dashboard/integrations.
  3. Click `Browse Marketplace`.
  4. Search "Axiom" and add it.
  5. Select the `Vercel` account you want to add the integration to, then click `Continue`.
  6. Choose specific projects or all `Vercel` projects, then click `Continue`.
  7. Click `Add Integration`.
  8. Click `Connect to Vercel` in `Axiom` modal.

## Running the app

```sh
npm run dev
```

## Pushing Schema Changes to the Database

```sh
npm run dbpush
```

## Viewing DB

```sh
npx drizzle-kit studio
```

## Deployment

Deployment should be as easy as pushing changes to `main` or `master` branch if Vercel and PlanetScale are setup correctly.

```sh
git push
```

## Using Clerk Webhooks to sync user data

### OLD WAY

- **Ngrok:**
  You will need Ngrok to locally test your webhook endpoints and their ability to receive/handle webhook requests.
  (Clerk Webhook Integrations w/ Ngrok for testing locally)[https://ngrok.com/docs/integrations/clerk/webhooks/]

  1. Open ngrok terminal by running the .exe once you have ngrok for windows installed.
  2. Run ngrok on the same port you have your project running on.

  ```sh
  ngrok http 3000
  ```

  3. Copy the "Forwarding" url from the terminal to setup an endpoint with Clerk (e.g. https://1234-56-789-012-345.ngrok-free.app

- **Clerk:**

  1. Navigate to https://dashboard.clerk.com and sign in.
  2. Select your application.
  3. Select "Webhooks".
  4. Select "Add Endpoint".
  5. Paste the "Forwarding" url from the ngrok terminal in the "Endpoint URL" field.
  6. Append your route of your webhook to the end of the "Endpoint URL" (e.g. /api/clerk-user-webhook)
  7. Select which events you would like handle in your webhook endpoint (e.g. "user.created", "user.deleted", and "user.updated").
  8. Select "Create".
  9. Copy the "Signing Secret" in the bottom right of the "Endpoints" tab.
  10. Paste this secret as the value for your "CLERK_USER_EVENT_WEBHOOK_SECRET" environment variable in you `.env` file.

  - Note: This environment variable is endpoint specific. So for your production endpoint, you will have a different "Signing Secret" that will need to be added to your environment variables in Vercel Settings (example url of how to get there: https://vercel.com/MyGitHubUsername/MyProjectName/settings/environment-variables).

  11. Select "Testing" tab of your Clerk endpoint, then select a supported event type to test your webhook. Click "Send Example" to test your webhook event handler.
  12. Create a new endpoint in Clerk ("Add Endpoint" on "Webhooks" page) with the same settings, except change the endpoint url to your production endpoint.

### NEW WAY

**Vercel User Webhook Project:**

1. Navigate to https://vercel.com/ethanhogan/user-webhook/settings/environment-variables. Sign in to Vercel first if needed.
2. Add 2 environment variables for your app, `AppId` and `CLERK_USER_EVENT_WEBHOOK_SECRET`. Use the naming convention for the variables. Variable names begin with "App\_" and end with the name for the variable and contain the app name between the 2. For example, if I was adding am AppId variable for the UserPlatform application, I would add it as "App_UserPlatform_AppId".
3. Make sure to include an "\_AppId" variable and give it the name of your application. You will use this name when setting up the endpoint with Clerk.

**Clerk:**

1. Navigate to https://dashboard.clerk.com and sign in.
2. Select your application.
3. Select "Webhooks".
4. Select "Add Endpoint".
5. Use "https://user-webhook.vercel.app/api/clerk-user-webhook?AppId=UserPlatform" url, changing out "UserPlatform" for the name of your application. This must match the "\_AppId" variable added to the Vercel User Webhook project.

6. Select which events you would like handle in your webhook endpoint (e.g. "user.created", "user.deleted", and "user.updated").
7. Select "Create".
8. Copy the "Signing Secret" in the bottom right of the "Endpoints" tab.
9. Paste this secret as the value for your "App_UserPlatform_CLERK_USER_EVENT_WEBHOOK_SECRET" environment variable in the Vercel user-webhook application, replacing "UserPlatform" with the AppId of your application.

- Note: This environment variable is endpoint specific. So for your production endpoint, you will have a different "Signing Secret" that will need to be added to your environment variables in Vercel Settings (example url of how to get there: https://vercel.com/MyGitHubUsername/MyProjectName/settings/environment-variables).

11. Select "Testing" tab of your Clerk endpoint, then select a supported event type to test your webhook. Click "Send Example" to test your webhook event handler.
12. Create a new endpoint in Clerk ("Add Endpoint" on "Webhooks" page) with the same settings, except change the endpoint url to your production endpoint.

## Running MySQL DB locally using Docker

- **Docker:**
  1. Spin up a container with an image that has mysql on it. If you run the command below, it will automatically install the latest version of the mysql image and startup a container.
  - Swap the `user-platform-mysql` for whatever you want to call the container.
  - Swap the `3333` for whatever port number you want to expose the container on.
  - Swap `myPassword` with your password to the db.
  ```sh
  docker run --name user-platform-mysql -p 3333:3306 -e MYSQL_ROOT_PASSWORD=myPassword -d mysql
  ```
- **MySQL:**
  1. Use MySQL Workbench to create your database schema. Note the name. For this example, lets say we name the schema `UserPlatform`.
- **Drizzle:**
  1. Update the `DATABASE_URL` line in the `.env` to the following format:
  - `root` and `myPassword` are your DB credentials. You would have used them to connect to the DB in MySQL Workbench.
  - Make sure the port number (`3333` in this example) matches the port number you exposed the Docker container on.
  - The last thing after the slash is the name of the DB schema to connect to. `UserPlatform`, in this example.
  ```sh
   DATABASE_URL='mysql://root:myPassword@localhost:3333/UserPlatform'
  ```
  2. Update the other `DATABASE_...` variables with the DB info from the URL. Check `.env.example` for examples
