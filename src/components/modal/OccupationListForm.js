import React from 'react';

const OccupationListForm = ({ type, handleChoicegit }) => {
  const occupations = ['MEDIA_ART', 'DESIGNER', 'DEVELOPER', 'PLANNER'];
  if (type !== 'mainProjectRole') occupations.push('선택안함');

  const className = type === 'mainProjectRole' ? 'main' : 'sub';

  const translationKR = (role) => {
    switch (role) {
      case 'MEDIA_ART':
        return '미디어아트';

      case 'DESIGNER':
        return '디자이너';

      case 'DEVELOPER':
        return '개발자';

      case 'PLANNER':
        return '기획자';
      default:
        return '선택안함';
    }
  };

  return (
    <ul>
      {occupations.map((data, i) => (
        <li key={i}>
          <input
            type="radio"
            id={className + i}
            name={type}
            value={data}
            onClick={handleChoice}
          />
          <label htmlFor={className + i}>{translationKR(data)}</label>
        </li>
      ))}
    </ul>
  );
};

export default OccupationListForm;
