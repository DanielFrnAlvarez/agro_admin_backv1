import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/agro_admin_v1')],
  controllers: [],
  providers: [],
})
export class AppModule {}
