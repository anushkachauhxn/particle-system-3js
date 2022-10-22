import gsap from "gsap";

let tl = gsap.timeline();

const content = document.querySelector(".content");
const h1 = document.querySelector(".content h1");
const p = document.querySelector(".content p");

tl.add("line")
  .to(content, { delay: 0.25, duration: 4, scaleX: 1 }, "line")
  .add("text")
  .to(
    h1,
    {
      duration: 2,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: "+30px",
    },
    "text"
  )
  .to(
    p,
    {
      duration: 4,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: "+30px",
    },
    "text"
  );
