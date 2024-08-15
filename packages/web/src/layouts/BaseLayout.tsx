import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function BaseLayout() {
  return (
    <Stack flexDirection="row">
      <Sidebar />
      <Stack height="100%">
        <Outlet />
      </Stack>
    </Stack>
  );
}
