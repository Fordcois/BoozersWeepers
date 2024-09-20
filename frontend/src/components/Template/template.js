import React, {useState } from 'react';
import VertNavbar from '../VertNavBar/VertNavBar';
import BlackboardHeader from '../blackboardHeader/blackboardHeader';
import ContentFrame from '../contentFrame/ContentFrame';

import '../../Pages/style.css';




const Template = ({ navigate }) => {

  const [expanded, setExpanded] = useState(true);
  const [groupName, setGroupName] = useState('');
  const toggleExpand = () => {setExpanded(!expanded);};

  const handlegroupNameChange = (event) => {
    setGroupName(event.target.value)
	}



  return (
<ContentFrame>
  Hello
</ContentFrame>
  );
};

export default Template;