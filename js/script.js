svg4everybody();

var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

if ("null" != document.querySelector(".page-main")) {
  var slideImageList = document.querySelector(".slide-image__list");
  var slideImage = slideImageList.querySelectorAll(".slide-image__image");
  var slideItem = document.querySelectorAll(".slide-image__item");

  var slider = document.querySelector(".slide-image__toggle");
  var item = slider.querySelector(".slide-image__toggle-btn");
  var itemBefore = document.querySelector(".slide-image__before");
  var itemAfter = document.querySelector(".slide-image__after");

  var sliderClientCoords = slider.getBoundingClientRect();
  var sliderCoords = {};

  sliderCoords.top = sliderClientCoords.top + pageYOffset;
  sliderCoords.left = sliderClientCoords.left + pageXOffset;

  item.onmousedown = function (e) {
    item.ondragstart = function () {
      return false;
    };

    var itemClientCoords = item.getBoundingClientRect();
    var itemCoords = {};

    itemCoords.top = itemClientCoords.top + pageYOffset;
    itemCoords.left = itemClientCoords.left + pageXOffset;

    var right = slider.offsetWidth - item.offsetWidth;

    var shiftX = e.pageX - itemCoords.left;

    document.onmousemove = function (e) {
      var newLeft = e.pageX - sliderCoords.left - shiftX;
      if (newLeft < 0) newLeft = 0;
      if (newLeft > right) newLeft = right;
      item.style.left = newLeft + "px";

      if (window.matchMedia("(min-width: 768px) and (max-width: 1299px)").matches) {
        var imageOfsett = (newLeft / 660) * 100;
      }
      if (window.matchMedia("(min-width: 1300px)").matches) {
        var imageOfsett = (newLeft / 392) * 100;
      }

      slideImage[0].style.clipPath =
        "polygon(0% 0%, " +
        imageOfsett +
        "% 0%, " +
        imageOfsett +
        "% 100%, 0% 100%)";
      slideImage[1].style.clipPath =
        "polygon(" +
        imageOfsett +
        "% 0%, 100% 0%, 100% 100%, " +
        imageOfsett +
        "% 100%)";
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  itemBefore.addEventListener("click", function (evt) {
    evt.preventDefault();

    slideImage[0].style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    slideImage[1].style.clipPath = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)";
    slideItem[0].style.display = "block";
    slideItem[1].style.display = "none";
    slideImage[0].style.clip = "auto";
    slideImage[1].style.clip = "auto";
    item.style.left = "5px";
    item.style.right = "auto";
  });

  itemAfter.addEventListener("click", function (evt) {
    evt.preventDefault();

    slideImage[0].style.clipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
    slideImage[1].style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    slideItem[0].style.display = "none";
    slideItem[1].style.display = "block";
    slideImage[0].style.clip = "auto";
    slideImage[1].style.clip = "auto";
    item.style.left = "auto";
    item.style.right = "5px";
  });
}
