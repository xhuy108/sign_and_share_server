import { Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schema/user.schema';

@Global()
class DatabaseConfig extends MongooseModule {
  static config(uri: string) {
    return MongooseModule.forRoot(uri);
  }

  static forFeature() {
    return MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);
  }
}

export { DatabaseConfig };
