import { TextField, TextFieldProps } from "@material-ui/core";


function Input(props: TextFieldProps) {
    return (
        <TextField
            margin="normal"
            fullWidth
            {...props}
        />
    )
}

export { Input }