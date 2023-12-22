import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { History, HistorySchema } from './entities/history.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: History.name,
        schema: HistorySchema
      }
    ])
  ],
  exports: [HistoryService, MongooseModule]
})
export class HistoryModule {}
