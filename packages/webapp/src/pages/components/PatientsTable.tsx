import { Box, Typography } from '@mui/material';
import { DataGrid, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { Patient } from '../../types';

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
    valueGetter: ({ row }: GridValueGetterParams<Patient>) => DateTime.fromISO(row.nextVisitDate).toJSDate(), // To make data sortable
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
    <Box height={'80vh'} width={'100%'}>
      {patientSelected === false && <Typography variant="h1">Patients</Typography>}
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
