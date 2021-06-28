

let page = 1
let currentType = ''
// 初始加载
found()

$('.main .nav .meizi').on('click',function () {
  $('.cont').html('')
  page = 1
  found()
})

// 首页妹子
function found() {
  $.ajax({
    method: 'GET',
    url:`https://gank.io/api/v2/data/category/Girl/type/Girl/page/${page}/count/10`,
    success(the){
      the.data.forEach(function (item) {
        $('.cont').append(`<div class="center">
    <div class="title">${item.title}</div>
    <div class="desc">${item.author} — 妹纸 <span>1年前</span> </div>
    <a href="https://gank.io/post/${item._id}"><img src="${item.url}" alt=""></a>
    <p class="comment">${item.desc}</p>
  </div>`)
      })
    },
    error(e){
      console.log(e)
    }
  })
}
// 点击加载
$('.load').on('click',function () {
  page += 1
  found()
})

// nav 添加类名
// jq 添加切换类名
let navLis = $('.nav ul li')
$(navLis).on('click',function (){
  $(this).addClass('blue').siblings().removeClass('blue')
})


// 安卓 ios 。。。
function anzhuo(data_id) {
  currentType = data_id
  $.ajax({
    method: 'GET',
    url: `https://gank.io/api/v2/data/category/GanHuo/type/${data_id}/page/${page}/count/10`,
    success(the) {
      the.data.forEach(function (item) {
        $('.cont').append(`<div class="add">
         <a href="https://gank.io/post/${item._id}"><img src="${item.images}" alt=""></a>
         <div class="right-add">
         <a href="https://gank.io/post/${item._id}" class="tit">
         <span class="head">${item.type}</span>
         ${item.title}
         </a>
         <div class="des">${item.desc}</div>
       <div class="writer"><div><span>${item.author}</span> &nbsp; — &nbsp;<p>${item.type}</p></div> <span>1年前发布</span></div>
    </div>
  </div>`)
      })
    },
    error(e) {
      console.log(e)
    }
  })
}


 // 切换类型
const navs = $('.nav ul li[data-id]')
$(navs).on('click',function () {
  const data_id = $(this).attr('data-id')
  $('.cont').html('')
  anzhuo(data_id)
  page = 1
})


// 滑动加载
// 返回顶部
$('.to-top').on('click',function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})
$(".to-top").css('display','none')

window.onscroll = function () {
  if(Math.ceil(document.documentElement.scrollHeight) === Math.ceil(document.documentElement.scrollTop + document.documentElement.clientHeight)) {
    page += 1
    // found()
    anzhuo(currentType)
  }
  if (document.body.scrollTop > 220 || document.documentElement.scrollTop > 220) {
    $(".to-top").css('display','block')
  } else {
    $(".to-top").css('display','none')
  }
}


const img = $('.stochastic-meizi img')
const qi = $('.desc .qi')
// 随机妹子
$('.meizi-desc i').on('click',function (){
  $.ajax({
    method:'GET',
    url:`https://gank.io/api/v2/random/category/Girl/type/Girl/count/10`,
    success(res){
      let Random = parseInt(Math.random() * res.data.length)
      $(img).attr('src',res.data[Random].url)
      // img.src = res.data[Random].url
      $(qi).html(res.data[Random].title)
    },
    error(e){
      console.log(e)
    }
  })
})

// 媒体查询header
$('.LiuLiu').on('click',function (e) {
  e.stopPropagation()
  $('.left .nav').addClass('show')
})
$(window).on('click',function (e){
  e.stopPropagation()
  $('.left .nav').removeClass('show')
})

// 轮播图

