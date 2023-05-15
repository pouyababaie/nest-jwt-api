import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService } from './hash/hash.service';
import { JwtStrategyService } from '../strategy/jwt-strategy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/constants';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategyService } from 'src/strategy/local-strategy.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    HashService,
    AuthService,
    JwtStrategyService,
    LocalStrategyService,
  ],
})
export class UserModule {}
