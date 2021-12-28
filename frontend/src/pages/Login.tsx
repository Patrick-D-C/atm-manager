import { Link, useHistory } from "react-router-dom";
import * as yup from 'yup';
import { Form, Field } from 'react-final-form'

import { useAuth } from "../context/auth";
import { validateFormValues } from "../context/validateFormValues";

import { Input } from "../components/Input";
import { Hero } from "../components/Hero";

import { Button, InputAdornment } from "@material-ui/core";
import { AccountCircle, ArrowBack, Lock } from "@material-ui/icons";

import "../styles/home.scss";



const validationSchema = yup.object({
  email: yup.string().email("Digite um email valido.").required(""),
  password: yup.string().required("")
});

const validate = validateFormValues(validationSchema);


export function Login() {

  const { signIn } = useAuth();
  const history = useHistory();
  const onSubmit = async (data: any) => {
    if (await signIn(data)) {
      history.push("/painel")
    }

  }

  return (
    <div id="page-home">
      <Hero />
      <main>
        <div className="content">
          <Link to="/" className="link"><ArrowBack /> Voltar</Link>
          <h1 className="my-3 color-theme-n">Login</h1>

          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <form className="my-5" onSubmit={handleSubmit}>
                <div className="my-2">
                  <Field
                    name="email"
                    type="email"
                    label="E-mail"
                    required
                    render={({ input, meta }) => (
                      <div>
                        <Input
                          {...input}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {meta.touched && meta.error && <span>{meta.error}</span>}
                      </div>
                    )}
                  />
                </div>
                <div className="my-2">
                  <Field
                    type="password"
                    label="Senha"
                    name="password"
                    required
                    render={({ input, meta }) => (
                      <Input
                        {...input}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Fazer Login
                </Button>
                <div className="my-2">ou</div>
                <Link to="/register" className="link">Cadastrar</Link>
              </form>
            )}
          />
        </div>
      </main>
    </div>
  );
}
