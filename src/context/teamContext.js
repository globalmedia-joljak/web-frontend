import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

export const teamStateContext = createContext(null);
export const teamDispatchContext = createContext(null);
const profileListData = {
  content: [
    {
      content: 'string',
      id: 0,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: 'admin',
        id: 0,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'DEVELOPER',
        name: '이가영',
        phoneNumber: '1231231234',
        subProjectRole: 'DEVELOPER',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
    {
      content: 'string',
      id: 1,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: '20152002',
        id: 1,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'DESIGNER',
        name: '이가영2',
        phoneNumber: '1231231234',
        subProjectRole: 'DESIGNER',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
    {
      content: 'string',
      id: 2,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: '20152003',
        id: 2,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'PLANNER',
        name: '이가영2',
        phoneNumber: '1231231234',
        subProjectRole: 'PLANNER',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
    {
      content: 'string',
      id: 3,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: '20152004',
        id: 3,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'DEVELOPER',
        name: '이가영3',
        phoneNumber: '1231231234',
        subProjectRole: 'DEVELOPER',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
    {
      content: 'string',
      id: 4,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: '20152005',
        id: 4,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'MEDIA_ART',
        name: '이가영4',
        phoneNumber: '1231231234',
        subProjectRole: 'MEDIA_ART',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
    {
      content: 'string',
      id: 5,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: '20152006',
        id: 5,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'DESIGNER',
        name: '이가영5',
        phoneNumber: '1231231234',
        subProjectRole: 'DESIGNER',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
    {
      content: 'string',
      id: 6,
      mediaInfo: {
        fileExtension: 'string',
        fullPath: 'string',
        mediaType: 'IMAGE',
        modifyName: 'string',
        originalName: 'string',
        url: 'string',
      },
      portfolioLinks: ['string'],
      user: {
        classOf: '20152007',
        id: 6,
        instagramId: 'abc',
        kakaoId: 'def',
        mainProjectRole: 'DEVELOPER',
        name: '이가영6',
        phoneNumber: '1231231234',
        subProjectRole: 'DEVELOPER',
        userRoles: [
          {
            key: 'string',
            roleName: 'string',
          },
        ],
      },
    },
  ],
};
const TeamsProvider = ({ children }) => {
  const [showCreate, setShowCreate] = useState(false);
  const filterClassOf = useCallback((classOf) => classOf.substr(2, 2));

  const value = useMemo(() => ({ showCreate }), [showCreate]);
  const dispatch = useMemo(() => ({ filterClassOf, setShowCreate }), [
    filterClassOf,
    setShowCreate,
  ]);

  return (
    <teamStateContext.Provider value={value}>
      <teamDispatchContext.Provider value={dispatch}>
        {children}
      </teamDispatchContext.Provider>
    </teamStateContext.Provider>
  );
};

export const useTeamsState = () => {
  const state = useContext(teamStateContext);
  if (!state) throw new Error('TeamsProvider 에러');
  return state;
};

export const useTeamsDispatch = () => {
  const dispatch = useContext(teamDispatchContext);
  if (!dispatch) throw new Error('TeamsProvider 에러');
  return dispatch;
};

export default TeamsProvider;
