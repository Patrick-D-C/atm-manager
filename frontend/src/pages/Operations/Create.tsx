import { Container } from '@material-ui/core';
import { OperationForm } from '../../components/Forms/OperationForm';
import { createOperation } from '../../services/Operations';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth';


export function Create() {

  const { createNotification } = useAuth();
  const history = useHistory();


  const onSubmit = async (data: any) => {
    console.log(data);

    if ((data.value % 10) > 0) {
      const conf = window.confirm("Só trabalhamos com notas de 100, 50 e 10 reais, deseja arredondar?");
      if (conf) {
        const round = Math.round((data.value % 10) / 10);
        data.value = (Math.trunc(data.value / 10) + round) * 10;
      } else {
        return false;
      }
    }
    const response = await createOperation(data);
    if (response) {
      history.push('/operacoes');
    } else {
      createNotification(response);
    }
  }


  return (
    <Container maxWidth="sm" className="my-5">
      <OperationForm operationState={{ pref_note: 0, value: 0 }} onSubmit={onSubmit} />
    </Container>
  );
}
