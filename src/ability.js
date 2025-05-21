import { AbilityBuilder, Ability } from '@casl/ability'

export function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(Ability)

  if (user?.role === 'admin') {
    can('manage', 'all') // 全権限
  }

  if (user?.role === 'practitioner') {
    can('read', 'Patient')
    can('update', 'Patient', { teamId: { $in: user.teamIds || [] } })
    // 例えば { teamId: ['team-1', 'team-2'] } に一致すればOK
  }

  if (user?.role === 'viewer') {
    can('read', 'Patient', { teamId: { $in: user.teamIds || [] } })
    cannot('update', 'Patient')
  }

  return build()
}
