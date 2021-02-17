import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function Tarea_card(props) {
    const classes = useStyles();

    const items = props.items;
    const lista_tareas = items.map((item => {
        <li className="todo stack-small">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={item.imagen}
                        title="Tarea img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            <p>${item.nombre}</p>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>${item.descripcion}</p>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>${item.prioridad}</p>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>${item.fecha}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <hr />
                <CardActions>
                    <div className="btn-group">
                        <button className="btn">
                            Editar
                        </button>
                        <button className="btn btn__danger">
                            Borrar
                        </button>
                    </div>
                </CardActions>
            </Card>
        </li>
    }))

    return (
        <li className="todo stack-small">
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="https://www.pinclipart.com/picdir/middle/379-3796154_profile-clipart-john-doe-circle-png-download.png"
                        title="Tarea img"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Titulo
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Descripción
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Prioridad
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Fecha
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <hr />
                <CardActions>
                    <div className="btn-group">
                        <button className="btn">
                            Editar
                    </button>
                        <button className="btn btn__danger">
                            Borrar
                    </button>
                    </div>
                </CardActions>
            </Card>
        </li>
    );
}

/**/