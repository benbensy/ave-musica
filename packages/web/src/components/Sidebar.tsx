import { Paper } from "@mui/material";
import { NavMenu } from "./NavMenu";

export function Sidebar() {
    return <Paper sx={{ width: 150, maxWidth: '100%' }}>
        <NavMenu />
    </Paper>
}
