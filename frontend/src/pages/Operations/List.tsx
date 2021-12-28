import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { deleteOperation, getListOperations, IOperationProps } from '../../services/Operations';
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { format } from "date-fns";
import { currencyFormat } from '../../helpers';
import { useAuth } from '../../context/auth';


const indStatusOp = [
  "Aberta", "Reservada", "Concluída"
];

const indPrefNoteOpe = [
  "Nenhuma", currencyFormat(10), currencyFormat(50), currencyFormat(100)
];


export function List() {
  const [listOperations, setListOperations] = useState<IOperationProps[] | undefined>();
  const { user } = useAuth();


  const handleDelete = async (idOperation: string) => {
    await deleteOperation(idOperation);
    setListOperations(await getListOperations())
  }

  function Row(props: { row: IOperationProps, key: number }) {
    const { row, key } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow key={key}>
          <TableCell width={80}>
            {row.children_operation.length > 0 &&
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            }
          </TableCell>
          {user?.admin && (
            <TableCell>{row.client.name}</TableCell>
          )}
          <TableCell align="right">R$ {currencyFormat(row.value)}</TableCell>
          <TableCell align="center">{indPrefNoteOpe[row.pref_note]}</TableCell>
          <TableCell component="th" scope="row">
            {indStatusOp[row.status - 1] || ''}
          </TableCell>
          <TableCell align="center">{format(new Date(row.updated_at), 'dd/MM/yyyy H:mm:ss')}</TableCell>
          <TableCell align="right" width={80}>
            <IconButton onClick={() => handleDelete(row.id_operation)}>
              <Delete color='error' />
            </IconButton>
          </TableCell>
        </TableRow>
        {row.children_operation.length > 0 &&
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Valor</TableCell>
                        <TableCell align="center">Preferencia</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Alterada</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.children_operation?.map((operation: IOperationProps, key) => {
                        return (
                          <TableRow key={key}>
                            <TableCell align="right">R$ {currencyFormat(operation.value)}</TableCell>
                            <TableCell align="center">Notas de {indPrefNoteOpe[operation.pref_note]}</TableCell>
                            <TableCell component="th" scope="row">
                              {indStatusOp[operation.status - 1] || ''}
                            </TableCell>
                            <TableCell align="center">{format(new Date(operation.updated_at), 'dd/MM/yyyy H:mm:ss')}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        }
      </React.Fragment>
    );
  }

  function TableHeaderRow() {

    return (
      <TableHead>
        <TableRow>
          <TableCell width={80}></TableCell>
          {user?.admin && (
            <TableCell>Cliente</TableCell>
          )}
          <TableCell align="right">Valor</TableCell>
          <TableCell align="center">Preferencia</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="center">Alterada</TableCell>
          <TableCell align="right" width={80}>Ação</TableCell>
        </TableRow>
      </TableHead>
    )
  }


  useEffect(() => {
    async function loadList() {
      setListOperations(await getListOperations())
    }
    loadList();
  }, []);

  return (
    <Container maxWidth="xl" className="my-5">
      <h4 className="mb-2">Operações</h4>
      <Button href="/operacoes/novo" variant="contained" color="primary" style={{ float: "right" }} className="mb-3">Nova operação</Button>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHeaderRow />
          <TableBody>
            {listOperations?.map((operation, key) => {
              return <Row row={operation} key={key} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
