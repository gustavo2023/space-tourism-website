let currentTab = 0;

export function focusRovingNavigation(e) {
  const { key } = e;
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(key)) return;

  const container = e.currentTarget;
  const tabs = container.querySelectorAll('[role="tab"]');

  // Find current based on tabindex (fallback to stored currentTab)
  const idx = [...tabs].findIndex((t) => t.tabIndex === 0);
  if (idx > -1) currentTab = idx;

  tabs[currentTab].setAttribute("tabindex", -1);

  if (key === "ArrowRight") currentTab = (currentTab + 1) % tabs.length;
  if (key === "ArrowLeft")
    currentTab = (currentTab - 1 + tabs.length) % tabs.length;
  if (key === "Home") currentTab = 0;
  if (key === "End") currentTab = tabs.length - 1;

  tabs[currentTab].setAttribute("tabindex", 0);
  tabs[currentTab].focus();

  e.preventDefault();
}

export function initDestinationTabs(tabList) {
  tabList.addEventListener("click", (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) activateTab(tabList, tab);
  });

  tabList.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const tab = e.target.closest('[role="tab"]');
      if (tab) {
        e.preventDefault();
        activateTab(tabList, tab);
      }
    }
  });
}

function hideAll(root, selector) {
  root
    .querySelectorAll(selector)
    .forEach((el) => el.setAttribute("hidden", ""));
}

function show(root, selector) {
  root.querySelector(selector).removeAttribute("hidden");
}

function activateTab(tabList, tab) {
  const current = tabList.querySelector('[aria-selected="true"]');
  if (current && current !== tab)
    current.setAttribute("aria-selected", "false");
  tab.setAttribute("aria-selected", "true");

  const panelId = tab.getAttribute("aria-controls");
  const imageId = tab.getAttribute("data-image");
  const root =
    tabList.closest("[data-root]") ||
    tabList.closest("main") ||
    document;

  hideAll(root, '[role="tabpanel"]');
  show(root, `#${panelId}`);

  hideAll(root, "[data-picture]");
  show(root, `#${imageId}`);
}
