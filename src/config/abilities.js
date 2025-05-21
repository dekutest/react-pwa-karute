// src/config/abilities.js
import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (!user || !user.role) {
    // ログインしていないユーザーや権限がない場合
    cannot('manage', 'all');
  } else {
    switch (user.role) {
      case 'admin':
        can('manage', 'all'); // 全ての操作が可能
        break;
case 'practitioner':
  can('read', 'Patient'); // 閲覧のみ
  break;

      case 'team_leader':
        can('read', 'Patient'); // 閲覧のみ可能
        cannot('update', 'Patient'); // 更新は不可
        break;
        case 'staff':
  can('read', 'Patient');
  can('update', 'Patient');
  can('create', 'Patient');
  break;
      default:
        cannot('manage', 'all'); // それ以外はすべて不可
        break;
    }
  }

  return build();
};

export default defineAbilitiesFor;
