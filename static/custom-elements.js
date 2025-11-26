
class TopNavMenu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <style>
        .navbar {
          position: fixed;
          padding: 0;
          border: 0;
          margin: 0 auto;
          right: 0;
          top: 0;
        }

        .profileIcon {
          position: fixed;
          padding: 15px;
          right: 0;
          top: 10px;
          width: 90px;
        }
        
        .profileIconImg {
          width: 90px;
        }

        @media (max-width: 400px) {
          .profileBg {
            width: 125px;
            height: 125px;
          }
          .profileIcon {
            top: 0px;
            padding-top: 10px;
            right: 0px;
            width: 80px
  }

          .profileIconImg {
            width: 80px;
          }
        }
      </style>

      <nav class="navbar">
      <svg width="150", height="150", viewBox="0 0 300 300" class="profileBg">
        <circle cx="300" cy="0" r="300" fill=var(--primary-colour) stroke="#f0efeb" stroke-width="4px"/>
      </svg>
        <a class="profileIcon" href="https://youtu.be/xvFZjo5PgG0?si=d6PDdRvOjNV9n4iF">
          <img class="profileIconImg" src="/static/assets/profile.svg" alt="Profile Icon" style="">
        </a>
      </nav>
    `;

    shadow.appendChild(wrapper);
  }
}

customElements.define('top-nav-menu', TopNavMenu);

class bottomNavMenu extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
        <style>
          .btmNav {
              background-color: #E2C290;
              position: fixed;
              display: flex;
              padding-top: 10px;
              padding-bottom: 10px;
              border: 0;
              margin: 0 auto;
              left: 0;
              bottom: 0;
              width: 100vw;
              justify-content: space-evenly;
              z-index: 1000;
              border-top: 2px solid #f0efeb;           
            }

            .spaceMeEvenly {
              flex: 1;
              display: flex;
              justify-content: space-evenly;
              color: #007ea7;
              align-items: center;
            }

            .btmNav img {
              height: 80px;
              justify-content: center;
              align-items: center;
            }

            @media (max-width: 500px) {
              .btmNav button {
                width: 80px;
                height: 80px;
              }
              
              .btmNav img {
                width: 60px;
                height: 60px;
              }
            }

            @media (max-width: 400px) {
              .btmNav button {
                width: 60px;
                height: 60px;
              }
              
              .btmNav img {
                width: 40px;
                height: 60px;
              }
            }
        </style>

        <nav class="btmNav">
            <div class="spaceMeEvenly">
                <button href="/"><img src="/static/assets/home.svg" alt="home button"></img></button>
                <button><img src="/static/assets/food-menu.svg" alt="food menu button"></img></button>
                <button><img src="/static/assets/notification.svg" alt="notification or past orders button"></img></button>
                <button><img src="static/assets/profile.svg" alt="..."></img></button>
            </div>
        </nav>
        `;
        shadow.appendChild(wrapper);
    }
}

customElements.define('bottom-nav-menu', bottomNavMenu);