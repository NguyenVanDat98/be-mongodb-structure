import path from 'path';

import { Enforcer, newEnforcer } from 'casbin';
import MongooseAdapter from 'casbin-mongoose-adapter';
import loggerHelper from '../winton';

const logger = loggerHelper.getLogger('queue');

class Casbin {

  static instance: Casbin;
  adapter?:MongooseAdapter;
  enforcer: Enforcer = new Enforcer;

  constructor() {
    this.init().then(() => {
      logger.info('Initialized casbin');
    });
  }

  async init() {
    const model2 = path.resolve(__dirname, './model.conf');
    this.adapter = await MongooseAdapter.newAdapter('mongodb://localhost:27017/medhub');
    this.enforcer = await newEnforcer(model2, this.adapter);
    this.enforcer.initWithAdapter(model2, this.adapter);
    await this.enforcer.loadPolicy();
  }
  static getInstance() {
    if (!Casbin.instance) {
      Casbin.instance = new Casbin();
    }
    return Casbin.instance;
  }
}

export default Casbin.getInstance();
