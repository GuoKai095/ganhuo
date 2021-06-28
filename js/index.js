

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
$.get('https://gank.io/api/v2/banners', function (res) {
  $('.banner').myBanner({
    data: res.data,
    index: 0,
  })
})
// $.fn.myBanner = (options) => {
$.fn.myBanner = function (options){
  const ele = this
  let activeIndex = options.index || 0
  options.data.forEach((item, index) => {
    $(`<a href="${item.url}"
            style="display: ${index === activeIndex ? 'block' : 'none'}" class="item">
        <img src="${item.image}" alt="">
      </a>
      <div style="display: ${index === activeIndex ? 'block' : 'none'}" class="dexx">${item.title}</div>
    <div style="display: ${index === activeIndex ? 'block' : 'none'}" class="left-arr"></div>
    <div style="display: ${index === activeIndex ? 'block' : 'none'}" class="right-arr"></div>
`).appendTo('.banner')
  })
  const images = ele.find('.item')
  const dexx = ele.find('.dexx')
  const leftArr = ele.find('.left-arr')
  const rightArr = ele.find('.right-arr')
  function banners() {
    activeIndex += 1
    if (activeIndex >= images.length) {
      activeIndex = 0
    }
    images.eq(activeIndex).fadeIn(500)
    .siblings().fadeOut(500)
    dexx.eq(activeIndex).show()
    leftArr.eq(activeIndex).show()
    rightArr.eq(activeIndex).show()
  }
  let timer = setInterval(function () {
    banners()
  }, 5000)

  rightArr.on('click',function () {
    banners()
  })
  leftArr.on('click',function () {
    activeIndex -= 1
    if (activeIndex < 0) {
      activeIndex = images.length
    }
    images.eq(activeIndex).fadeIn(500)
    .siblings().fadeOut(500)
    dexx.eq(activeIndex).show()
    leftArr.eq(activeIndex).show()
    rightArr.eq(activeIndex).show()
  })

  ele.hover(function () {
    clearInterval(timer)
  }, function () {
    timer = setInterval(function () {
      banners()
    }, 5000)
  })
}





// 切换主题
// color: #ffffff;  background-color: #151617;  header background-color: #1D1F20;
const night = document.querySelector(':root')
const logo = $('.left .logo')

console.log()

function Night() {
  $(logo).addClass('night')
  night.style.cssText = `
  --bg-color: #151617;
  --header-bg:#1D1F20;
  --color:#ffffff;
  color:#fff;
  `
  $('.tit').html('一点就亮')
}
function sun() {
  $(logo).removeClass('night')
  night.style.cssText = `
      --bg-color: #f5f5f7; 
      --header-bg:#fff;
      --color:#222831;
  `
  $('.tit').html('一点乌漆嘛黑')
}
if (localStorage.getItem('isnight') === 'true'){
  Night()
}else {
  sun()
}


$('.yueliang').on('click',function () {
  if (!$(logo).hasClass('night')){
    Night()
    localStorage.setItem('isnight','true')
  }else {
    sun()
    localStorage.setItem('isnight','false')
  }
})
$('.yueliang').hover(function () {
  $('.tit').css('display','block')
},function () {
  $('.tit').css('display','none')
})
