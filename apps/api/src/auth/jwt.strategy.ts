import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';

dotenv.config();

type JwtPayload = {
  sub: string; // e.g. "auth0|abc123" or "google-oauth2|xyz"
  iss: string;
  aud: string | string[];
  scope?: string;
  email?: string;
};

export interface JwtUser {
  userId: string;
  provider: string;
  providerId: string;
  sub: string;
  scopes: string[];
}

function splitSub(sub: string) {
  // "provider|id" → { provider, providerId }
  const [provider, ...rest] = sub.split('|');
  return { provider, providerId: rest.join('|') };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    // You can see the JWT here
    // console.log('JWT payload', payload);

    const { sub } = payload;
    const { provider, providerId } = splitSub(sub);

    // For now, we'll create a simple user based on the Auth0 sub
    // In a real implementation, you might want to store the provider/providerId mapping
    // For this basic setup, we'll use the sub as a unique identifier
    
    // Try to find an existing user by email (if available in payload) or create a new one
    let user;
    try {
      // If there's an email in the payload, try to find by email
      if (payload.email) {
        user = await this.prisma.user.findUnique({
          where: { email: payload.email },
        });
      }
      
      // If no user found, create a new one
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: payload.email || `${providerId}@${provider}.local`,
            // You might want to add more fields from the JWT payload
          },
        });
      }
    } catch (error) {
      // If there's an error (e.g., email already exists), try to find by a different method
      // For now, we'll create a user with a unique email based on the sub
      user = await this.prisma.user.create({
        data: {
          email: `${sub}@auth0.local`,
        },
      });
    }

    return {
      userId: user.id,
      provider,
      providerId,
      sub,
      scopes: (payload.scope ?? '').split(' ').filter(Boolean),
    } as JwtUser;
  }
}