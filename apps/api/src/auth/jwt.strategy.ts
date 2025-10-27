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
    console.log('=== JWT STRATEGY CONSTRUCTOR - NEW CODE ===');
    console.log('JWT Strategy Configuration:', {
      issuer: process.env.AUTH0_ISSUER_URL,
      audience: process.env.AUTH0_AUDIENCE,
      jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
    });

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
    console.log('=== NEW JWT STRATEGY CODE RUNNING ===');
    // You can see the JWT here
    console.log('JWT payload', payload);

    const { sub } = payload;
    const { provider, providerId } = splitSub(sub);

    // Create a unique email based on the Auth0 sub
    const uniqueEmail = `${sub}@auth0.local`;
    
    console.log('JWT Strategy: Creating/finding user with email:', uniqueEmail);
    
    // Use upsert to handle existing users gracefully
    const user = await this.prisma.user.upsert({
      where: { email: uniqueEmail },
      update: {
        // Update any fields if needed
        updatedAt: new Date(),
      },
      create: {
        email: uniqueEmail,
      },
    });

    console.log('JWT Strategy: User found/created:', user.id);

    return {
      userId: user.id,
      provider,
      providerId,
      sub,
      scopes: (payload.scope ?? '').split(' ').filter(Boolean),
    } as JwtUser;
  }
}