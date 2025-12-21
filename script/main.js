const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      Object.keys(data).map(customData => {
        const node = document.querySelector(`[data-node-name*="${customData}"]`);
        if (node && data[customData] !== "") {
          if (customData === "imagePath") {
            node.setAttribute("src", data[customData]);
          } else {
            node.innerText = data[customData];
          }
        }
      });
      animationTimeline();
    });
};

const animationTimeline = () => {
  const tl = new TimelineMax();
  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    // reveal garden
    .staggerFrom(".flower", 1.5, { y: 1000, opacity: 0, rotation: 45, ease: Back.easeOut }, 0.2)
    .from(".six", 0.5, { scale: 3.5, opacity: 0, rotationZ: -45 }, "-=1")
    .from(".nine", 0.5, { opacity: 0 });

  document.getElementById("replay").addEventListener("click", () => { tl.restart(); });
};

fetchData();