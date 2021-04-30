import React from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react/cjs/react.development';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../context/appContext';

const RadioLable = styled.label`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  color: #6d6d6d;
  border: 1px solid #bebebe;
  border-radius: 4px;
`;

const RadioBox = styled.input`
  display: none;
  &:checked + ${RadioLable} {
    background-color: ${({ color }) => color};
    color: #ffffff;
    border: none;
  }
`;

const OccupationListBlock = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
`;
const OccupationList = styled.li`
  font-size: 16px;
  width: 123px;
  height: 48px;
`;

const OccupationListForm = ({
  projectRole,
  type,
  handleChoice,
  txt,
  worktype,
}) => {
  const { curSize } = useAppState();

  const { translationKR, setJobColor, worksKR, worksColor } = useAppDispatch();
  const occupations = ['MEDIA_ART', 'DESIGNER', 'DEVELOPER', 'PLANNER'];
  if (type !== 'mainProjectRole') occupations.concat(txt);
  const className =
    type === 'mainProjectRole' ? 'main' : 'subProjectRole' ? 'sub' : null;

  const worksCategory = ['MEDIA_ART', 'WEB_APP', 'ANIMATION_FILM', 'GAME'];
  const exhibitedYear = ['2021'];
  if (worktype === 'worksList') worksCategory.concat(txt);

  const worksData = useMemo(() =>
    worktype === 'worksList'
      ? worksCategory
      : worktype === 'exhibitedYear'
      ? exhibitedYear
      : null,
  );

  const tablet = 768;
  const phone = 425;
  const size = curSize < tablet ? 'tablet' : curSize < phone ? 'phone' : 'web';

  return (
    <OccupationListBlock size={size} className="modal-list">
      {worktype !== ''
        ? worksData.map((category, i) => (
            <OccupationList key={i} size={size}>
              <RadioBox
                type="checkbox"
                name={worktype}
                id={worktype + i}
                onClick={handleChoice}
                color={worksColor(category)}
                defaultValue={category}
              />
              <RadioLable htmlFor={worktype + i}>
                {worksKR(category)}
              </RadioLable>
            </OccupationList>
          ))
        : occupations.map((data, i) => (
            <OccupationList key={i} size={size}>
              <RadioBox
                type="radio"
                id={className + i}
                name={type}
                defaultValue={data}
                onClick={handleChoice}
                defaultChecked={projectRole === data ? true : false}
                color={setJobColor(data)}
              />
              <RadioLable htmlFor={className + i}>
                {translationKR(data, txt)}
              </RadioLable>
            </OccupationList>
          ))}
    </OccupationListBlock>
  );
};

export default OccupationListForm;
