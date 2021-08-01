import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Typography, IconButton, Tooltip, Zoom } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "40px 0"
    },
    pprcover: {
        minWidth: "300px",
        maxWidth: "500px",
        margin: "10px"
    },
    ppr: {
        padding: "12px 20px"
    },
    title: {
        textAlign: "center",
        marginBottom: "20px"
    },
    text: {
        marginTop: "6px"
    },
    charac: {
        flexGrow: 1,
        color: "#999",
        fontSize: "14px"
    }
}));

const Displaynotes = ({ notes, handleDeleteNode }) => {
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth="lg">
            <Typography variant="h4" className={classes.title}>
                Your saved notes
            </Typography>
            <Grid container justifyContent="center">
                {
                    notes.length > 0 ?
                        notes.map((note) => {
                            return (<Grid item xs className={classes.pprcover} key={note.id}>
                                <Paper className={classes.ppr}>
                                    <Typography variant="h5">
                                        {note.title}
                                    </Typography>
                                    <p className={classes.text}>{note.text}</p>
                                    <Box display="flex" alignItems="center">
                                        <p className={classes.charac}>{note.date}</p>
                                        <IconButton>
                                            <Tooltip TransitionComponent={Zoom} title="Edit">
                                                <Edit fontSize="small" />
                                            </Tooltip>
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteNode(note.id)}>
                                            <Tooltip TransitionComponent={Zoom} title="Delete">
                                                <Delete fontSize="small" />
                                            </Tooltip>
                                        </IconButton>
                                    </Box>
                                </Paper>
                            </Grid>)
                        }) : <Typography variant="h5">No notes available</Typography>
                }
            </Grid>
        </Container>
    )
}

export default Displaynotes;