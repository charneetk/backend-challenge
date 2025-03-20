import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeModule } from 'src/node/node.module';
import { Property } from './entities/property.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Property]),NodeModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
