require('dotenv').config();

var dbConfig = {
  type: 'mysql',
  synchronize: true,
  logging: false,
  database: 'gateway',
  host: 'localhost',
  username: 'root',
  password: '',
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      entities: ['src/**/**/*.entity.ts'],
      migrations: ['src/database/migrations/*.ts'],
      seeds: ['src/database/seeders/**/*{.ts,.js}'],
      factories: ['src/database/factories/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      entities: [
        'dist/src/modules/**/*.entity.js',
        'dist/src/**/**/*.entity.js',
      ],
      migrations: ['dist/src/database/migrations/*.js'],
      seeds: ['dist/src/database/seeders/**/*{.ts,.js}'],
      factories: ['dist/src/database/factories/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'dist/src/database/migrations',
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

export default dbConfig;
