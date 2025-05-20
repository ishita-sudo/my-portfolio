
// ✅ Assuming this structure:
const cards = document.querySelectorAll(".card"); // or whatever your elements are
const cardsArea = document.querySelector(".two");
const works = document.querySelectorAll(".work");
const worksArea = document.querySelector(".three");
const Headers = document.querySelector(".header");
const container = document.querySelector(".container");
const workDesc = document.querySelectorAll(".descrip-work");
const skillsDesc = document.querySelectorAll(".descrip-box");

function init(elements, stackArea) {

  function rotate(elements) {
    let angle = 0;
    elements.forEach((element, index) => {
      if (element.classList.contains("away")) { // ✅ Fixed typo
        element.style.transform = "translateY(-120vh) rotate(-48deg)";
        element.style.opacity = "0";
      } else {
        element.style.transform = `rotate(${angle}deg)`;
        element.style.opacity = "1";
        angle -= 10;
      }
      element.style.zIndex = elements.length - index;
    });
  }

  window.addEventListener("scroll", () => {
    const totalScroll = stackArea.offsetHeight - window.innerHeight; // max scroll in `.two`
    const scrollY = window.scrollY - stackArea.offsetTop;

    let progress = scrollY / totalScroll;
    let index = Math.floor(progress * elements.length); // map scroll % to index range

    // Clamp index to valid range
    index = Math.max(0, Math.min(index, elements.length));

    for (let i = 0; i < elements.length; i++) {
      if (i < index) {
        elements[i].classList.add("away");

      } else {
        elements[i].classList.remove("away");
      }
    }
    elements.forEach((elm, index) => {
      if (elm.classList.contains("not-away")) {
        console.log("found");
        elm.style.zIndex = elements.length - index;
        if (elm.classList.contains("away")) { // ✅ Fixed typo f0f4df
          elm.style.opacity = "0";
        } else {

          elm.style.opacity = "1";
        }
        return;
      } else {
        rotate(elements);
      }
    });
    if (window.scrollY > window.innerHeight * 0.5) {
      document.querySelector(".header").style.display = "none";
    }
    else {
      document.querySelector(".header").style.display = "flex";
    }
  });
}


init(cards, cardsArea);
init(skillsDesc, cardsArea);
init(works, worksArea);
init(workDesc, worksArea);


const observer=new IntersectionObserver((entries)=>{
entries.forEach((entry,index)=>{
if (entry.isIntersecting) {
  entry.target.classList.add("in-view");
} else {
  entry.target.classList.remove("in-view");
}
});
},
{
threshold:0.5,
}
);
document.querySelectorAll('.animate-on-scroll').forEach((el,index) => {

  el.style.transitionDelay = `${index * 0.1}s`; // 0.2s delay between each
  observer.observe(el);
});