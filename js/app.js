/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = [...document.querySelectorAll('section')];
const navList = document.getElementById('navbar__list');
const main = document.querySelector('main');
const navItems = [];
const navLinks = [];

/********************************************************************************************
// Build the navigation (START)
*********************************************************************************************/
sections.forEach(section => {
  buildNav(section);
});

function buildNav(section) {
  const listItem = document.createElement('li');
  const linkItem = document.createElement('a');
  listItem.classList.add('menu');
  listItem.setAttribute('data-nav', section.getAttribute('data-nav'));
  listItem.appendChild(linkItem);
  linkItem.textContent = section.getAttribute('data-nav');
  linkItem.href = `#${section.getAttribute('id')}`;
  navItems.push(listItem);
  navList.append(...navItems);
}
/********************************************************************************************
// Build the navigation (END)
*********************************************************************************************/

/********************************************************************************************
// Add 4 new sections (START)
*********************************************************************************************/

for (let i = 4; i <= 7; i++) {
  const section = document.createElement('section');
  section.setAttribute('id', `Section${i}`);
  section.setAttribute('data-nav', `Section ${i}`);
  section.innerHTML = `
        <div class="landing__container">
            <h2>Section ${i}</h2>
            <p>LLorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
            <p> Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
        `;

  main.appendChild(section);
  buildNav(section);
  sections.push(section);
}
/********************************************************************************************
// Add 4 new sections (END)
*********************************************************************************************/

/********************************************************************************************
// Add class 'active' to section when near top of viewport (START)
*********************************************************************************************/

// Define a function to check if a section is in the viewport
const isSectionInViewport = section => {
  const rect = section.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Define a function to add a class to a section if it is in the viewport
const addActiveClassToSection = section => {
  if (isSectionInViewport(section)) {
    section.classList.add('your-active-class');
    navItems.forEach(item => {
      if (item.getAttribute('data-nav') === section.getAttribute('data-nav')) {
        item.classList.add('active');
        item.style.border = '1px solid #111b32';
      }
    });
  } else {
    section.classList.remove('your-active-class');
    navItems.forEach(item => {
      if (item.getAttribute('data-nav') === section.getAttribute('data-nav')) {
        item.classList.remove('active');
        item.style = '#de9d17';
      }
    });
  }
};

// Add an event listener to the window object to check if a section is in the viewport
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    addActiveClassToSection(section);
  });
});

/********************************************************************************************
// Add class 'active' to section when near top of viewport (END)
*********************************************************************************************/
