import { z } from 'zod'

const ROLES = ['user', 'admin', 'super'] as const

const adminRoles = ['admin', 'super'] satisfies RoleType[] as RoleType[]

const roleSchema = z.enum(['user', 'admin', 'super']).default('user')

type RoleType = (typeof ROLES)[number]

export type { RoleType }

export { roleSchema, adminRoles }
