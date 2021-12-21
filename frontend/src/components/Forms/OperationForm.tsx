import * as yup from 'yup';
import { Button, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Field, Form } from "react-final-form";
import { validateFormValues } from "../../context/validateFormValues";
import { Input } from '../Input';


interface OperationForm {
    operationState: {
        value?: number;
        pref_note?: number;
    }
    onSubmit(data: any): void;
}


const validationSchema = yup.object({
    value: yup.number().max(5000, "Valor máximo R$ 5.000").min(10,"Valor minímo é 10 reais").required("É obrigatório informar um valor."),
});

const validate = validateFormValues(validationSchema);

function OperationForm(props: OperationForm) {

    return (
        <Form
            onSubmit={props.onSubmit}
            initialValues={props.operationState}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <Grid container justifyContent="center" className="my-2" spacing={2}>
                        <Grid item sm={3} xs={6} >
                            <Field
                                name="value"
                                type="number"
                                render={({ input, meta }) => (
                                    <div>
                                        <Input
                                            label="Valor"
                                            {...input}
                                            required
                                        />
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="my-2" spacing={2}>
                        <Grid item sm={3}>
                            <InputLabel id="label-notes">Pref. nota?</InputLabel>
                            <Field
                                name="pref_note"
                                render={({ input, meta }) => (
                                    <div>
                                        <Select
                                            labelId="label-notes"
                                            label="Pref. nota?"
                                            fullWidth
                                            required
                                            {...input}
                                        >
                                            <MenuItem value={0}>Não</MenuItem>
                                            <MenuItem value={1}>R$ 10,00</MenuItem>
                                            <MenuItem value={2}>R$ 50,00</MenuItem>
                                            <MenuItem value={3}>R$ 100,00</MenuItem>
                                        </Select>
                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                    </div>
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="my-3" spacing={2}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >Enviar</Button>
                    </Grid>
                </form>
            )}
        />
    )
}

export { OperationForm }