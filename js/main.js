window.addEventListener("DOMContentLoaded", () => {
  // Laoder
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    setInterval(() => {
      loader.classList.add("hide");
    }, 500);
  }, 1500);

  // Tabs

  const tabParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");

  function hideTabsContent() {
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });

    tabsContent.forEach((content) => {
      content.classList.add("hide");
      content.classList.remove("show");
    });
  }

  function showTabsContent(i = 0) {
    tabs[i].classList.add("tabheader__item_active");
    tabsContent[i].classList.add("show");
  }

  hideTabsContent();
  showTabsContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });

  //TIMER

  const deadline = "2023-12-31";

  function getTime() {
    const timer = Date.parse(deadline) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }
    return {
      timer,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function settingTime(parentTimer, endtime) {
    const timer = document.querySelector(parentTimer),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    timeInterval = setInterval(updateTime, 1000);

    function updateTime() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);

      if (time.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  settingTime(".timer", deadline);

  // Slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    currentNum = document.querySelector("#current"),
    totalNum = document.querySelector("#total");

  let byDefault = 1;
  showSlides(byDefault);

  function showSlides(ind) {
    if (ind < 1) {
      byDefault = slides.length;
    }
    if (ind > slides.length) {
      byDefault = 1;
    }
    slides.forEach((item) => {
      item.style.display = "none";
    });
    slides[byDefault - 1].style.display = "block";

    if (slides.length < 10) {
      currentNum.textContent = `0${byDefault}`;
    } else {
      currentNum.textContent = byDefault;
    }
  }

  function btns(ind) {
    showSlides((byDefault += ind));
  }

  prev.addEventListener("click", () => {
    btns(-1);
  });
  next.addEventListener("click", () => {
    btns(1);
  });

  // Modal

  const modalOpen = document.querySelector("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalClose = document.querySelector("[data-close]");

  function modalShow() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  function modalHidden() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalOpen.addEventListener("click", modalShow);

  modalClose.addEventListener("click", modalHidden);

  document.addEventListener("click", (e) => {
    e.target == modal ? modalHidden() : null;
  });

  document.addEventListener("keydown", (e) => {
    e.code == "Escape" ? modalHidden() : null;
  });

  console.log(pageYOffset);
  console.log(document.documentElement.clientHeight);
  console.log(document.documentElement.scrollHeight);

  function showModalOnScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      modalShow();
      window.removeEventListener("scroll", showModalOnScroll);
    }
  }

  window.addEventListener("scroll", showModalOnScroll);

  //Cards

  class MenuCard {
    constructor(src, title, desc, price, parentSelector, ...classes) {
      this.src = src;
      this.title = title;
      this.desc = desc;
      this.classes = classes;
      this.price = price * 11000;
      this.parentSelector = document.querySelector(parentSelector);
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length == 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((classname) => {
          element.classList.add(classname);
        });
      }

      element.innerHTML = `
      <img src= ${this.src} alt="vegy" />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
            ${this.desc}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> month</div>
            </div>
      `;

      this.parentSelector.append(element);
    }
  }

  new MenuCard(
    "./img/tabs/1.png",
    "Plan 'Usual'",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugitnesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    10,
    ".menu .container"
  ).render();

  new MenuCard(
    "./img/tabs/2.jpg",
    "Plan 'Premium'",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugitnesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    15,
    ".menu .container"
  ).render();

  new MenuCard(
    "./img/tabs/3.jpg",
    "Plan 'Vip'",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugitnesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.",
    20,
    ".menu .container"
  ).render();
});
