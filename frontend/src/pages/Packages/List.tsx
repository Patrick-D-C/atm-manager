import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { format } from "date-fns";
import { currencyFormat } from '../../helpers';
import { useAuth } from '../../context/auth';
import { getListPackages, IPackageProps } from '../../services/Packages';

const indStatus = [
  "Aberto", "Fechado"
]
const indTypeNote = [
  "Nenhuma", currencyFormat(10), currencyFormat(50), currencyFormat(100)
];


export function List() {
  const [listPackages, setListPackages] = useState<IPackageProps[] | undefined>();


  useEffect(() => {
    async function loadList() {
      setListPackages(await getListPackages())
    }
    loadList();
  }, []);

  return (
    <Container maxWidth="xl" className="my-5">
      <h4 className="mb-2">Pacotes</h4>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell align="center">Nota</TableCell>
              <TableCell align="center">Qtde</TableCell>
              <TableCell align="right">Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Criada</TableCell>
              <TableCell align="center">Alterada</TableCell>
              <TableCell align="center">Fechada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPackages?.map((obgPackage, key) => {
              return (
                <TableRow key={key}>
                  <TableCell>{obgPackage.client.name}</TableCell>
                  <TableCell align="center">{indTypeNote[obgPackage.type_note]}</TableCell>
                  <TableCell align="center">{obgPackage.quantity_notes}</TableCell>
                  <TableCell align="right">{currencyFormat(obgPackage.value)}</TableCell>
                  <TableCell>{indStatus[obgPackage.status - 1]}</TableCell>
                  <TableCell align="center">{format(new Date(obgPackage.created_at), 'dd/MM/yyyy H:mm:ss')}</TableCell>
                  <TableCell align="center">{format(new Date(obgPackage.updated_at), 'dd/MM/yyyy H:mm:ss')}</TableCell>
                  <TableCell align="center">{obgPackage.closed_at ? format(new Date(obgPackage.closed_at), 'dd/MM/yyyy H:mm:ss') : ''}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
