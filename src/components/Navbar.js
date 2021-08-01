import { AppBar, Toolbar, Button, Typography, Tooltip } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import Github from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: "#0A1931",
    },
    title: {
        flexGrow: 1
    }
}));


const Navbar = () => {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.root} variant="elevation">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        MyNotes
                    </Typography>
                    <Tooltip TransitionComponent={Zoom} title="Github">
                        <Button color="inherit" href="#"><Github /></Button>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Navbar;