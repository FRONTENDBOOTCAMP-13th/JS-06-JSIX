const HISTORY_KEY = 'menuHistory';

function getMenuHistory(): string[] {
  const raw = localStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function updateMenuHistory(newMenu: string): void {
  const history = getMenuHistory();

  const filtered = history.filter(item => item !== newMenu);

  filtered.unshift(newMenu);

  const updated = filtered.slice(0, 5);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

  renderHistory(updated);
}

function renderHistory(history: string[] = getMenuHistory()) {
  const container = document.getElementById('menu-history');
  if (!container) return;

  container.innerHTML = '<h3>최근 선택된 메뉴</h3>';
  const ul = document.createElement('ul');

  history.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}
