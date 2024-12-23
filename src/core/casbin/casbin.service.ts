import casbin from ".";
import { uniqBy } from "lodash";
import type { ActionKey, ResourceKey } from "../permissions";
import loggerHelper from "../winton";

const logger = loggerHelper.getLogger('casbin-service');


//-------------------------------ADD---------------------------------//
const addPoly = (roleId: string, resource: string, action: string) => {
    return casbin.enforcer.addPolicy(roleId, resource, action);
}

const addUserToGroup = (userId: string, roleId: string) => {
    return casbin.enforcer.addRoleForUser(userId, roleId);
}


//-------------------------------REMOVE---------------------------------//
const removePoly = (roleId: string, resource: string, action: string) => {
    return casbin.enforcer.removePolicy(roleId, resource, action);
}

const removeGroup = (roleId: string) => {
    return Promise.all([
        casbin.enforcer.deleteRole(roleId),
        casbin.enforcer.removePolicy(roleId),
    ]);
}

const removeUserForGroup = (userId: string, roleId: string) => {
    return casbin.enforcer.deleteRoleForUser(userId, roleId);
}

const getResourceByRoleId = async (...[roleId, ...res]: string[]) => {
    try {
        const data = await casbin.enforcer.getFilteredPolicy(0, roleId, ...res) as [string, ResourceKey, ActionKey][]

        const toObject = data.reduce((acc, [, a, b]) => {
            if (typeof acc?.[a] !== 'object') {
                acc[a] = {}
            } else {
                acc[a] = {
                    ...acc[a],
                    [b]: true
                }
            }

            return acc;
        }, {} as Partial<Record<ResourceKey, Partial<Record<ActionKey, boolean>>>>)

        const toArray = uniqBy(data.map(e => e.slice(1, 3)), '0') as [ResourceKey, ActionKey][]
        return {
            toObject,
            toArray
        }
    } catch (error) {
        logger.error(error)
    }
}
const getResourceByUserId = async (...[userId, ...res]: string[]) => {
    try {
        const data = await casbin.enforcer.getImplicitResourcesForUser(userId, ...res) as [string, ResourceKey, ActionKey][]

        const toObject = data.reduce((acc, [, b, c]) => {
            if (!acc[b]) {
                acc[b] = {}
            }
            acc[b] = {
                ...acc[b],
                [c]: true
            }

            return acc;
        }, {} as Partial<Record<ResourceKey, Partial<Record<ActionKey, boolean>>>>)
        const toArray = uniqBy(data.map(e => e.slice(1, 3)), ([a, b]) => a + b) as [ResourceKey, ActionKey][]
        return {
            toObject,
            toArray
        }
    } catch (error) {
        logger.error(error)
    }
}

const getRolesByUserId = async (userId: string) => {
    try {
        const data = await casbin.enforcer.getRolesForUser(userId)
        return data;

    } catch (error) {
        logger.error(error)
    }
}

export default {
    addPoly,
    addUserToGroup,
    removePoly,
    removeUserForGroup,
    removeGroup,
    getResourceByRoleId,
    getRolesByUserId,
    getResourceByUserId
}