import React from 'react';
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
`;
const OccupationList = styled.li`
  font-size: 18px;
  width: 123px;
  height: 48px;
`;

const OccupationListForm = ({ projectRole, type, handleChoice, txt }) => {
  const { curSize } = useAppState();
  const { translationKR, setJobColor } = useAppDispatch();
  const occupations = ['MEDIA_ART', 'DESIGNER', 'DEVELOPER', 'PLANNER'];
  if (type !== 'mainProjectRole') occupations.push(txt);

  const className = type === 'mainProjectRole' ? 'main' : 'sub';

  const tablet = 768;
  const phone = 425;
  const size = curSize < tablet ? 'tablet' : curSize < phone ? 'phone' : 'web';

  return (
    <OccupationListBlock size={size}>
      {occupations.map((data, i) => (
        <OccupationList key={i}>
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
