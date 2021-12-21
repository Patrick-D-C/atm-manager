import { Link, useHistory } from "react-router-dom";
import { Hero } from "../components/Hero";
import { useAuth } from "../context/auth";
import "../styles/home.scss";
import { ArrowBack } from "@material-ui/icons";
import { ClientForm } from "../components/Forms/ClientForm";



export function Register() {

  const history = useHistory();
  const context = useAuth();

  const handleSubmit = async (data: any) => {

    data.identity = data.identity.replace(/[^0-9]/g, '');
    const response = await context.signUp(data);

    if (response) {
      history.push('/login');
    }
  }

  let initialValues = {
    email: '',
    password: '',
    name: '',
    identity: '',
    date_birth: null,
    address: '',
    number: 0,
    district: '',
    city: '',
    state: ''
  }

  return (
    <div id="page-home">
      <Hero />
      <main>
        <div className="content mt-5">
          <Link to="/" className="link"><ArrowBack /> Voltar</Link>
          <h1 className="my-3 color-theme-n">Cadastro</h1>
          <ClientForm isUpdate={false} clientState={initialValues} onSubmit={handleSubmit} />
        </div>
      </main >
    </div >
  );
}
