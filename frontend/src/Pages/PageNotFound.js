import React from 'react';

import PageLayout from '../components/PageLayout/PageLayout';
import '../Pages/style.css'

const PageNotFound = () => {

return (

    <PageLayout>
        <div className='center-text-column'>
        <h1 className='chalktitle'> Page Not Found</h1>
        <p className='paragraph-chalk-white'>
        The Page you're looking for can't be found! <br/> ... <br/>
        Sorry about that
        </p>
        <span className='paragraph-chalk-white'>(<a className="chalk-link" href={`/myaccount`}>Back</a>)</span>  
        </div>                
    </PageLayout>
    )};

export default PageNotFound;