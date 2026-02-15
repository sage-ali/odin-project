(()=>{var g=class{constructor(e,t,o,a){this.id=crypto.randomUUID(),this.title=e,this.author=t,this.pages=o,this.read=a}toggleReadStatus(){this.read=!this.read}},c=class{constructor(){this.books=[]}addBook(e,t,o,a){let s=new g(e,t,o,a);return this.books.push(s),s}removeBook(e){this.books=this.books.filter(t=>t.id!==e)}getBooks(){return this.books}toggleBookStatus(e){let t=this.books.find(o=>o.id===e);return t&&t.toggleReadStatus(),t}};var l=class{constructor(e,t){this.library=e,this.grid=document.getElementById(t)}render(){this.grid.innerHTML="",this.library.getBooks().forEach(t=>{let o=this.createBookCard(t);this.grid.appendChild(o)})}addBookToUI(e){let t=this.createBookCard(e);t.classList.add("book-card--adding"),this.grid.appendChild(t),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.classList.remove("book-card--adding")})})}createBookCard(e){let t=document.createElement("article");t.classList.add("book-card"),t.dataset.id=e.id,t.innerHTML=`
      <div class="book-card__content">
        <h3 class="book-card__title">${e.title}</h3>
        <p class="book-card__author">by ${e.author}</p>
        <p class="book-card__pages">${e.pages} pages</p>
        <div class="book-card__status ${e.read?"book-card__status--read":""}">
          ${e.read?"Read":"Not Read"}
        </div>
      </div>
      <div class="book-card__actions">
        <button class="btn btn--toggle" aria-label="Toggle read status">
          ${e.read?"Mark Unread":"Mark Read"}
        </button>
        <button class="btn btn--danger" aria-label="Remove book">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    `;let o=t.querySelector(".btn--toggle"),a=t.querySelector(".btn--danger");return o.addEventListener("click",()=>{let s=this.library.toggleBookStatus(e.id),r=t.querySelector(".book-card__status");r.classList.toggle("book-card__status--read",s.read),r.textContent=s.read?"Read":"Not Read",o.textContent=s.read?"Mark Unread":"Mark Read"}),a.addEventListener("click",()=>{{let s=()=>{this.library.removeBook(e.id),t.remove()};t.classList.add("book-card--removing"),t.replaceChildren();let r=!1,d=()=>{r||(r=!0,s())};t.addEventListener("transitionend",d,{once:!0}),setTimeout(d,600)}}),t}};var h=class{constructor(e,t,o){this.dialog=document.getElementById(e),this.openBtn=document.getElementById(t),this.cancelBtn=document.getElementById(o),this.init()}init(){this.openBtn.addEventListener("click",()=>this.open()),this.cancelBtn.addEventListener("click",()=>this.close()),this.dialog.addEventListener("click",e=>{let t=this.dialog.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this.close()})}open(){this.dialog.showModal()}close(){let e=this.dialog.querySelector("form");e&&e.reset(),this.dialog.close()}};var n=new c;n.addBook("The Hobbit","J.R.R. Tolkien",310,!0);n.addBook("Project Hail Mary","Andy Weir",476,!1);n.addBook("The Great Gatsby","F. Scott Fitzgerald",180,!0);document.addEventListener("DOMContentLoaded",()=>{let i=new l(n,"book-grid"),e=new h("book-dialog","add-book-btn","cancel-btn");i.render();let t=document.getElementById("book-form");t.addEventListener("submit",o=>{o.preventDefault();let a=new FormData(t),s=a.get("title"),r=a.get("author"),d=a.get("pages"),u=a.get("read")==="on";e.close(),i.addBookToUI(n.addBook(s,r,d,u))})});})();
//# sourceMappingURL=bundle.js.map
