import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { NodeService } from './node.service';
import { Node } from "../../entities/node.entity"

describe('NodeService', () => {
  let service: NodeService;

  const mockNodeRepository = {
    find: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeService,
        {
          provide: getRepositoryToken(Node),
          useValue: mockNodeRepository
        }],
    }).compile();

    service = module.get<NodeService>(NodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findSubTreeByNodePath and return nodes', async () => {
    const nodePath = '/AlphaPC/Storage/';
    const mockNodes: Node[] = [
      {
        "id": 29,
        "parentNodeId": 27,
        "name": "HDD",
        "path": "/AlphaPC/Storage/HDD",
        "properties": [
          {
            "id": 19,
            "name": "WriteSpeed",
            "value": "1.7247520000"
          },
          {
            "id": 20,
            "name": "Capacity",
            "value": "5120.0000000000"
          }
        ]
      },
      {
        "id": 28,
        "parentNodeId": 27,
        "name": "SSD",
        "path": "/AlphaPC/Storage/SSD",
        "properties": [
          {
            "id": 17,
            "name": "Capacity",
            "value": "1024.0000000000"
          },
          {
            "id": 18,
            "name": "WriteSpeed",
            "value": "250.0000000000"
          }
        ]
      }
    ];

    jest.spyOn(mockNodeRepository, 'find').mockReturnValue(mockNodes);

    // Act
    const result = await service.findSubTreeByNodePath(nodePath);

    // Assert
    expect(mockNodeRepository.find).toHaveBeenCalledWith({
      where: {
        path: Like(`${nodePath}%`),
      },
      relations: ['properties'],
    });
    expect(result).toEqual(mockNodes);
  });

  it('should return an empty array if no nodes found', async () => {
    // Arrange
    const nodePath = '/BetaPC/Storage/';
    const mockNodes: Node[] = [];

    jest.spyOn(mockNodeRepository, 'find').mockResolvedValue(mockNodes); // Mock find method

    // Act
    const result = await service.findSubTreeByNodePath(nodePath);

    //Assert
    expect(mockNodeRepository.find).toHaveBeenCalledWith({
      where: {
        path: Like(`${nodePath}%`),
      },
      relations: ['properties'],
    });
    expect(result).toEqual(mockNodes);
  });
});
