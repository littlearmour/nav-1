const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x"); //获取本地的x
const xObject = JSON.parse(x); //null
const hashMap = xObject || [
  {
    logo: "W",
    url: "https://www.w3school.com.cn",
  },
  { logo: "G", url: "https://github.com" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //正则表达式，删除以/开头的内容
};
const render = () => {
  //渲染哈希
  $siteList.find("li:not(.last)").remove(); //删除之前的li
  hashMap.forEach((node, index) => {
    //当前元素和下标
    //遍历哈希
    const $li = $(`<li>
    <div class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close">
      <svg class="icon">
         <use xlink:href="#icon-close"></use>
      </svg>
      </div>
    </div>
    </li>`).insertBefore($lastLi); //在最后一个前插入
    $li.on("click", () => {
      window.open(node.url); //用js代替a标签
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡,跳转到a
      console.log(hashMap);
      hashMap.splice(index, 1); //index中删除一个
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是？"); //prompt提醒
  if (url.indexOf("http") !== 0) {
    // alert("请输入http开头的网址");
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(), //toUpperCase()首字母大写
    url: url,
  });
  render(); //调用
});

window.onbeforeunload = () => {
  //用户退出之前触发
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string); //存储到本地的x
};
$(document).on("keypress", (e) => {
  const key = e.key; //const {key}=e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
