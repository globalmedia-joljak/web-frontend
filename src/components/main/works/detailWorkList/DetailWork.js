import { Viewer } from '@toast-ui/react-editor';
import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import { useWorksDispatch } from '../../../../context/worksContext';
import useAsync from '../../../../hooks/useAsync';
import { getWorkDetail } from '../../../../service/api/work';
import EditDeleteButton from '../../common/EditDeleteButton';
import { data } from '../data';
import './detailWorkStyle.scss';

const DetailWork = ({ match, history }) => {
  const { worksKR, worksColor } = useAppDispatch();
  const {
    userInfo: { name },
  } = useAppState();
  const detailId = match.params.id;
  const [best, setBest] = useState(false);
  // TODO: 실제 추가해서 연결해줘야 한다.
  // const [workDetail] = useAsync(() => getWorkDetail(detailId), [
  //   detailId,
  // ]);

  // const { laodig, data, erro } = workDetail;

  // const [isItAuthor, setIsItAuthor] = useState(false);
  const filterDetailData = () => {
    let detailData = data.workResponseList.filter(
      (el) => el.id === Number(detailId),
    );
    return { detailData };
  };

  const { detailData } = filterDetailData();
  const handleEdit = () => history.push(`${match.url}/edit`);

  const handleDelete = () => {
    console.log('delete');
  };

  // console.log(detailData);
  console.log(detailData);
  const {
    author,
    projectCategory,
    workName,
    teamName,
    teamMember,
    createDate,
    imageInfoList,
    content,
  } = detailData[0];

  const filterDate = () => {
    const splitIdx = createDate.indexOf('T');
    return createDate.slice(0, splitIdx).split('-').join('. ');
  };

  useEffect(() => {
    const secContetns = document.querySelectorAll(
      '.work-detail-wrap .sec-content',
    );

    Array.from(secContetns).map(
      (el) => (el.style.height = `${Math.floor(el.clientWidth / 4) * 2.4}px`),
    );
  });

  const teamCategoryStyle = () => {
    const style = {
      color: worksColor(projectCategory),
      borderColor: worksColor(projectCategory),
    };
    return style;
  };
  return (
    <div className="work-detail-wrap page-box">
      <div className="work-detail-inr">
        <div className="work-detail-header">
          <span className="team-category" style={teamCategoryStyle()}>
            {worksKR(projectCategory)}
          </span>
          <strong className="work-name">{workName}</strong>
          <div className="team-info">
            {teamName}
            <div className="team-member">
              {teamMember.map((member, i) => (
                <span key={i}>{member}</span>
              ))}
            </div>
          </div>
          <div className="team-etc">
            <span className="create-date">
              <i className="date-icon" />
              {filterDate()}
            </span>
            {author === name && (
              <EditDeleteButton
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
        <div className="work-detail-content">
          {best && (
            <div className="best-work">
              <i className="best-icon" /> 졸업작품 최우수작
            </div>
          )}
          <section className="about-team-vedio">
            <strong>팀 소개영상</strong>
            <div className="team-vedio sec-content"></div>
          </section>
          <section className="about-team-images">
            <strong>작품 사진</strong>
            <div className="work-images sec-content">
              <ul className="slide-wrap">
                {imageInfoList.map((image, i) => (
                  <li key={i} className="slide"></li>
                ))}
              </ul>
              <div>
                <button type="button" className="prev-btn" />
                <button type="button" className="next-btn" />
              </div>
            </div>
          </section>
          <section className="about-team-introduce">
            <strong>작품 소개</strong>
            <Viewer initialValue={content} />
          </section>
        </div>
        <div className="work-detail-footer">
          <div className="download-file">
            <i className="clip-icon" />
            <span className="file-name">파일명</span>
            <i className="download-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailWork;
