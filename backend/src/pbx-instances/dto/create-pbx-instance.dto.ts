import { IsString, IsInt, IsOptional, IsEnum, IsUrl, Min, Max } from 'class-validator';
import { PBXApiType } from '@prisma/client';

export class CreatePbxInstanceDto {
  @IsString()
  tenantId: string;

  @IsString()
  name: string;

  @IsString()
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @IsOptional()
  port?: number;

  @IsEnum(PBXApiType)
  apiType: PBXApiType;

  @IsUrl()
  @IsOptional()
  apiUrl?: string;

  @IsString()
  @IsOptional()
  apiKey?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

