import { UnauthorizedError } from '@app/core';
import { TOKEN_EXPIRES_IN_SECONDS } from '@app/core/constant';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const {
  JWT_PRIVATE_KEY,
} = process.env;
const privateKey = JWT_PRIVATE_KEY ? Buffer.from(JWT_PRIVATE_KEY, 'base64') : '';


const PRIAVATE_KEY = readFileSync(path.join(String(process.env.INIT_CWD),'private.key'),'utf8')
const PUBLIC_KEY = readFileSync(path.join(String(process.env.INIT_CWD),'public.key'),'utf8')

const signToken = (payload: any) => jwt.sign(payload, PRIAVATE_KEY, {
  algorithm:'RS256',
  expiresIn: TOKEN_EXPIRES_IN_SECONDS,
});

const issueToken = (sub: string, sessionId: string,) => signToken(
  {
    sub,
    jti: sessionId,
  },
);


const verifyToken = (token: string) => {
  try {
    const tokenDetail = jwt.verify(token, PUBLIC_KEY, {
      algorithms:['RS256'],
       ignoreExpiration:false}) as JwtPayload;
    const { jti, sub, exp } = tokenDetail || {};
    return {
      sessionId: jti,
      id: sub,
    };
  } catch (error:any) {
   
    const catchError = {
      'jwt expired':'Token hết hạn',
      'jwt malformed':'Token không khả dụng',
      'jwt not active':'Token không khả dụng',
    } as const

    const caseError = error.message as keyof typeof catchError
    throw new UnauthorizedError(catchError[caseError]);
  }
};

export { signToken, verifyToken, issueToken };
