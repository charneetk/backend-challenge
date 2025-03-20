import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeController } from './node.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './entities/node.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Node])], 
  controllers: [NodeController],
  providers: [NodeService],
  exports: [NodeService]
})
export class NodeModule {}
