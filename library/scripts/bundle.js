(()=>{var n=class{constructor(t,e,o,r){this.id=crypto.randomUUID(),this.title=t,this.author=e,this.pages=o,this.read=r}toggleReadStatus(){this.read=!this.read}},a=class{constructor(){this.books=[]}addBook(t,e,o,r){let c=new n(t,e,o,r);return this.books.push(c),c}removeBook(t){this.books=this.books.filter(e=>e.id!==t)}getBooks(){return this.books}toggleBookStatus(t){let e=this.books.find(o=>o.id===t);e&&e.toggleReadStatus()}};var d=class{constructor(t,e){this.library=t,this.grid=document.getElementById(e)}render(){this.grid.innerHTML="",this.library.getBooks().forEach(e=>{let o=this.createBookCard(e);this.grid.appendChild(o)})}createBookCard(t){let e=document.createElement("article");e.classList.add("book-card"),e.dataset.id=t.id,e.innerHTML=`
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
    `;let o=e.querySelector(".btn--toggle"),r=e.querySelector(".btn--danger");return o.addEventListener("click",()=>{this.library.toggleBookStatus(t.id),this.render()}),r.addEventListener("click",()=>{e.classList.add("book-card--removing"),e.addEventListener("transitionend",()=>{this.library.removeBook(t.id),this.render()},{once:!0})}),e}};var i=new a;i.addBook("The Hobbit","J.R.R. Tolkien",310,!0);i.addBook("Project Hail Mary","Andy Weir",476,!1);i.addBook("The Great Gatsby","F. Scott Fitzgerald",180,!0);document.addEventListener("DOMContentLoaded",()=>{let s=document.querySelector("dialog");new d(i,"book-grid").render(),setTimeout(()=>{s.showModal()},5e3)});})();
//# sourceMappingURL=bundle.js.map
