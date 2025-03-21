import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeModule } from 'src/modules/node/node.module';
import { Property } from 'src/entities/property.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Property]),NodeModule],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
