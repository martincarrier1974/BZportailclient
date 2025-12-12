import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  name: string;

  @IsString()
  companyName: string;

  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

