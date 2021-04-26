import React from 'react';
import { useAppDispatch, useAppState } from '../../../../../context/appContext';
import {
  useTeamsDispatch,
  useTeamsState,
} from '../../../../../context/teamContext';
import useAsync from '../../../../../hooks/useAsync';
import { createIdea } from '../../../../../service/api/ideas';

const IdeaDetail = ({ match }) => {
  return (
    <div className="idea-detail-wrap">
      <div className="idea-info"></div>
    </div>
  );
};

export default IdeaDetail;
