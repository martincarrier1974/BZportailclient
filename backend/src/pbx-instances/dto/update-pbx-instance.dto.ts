import { PartialType } from '@nestjs/mapped-types';
import { CreatePbxInstanceDto } from './create-pbx-instance.dto';

export class UpdatePbxInstanceDto extends PartialType(CreatePbxInstanceDto) {}

