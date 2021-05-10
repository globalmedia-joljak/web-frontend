import React from 'react';
import { Redirect, Route } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development';
import SubNavigation from '../components/header/SubNavigation';
import WorksForm from '../components/main/works';
import { getWorksYears } from '../service/api/work';

const Works = ({ match, location }) => {
  const [year, setYear] = useState(null);
  useEffect(() => {
    getWorksYears().then((res) => setYear(res[0]));
  }, []);

  if (!year) return null;

  return (
    <main className="works-wrap">
      <div className="section-wrap">
        <section className="side-menu">
          <SubNavigation type="works" url={match.url} />
        </section>
        <section className="contents">
          <div className="content">
            {location.pathname === '/works' && (
              <Redirect to={`${match.path}/${year}`} />
            )}
            <Route path={`${match.path}/:year`} component={WorksForm} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Works;
