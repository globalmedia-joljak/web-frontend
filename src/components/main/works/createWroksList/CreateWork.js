import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useCallback, useState, useRef } from 'react/cjs/react.development';
import { useAppDispatch } from '../../../../context/appContext';
import { createWorks } from '../../../../service/api/work';
const toolbarItems = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'link',
  'divider',
  'code',
  'codeblock',
];
const worksCategory = ['MEDIA_ART', 'WEB_APP', 'SOMETINGS', 'GAME'];

const CreateWork = ({ match, history }) => {
  const workState = match.params.state;
  const editorRef = useRef();
  const { worksKR } = useAppDispatch();

  const [category, setCategory] = useState(null);
  const [worksName, setWorksName] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [teamMember, setTeamMember] = useState(null);
  const [vedio, setVedio] = useState(null);

  // year
  const [worksYear, setWorksYear] = useState(null);
  const calculateYears = useCallback(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const years = [];

    for (let i = 0; i < 30; i++) {
      years.push(currentYear - i);
    }

    return { years };
  }, [workState]);

  const { years } = calculateYears();

  // updload File & images
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  let formdata = new FormData();

  const makeArrFromData = useCallback((arr, queryName) => {
    return arr.map((data, i) => {
      formdata.append(`${queryName}[${i}]`, data);
    });
  });
  const handleUploadImages = (e) => {
    const files = e.target.files;
    let filesArr = [];

    setImages([...files]);

    if (files.length > 5) {
      toast.warn(`⚠ 이미지는 최대 5개 입니다.`);
      setImages([...files].slice(0, 5));
      // filesArr = [...files].slice(0, 5);
    } else {
      setImages([...files]);
      // filesArr = [...files];
    }

    makeArrFromData(filesArr, 'images');
  };
  const handleUploadFile = (e) => setFile(e.target.files[0]);

  const handleWorksSubmit = (e) => {
    e.preventDefault();
    // const requestWorks = {
    //   exhibitedYear: worksYear,
    //   content: editorRef.current.getInstance().getHtml(),
    //   file: file,
    //   projectCategory: category,
    //   teamName: teamName,
    //   teamVideoUrl: vedio,
    //   workName: worksName,
    // };

    // const memberArr = teamMember.trim().split(' ');
    // makeArrFromData(memberArr, 'teamMember');

    const requestWorks = {
      exhibitedYear: worksYear,
      content: editorRef.current.getInstance().getHtml(),
      file: file,
      projectCategory: category,
      teamName: teamName,
      teamVideoUrl: vedio,
      workName: worksName,
      teamMember: teamMember ? teamMember.trim().split(' ') : null,
      images: images,
    };

    for (let item in requestWorks) {
      formdata.append(item, requestWorks[item]);
      if (!requestWorks[item]) formdata.delete(item);
    }

    for (let lala of formdata.entries()) {
      console.log(lala);
    }

    switch (workState) {
      case 'create':
        // 현재 post 에러
        // createWorks(formdata, history);

        return;

      case 'edit':
        console.log('edit');
        return;
      default:
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="work-create-wrap page-box">
        <form className="work-create-inr" onSubmit={handleWorksSubmit}>
          <div className="work-create-header">
            <h2 className="work-create-title">
              <i className="write-icon" />
              글쓰기
            </h2>
            <div className="boards-category">
              <strong>게시판</strong>
              <div className="category">졸업작품</div>
            </div>
            <div className="exhibit">
              <strong>연도</strong>
              <select
                name="exhibit"
                onChange={(e) =>
                  setWorksYear(e.target.selectedOptions[0].value)
                }
              >
                <option>연도를 선택하세요</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="works-category">
              <strong>카테고리</strong>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.selectedOptions[0].value)}
              >
                <option>카테고리를 선택하세요</option>
                {worksCategory.map((item) => (
                  <option key={item} value={item}>
                    {worksKR(item)}
                  </option>
                ))}
              </select>
            </div>
            <div className="boards-category">
              <strong>제목</strong>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                onChange={(e) => setWorksName(e.target.value)}
              />
            </div>
          </div>
          <div className="work-create-main">
            <div className="work-editor">
              <strong>작품 소개</strong>
              <Editor
                toolbarItems={toolbarItems}
                previewStyle="vertical"
                initialEditType="wysiwyg"
                usageStatistics={false}
                placeholder="작품소개 글을 작성해 주세요"
                ref={editorRef}
              />
            </div>
            <div className="work-members">
              <strong>팀명&팀원 입력</strong>
              <input
                type="text"
                placeholder="팀명을 입력하세요"
                name="teamName"
                onChange={(e) => setTeamName(e.target.value)}
              />
              <input
                type="text"
                placeholder="팀원을 입력하세요(이름만 입력, 띄어쓰기로 구분)"
                name="teamMember"
                onChange={(e) => setTeamMember(e.target.value)}
              />
            </div>
            <div className="work-teams-vedio">
              <strong>팀 소개영상</strong>
              <input
                type="text"
                placeholder="팀을 소개하는 Youtube 영상 링크를 입력하세요"
                onChange={(e) => setVedio(e.target.value)}
              />
            </div>
            <div className="work-images">
              <strong>
                <label htmlFor="works-image">작품사진</label>
              </strong>
              <p>5개까지 업로드 가능</p>
              <input
                type="file"
                multiple
                accept="image/*"
                id="works-image"
                onChange={handleUploadImages}
              />
              <ul className="works-images"></ul>
            </div>

            <div className="work-files">
              <i className="clip-icon" />
              <span className="file-name">파일을 선택해주세요</span>
              <i className="upload-icon" />
              <input
                type="file"
                id="works-file"
                accept=".pdf"
                onChange={handleUploadFile}
              />
              <label className="upload" htmlFor="works-file" />
            </div>
          </div>

          <div className="work-create-footer">
            <button type="submit">등록</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateWork;
