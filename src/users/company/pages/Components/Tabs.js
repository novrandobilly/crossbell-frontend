import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fafafa',
    marginBottom: 16,
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  Head: {
    backgroundColor: 'white',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
  Tab: {
    fontWeight: '600',
  },
  Text: {
    textAlign: 'left',
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default' className={classes.Head}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Reguler' {...a11yProps(0)} className={classes.Tab} />
          <Tab
            label='Bulk Candidate'
            {...a11yProps(1)}
            className={classes.Tab}
          />
          <Tab label='Executive' {...a11yProps(2)} className={classes.Tab} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          className={classes.Text}
        >
          Vivamus in enim vitae est aliquet venenatis tincidunt ac magna. Donec
          et arcu at mi commodo venenatis. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Donec eu nibh
          malesuada, fringilla lorem eget, tristique nisi. Praesent fermentum
          purus quis lacus maximus vulputate. Suspendisse finibus purus ut erat
          volutpat finibus non at urna. In maximus magna in hendrerit mollis.
          Fusce ultrices suscipit augue non hendrerit. Ut quis lorem et dolor
          faucibus bibendum. Phasellus ante dolor, scelerisque quis condimentum
          eget, rhoncus laoreet metus. Nam sed sagittis lectus, sit amet
          suscipit leo. Proin quis risus at dui malesuada congue et non metus.
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          className={classes.Text}
        >
          Pellentesque et fermentum augue, quis porttitor nibh. Fusce sit amet
          sem egestas, imperdiet mi eu, placerat ligula. Nam fringilla turpis
          aliquet elit mollis, eu ultricies lectus fermentum. Cras dolor orci,
          consequat ut magna ut, aliquet luctus dolor. Praesent scelerisque
          luctus augue at vestibulum. Nulla aliquet vulputate diam, vitae
          gravida leo dignissim sit amet. Donec vestibulum interdum ultrices.
          Sed quis tortor viverra, euismod tortor in, mattis elit.
        </TabPanel>
        <TabPanel
          value={value}
          index={2}
          dir={theme.direction}
          className={classes.Text}
        >
          Nulla tincidunt tincidunt tristique. Sed vel justo et arcu commodo
          pellentesque. In facilisis, nisi nec mattis hendrerit, nisl tortor
          sollicitudin ante, vel molestie purus elit id felis. Nulla facilisi.
          Curabitur blandit lorem eget mauris mollis, ac viverra orci imperdiet.
          Aliquam posuere nulla ut sem placerat, in dapibus felis venenatis. Nam
          eget est in ex commodo vestibulum. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Aliquam at
          lectus rhoncus, laoreet est non, auctor ipsum. Cras blandit consequat
          purus et placerat. Nulla eget lorem eleifend, pretium odio nec,
          tincidunt diam. Nunc faucibus, dolor a fermentum congue, sem eros
          rutrum urna, ut volutpat arcu justo id sem. Sed ullamcorper malesuada
          arcu, vitae sagittis nisl volutpat eget. Integer tempus egestas ex,
          vitae fermentum erat tristique eu. Aliquam et magna fringilla ante
          efficitur posuere non at risus.
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
