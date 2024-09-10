// Sound starts
var soundActivated = false; // Initially sound is not activated

function toggleSound() {
  soundActivated = !soundActivated; // Toggle sound activation
}

function playSoundOnClick(event) {
  if (soundActivated) {
    // Define the sound you want to play
    var sound = new Audio("sfx/click.wav");

    // Play the sound
    sound.play();
  }
}
function playSoundOnClick1(event) {
  if (soundActivated) {
    // Define the sound you want to play
    var sound1 = new Audio("sfx/menu_hover.mp3");
    // Play the sound
    sound1.play();
  }
}
// Sound ends

// Active link start
document.addEventListener("DOMContentLoaded", function () {
  // Get all the links with the class "nav-link"
  var navLinks = document.querySelectorAll(".nav-link");

  // Add a click event listener to each link
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Remove the "active" class from all links
      navLinks.forEach(function (navLink) {
        navLink.classList.remove("active");
      });

      // Add the "active" class to the clicked link
      link.classList.add("active");
    });
  });
});
// Active link end

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    // Get the current scroll position
    var scrollPosition = window.scrollY;

    // Define an offset (adjust this value as needed)
    var offset = 50; // You can experiment with different values

    // Loop through each section and check if it's in the viewport
    navLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop - offset &&
        scrollPosition < sectionTop + sectionHeight - offset
      ) {
        // Remove the "active" class from all links
        navLinks.forEach(function (navLink) {
          navLink.classList.remove("active");
        });

        // Add the "active" class to the current link
        link.classList.add("active");
      }
    });
  }

  // Add scroll event listener to update the active link on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initial update to set the active link on page load
  updateActiveLink();
});
// Active link onScroll(main) end

// Active link onscroll(mobile) start
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link_1");

  function updateActiveLink() {
    // Get the current scroll position
    var scrollPosition = window.scrollY;

    // Define an offset (adjust this value as needed)
    var offset = 50; // You can experiment with different values

    // Loop through each section and check if it's in the viewport
    navLinks.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop - offset &&
        scrollPosition < sectionTop + sectionHeight - offset
      ) {
        // Remove the "active" class from all links
        navLinks.forEach(function (navLink) {
          navLink.classList.remove("active");
        });

        // Add the "active" class to the current link
        link.classList.add("active");
      }
    });
  }

  // Add scroll event listener to update the active link on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initial update to set the active link on page load
  updateActiveLink();
});
// Active link onscroll(mobile) end

// Resposive Menu start
const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dorpDownMenu = document.querySelector(".dropdown_menu");

toggleBtn.onclick = function () {
  dorpDownMenu.classList.toggle("open");
  const isOpen = dorpDownMenu.classList.contains("open");

  toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
// Resposive Menu end

// Loader start

window.onload = function () {
  const loader = document.querySelector(".loader");

  // Add a delay if needed (e.g., for a smooth transition effect)
  setTimeout(() => {
    // Change the class to use the new styles
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", function transitionEndHandler() {
      loader.removeEventListener("transitionend", transitionEndHandler);
      document.body.removeChild(loader);
    });
  }, 100); // Adjust the delay as needed
};

// Loader end

// No scroll till load starts
document.addEventListener("DOMContentLoaded", () => {
  // Disable scroll
  document.body.style.overflow = "hidden";

  // Add your code here for other tasks during page load

  // Enable scroll after a delay (adjust the delay as needed)
  setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 1000); // Adjust the delay as needed
});
// No Scroll till load ends

// Carousel Starts
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".projects_arrow_box div");
const firstCardWidth = carousel.querySelector(".project").offsetWidth;
const sensitivityFactor = 2; // Adjust this value for sensitivity
let isDragging = false;
let startTouchX;
let startScrollLeft;
let startX;
let startY;

const handleButtonClick = (direction) => {
  const currentPosition = carousel.scrollLeft;
  const targetPosition =
    direction === "left"
      ? currentPosition - firstCardWidth
      : currentPosition + firstCardWidth;

  // Use smooth scrolling to the target position
  carousel.scrollTo({
    left: targetPosition,
    behavior: "smooth",
  });
};

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleButtonClick(btn.id);
  });
});

const dragStart = (e) => {
  const touch = e.touches ? e.touches[0] : e;
  isDragging = true;
  startTouchX = touch.clientX;
  startScrollLeft = carousel.scrollLeft;

  // Store initial touch position for comparison
  startX = touch.clientX;
  startY = touch.clientY;
};

const dragging = (e) => {
  if (!isDragging) return;

  const touch = e.touches ? e.touches[0] : e;
  const currentTouchX = touch.clientX;
  const currentY = touch.clientY;
  const distanceX = (currentTouchX - startTouchX) * sensitivityFactor;
  const distanceY = Math.abs(currentY - startY);

  // Allow vertical scroll if the vertical swipe distance is greater than horizontal swipe distance
  if (distanceY > Math.abs(distanceX)) {
    isDragging = false;
    return;
  }

  carousel.scrollLeft = startScrollLeft - distanceX;
  e.preventDefault(); // Prevent default touch behavior
};

const dragEnd = () => {
  isDragging = false;
};

const checkEndOfCarousel = () => {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft >= maxScrollLeft) {
    arrowBtns[1].classList.add("btnhidden"); // Add custom class to hide right arrow button if at the end
  } else {
    arrowBtns[1].classList.remove("btnhidden"); // Remove custom class to show right arrow button if not at the end
  }

  if (carousel.scrollLeft === 0) {
    arrowBtns[0].classList.add("btnhidden"); // Add custom class to hide left arrow button if at the start
  } else {
    arrowBtns[0].classList.remove("btnhidden"); // Remove custom class to show left arrow button if not at the start
  }
};

// Event listeners for mouse and touch events
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragEnd);
carousel.addEventListener("mouseleave", dragEnd);

carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
carousel.addEventListener("touchend", dragEnd);
carousel.addEventListener("touchcancel", dragEnd);

carousel.addEventListener("scroll", checkEndOfCarousel);

// Carousel Ends

// Load to top starts
window.addEventListener("load", function () {
  // Scroll to the top of the page
  window.scrollTo(0, 0);
});
// Load to top ends

// Blob Starts

// const blob = document.getElementById("blob");

// document.body.onpointermove = (event) => {
//   const { clientX, clientY } = event;

//   blob.animate(
//     {
//       left: `${clientX}px`,
//       top: `${clientY}px`,
//     },
//     { duration: 1500, fill: "forwards" }
//   );
// };

// Blob Ends

// Play Button + Background Music Starts
document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("backgroundMusic");
  var playButtons = document.getElementsByClassName("playButton");
  var movingIconsContainer = document.querySelector(".moving_icons");
  var isPlaying = false;

  function handleVisibilityChange() {
    if (document.hidden) {
      audio.pause();
    } else if (!document.hidden && isPlaying) {
      audio.play();
    }
  }
  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  // Event listener for each play button click
  for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        movingIconsContainer.classList.add("icons_right");
        isPlaying = true;
      } else {
        audio.pause();
        movingIconsContainer.classList.remove("icons_right");
        isPlaying = false;
      }
    });
  }
});
// Play Button + Background Music Ends

// Play Button + Background Music Starts(Mobile)
document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("backgroundMusic");
  var playButtons = document.getElementsByClassName("playButton_mobile");
  var movingIconsContainermobile = document.querySelector(
    ".moving_icons_mobile"
  );
  var isPlaying = false;

  function handleVisibilityChange() {
    if (document.hidden) {
      audio.pause();
    } else if (!document.hidden && isPlaying) {
      audio.play();
    }
  }
  document.addEventListener("visibilitychange", handleVisibilityChange, false);

  // Event listener for each play button click
  for (var i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
        movingIconsContainermobile.classList.add("icons_right_mobile");
        isPlaying = true;
      } else {
        audio.pause();
        movingIconsContainermobile.classList.remove("icons_right_mobile");
        isPlaying = false;
      }
    });
  }
});
// Play Button + Background Music Ends(Mobile)

// Counter start(Mobile Only Feature)
function createCounterForPC(counterId, start, end, duration) {
  const screenWidth = window.innerWidth;
  const isPC = screenWidth >= 768; // Example threshold for PC screen width

  if (isPC) {
    const counterElement = document.getElementById(counterId);
    const interval = duration / Math.abs(end - start);
    let currentCount = start;

    function updateCounter() {
      counterElement.innerText = Math.floor(currentCount);

      if (currentCount < end) {
        currentCount += 1;
        setTimeout(updateCounter, interval);
      }
    }

    function handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(counterElement);
          updateCounter();
        }
      });
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(counterElement);
  }
}

// Define a common duration for all counters
const commonDuration = 1750; // Adjust as needed

// Create counters with different start and end values only on PCs based on screen size
createCounterForPC("counter1", 0, 3, commonDuration);
createCounterForPC("counter2", 0, 50, commonDuration);
createCounterForPC("counter3", 0, 20, commonDuration);

// Counter end(Mobile Only Feature)

// Skills Loading starts
document.addEventListener("DOMContentLoaded", function () {
  // Check if the screen width is less than 768 pixels
  if (window.innerWidth > 768) {
    // Get all loading bar elements
    var loadingBars = document.querySelectorAll(".skills_loading");

    // Function to update the loading bar width to 100%
    function completeLoadingBar(loadingBar) {
      loadingBar.style.width = "100%";
    }

    // Create an Intersection Observer
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("triggered")
          ) {
            completeLoadingBar(entry.target);
            entry.target.classList.add("triggered");
          }
        });
      },
      { threshold: 0.5 }
    ); // Adjust the threshold as needed

    // Observe each loading bar
    loadingBars.forEach(function (loadingBar) {
      observer.observe(loadingBar);
    });
  }
});

// Skills Loading ends

//EmailJs Starts
