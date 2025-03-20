import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { AddPropertyDto } from './dto/property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post(':nodeId')
  addProperty(
    @Param('nodeId',ParseIntPipe) nodeId: number,
    @Body() addPropertyDto: AddPropertyDto
  ) {
    return this.propertyService.addProperty(nodeId, addPropertyDto);
  }
}
