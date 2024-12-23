import { verifyToken } from "@app/utils/jwt.util";
import { get } from 'lodash';
import { UnauthorizedError } from '../errorTypes/ErrorTypes';
import loggerHelper from '../winton';
// import branchService from '@app/modules/branch/branch.service';

const logger = loggerHelper.getLogger('middleware.authenticate');

const authenticateMiddleware: RouterHandle = async (req, res, next,) => {
  const token: string = get(req, 'headers.authorization', '');
  // const client: string = get(req, 'headers.client', '') || '';
  try {
    const jwtToken = token ? token.split(' ')[1] : '';
    const user: any = verifyToken(jwtToken);
    if (!user) {
      throw new UnauthorizedError();
    }
    // const findUser = await staffSevice.findStaffById(user.id);
    // if(!findUser.isActive&&!findUser.isSuperAdmin){
    //   throw new UnauthorizedError('Tài khoản không hiệu lực');
    // } 
    req.user = user as {id:string,};

    next();
  } catch (error) {
    logger.error('authenticateMiddleware ERROR', error);
    next(error);
  }
};

export const validToken: RouterHandle = async (req, res, next,) => {
  const token: string = get(req, 'headers.authorization', '');

  try {
    const jwtToken = token ? token.split(' ')[1] : '';
    const user: any = verifyToken(jwtToken);
    res.send('true')
  } catch (error) {
    logger.error('validToken', error);
    next(error);
  }
};


export default authenticateMiddleware;
