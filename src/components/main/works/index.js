import { Route } from 'react-router';
import CreateWork from './createWroksList/CreateWork';
import DetailWork from './detailWorkList/DetailWork';
import ListOfWorks from './worksList/ListOfWorks';

const WorksForm = ({ match }) => {
  return (
    <>
      <Route
        exact
        path={`${match.path}`}
        exact={true}
        component={ListOfWorks}
      />
      <Route path={`${match.path}/:id`} component={DetailWork} exact={true} />
      <Route path={`${match.path}/:id/:state`} component={CreateWork} />
    </>
  );
};

export default WorksForm;
