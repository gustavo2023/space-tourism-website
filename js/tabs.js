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
