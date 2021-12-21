import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { ClientForm } from "../../components/Forms/ClientForm";
import { Button, Container } from "@material-ui/core";



export function Edit() {
  const { user, update, deleteAccount } = useAuth();
  const history = useHistory();

  const handleSubmit = async (data: any) => {
    data.identity = data.identity.replace(/[^0-9]/g, '');
    const response = await update(data);
    if (response) {
      history.push('/painel');
    }
  }

  const handleDelete = async (id_user: string) => {
    const response = await deleteAccount(id_user);
    if (response) {
      history.push('/');
    }
  }

  let initialValues = {
    email: user?.email || '',
    password: user?.password || '',
    name: user?.name || '',
    identity: user?.identity || '',
    date_birth: user?.date_birth || null,
    address: user?.address || '',
    number: user?.number || 0,
    district: user?.district || '',
    city: user?.city || '',
    state: user?.state || '',
    admin: user?.admin || false
  }

  return (
    <Container maxWidth="sm" className="my-5">
      <Button variant="contained" color="secondary" style={{ float: "right" }} onClick={() => handleDelete(user?.id_user || '')}>Deletar Conta</Button>
      <ClientForm isUpdate={true} clientState={initialValues} onSubmit={handleSubmit} />
    </Container>
  );
}
