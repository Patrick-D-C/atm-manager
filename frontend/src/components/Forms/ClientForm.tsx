import * as yup from 'yup';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import { validateFormValues } from "../../context/validateFormValues";
import { Input } from '../Input';
import estados from "../../assets/estados.json";
import { useAuth } from '../../context/auth';

interface ClientForm {
    clientState: {
        id_user?: string;
        email: string;
        password: string;
        name: string;
        identity: string;
        date_birth: Date | null;
        address: string;
        number: number;
        district: string;
        city: string;
        state: string;
        admin?: boolean;
    }
    isUpdate: boolean;
    onSubmit(data: any): void;
}

function ClientForm(props: ClientForm) {

    const validationSchema = yup.object({
        identity: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Formatação incorreta"),
        email: yup.string().email().required("Requirido"),
        password: props.isUpdate ? yup.string() : yup.string().min(6, "Minímo 6 digitos").required("Requirido"),
        name: yup.string().max(200, "Nome muito longo. Abrevie se possivel."),
        address: yup.string().max(200, "Endereço muito longo."),
        number: yup.number().max(20, "Numero muito longo.").notRequired(),
        district: yup.string().max(50, "Nome bairro muito longo."),
        city: yup.string().max(50, "Nome cidade muito longa."),

    });

    const validate = validateFormValues(validationSchema);

    const { user } = useAuth();

    return (
        <Form
            onSubmit={props.onSubmit}
            initialValues={props.clientState}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xl={6} sm={12} xs={12}>
                            <Field
                                name="email"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            type="email"
                                            label="E-mail"
                                            {...input}
                                            required
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xl={6} sm={12} xs={12}>
                            <Field
                                name="password"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            type="password"
                                            label="Senha"
                                            {...input}
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                        <Grid item lg={9} sm={12} xs={12}>
                            <Field
                                name="name"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            label="Nome Completo"
                                            {...input}
                                            required
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={3} >
                            <Field
                                name="identity"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            label="CPF"
                                            {...input}
                                            required
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <Field
                                name="date_birth"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            type="date"
                                            label="Data Nascimento"
                                            required
                                            {...input}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" spacing={2}>
                        <Grid item lg={9} xs={12}>
                            <Field
                                name="address"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            label="Endereço"
                                            {...input}
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                        <Grid item lg={3} xs={5}>
                            <Field
                                name="number"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            type="number"
                                            label="Numero"
                                            {...input}

                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                        <Grid item lg={4} xs={6}>
                            <Field
                                name="district"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            label="Bairro"
                                            {...input}

                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={4}>
                            <Field
                                name="city"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            label="Cidade"
                                            {...input}

                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="state"
                                render={({ input, meta }) => (
                                    <FormControl fullWidth>
                                        <InputLabel id="label-estado">Estado</InputLabel>
                                        <Select
                                            {...input}
                                            labelId="label-estado"
                                        >
                                            <MenuItem value="">Selecione</MenuItem>
                                            {estados.map(estado => {
                                                return <MenuItem value={estado.sigla}>{estado.nome}</MenuItem>
                                            })}
                                        </Select>
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </FormControl>
                                )}
                            />

                        </Grid>
                    </Grid>
                    {user?.admin && (
                        <Grid container justifyContent="space-between" alignItems='center' spacing={2}>
                            <Grid item xs={4}>
                                <Field
                                    name="admin"
                                    render={({ input, meta }) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="label-tipo">Tipo</InputLabel>
                                            <Select
                                                {...input}
                                                labelId="label-tipo"
                                            >
                                                <MenuItem value="false">Cliente</MenuItem>
                                                <MenuItem value="true">Administrador</MenuItem>
                                            </Select>
                                            {meta.touched && meta.error && <span>{meta.error}</span>}
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    )}

                    <Grid container justifyContent="center" className="my-3" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {props.isUpdate ? "Atualizar" : "Cadastrar"}</Button>
                    </Grid>
                </form>
            )}
        />
    )
}

export { ClientForm }