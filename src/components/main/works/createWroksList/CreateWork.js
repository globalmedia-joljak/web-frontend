import { Editor } from '@toast-ui/react-editor';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {
  useCallback,
  useState,
  useRef,
  useEffect,
} from 'react/cjs/react.development';
import { useAppDispatch, useAppState } from '../../../../context/appContext';
import { useWorksState } from '../../../../context/worksContext';
import {
  createWorks,
  getWorkDetail,
  updateWorks,
} from '../../../../service/api/work';
import './createWorkStyle.scss';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { uploadImage } from '../../../../service/api/upload';
import useAsync from '../../../../hooks/useAsync';

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
const worksCategory = ['MEDIA_ART', 'WEB_APP', 'ANIMATION_FILM', 'GAME'];

const CreateWork = ({ match, history }) => {
  const workState = match.params.state;
  const worksId = match.params.id;
  const editorRef = useRef();

  const { worksKR } = useAppDispatch();
  const { userInfo } = useAppState;
  const { detailData } = useWorksState();

  const [content, setContent] = useState(null);
  const [category, setCategory] = useState(null);
  const [worksName, setWorksName] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [teamMember, setTeamMember] = useState(null);
  const [vedio, setVedio] = useState(null);

  const [worksDetail, setWorksDetail] = useState();
  const [workDetailState, refetch] = useAsync(
    () => getWorkDetail(match.params.id, history),
    [match.params.id, history],
  );

  useEffect(() => {
    if (workDetailState.data) {
      setWorksDetail(workDetailState.data);
    }
  }, []);

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

  const selectedFn = (el, type) => {
    return Array.from(el.options).map((opt) => {
      if (opt.value === type) {
        return (opt.selected = true);
      }
    });
  };

  useEffect(() => {
    const selected = document.querySelectorAll('select');

    Array.from(selected).map((el) => {
      if (el.name === 'exhibit') {
        selectedFn(el, worksYear);
      }

      if (el.name === 'category') {
        selectedFn(el, category);
      }
    });
    if (!images) {
      previewImg();
    }
  });

  const makeArrFromData = useCallback((arr, queryName) => {
    return arr.map((data, i) => {
      formdata.append(`${queryName}[${i}]`, data);
    });
  });

  const deleleteArrFromData = useCallback((arr, queryName) => {
    return arr.map((data, i) => {
      formdata.delete(`${queryName}[${i}]`, data);
    });
  });

  const handleUploadImages = (e) => {
    const files = e.target.files;
    const reader = new FileReader();

    setImages([...files]);

    if (files.length > 5) {
      toast.warn(`⚠ 이미지는 최대 5개 입니다.`);
      setImages([...files].slice(0, 5));
    } else {
      setImages([...files]);
    }
  };

  const handleUploadFile = (e) => setFile(e.target.files[0]);

  const handleFileDel = (e) => {
    if (!e.target.parentElement.classList.contains('fetch-file')) return false;

    setFile(null);
    if (detailData.fileInfo.modifyName) {
      return formdata.append('deleteFileName', detailData.modifyName);
    }
  };

  const previewImg = () => {
    if (!images) return false;
    const worksImgaes = document.querySelectorAll('.works-images > li');

    images.map((image, i) => {
      const reader = new FileReader();

      reader.onload = () => {
        return ([...worksImgaes][
          i
        ].style.backgroundImage = `url(${reader.result})`);
      };

      reader.readAsDataURL(images[i]);
    });
  };

  useEffect(() => {
    if (workState === 'edit' && worksDetail) {
      setContent(worksDetail.content);
      setCategory(worksDetail.projectCategory);
      setWorksName(worksDetail.workName);
      setTeamName(worksDetail.teamName);
      setTeamMember(worksDetail.teamMember.join(' '));
      setVedio(worksDetail.teamVideoUrl);
      setWorksYear(worksDetail.exhibitedYear);
      setImages(worksDetail.imageInfoList);
      setFile(worksDetail.fileInfo);
    }
  }, [worksDetail]);

  const handleWorksSubmit = (e) => {
    e.preventDefault();

    const requestWorks = {
      exhibitedYear: worksYear,
      content: editorRef.current.getInstance().getHtml() || content,
      file: file,
      projectCategory: category,
      teamName: teamName,
      teamVideoUrl: vedio,
      workName: worksName,
    };

    if (teamMember) {
      const memberArr = teamMember
        .trim()
        .split(' ')
        .filter((el) => el !== '');

      makeArrFromData(memberArr, 'teamMember');
    }
    if (images) {
      makeArrFromData(images, 'images');
    }

    for (let item in requestWorks) {
      formdata.append(item, requestWorks[item]);

      if (workState === 'edit' && worksDetail) {
        if (worksDetail.fileInfo) {
          formdata.delete('file');
        }

        if (worksDetail.imageInfoList) {
          deleleteArrFromData(images, 'images');
        }
      }

      if (!requestWorks[item] || requestWorks[item] === []) {
        formdata.delete(item);

        if (item === 'images' && detailData.images) {
          makeArrFromData('deleteImagesName', requestWorks[item].modifyName);
        }
      }
    }

    for (let i of formdata.entries()) {
      console.log(i);
    }

    switch (workState) {
      case 'create':
        createWorks(formdata, history);
        return;

      case 'edit':
        updateWorks({ worksId, history }, formdata);
        return;
      default:
    }
  };

  const [fileName, setFileName] = useState('파일을 선택해 주세요');
  useEffect(() => {
    if (!file) return false;

    if (file) {
      file.name
        ? setFileName(file.name)
        : setFileName(worksDetail.fileInfo.originalName);
    } else {
      setFileName('파일을 선택해주세요.');
    }
  }, [file]);

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
            <div className="works-title">
              <strong>제목</strong>
              <input
                type="text"
                placeholder="제목을 입력하세요"
                onChange={(e) => setWorksName(e.target.value)}
                defaultValue={worksName}
              />
            </div>
          </div>
          <div className="work-create-main">
            <div className="work-editor">
              <Editor
                toolbarItems={toolbarItems}
                previewStyle="vertical"
                initialEditType="wysiwyg"
                usageStatistics={false}
                placeholder="작품소개 글을 작성해 주세요"
                ref={editorRef}
                initialValue={content}
                plugins={[colorSyntax]}
                language="ko"
                hooks={{
                  addImageBlobHook: (blob, callback) => {
                    uploadImage(userInfo.classOf, blob).then((response) => {
                      callback(response.url, 'alt text');
                    });
                    return false;
                  },
                }}
              />
            </div>
            <div className="work-members work-row">
              <strong>팀명&팀원 입력</strong>
              <input
                type="text"
                placeholder="팀명을 입력하세요"
                name="teamName"
                onChange={(e) => setTeamName(e.target.value)}
                defaultValue={teamName}
                id="temaName"
              />
              <input
                type="text"
                placeholder="팀원을 입력하세요(이름만 입력, 띄어쓰기로 구분)"
                name="teamMember"
                onChange={(e) => setTeamMember(e.target.value)}
                defaultValue={teamMember}
              />
            </div>
            <div className="work-teams-vedio work-row">
              <strong>팀 소개영상</strong>
              <input
                type="text"
                placeholder="팀을 소개하는 Youtube 영상 링크를 입력하세요"
                onChange={(e) => setVedio(e.target.value)}
                defaultValue={vedio}
              />
            </div>
            <div className="work-images work-row">
              <strong>
                <label className="upload" htmlFor="works-image">
                  작품사진
                  <i className="upload-icon" />
                </label>
              </strong>
              <p>5개까지 업로드 가능</p>
              <input
                type="file"
                multiple
                accept="image/*"
                id="works-image"
                onChange={handleUploadImages}
                defaultValue={images}
                className="file-input"
              />
              {!images ? (
                <div className="works-images none">
                  등록된 이미지가 없습니다.
                </div>
              ) : (
                <ul className="works-images">
                  {images &&
                    images.map((img, i) => (
                      <li
                        key={i}
                        className="work-img"
                        style={{
                          backgroundImage: `url(${
                            workState === 'eidt' && img.url
                          })`,
                        }}
                      ></li>
                    ))}
                </ul>
              )}
            </div>
            <div className="work-files work-row">
              <strong>
                <label className="upload" htmlFor="works-file">
                  파일첨부
                  <i className="upload-icon" />
                </label>
              </strong>
              <div className={`file-box ${file ? 'fetch-file' : ''}`}>
                <i className="clip-icon" />
                <span className="file-name">{fileName}</span>
                <i className="del-file-icon" onClick={handleFileDel} />
              </div>

              <input
                type="file"
                id="works-file"
                accept=".pdf"
                onChange={handleUploadFile}
                defaultValue={file}
                className="file-input"
              />
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
