// 點擊後網頁回到頂端
$(function () {
  $("#BackTop").click(function () {
    $("html, body").scrollTop(0);
  });
});

// nav bar增加class以運行css樣式
const hbgBtn = document.querySelector(".hbgIcon");
const nav = document.querySelector(".menu-item");
hbgBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// 三欄式卡片rwd拖拉效果
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

// 資料串接
const apiPath = "https://2023-engineer-camp.zeabur.app";
const list = document.querySelector("#list");
const pagination = document.querySelector("#pagination");

const data = {
  type: "",
  sort: 0,
  page: 1,
  search: "",
};

let worksData = [];
let pagesData = {};

function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${
    type ? `type=${type}&` : ""
  }${search ? `search=${search}` : ""}`;
  axios.get(apiUrl).then((res) => {
    worksData = res.data.ai_works.data;
    pagesData = res.data.ai_works.page;

    renderWorks();
    renderPages();
  });
}

getData(data);

// 作品選染至畫面
function renderWorks() {
  let works = "";

  worksData.forEach((item) => {
    works += /*html*/ `
      <li class="card">
          <div class="card-layer">
            <img class="card-img" src="${item.imageUrl}" alt="ai image">
          </div>
            <h3 class="card-title">${item.title}</h3>
            <p class="cardP">${item.description}</p>
          <div class="card-item">
            <p class="pBold">AI 模型</p>
            <p class="card-text">${item.model}</p>
          </div>
          <div class="card-item">
            <span class="card-text">#${item.type}</span>
            <a class="card-link" href="${item.link}" target="_blank">
              <span class="material-icons">
                share
              </span>
            </a>
          </div>
      </li>
    `;
  });

  list.innerHTML = works;
}

// 類別選擇效果
$(function () {
  $(".list-item").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active"); // 如果已經有 active 類別，則移除
    } else {
      $(".list-item").removeClass("active"); // 移除其他按鈕的 active 類別
      $(this).addClass("active"); // 加上 active 類別
    }
  });
});

// 類別選擇
const buttonItems = document.querySelectorAll(".list-item");
buttonItems.forEach((buttonItem) => {
  buttonItem.addEventListener("click", (e) => {
    e.preventDefault();
    const targetButton = e.target;
    data.type = targetButton.id === "all" ? "" : targetButton.innerText;
    getData(data);
  });
});

// const salesButton = document.querySelector("#sales");
// salesButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   data.type = "行銷文案";
//   getData(data);
// });

// 新舊篩選事件
const sortBtn = document.querySelector(".btn-sort");
const sortList = document.querySelector(".input-sort-list");
sortBtn.addEventListener("click", () => {
  sortList.classList.toggle("open-sort-list");
});

const sortItems = document.querySelectorAll(".sort-item");
const sortTitle = document.querySelector("#sort-title");
sortItems.forEach((sortItem) => {
  sortItem.addEventListener("click", (e) => {
    const target = e.target;
    const title = target.innerText;
    if (title === "由新到舊") {
      data.sort = 0;
    } else {
      data.sort = 1;
    }
    sortTitle.innerText = title;

    getData(data);
  });
});

// 搜尋事件
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("change", (e) => {
  const { value } = e.target;
  data.search = value;

  getData(data);
});

// 頁數選擇
const pageList = document.querySelector(".page-list");
function renderPages() {
  let pages = "";

  for (let i = 0; i < pagesData.total_pages; i += 1) {
    pages += `
      <li><a href="#" id="page-item" >${i + 1}</a></li>
    `;
  }
  pageList.innerHTML = pages;

  const pageItems = document.querySelectorAll("#page-item");

  pageItems.forEach((pageItem) => {
    pageItem.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target;
      const selectPage = target.innerText;

      data.page = selectPage;

      getData(data);
    });
  });
}
