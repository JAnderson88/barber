class Header extends Component{
  constructor(props){
    super("header", props.parent, props.root);
    this.setInitState({
      image1: props.images.image1,
      image2: props.images.image2
    });
    this.addInnerHTML(`
      <div class="middle_section"></div>
      <div class="bottom_section"></div>
      <div class="imageContainer">
        <img src="${this.state.image1}" alt="Hero Image 1">
        <img src="${this.state.image2}" alt="Hero Image 2">
        <div class="hero_caption">
          <h5 style="color:${this.getColorScheme(5)}">THE PRE - TITLE</h5>
          <h2 style="color: white">Main Caption Header</h2>
          <p>Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus justo laoreet.</p>
        </div>
      </div>
    `);
    this.addComponent(new Titles({ parent: this.container, root: this, 
        preTitle: "THE PRE - TITLE",
        mainTitle: "Main Title Header",
        buttonContent: "See more about us",
        button: true
      })
    );
  }
}

class TopBar extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "top_bar start"
    })
    this.addElement({
      element: "div",
      attributes: [
        {type: "class", value: "logo"}
      ],
      textContent: "Logo",
      parent: this.container
    });
    this.addComponent(new Navigation({parent:this.container, root: this, links: {
      "home": "#",
      "about us": "#",
      "our services": "#",
      "newsletter": "#",
      "contact": "#"
    }}));
  }
}

class Navigation extends Component{
  constructor(props){
    super("nav", props.parent, props.root);
    this.setLinks(props.links);
    this.addElement({
      element: "button",
      textContent: "BUY NOW",
      parent: this.container
    });
  }

  setLinks(links){
    Object.keys(links).forEach((link)=>{
      this.addElement({
        element: "a",
        attributes: [
          {type: "href", value: links[link]},
        ],
        textContent: link,
        parent: this.container
      });
    });
  }
}

class Titles extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "titles"
    });
    this.addInnerHTML(`
      <h5 style="color:${this.getColorScheme(5)}"> ${props.preTitle}</h5>
      <h1 style="color: white"> ${props.mainTitle}</h1>
    `);
    if(props.button){
      this.addElement({
        element: "button",
        textContent: props.buttonContent,
        parent: this.container
      });
    }
  }
}

class OurServicesHome extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "our_services_home"
    });
    this.addComponent(new Titles(
      {
        parent: this.container, 
        root: this,
        preTitle: "Our Services",
        mainTitle: "What can we do for you?",
        buttonContent: "See our services",
        button: true
      })
    );
    this.addComponent(new TiledImages({parent: this.container, root: this, images: {
      image1: "https://via.placeholder.com/526x336",
      image2: "https://via.placeholder.com/526x336",
      image3: "https://via.placeholder.com/526x336",
    }}));
  }
}

class TiledImages extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.setInitState({
      image1: props.images.image1,
      image2: props.images.image2,
      image3: props.images.image3,
    });
    this.addAttributeToContainer(this.container, {
      class: "tiled_image"
    });
    this.addInnerHTML(`
      <img src="${this.state.image1}" alt="Tile Image 1">
      <img src="${this.state.image2}" alt="Tile Image 2">
      <img src="${this.state.image3}" alt="Tile Image 3">
    `);
    this.addComponent(new TiledCaption({parent: this.container, root: this, 
      id: "img_caption1",
      preTitle: "01",
      header: "Image Caption One",
      description: "Ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus."
    }));
    this.addComponent(new TiledCaption({parent: this.container, root: this, 
      id: "img_caption2",
      preTitle: "02",
      header: "Image Caption Two",
      description: "Ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus."
    }));
    this.addComponent(new TiledCaption({parent: this.container, root: this, 
      id: "img_caption3",
      preTitle: "03",
      header: "Image Caption Three",
      description: "Ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus."
    }));
  }
}

class TiledCaption extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "image_caption",
      id: props.id
    });
    this.addInnerHTML(`
      <h5 style="color:${this.getColorScheme(5)}"> ${props.preTitle}</h5>
      <h2 style="color: white">${props.header}</h2>
      <p>${props.description}</p>
    `);
  }
}

class AboutUsHome extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "about_us_home"
    });
    this.addComponent(new Titles({parent: this.container, root: this,
      preTitle: "What's New",
      mainTitle: "About Us",
    }));
    this.addComponent(new Sections({parent: this.container, root: this, content: 
      [
        {
          preTitle: "FUSCE UT VELIT",
          mainTitle: "Nam vel justo cursus, faucibus lorem eget, egestas eros",
          description: "Suspendisse vel facilisis odio, at ornare nibh. In malesuada, tortor eget sodales mollis"
        },
        {
          preTitle: "DUIS DIGNISSIM",
          mainTitle: "Nunc id tellus finibus, eleifend mi vel, maximus justo. Maecenas",
          description: "Phasellus vitae vulputate elit. Fusce interdum justo quis libero ultricies laoreet."
        },
        {
          preTitle: "LOREM IPSUM",
          mainTitle: "Nam vel justo cursus, faucibus lorem eget, egestas eros",
          description: "lass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos"
        }
      ]
    }));
    this.addComponent(new AboutUsButton({parent: this.container, root: this}));
  }
}

class Sections extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.setInitState({
      content: props.content
    });
    this.addAttributeToContainer(this.container, {
      class: "sections"
    });
    this.addSections();

  }

  addSections(){
    const colorScheme = this.getColorScheme(3);
    console.log(colorScheme);
    this.state.content.forEach(section => {
      this.addInnerHTML(`
        <div class="section_container">
          <h5 style="color:${colorScheme}"> ${section.preTitle} </h5>
          <h2 style="color:white"> ${section.mainTitle} </h2>
          <p style="color:${colorScheme}"> ${section.description} </p>
        </div>
      `);
    });
  }
}

class AboutUsButton extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "button_container"
    });
    this.addElement({
      element: "button",
      textContent: "read more about us",
      parent: this.container
    });
  }
}

class NewsletterHome extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
        class: "newsletter_home"
    });
    this.addInnerHTML(`
      <img src="${props.divder}" alt="Icon Divider">
    `);
    this.addComponent(new NewsletterForm({parent: this.container, root: this}));
  }
}

class NewsletterForm extends Component{
  constructor(props){
    super("div", props.parent, props.root);
    this.addAttributeToContainer(this.container, {
      class: "newsletter_container"
    });
    this.addInnerHTML(`
      <h5 style="color: ${this.getColorScheme(5)}">NEWSLETTER</h5>
      <h3 style="color: white; letter-spacing: 0.2vw; font-weight: lighter;">STAY UP TO DATE WITH US!</h3>
    `);
    this.addElement({
       element: 'input',
       attributes: [
         {type: "type", value: "text"},
         {type: 'placeholder', value: 'Your e-mail'},
       ],
       parent: this.container,
    });
    this.addElement({
       element: 'button',
       attributes: [
         {type: 'class', value: 'button_default'},
       ],
       textContent: "sign in",
       parent: this.container,
    });
  }
}

class Footer extends Component {
  constructor(props){
    super('footer', props.parent, props.root);
    this.addInnerHTML(`
      <div class="footer_content">${props.content}</div>
    `);
    this.addComponent(new SocialLinks({parent: this.container, root:this}));
  }
}

class SocialLinks extends Component {
  constructor(props){
    super('div', props.parent, props.root);
    this.addAttributeToContainer(this.container, {
       class: 'social_links'
    });
    this.addElement({
       element: 'i',
       attributes: [
         {type: 'class', value: 'fab fa-facebook-f'},
       ],
       parent: this.container,
    });
    this.addElement({
       element: 'i',
       attributes: [
         {type: 'class', value: 'fab fa-twitter'},
       ],
       parent: this.container,
    });
    this.addElement({
       element: 'i',
       attributes: [
         {type: 'class', value: 'fab fa-youtube'},
       ],
       parent: this.container,
    });
    this.addElement({
       element: 'i',
       attributes: [
         {type: 'class', value: 'fab fa-instagram'},
       ],
       parent: this.container,
    });
  }
}

class App extends Init{
  constructor(){
    super();
    this.store.setColorScheme("rgb(49, 49, 52)");
    this.store.setColorScheme("rgb(67, 67, 72)");
    this.store.setColorScheme("rgb(95, 95, 95)");
    this.store.setColorScheme("rgb(24, 24, 26)");
    this.store.setColorScheme("rgb(151, 124, 99)");
    this.addComponent(new TopBar({parent: this.container, root: this}));
    this.addComponent(new Header({parent: this.container, root: this, images: {
      image1: "https://via.placeholder.com/915x663",
      image2: "https://via.placeholder.com/356x395"
    }}));
    this.addComponent(new OurServicesHome({parent:this.container, root: this}));
    this.addComponent(new AboutUsHome({parent: this.container, root: this}));
    this.addComponent(new NewsletterHome({parent: this.container, root: this}));
    this.addComponent(new Footer({parent: this.container, root:this, 
      content: "© 2018 BeVideo 2 - BeTheme. All Rights Reserved"
    }));
    this.storeQueue(
      "about us",
      this.traveler("00:1||1||", this), this.traveler("00:",this),
      [
        new TopBar({parent: this.container, root: this}),
        new Header({parent: this.container, root: this, images: {
          image1: "https://via.placeholder.com/915x663",
          image2: "https://via.placeholder.com/356x395"
        }}),
        new Footer({parent: this.container, root:this, 
          content: "© 2018 BeVideo 2 - BeTheme. All Rights Reserved"
        })
      ]
    );
    // console.log(this.traveler("00:1||1||", this));
    this.render();
  }
}

(()=>{
  const app = new App();
  console.log(app);
})();