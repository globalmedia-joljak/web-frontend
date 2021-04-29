import { createContext, useContext, useMemo } from 'react';
import { useState } from 'react/cjs/react.development';
import useAsync from '../hooks/useAsync.js';
import { getWorkDetail } from '../service/api/work.js';

export const worksStateContext = createContext(null);
export const worksDispatchContext = createContext(null);

const WorksProvider = ({ children }) => {
  const [detailData, setDetailData] = useState(null);

  const value = useMemo(() => ({ detailData }), [detailData]);
  const dispatch = useMemo(() => ({ setDetailData }), [setDetailData]);

  return (
    <worksStateContext.Provider value={value}>
      <worksDispatchContext.Provider value={dispatch}>
        {children}
      </worksDispatchContext.Provider>
    </worksStateContext.Provider>
  );
};

export const useWorksState = () => {
  const state = useContext(worksStateContext);
  if (!state) throw new Error('WorksProvider 에러');
  return state;
};

export const useWorksDispatch = () => {
  const dispatch = useContext(worksDispatchContext);
  if (!dispatch) throw new Error('WorksProvider 에러');
  return dispatch;
};

export default WorksProvider;
