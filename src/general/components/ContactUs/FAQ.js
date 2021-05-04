import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import classes from './FAQ.module.css';

const Accordion = withStyles({
  root: {
    textAlign: 'left',
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'white',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    backgroundColor: 'rgb(248,248,248)',
    padding: '12px 0 12px 32px',
  },
}))(MuiAccordionDetails);

const FAQ = (props) => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  let content = (
    <div className={classes.Container}>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography>I am an Employer, how can I post a job ads?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pellentesque ante ex, ornare vitae lectus id, scelerisque rutrum
            lectus. Morbi sollicitudin ac arcu feugiat bibendum. In vitae
            faucibus nunc. Nunc consequat quam vestibulum mi sodales dignissim.
            Phasellus eget bibendum ante. Sed sit amet turpis leo. Pellentesque
            in neque vulputate, pharetra odio sed, gravida elit. Nunc non velit
            nisi. Ut eget rutrum augue.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Typography>
            What's the benefit of becoming a jobseeker here?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pellentesque ante ex, ornare vitae lectus id, scelerisque rutrum
            lectus. Morbi sollicitudin ac arcu feugiat bibendum. In vitae
            faucibus nunc. Nunc consequat quam vestibulum mi sodales dignissim.
            Phasellus eget bibendum ante. Sed sit amet turpis leo. Pellentesque
            in neque vulputate, pharetra odio sed, gravida elit. Nunc non velit
            nisi. Ut eget rutrum augue.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
          <Typography>
            What's the benefit of becoming an employer here?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pellentesque ante ex, ornare vitae lectus id, scelerisque rutrum
            lectus. Morbi sollicitudin ac arcu feugiat bibendum. In vitae
            faucibus nunc. Nunc consequat quam vestibulum mi sodales dignissim.
            Phasellus eget bibendum ante. Sed sit amet turpis leo. Pellentesque
            in neque vulputate, pharetra odio sed, gravida elit. Nunc non velit
            nisi. Ut eget rutrum augue.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary aria-controls='panel4d-content' id='panel4d-header'>
          <Typography>I can't remember my login password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pellentesque ante ex, ornare vitae lectus id, scelerisque rutrum
            lectus. Morbi sollicitudin ac arcu feugiat bibendum. In vitae
            faucibus nunc. Nunc consequat quam vestibulum mi sodales dignissim.
            Phasellus eget bibendum ante. Sed sit amet turpis leo. Pellentesque
            in neque vulputate, pharetra odio sed, gravida elit. Nunc non velit
            nisi. Ut eget rutrum augue.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
      >
        <AccordionSummary aria-controls='panel5d-content' id='panel5d-header'>
          <Typography>
            I have a billing question (unrecognized charge, invoicing)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pellentesque ante ex, ornare vitae lectus id, scelerisque rutrum
            lectus. Morbi sollicitudin ac arcu feugiat bibendum. In vitae
            faucibus nunc. Nunc consequat quam vestibulum mi sodales dignissim.
            Phasellus eget bibendum ante. Sed sit amet turpis leo. Pellentesque
            in neque vulputate, pharetra odio sed, gravida elit. Nunc non velit
            nisi. Ut eget rutrum augue.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        square
        expanded={expanded === 'panel6'}
        onChange={handleChange('panel6')}
      >
        <AccordionSummary aria-controls='panel6d-content' id='panel6d-header'>
          <Typography>I want to report a security issue</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pellentesque ante ex, ornare vitae lectus id, scelerisque rutrum
            lectus. Morbi sollicitudin ac arcu feugiat bibendum. In vitae
            faucibus nunc. Nunc consequat quam vestibulum mi sodales dignissim.
            Phasellus eget bibendum ante. Sed sit amet turpis leo. Pellentesque
            in neque vulputate, pharetra odio sed, gravida elit. Nunc non velit
            nisi. Ut eget rutrum augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  return content;
};

export default FAQ;
