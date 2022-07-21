import {
  AppBar,
  Badge,
  BadgeProps,
  BottomNavigation,
  Grid,
  IconButton,
  styled,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: 10,
    right: 7,
  },
}));

export function App({ children }: { children: any }) {
  return (
    <>
      <AppBar position="static" sx={{ top: 0, left: 0, width: '100%' }}>
        <Grid>
          <IconButton onClick={() => chrome.runtime.openOptionsPage()}>
            {/** TODO: callback to the openOptionsPage call */}
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <HelpIcon />
          </IconButton>
          <StyledBadge badgeContent={4} color="error">
            <IconButton>
              <NotificationsIcon />
            </IconButton>
          </StyledBadge>
        </Grid>
      </AppBar>
      {children}
      <BottomNavigation>Test</BottomNavigation>
    </>
  );
}
