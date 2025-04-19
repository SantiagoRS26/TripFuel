import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { config } from "./index";
import { UserService } from "../services/UserService";

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID!,
			clientSecret: config.GOOGLE_CLIENT_SECRET!,
			callbackURL: config.OAUTH_CALLBACK_URL!,
		},
		async (
			_accessToken: string,
			_refreshToken: string,
			profile: Profile,
			done
		) => {
			try {
				const userSvc = new UserService();
				const { id: googleId, emails } = profile;
				const email = emails?.[0]?.value;
				if (!email) throw new Error("Google profile sin email");

				const user = await userSvc.findOrCreateByGoogle(googleId, email);
				return done(null, user);
			} catch (err) {
				return done(err as Error);
			}
		}
	)
);

export default passport;
