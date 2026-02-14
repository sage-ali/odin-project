(()=>{var l=class{constructor(t,e,o,s){this.id=crypto.randomUUID(),this.title=t,this.author=e,this.pages=o,this.read=s}toggleReadStatus(){this.read=!this.read}},a=class{constructor(){this.books=[]}addBook(t,e,o,s){let n=new l(t,e,o,s);return this.books.push(n),n}removeBook(t){this.books=this.books.filter(e=>e.id!==t)}getBooks(){return this.books}toggleBookStatus(t){let e=this.books.find(o=>o.id===t);e&&e.toggleReadStatus()}};var d=class{constructor(t,e){this.library=t,this.grid=document.getElementById(e)}render(){this.grid.innerHTML="",this.library.getBooks().forEach(e=>{let o=this.createBookCard(e);this.grid.appendChild(o)})}createBookCard(t){let e=document.createElement("article");e.classList.add("book-card"),e.dataset.id=t.id,e.innerHTML=`
      <div class="book-card__content">
        <h3 class="book-card__title">${t.title}</h3>
        <p class="book-card__author">by ${t.author}</p>
        <p class="book-card__pages">${t.pages} pages</p>
        <div class="book-card__status ${t.read?"book-card__status--read":""}">
          ${t.read?"Read":"Not Read"}
        </div>
      </div>
      <div class="book-card__actions">
        <button class="btn btn--toggle" aria-label="Toggle read status">
          ${t.read?"Mark Unread":"Mark Read"}
        </button>
        <button class="btn btn--danger" aria-label="Remove book">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
        </button>
      </div>
    `;let o=e.querySelector(".btn--toggle"),s=e.querySelector(".btn--danger");return o.addEventListener("click",()=>{this.library.toggleBookStatus(t.id),this.render()}),s.addEventListener("click",()=>{e.classList.add("book-card--removing"),e.addEventListener("transitionend",()=>{this.library.removeBook(t.id),this.render()},{once:!0})}),e}};var c=class{constructor(t,e,o){this.dialog=document.getElementById(t),this.openBtn=document.getElementById(e),this.cancelBtn=document.getElementById(o),this.init()}init(){this.openBtn.addEventListener("click",()=>this.open()),this.cancelBtn.addEventListener("click",()=>this.close()),this.dialog.addEventListener("click",t=>{let e=this.dialog.getBoundingClientRect();(t.clientX<e.left||t.clientX>e.right||t.clientY<e.top||t.clientY>e.bottom)&&this.close()})}open(){this.dialog.showModal()}close(){let t=this.dialog.querySelector("form");t&&t.reset(),this.dialog.close()}};var i=new a;i.addBook("The Hobbit","J.R.R. Tolkien",310,!0);i.addBook("Project Hail Mary","Andy Weir",476,!1);i.addBook("The Great Gatsby","F. Scott Fitzgerald",180,!0);document.addEventListener("DOMContentLoaded",()=>{let r=new d(i,"book-grid"),t=new c("book-dialog","add-book-btn","cancel-btn");r.render();let e=document.getElementById("book-form");e.addEventListener("submit",o=>{o.preventDefault();let s=new FormData(e),n=s.get("title"),h=s.get("author"),g=s.get("pages"),u=s.get("read")==="on";i.addBook(n,h,g,u),r.render(),t.close()})});})();
//# sourceMappingURL=bundle.js.map
