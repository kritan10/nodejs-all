import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export const caslAuthzMiddleware = async (req, _, next) => {
  const user = req.user;
  const builder = new AbilityBuilder(createMongoAbility);

  if (!user) {
    builder.can(['read'], 'Blog');
  }

  if (user && user.role == 'blogger') {
    builder.can('manage', 'User', { _authorId: user._id.toString() });
    builder.can('read', 'Blog');
    builder.can(['create', 'read', 'update'], 'Blog', { _authorId: user._id.toString() });
  }

  if (user && user.role == 'admin') {
    builder.can('manage', 'all');
  }

  req.ability = builder.build();
  next();
};
