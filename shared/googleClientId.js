// Public OAuth client id (it is embedded in the browser bundle). Not a secret.
// Set GOOGLE_CLIENT_ID to replace it in one place: the server reads it at
// runtime, and webpack inlines the same value when the client is built.
require("dotenv").config();

const DEFAULT_GOOGLE_CLIENT_ID =
  "556090196938-aq68ifs953on2phsnv7kl6nc59t5h0gf.apps.googleusercontent.com";

module.exports = process.env.GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;
