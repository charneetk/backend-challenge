import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NodeService } from 'src/node/node.service';
import { Repository } from 'typeorm';
import { AddPropertyDto } from './dto/property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    private nodeService: NodeService
  ) { }

  /**
   * 
   * @param nodeId 
   * @param addProperty 
   * @returns creates a new Property Record For given Name/Value linked to given Node
   *           OR update an existing Property value if combination of Name/Node exists   
   */
  async addProperty(nodeId: number, addProperty: AddPropertyDto) :Promise<Property>{
    try {
      const node = await this.nodeService.findNodeById(nodeId);
      if (!node) {
        throw new BadRequestException("Invalid Node Id");
      }

      const existingProperty = await this.propertyRepository.findOne({
        where: {
          name: addProperty.name,
          node: node
        }
      })

      if (existingProperty) {
        existingProperty.value = addProperty.value;
        return this.propertyRepository.save(existingProperty);
      } else {
        const property = new Property();
        property.name = addProperty.name;
        property.value = addProperty.value;
        property.node = node;
        return this.propertyRepository.save(property);
      }


    } catch (error) {
      throw new HttpException({
        status: error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        error: error.code ?? error.message ?? error,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
