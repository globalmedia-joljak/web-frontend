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
import {
  createWorks,
  getWorkDetail,
  getWorksYears,
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

const selectedFn = (el, type) => {
  return Array.from(el.options).map((opt) => {
    if (opt.value === type) {
      return (opt.selected = true);
    }
  });
};

const CreateWork = ({ match, history }) => {
  const workState = match.params.state;
  const worksId = match.params.id;
  const editorRef = useRef();

  const { worksKR } = useAppDispatch();
  const { userInfo } = useAppState;

  const [worksInput, setWorksInput] = useState({
    workName: null,
    teamName: null,
    teamMember: null,
    teamVideoUrl: null,
  });

  const [content, setContent] = useState(null);
  const [category, setCategory] = useState(null);
  const [worksDetail, setWorkDetail] = useState(null);

  useEffect(() => {
    if (workState === 'edit') {
      getWorkDetail(match.params.id, history)
        .then((res) => {
          setWorkDetail(res);
        })
        .catch((err) => console.log(err.response));
    }
  }, []);

  useEffect(() => {
    if (workState === 'edit' && worksDetail) {
      setContent(worksDetail.content);
      setCategory(worksDetail.projectCategory);
      setWorksYear(worksDetail.exhibitedYear);
      setImages(worksDetail.imageInfoList);
      setFile(worksDetail.fileInfo);
      setWorksInput({
        workName: worksDetail.workName,
        teamName: worksDetail.teamName,
        teamMember: worksDetail.teamMember.join(' '),
        teamVideoUrl: worksDetail.teamVideoUrl,
      });
      return;
    }
  }, [worksDetail]);

  // year
  const [worksYear, setWorksYear] = useState(null);
  const [years, setYears] = useState(null);
  const [yearsState] = useAsync(() => getWorksYears(), []);

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

    if (yearsState.data) {
      setYears(yearsState.data);
    }

    previewImg();
  });

  // updload File & images
  const [images, setImages] = useState(null);
  const [file, setFile] = useState(null);
  let formdata = new FormData();

  const makeArrFromData = useCallback((arr, queryName) => {
    return arr.map((data, i) => {
      formdata.append(`${queryName}[${i}]`, data);
    });
  });
  const deleteArrFromData = useCallback((arr, queryName) => {
    return arr.map((data, i) => {
      formdata.delete(`${queryName}[${i}]`, data);
    });
  });

  // file upload
  const handleUploadImages = (e) => {
    const files = e.target.files;

    setImages([...files]);

    if (files.length > 5) {
      toast.warn(`⚠ 이미지는 최대 5개 입니다.`);
      setImages([...files].slice(0, 5));
    } else {
      setImages([...files]);
    }
  };

  const handleUploadFile = (e) => setFile(e.target.files[0]);

  // file delete
  const handleFileDel = (e) => {
    if (!e.target.parentElement.classList.contains('fetch-file')) return false;

    setFile(null);
  };

  const previewImg = () => {
    if (!images) return false;
    const worksImgaes = document.querySelectorAll('.works-images > li');

    [...worksImgaes].map((image, i) => {
      if (!images[i].originalName) {
        const reader = new FileReader();
        reader.onload = () => {
          return (image.style.backgroundImage = `url(${reader.result})`);
        };

        return reader.readAsDataURL(images[i]);
      } else {
        return (image.style.backgroundImage = `url(${images[i].url})`);
      }
    });
  };

  const [fileName, setFileName] = useState('파일을 선택해 주세요');
  useEffect(() => {
    if (file) {
      file.originalName
        ? setFileName(file.originalName)
        : setFileName(file.name);
    } else {
      setFileName('파일을 선택해주세요.');
    }
  }, [file]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    return setWorksInput({
      ...worksInput,
      [name]: value === '' ? null : value,
    });
  };

  const { workName, teamName, teamMember, teamVideoUrl } = worksInput;

  const handleWorksSubmit = (e) => {
    e.preventDefault();

    const requestWorks = {
      exhibitedYear: worksYear,
      content: editorRef.current.getInstance().getHtml(),
      file: file,
      projectCategory: category,
      ...worksInput,
    };
    console.log(requestWorks);

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
          deleteArrFromData(worksDetail.imageInfoList, 'images');
        }
      }

      if (item === 'teamMember') {
        formdata.delete('teamMember');
      }

      if (!requestWorks[item] || requestWorks[item] === []) {
        formdata.delete(item);
      }
    }

    if (requestWorks.exhibitedYear === '연도를 선택하세요') {
      toast.error(`⛔잠품 출시 년도를 선택해 주세요.`);
      return false;
    }
    if (requestWorks.projectCategory === '카테고리를 선택하세요') {
      toast.error(`⛔카테고리를 선택해 주세요.`);
      return false;
    }

    if (workName === '' || !workName) {
      toast.error(`⛔작품 제목은 반드시 기입해 주세요`);
      return false;
    }

    if (teamMember === '' || !teamMember) {
      toast.error(`⛔팀원은 반드시 기입해 주세요`);
      return false;
    }

    for (let i of formdata.entries()) {
      console.log(i);
    }

    switch (workState) {
      case 'create':
        createWorks(formdata, history);
        return;
      case 'edit':
        if (!images && worksDetail.imageInfoList) {
          const delImages = worksDetail.imageInfoList.map(
            (img) => img.modifyName,
          );
          makeArrFromData(delImages, 'deleteImagesName');
        }

        if (!file && worksDetail.fileInfo) {
          formdata.append('deleteFileName', worksDetail.fileInfo.modifyName);
        }
        updateWorks({ worksId, history }, formdata);
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
                {years &&
                  years.map((year) => (
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
                onInput={handleChange}
                defaultValue={workName}
                name="workName"
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
                width="100%"
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
                id="teamName"
                type="text"
                placeholder="팀명을 입력하세요"
                name="teamName"
                onInput={handleChange}
                defaultValue={teamName}
              />
              <input
                type="text"
                placeholder="팀원을 입력하세요(이름만 입력, 띄어쓰기로 구분)"
                name="teamMember"
                onInput={handleChange}
                defaultValue={teamMember}
              />
            </div>
            <div className="work-teams-vedio work-row">
              <strong>팀 소개영상</strong>
              <input
                type="text"
                placeholder="팀을 소개하는 Youtube 영상 링크를 입력하세요"
                onInput={handleChange}
                defaultValue={teamVideoUrl}
                name="teamVideoUrl"
              />
            </div>
            <div className="work-images work-row">
              <strong>
                <label className="upload" htmlFor="works-image">
                  작품사진
                  <i className="upload-icon" />
                </label>
              </strong>
              <p>
                하나 이상의 파일을 업로드 할 경우 한번에 선택해 주세요
                <span>(5개까지 업로드 가능)</span>
              </p>
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
                <>
                  {images.length > 0 && (
                    <button
                      className="del-img"
                      type="button"
                      onClick={() => {
                        setImages(null);
                      }}
                    >
                      전체삭제
                    </button>
                  )}
                  <ul className="works-images">
                    {images &&
                      images.map((img, i) => (
                        <li key={i} className="work-img"></li>
                      ))}
                  </ul>
                </>
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
