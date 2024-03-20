/* eslint-disable max-classes-per-file */
import { IsEnum, IsNotEmpty, IsOptional, IsString, Matches, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum SexEnum {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum BloodTypeEnum {
  'A+' = 'A+',
  'A-' = 'A-',
  'B-' = 'B-',
  'B+' = 'B+',
  'AB+' = 'AB+',
  'AB-' = 'AB-',
  'O+' = 'O+',
  'O-' = 'O-',
}

class Physician {
  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  @IsString()
  @IsNotEmpty()
  public title!: string;
}

class CareSite {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public address!: string;
}

class BasePatient {
  @IsString()
  @IsNotEmpty()
  public firstName!: string;

  @IsString()
  @IsNotEmpty()
  public lastName!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}-\d{2}-\d{4}$/, {
    message: 'socialSecurityId must follow the pattern 111-22-3333',
  })
  public socialSecurityId!: string;

  @IsEnum(SexEnum)
  public sex!: SexEnum;

  @IsEnum(BloodTypeEnum)
  public bloodType!: BloodTypeEnum;

  @IsString()
  @IsNotEmpty()
  public condition!: string;

  @ValidateNested()
  @Type(() => Physician)
  public usualPhysician!: Physician;

  @ValidateNested()
  @Type(() => CareSite)
  public usualCareSite!: CareSite;

  @IsString()
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined && value !== null)
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'nextVisitDate must be in YYYY-MM-DD format',
  })
  public nextVisitDate?: string;
}

// This is a Patient as Entity
export class Patient extends BasePatient {
  @IsString()
  @IsNotEmpty()
  public id!: string;
}

export class CreatePatientDto extends BasePatient {} // For simplicity the input has same validation rules
