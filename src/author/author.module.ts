import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
  providers: [AuthorService, CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AuthorModule {}
