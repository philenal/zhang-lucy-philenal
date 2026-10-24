## pixonary: about
A collaborative drawing game without competitive pressure. Find a group of friends of any artistic ability and make some pixel art together!

- made with <3 by lucy and philena

The old Heroku deploy is retired. Hosting is a free Render web service plus a free MongoDB Atlas M0 cluster. See [Deploying](#deploying).

## resources used:
to style google login/logout button: https://stackoverflow.com/questions/55023073/react-google-login-inline-styling
the rest of the resources are documented within the files!

## Deploying

Atlas M0 and Render's free web service are enough to put the game back online. Nothing in this repo should contain a password or a session secret. Keep those in Atlas and in the Render dashboard. Locally, put them in a `.env` file (gitignored). `npm start` runs nodemon for local development; Render must start `node server/server.js` instead.

### MongoDB Atlas (M0)

1. Create a free M0 cluster (MongoDB 7 or 8 is fine).
2. Database Access: add a database user with a password.
3. Network Access: allow `0.0.0.0/0`. Render's free tier has no stable outbound IP, so an Atlas IP allowlist cannot be pinned to the service.
4. Copy the SRV connection string (`mongodb+srv://...`). The app selects the `pixonary` database itself (`dbName` in `server/server.js`).

### Render

Free web service, blueprint in `render.yaml` if you want the same settings created for you:

- Build command: `npm ci && npm run build`
- Start command: `node server/server.js` (`npm start` is nodemon and is only for local dev)

Webpack is a devDependency. Render sets `NODE_ENV=production`, which would make `npm ci` skip devDependencies, so `.npmrc` sets `include=dev` and the build command above still installs them. `package.json` `engines.node` is `22.x`.
- Environment:
  - `NODE_VERSION` = `22`
  - `MONGO_SRV` = the Atlas SRV connection string
  - `SESSION_SECRET` = a long random string (the blueprint can generate one)
  - `GOOGLE_CLIENT_ID` = optional. Leave it unset to keep the client id already in `shared/googleClientId.js`. Set it to use a different Google OAuth client. The browser bundle inlines this value at build time, so changing it requires a new deploy.

The free web service sleeps after about 15 minutes with no traffic. The next visit wakes it, and that first request can take up to a minute. The socket drops while it is asleep.

### Google sign-in

In Google Cloud, open the OAuth client and add the Render origin to **Authorized JavaScript origins**:

`https://<your-service>.onrender.com`

No path and no trailing slash. For local play, also allow `http://localhost:3000` and `http://localhost:5000` (the hotloader). The id the app checks is `GOOGLE_CLIENT_ID` or the fallback in `shared/googleClientId.js` — the same value webpack bakes into the client and the server uses to verify the token.
