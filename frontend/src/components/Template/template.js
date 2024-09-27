import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '../PageLayout/PageLayout';
import '../../Pages/style.css';

const Template = ({ navigate }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(location.state?.expandedState ?? true);

  return (
    <PageLayout expanded={expanded} setExpanded={setExpanded}>
    </PageLayout>
  );
};

export default Template;