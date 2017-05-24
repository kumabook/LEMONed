import restfulActions from './restful_actions';
import { schema } from '../models/track';

const actions = restfulActions(schema);

export default actions;

export const index   = actions.index;
export const get     = actions.get;
export const create  = actions.create;
export const update  = actions.update;
export const destroy = actions.destroy;

export const creators = actions.creators;
