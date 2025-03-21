import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateNodeDto, QueryNodeByPathDto } from './dto/node.dto';
import { NodeService } from './node.service';
import { Node } from '../../entities/node.entity';

@Controller('node')
export class NodeController {
  constructor(
    private nodeService: NodeService
  ) { }

  @Get()
  getAllNodes(): Promise<Node[]> {
    return this.nodeService.findAll();
  }

  @Post()
  createNode(@Body() createNode: CreateNodeDto): Promise<Node> {
    return this.nodeService.create(createNode);
  }

  @Get('/subTree')
  getSubTreeByNodePath(@Query() query: QueryNodeByPathDto): Promise<Node[]> {
    return this.nodeService.findSubTreeByNodePath(query.nodePath);
  }
}
