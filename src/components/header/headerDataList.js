const navRoutes = [
  { id: "mypage", path: "/mypage", name: "마이페이지" },
  { id: "notice", path: "/notice", name: "공지사항" },
  { id: "teams", path: "/teams", name: "팀 빌딩" },
  { id: "project", path: "/projects", name: "졸업작품" },
  { id: "logout", path: "/", name: "로그아웃" },
];

// sub_nav_router_list
const subRoutes = {
  teamList: [
    { path: "/teams/author", name: "작가 목록" },
    { path: "/teams/list", name: "팀 목록" },
    { path: "/teams/idea", name: "아이디어 게시판" },
  ],
  projectList: [
    { path: "/projects/2021", name: "2021" },
    { path: "/projects/2020", name: "2020" },
    { path: "/projects/2019", name: "2019" },
  ],
};

export { navRoutes, subRoutes };
