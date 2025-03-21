import { IsString, IsDecimal } from 'class-validator';

export class AddPropertyDto {
    @IsString()
    name: string;

    @IsDecimal()
    value: string;
}
