import { define } from 'typeorm-seeding';
import { User } from '../../modules/user/entities/user.entity';

define(User, () => {
  const user = new User();
  user.username = 'admin';
  user.email = 'contact@omegatheme.com';
  user.password = '111111';
  return user;
});
