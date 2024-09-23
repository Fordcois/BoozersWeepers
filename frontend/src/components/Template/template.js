import React, {useState } from 'react';

import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import PageLayout from '../PageLayout/PageLayout';

import '../../Pages/style.css';



const Template = ({ navigate }) => {

  const [expanded, setExpanded] = useState(true);
  const [groupName, setGroupName] = useState('');
  const toggleExpand = () => {setExpanded(!expanded);};

  const handlegroupNameChange = (event) => {
    setGroupName(event.target.value)
	}



  return (
<PageLayout ShowHeader={false}>
  Hello
</PageLayout>
  );
};

export default Template;