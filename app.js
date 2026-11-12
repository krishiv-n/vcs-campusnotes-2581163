const KEY = "campusnotes";
const load = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const save = (notes) => localStorage.setItem(KEY, JSON.stringify(notes));

// Build one <li> for a note (text set safely with textContent)
function createNoteItem(n) {
  const li = document.createElement("li");
  li.innerHTML = `<strong></strong><p></p><button class="del">Delete</button>`;
  li.querySelector("strong").textContent = n.title;
  li.querySelector("p").textContent = n.body;
  return li;
}

function render() {
  const list = document.getElementById("notes");
  list.replaceChildren(...load().map(createNoteItem));
  const n = list.children.length;
  document.getElementById("count").textContent = n + (n === 1 ? " note" : " notes") + " saved";
}
document.getElementById("note-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const notes = load();
  const t = title.value.trim(), b = body.value.trim();
  if (!t || !b) return; // ignore whitespace-only notes
  notes.push({ title: t, body: b, created: Date.now() });
  save(notes);
  e.target.reset();
  render();
});

render();

// Delete a note when its Delete button is clicked
document.getElementById("notes").addEventListener("click", (e) => {
  if (!e.target.classList.contains("del")) return;
  const index = [...e.target.closest("ul").children].indexOf(e.target.closest("li"));
  const notes = load();
  notes.splice(index, 1);
  save(notes);
  render();
});
