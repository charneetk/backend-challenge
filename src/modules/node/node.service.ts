import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateNodeDto } from './dto/node.dto';
import { Node } from '../../entities/node.entity';

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private nodeRepository: Repository<Node>
  ) { }

  async create(createNode: CreateNodeDto): Promise<Node> {
    try {
      const node = new Node();
      let parentPath = "";
      if (createNode.parentNodeId) {
        const parentNodeData = await this.findNodePath(createNode.parentNodeId);
        if (!parentNodeData) {
          throw new BadRequestException('Invalid Parent Node Id');
        }
        parentPath = parentNodeData.path;
        node.parentNodeId = createNode.parentNodeId;
      }

      const nodePath = parentPath.concat(`/${createNode.name}`);
      node.name = createNode.name;
      node.path = nodePath;
      const nodeResponse = await this.nodeRepository.save(node);
      return nodeResponse;
    } catch (error) {
      throw new HttpException({
        status: error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.code ?? error.message ?? error,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(): Promise<Node[]> {
    return this.nodeRepository.find({
      relations: ['properties']
    });
  }

  async findNodePath(id: number): Promise<Node | null> {
    return this.nodeRepository.findOne({
      where: {
        id: id,
      },
      select: {
        path: true
      }
    })
  }

  async findSubTreeByNodePath(nodePath: string): Promise<Node[]> {
    return this.nodeRepository.find({
      where: {
        path: Like(`${nodePath}%`),
      },
      relations: ['properties'],
    })
  }

  async findNodeById(id: number) {
    return this.nodeRepository.findOne({
      where: {
        id: id
      },
      relations: ['properties']
    })
  }

}
