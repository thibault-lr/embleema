/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class UsualPhysician {
  @ApiProperty({ example: 'Emily', description: 'The first name of the usual physician' })
  public firstName!: string;

  @ApiProperty({ example: 'Gonzalez', description: 'The last name of the usual physician' })
  public lastName!: string;

  @ApiProperty({ example: 'Dr.', description: 'The title of the usual physician' })
  public title!: string;
}

class UsualCareSite {
  @ApiProperty({ example: 'Medical Center North', description: 'The name of the usual care site' })
  public name!: string;

  @ApiProperty({ example: '496 Main St, Anytown, AN 49521', description: 'The address of the usual care site' })
  public address!: string;
}

export class Patient {
  @ApiProperty({ example: 'William', description: 'The first name of the patient' })
  public firstName!: string;

  @ApiProperty({ example: 'Miller', description: 'The last name of the patient' })
  public lastName!: string;

  @ApiProperty({ example: '568-93-6214', description: 'The social security ID of the patient' })
  public socialSecurityId!: string;

  @ApiProperty({ example: 'Female', description: 'The sex of the patient' })
  public sex!: string;

  @ApiProperty({ example: 'AB-', description: 'The blood type of the patient' })
  public bloodType!: string;

  @ApiProperty({ example: 'Hypertension', description: 'The medical condition of the patient' })
  public condition!: string;

  @ApiProperty({ type: UsualPhysician, description: 'The usual physician of the patient' })
  @(Type!(() => UsualPhysician))
  public usualPhysician!: UsualPhysician;

  @ApiProperty({ type: UsualCareSite, description: 'The usual care site of the patient' })
  @(Type!(() => UsualCareSite))
  public usualCareSite!: UsualCareSite;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The next visit date to the physician in ISO format',
  })
  public nextVisitDate!: string | null;
}
