import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import { Home, Settings, SvgIconComponent } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
  label: string;
  to: string;
  key: string;
  icon: SvgIconComponent;
}

const menuItems: MenuItemProps[] = [
  {
    label: "首页",
    to: "/",
    key: "overview",
    icon: Home,
  },
  {
    label: "设置",
    to: "/preference",
    key: "preference",
    icon: Settings,
  },
];

export function NavMenu() {
  return (
    <MenuList>
      {menuItems.map((it) => (
        <MenuItem to={it.to} key={it.key} component={NavLink}>
          <ListItemIcon>
            <it.icon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{it.label}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}
