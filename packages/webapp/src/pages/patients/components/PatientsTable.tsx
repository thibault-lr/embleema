import { Box } from '@mui/material';
import { DataGrid, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Patient } from 'embleema-domain';
import { DateTime } from 'luxon';

interface PatientsTableProps {
  patients: Patient[];
  onPatientSelected: (row: Patient) => void;
  patientSelected: boolean;
}

const DEFAULT_COLUMN = {
  field: 'fullName',
  headerName: 'Full Name',
  width: 200,
  valueGetter: ({ row }: GridValueGetterParams) => `${row.firstName} ${row.lastName}`,
};

const DETAILS_COLUMNS = [
  {
    field: 'nextVisitDate',
    headerName: 'Next Visit Date',
    width: 200,
    valueGetter: ({ row }: GridValueGetterParams<Patient>) =>
      row.nextVisitDate ? DateTime.fromISO(row.nextVisitDate).toJSDate() : undefined, // To make data sortable
  },
  {
    field: 'usualCareSiteName',
    headerName: 'Medical Center',
    width: 200,
    valueGetter: ({ row }: GridValueGetterParams<Patient>) => row.usualCareSite.name,
  },
  {
    field: 'usualPhysicianName',
    headerName: 'Usual Physician',
    width: 200,
    valueGetter: ({ row }: GridValueGetterParams<Patient>) =>
      [row.usualPhysician.title, row?.usualPhysician.firstName, row?.usualPhysician.lastName].join(' '),
  },
];

export function PatientsTable({ onPatientSelected, patients, patientSelected }: PatientsTableProps) {
  const columns = patientSelected ? [DEFAULT_COLUMN] : [DEFAULT_COLUMN, ...DETAILS_COLUMNS];

  const handleRowClick = (params: GridRowParams<Patient>): void => {
    const { row: patientSelected } = params;

    onPatientSelected(patientSelected);
  };

  return (
    <Box height={'80vh'} width={'100%'} marginBottom={'200px'}>
      <DataGrid
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        paginationMode="client"
        rows={patients}
        columns={columns}
        pagination={true}
        onRowClick={handleRowClick}
        hideFooterPagination={patientSelected}
      />
    </Box>
  );
}
