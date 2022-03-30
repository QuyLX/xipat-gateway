import type { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../components/user/entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().create();
    // await connection
    //   .createQueryBuilder()
    //   .insert()
    //   .into(User)
    //   .values([
    //     { username: 'quylx', email: 'contact@omegatheme.com', password: 'dfsdfsdf' },
    //   ])
    //   .execute();

  }
}
