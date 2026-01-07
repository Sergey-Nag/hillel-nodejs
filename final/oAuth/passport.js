import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import {
    baseUrl,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} from '../config.js';
import User from '../models/User.js';

async function findOrCreateOAuthUser(profile, provider) {
    const email = profile.emails?.[0]?.value;
    const oauthId = profile.id;
    const name = profile.displayName || profile.username || email?.split('@')[0] || 'User';

    let user = await User.findOne({
        where: { oauthProvider: provider, oauthId },
    });

    if (user) {
        return user;
    }

    if (email) {
        user = await User.findOne({ where: { email } });
        if (user) {
            // Link OAuth to existing account
            user.oauthProvider = provider;
            user.oauthId = oauthId;
            await user.save();
            return user;
        }
    }

    user = await User.create({
        name,
        email: email || `${provider}_${oauthId}@oauth.local`,
        oauthProvider: provider,
        oauthId,
        password: null,
        role: 'User',
    });

    return user;
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: `${baseUrl}/auth/google/callback`,
                scope: ['profile', 'email'],
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    const user = await findOrCreateOAuthUser(profile, 'google');
                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
}

if (GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET) {
    passport.use(
        new GitHubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
                callbackURL: `${baseUrl}/auth/github/callback`,
                scope: ['user:email'],
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    const user = await findOrCreateOAuthUser(profile, 'github');
                    done(null, user);
                } catch (err) {
                    done(err, null);
                }
            }
        )
    );
}

export default passport;
