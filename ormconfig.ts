const config = {
  type: 'mysql',
  database: 'gateway',
  entities: ['src/modules/**/*.entity.ts'],
  synchronize: false,
  host: 'localhost',
  username: 'root',
  password: '',
  migrations: [
    'src/database/migrations/*.ts',
    'dist/src/database/migrations/*{.ts,.js}',
  ],
  seeds: ['src/database/seeders/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  logging: true,
};

export default config;
