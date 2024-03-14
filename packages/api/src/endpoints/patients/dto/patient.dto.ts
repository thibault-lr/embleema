/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BloodTypeEnum, SexEnum } from 'embleema-domain';

// To not carry the NestJs dependencies to embleema-domain

class DocumentedUsualPhysician {
  @ApiProperty({ example: 'Emily', description: 'The first name of the usual physician' })
  public firstName!: string;

  @ApiProperty({ example: 'Gonzalez', description: 'The last name of the usual physician' })
  public lastName!: string;

  @ApiProperty({ example: 'Dr.', description: 'The title of the usual physician' })
  public title!: string;
}

class DocumentedUsualCareSite {
  @ApiProperty({ example: 'Medical Center North', description: 'The name of the usual care site' })
  public name!: string;

  @ApiProperty({ example: '496 Main St, Anytown, AN 49521', description: 'The address of the usual care site' })
  public address!: string;
}

export class BasePatient {
  @ApiProperty({ example: 'William', description: 'The first name of the patient' })
  public firstName!: string;

  @ApiProperty({ example: 'Miller', description: 'The last name of the patient' })
  public lastName!: string;

  @ApiProperty({ example: '568-93-6214', description: 'The social security ID of the patient' })
  public socialSecurityId!: string;

  @ApiProperty({ enum: SexEnum, example: SexEnum.FEMALE, description: 'The sex of the patient' })
  public sex!: SexEnum;

  @ApiProperty({ enum: BloodTypeEnum, example: BloodTypeEnum['A+'], description: 'The blood type of the patient' })
  public bloodType!: BloodTypeEnum;

  @ApiProperty({ example: 'Hypertension', description: 'The medical condition of the patient' })
  public condition!: string;

  @ApiProperty({ type: DocumentedUsualPhysician, description: 'The usual physician of the patient' })
  @(Type!(() => DocumentedUsualPhysician))
  public usualPhysician!: DocumentedUsualPhysician;

  @ApiProperty({ type: DocumentedUsualCareSite, description: 'The usual care site of the patient' })
  @(Type!(() => DocumentedUsualCareSite))
  public usualCareSite!: DocumentedUsualCareSite;

  @ApiProperty({
    example: '2023-01-01',
    description: 'The next visit date to the physician in ISO format',
  })
  public nextVisitDate!: string | undefined;
}

export class DocumentedPatient extends BasePatient {
  @ApiProperty({ example: 'William', description: 'The first name of the patient' })
  public id!: string;
}

// To simplify
export class DocumentedCreatePatientDto extends BasePatient {}
