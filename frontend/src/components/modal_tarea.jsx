import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const prioridades = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
];

//Esto es un Dialog, no un Modal, pero para el caso es lo mismo y es mas facil de implementar.
export default function Modal_tarea() {
    const [prioridad, setPrioridad] = React.useState('3');

    const handleChange = (event) => {
        setPrioridad(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClickOpen} className="btn btn__primary btn__lg">
                Añadir tarea nueva
            </button>

            <form className="item" action="/" method="post">
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Añadir nueva tarea</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Los campos marcados con * son obligatorios
          </DialogContentText>

                        <Input autoFocus fullWidth name="nombre_input" placeholder="Nombre de la tarea *" inputProps={{ 'aria-label': 'description' }} />

                        <Input fullWidth name="descripcion_input" placeholder="Descripción de la tarea" inputProps={{ 'aria-label': 'description' }} />

                        <TextField
                            id="filled-select-currency"
                            select
                            label="Prioridad *"
                            value={prioridad}
                            onChange={handleChange}
                            variant="filled"
                            name="prioridad_input"
                            fullWidth
                        >
                            {prioridades.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Input fullWidth type="date" name="fecha_input" placeholder="Fecha de la tarea" inputProps={{ 'aria-label': 'description' }} />

                        <Input fullWidth type="file" accept="image/png, image/jpeg, image/jpg" name="imagen_input" placeholder="Imagen de la tarea" inputProps={{ 'aria-label': 'description' }} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
          </Button>
                        <Button id="b" type="submit" onClick={handleClose} color="primary">
                            Añadir tarea
          </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}