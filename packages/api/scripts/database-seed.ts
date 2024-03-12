import fs from 'node:fs';
import { Prisma, PrismaClient } from '@prisma/client';
import { Command } from 'commander';
import { DateTime } from 'luxon';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

// https://www.npmjs.com/package/commander
const program = new Command();

program
  .name('Import JSON Data to MongoDB')
  .requiredOption('-f, --file <path>', 'Path to the JSON file containing the data to import');

function getSeedsFromFile(filePath: string): Record<string, unknown>[] {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const data = JSON.parse(fileContent);

  return data;
}

function mapJSONPatientToPatientDto(inputPatient: Record<string, unknown>): Prisma.PatientCreateInput {
  const nextVisitDate = DateTime.fromISO(inputPatient.nextVisitDate as string).toISO()!;

  return {
    ...inputPatient,
    nextVisitDate,
  } as Prisma.PatientCreateInput;
}

(async (): Promise<void> => {
  const { file } = program.parse(process.argv).opts();

  const prisma = new PrismaClient();
  const prismaClient = prisma.$extends(fieldEncryptionExtension());

  const data = getSeedsFromFile(file);

  const patientsData = data.map(mapJSONPatientToPatientDto);

  await Promise.all(patientsData.map((patientData) => prismaClient.patient.create({ data: patientData })));

  // eslint-disable-next-line no-console
  console.log(`Inserted ${patientsData.length} patients into the database.`);
})();
