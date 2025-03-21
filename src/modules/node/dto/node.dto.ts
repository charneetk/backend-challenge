import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNodeDto {

    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    parentNodeId: number;
}

export class QueryNodeByPathDto {
    @IsString()
    @IsNotEmpty()
    nodePath: string;
}
