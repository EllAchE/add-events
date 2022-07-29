import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Alert, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { DateAccordion } from './DateAccordion';

function AlternateInfoTab({
  items,
  noItemsText,
}: {
  items: any[];
  noItemsText: string;
}): ReactElement {
  console.log('items in alt', items);

  if (!items || items.length < 1) {
    return (
      <Alert severity="warning">
        <Typography>{noItemsText}</Typography>
      </Alert>
    );
  }

  // TODO: this should eventually be searchable
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {items.map((item: any) => {
          return (
            <>
              <ListItem disablePadding>
                <ListItemText primary={item.text} />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function TabGroup(tabs: any) {
  console.log('tab group args', tabs);
  const { people, emails, urls, atMentions, places, dates } = tabs;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Events" {...a11yProps(0)} />
          <Tab label="Places" {...a11yProps(1)} />
          <Tab label="Emails" {...a11yProps(2)} />
          <Tab label="URLs" {...a11yProps(3)} />
          <Tab label="Handles" {...a11yProps(4)} />
          <Tab label="People" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <Grid
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontSize: 48 }}>Eventful</h1>
      </Grid>
      <TabPanel index={0} value={value}>
        <DateAccordion dates={dates} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AlternateInfoTab
          key="places"
          noItemsText={'No places found on page 😢.'}
          items={places}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AlternateInfoTab
          key="emails"
          noItemsText={'No emails found on page 😢.'}
          items={emails}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AlternateInfoTab
          key="urls"
          noItemsText={'No urls found on page 😢.'}
          items={urls}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AlternateInfoTab
          key="handles"
          noItemsText={'No social handles found on page 😢.'}
          items={atMentions}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <AlternateInfoTab
          key="people"
          noItemsText={'No people found on page 😢.'}
          items={people}
        />
      </TabPanel>
    </Box>
  );
}
