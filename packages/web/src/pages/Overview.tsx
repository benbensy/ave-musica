import { Paper, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Overview() {
    return <Paper>
        <Stack>
            Overview

            <Stack>
                <NavLink to='/room/114514'>哼哼啊啊啊啊</NavLink>
            </Stack>
        </Stack>
    </Paper>
}
