(function () {
  const root = document.querySelector("[data-sidebar]");
  if (!root) return;
  const icons = window.TTE_SIDEBAR_ICONS || {};
  const lucide = {
    check: '<path d="M20 6 9 17l-5-5"></path>',
    "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
    "chevrons-up-down": '<path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path>',
    "chevron-down": '<path d="m6 9 6 6 6-6"></path>'
  };
  const paintLucide = (icon) => {
    const markup = lucide[icon.dataset.lucide];
    if (!markup) return;
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("stroke-width", "2");
    icon.setAttribute("stroke-linecap", "round");
    icon.setAttribute("stroke-linejoin", "round");
    icon.setAttribute("focusable", "false");
    icon.innerHTML = markup;
  };
  root.querySelectorAll("[data-lucide]").forEach(paintLucide);
  document.querySelectorAll(".app-topnav [data-lucide]").forEach(paintLucide);

  const paint = (icon, src) => {
    if (icon && icons[src]) icon.innerHTML = icons[src];
  };
  const buttons = () => [...root.querySelectorAll(".tte-sidebar-menu-button, .tte-sidebar-menu-sub-button")];
  const selectItem = (item) => {
    buttons().forEach((entry) => entry.removeAttribute("aria-current"));
    item.setAttribute("aria-current", "page");
  };
  const collapseButton = root.querySelector("[data-sidebar-collapse]");
  const syncCollapse = () => {
    const collapsed = root.dataset.state === "collapsed";
    const icon = collapseButton?.querySelector(".tte-sidebar-icon");
    const label = collapseButton?.querySelector("span");
    const tip = collapseButton?.parentElement?.querySelector(".tte-sidebar-tip");
    paint(icon, collapsed ? "/assets/icons/sideber/左侧栏展开.svg" : "/assets/icons/sideber/左侧栏收起.svg");
    if (label) label.textContent = collapsed ? "展开" : "收起";
    if (tip) tip.textContent = collapsed ? "展开" : "收起";
  };
  const content = root.querySelector(".tte-sidebar-content");
  const syncNavFade = () => {
    if (!content) return;
    const hiddenAbove = content.scrollTop > 1;
    const hiddenBelow = content.scrollHeight - content.clientHeight - content.scrollTop > 1;
    const expanded = root.dataset.state !== "collapsed";
    content.classList.toggle("is-fade-top", expanded && hiddenAbove);
    content.classList.toggle("is-fade-bottom", expanded && hiddenBelow);
  };
  content?.addEventListener("scroll", syncNavFade, { passive: true });
  if (content && "ResizeObserver" in window) new ResizeObserver(syncNavFade).observe(content);
  window.addEventListener("resize", syncNavFade);
  requestAnimationFrame(syncNavFade);
  collapseButton?.addEventListener("click", () => {
    root.dataset.state = root.dataset.state === "collapsed" ? "expanded" : "collapsed";
    syncCollapse();
    closeSwitchMenu();
    requestAnimationFrame(syncNavFade);
  });
  root.querySelectorAll("[data-sidebar-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (root.dataset.state === "collapsed") return;
      const open = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(open));
      requestAnimationFrame(syncNavFade);
    });
  });
  root.querySelectorAll(".tte-sidebar-menu-button:not([data-sidebar-toggle]):not([data-sidebar-collapse]), .tte-sidebar-menu-sub-button").forEach((button) => {
    button.addEventListener("click", () => selectItem(button));
  });
  const switchButton = root.querySelector("[data-sidebar-switch]");
  const switchMenu = root.querySelector("[data-sidebar-switch-menu]");
  const closeSwitchMenu = () => {
    if (!switchMenu || !switchButton) return;
    switchMenu.hidden = true;
    switchButton.setAttribute("aria-expanded", "false");
  };
  switchButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = switchButton.getAttribute("aria-expanded") !== "true";
    switchButton.setAttribute("aria-expanded", String(open));
    switchMenu.hidden = !open;
  });
  switchMenu?.querySelectorAll("[data-sidebar-workspace]").forEach((item) => {
    item.addEventListener("click", () => {
      switchMenu.querySelectorAll("[data-sidebar-workspace]").forEach((entry) => {
        const on = entry === item;
        entry.setAttribute("aria-checked", String(on));
        entry.querySelector(".dropdown-menu-check")?.classList.toggle("is-visible", on);
      });
      root.querySelector(".is-name").textContent = item.dataset.workspaceName;
      root.querySelector(".is-en").textContent = `  ${item.dataset.workspaceEn}`;
      const markIcon = root.querySelector(".tte-sidebar-mark .tte-sidebar-icon");
      const itemIcon = item.querySelector(".tte-sidebar-icon");
      if (itemIcon && markIcon) markIcon.innerHTML = itemIcon.innerHTML;
      else paint(markIcon, item.dataset.workspaceIcon);
      closeSwitchMenu();
    });
  });
  document.addEventListener("pointerdown", (event) => {
    if (!switchButton?.contains(event.target) && !switchMenu?.contains(event.target)) closeSwitchMenu();
  });

  document.querySelectorAll(".app-topnav-links [data-top-link]").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".app-topnav-links [data-top-link]").forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "page");
    });
  });

  document.querySelectorAll("[data-nav-menu]").forEach((menu) => {
    const popup = menu.querySelector("[data-nav-popup]");
    const items = [...menu.querySelectorAll("[data-nav-item]")];
    let closeTimer = 0;
    const place = (item) => {
      const trigger = item.querySelector("[data-nav-trigger]");
      const menuBox = menu.getBoundingClientRect();
      const triggerBox = trigger.getBoundingClientRect();
      const width = popup.offsetWidth;
      const triggerCenter = triggerBox.left - menuBox.left + triggerBox.width / 2;
      const limit = Math.max(menu.clientWidth - width, 0);
      popup.style.left = `${Math.min(Math.max(triggerCenter - width / 2, 0), limit)}px`;
    };
    const close = () => {
      window.clearTimeout(closeTimer);
      items.forEach((item) => {
        item.dataset.open = "false";
        item.querySelector("[data-nav-trigger]")?.setAttribute("aria-expanded", "false");
      });
      popup.hidden = true;
      popup.querySelectorAll("[data-nav-content]").forEach((panel) => { panel.hidden = true; });
    };
    const open = (item) => {
      window.clearTimeout(closeTimer);
      items.forEach((entry) => {
        const on = entry === item;
        entry.dataset.open = String(on);
        entry.querySelector("[data-nav-trigger]")?.setAttribute("aria-expanded", String(on));
      });
      popup.querySelectorAll("[data-nav-content]").forEach((panel) => {
        panel.hidden = panel.dataset.navContent !== item.dataset.navItem;
      });
      popup.hidden = false;
      place(item);
    };
    items.forEach((item) => {
      const trigger = item.querySelector("[data-nav-trigger]");
      item.addEventListener("pointerenter", () => open(item));
      trigger.addEventListener("click", () => {
        if (item.dataset.open === "true") close();
        else open(item);
      });
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Escape") close();
      });
    });
    menu.addEventListener("pointerleave", () => {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(close, 120);
    });
    menu.addEventListener("pointerenter", () => window.clearTimeout(closeTimer));
    popup.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });
    document.addEventListener("pointerdown", (event) => {
      if (!menu.contains(event.target)) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  });
})();
