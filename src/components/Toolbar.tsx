import React from 'react';
import {
  Toolbar as CebusToolbar,
  ToolbarButton,
  Text,
  Stack,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemRadio,
  ColorIcon,
} from '@cebus/react-components';
import Link from 'next/link';
import type { MenuProps } from '@cebus/react-components';
import { useAppContext } from '../context';

const useAppContextSelectors = () => {
  const setTheme = useAppContext(context => context.setTheme);
  const findTheme = useAppContext(context => context.findTheme);

  return {
    setTheme,
    findTheme,
  };
};

export const Toolbar = () => {
  const appContext = useAppContextSelectors();
  const userTheme = localStorage.getItem('theme') || 'Light';

  const [checkedValues, setCheckedValues] = React.useState<Record<string, string[]>>({
    theme: [userTheme],
  });

  const onChange: MenuProps['onCheckedValueChange'] = (ev, { name, checkedItems }) => {
    setCheckedValues({ [name]: checkedItems });
    localStorage.setItem('theme', checkedItems[0]);
  };

  React.useEffect(() => {
    appContext.setTheme(appContext.findTheme(userTheme));
  }, [appContext, userTheme]);

  return (
    <CebusToolbar appearance="subtle">
      <Stack wrap={false} verticalAlignment="center">
        <Link href="/" passHref>
          <a style={{ textDecoration: 'none' }}>
            <Stack verticalAlignment="center" wrap={false}>
              <Text color="brand" size={500} weight="bold" nowrap>
                Book Town
              </Text>
            </Stack>
          </a>
        </Link>
      </Stack>
      <Stack grow />
      <Link href="books" passHref>
        <ToolbarButton as="a">Books</ToolbarButton>
      </Link>
      <Link href="user" passHref>
        <ToolbarButton as="a">User</ToolbarButton>
      </Link>
      <Link href="user-items" passHref>
        <ToolbarButton as="a">UserItems</ToolbarButton>
      </Link>
      <Link href="orders" passHref>
        <ToolbarButton as="a">Orders</ToolbarButton>
      </Link>
      <Link href="warehouses" passHref>
        <ToolbarButton as="a">Warehouses</ToolbarButton>
      </Link>

      <Menu inline>
        <MenuTrigger>
          <ToolbarButton>
            <ColorIcon color="inherit" />
          </ToolbarButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuPopover>
              <MenuList checkedValues={checkedValues} onCheckedValueChange={onChange}>
                <MenuItemRadio name="theme" value="System">
                  System Default
                </MenuItemRadio>
                <MenuItemRadio name="theme" value="Light">
                  Light Mode
                </MenuItemRadio>
                <MenuItemRadio name="theme" value="Dark">
                  Dark Mode
                </MenuItemRadio>
              </MenuList>
            </MenuPopover>
          </MenuList>
        </MenuPopover>
      </Menu>
    </CebusToolbar>
  );
};
