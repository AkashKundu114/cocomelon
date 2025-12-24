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

  // 1. Intro Animation
  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    
    // 2. Show Button & PAUSE
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 }, "buttonAppear")
    .call(() => { tl.pause(); });

  // 3. Enable Click on Button
  const bloomBtn = document.querySelector(".fake-btn");
  bloomBtn.addEventListener("click", () => {
      TweenMax.to(".fake-btn", 0.1, { backgroundColor: "#e11d48", scale: 0.95, yoyo: true, repeat: 1 });
      tl.play(); 
  });

  // 4. Resume Animation
  tl.to(".four", 0.3, { scale: 0.2, opacity: 0, y: -150 }) 
    
    // --- TEXT SEQUENCE FIX ---
    // Use .fromTo() to force it visible even if CSS hides it
    .fromTo(".idea-1", 0.7, { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
    .to(".idea-1", 0.7, { y: -20, opacity: 0 }, "+=0.5")
    
    .fromTo(".idea-2", 0.7, { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
    .to(".idea-2", 0.7, { y: -20, opacity: 0 }, "+=0.5")
    
    .fromTo(".idea-3-group", 0.7, { y: 20, opacity: 0 }, { y: 0, opacity: 1 })
    .to(".idea-3-group", 0.7, { y: -20, opacity: 0 }, "+=0.5")
   
    // Grow Grass Field
    .from(".grass-field", 0.8, { 
        y: 200, 
        opacity: 0, 
        ease: Power4.easeOut 
    })

    // Bloom Flowers (Rapid Wave)
    .staggerFrom(".flower", 0.8, { 
        y: 300, 
        scale: 0.1, 
        opacity: 0, 
        rotation: 15, 
        ease: Back.easeOut.config(1.7) 
    }, 0.05) 

    // Show Photo & Wish
    .from(".six", 0.8, { 
        scale: 0.5, 
        opacity: 0, 
        rotationZ: -10, 
        ease: Back.easeOut.config(1.7) 
    }, "-=0.5")
    
    .from(".hat", 0.5, { y: -200, opacity: 0, ease: Bounce.easeOut })
    
    // 5. Outro
    .from(".nine", 0.5, { autoAlpha: 0, y: 20 });

  document.getElementById("replay").addEventListener("click", () => { tl.restart(); });
};

fetchData();