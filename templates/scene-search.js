(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const trees = ["主树", "功能安全场景树", "大众项目场景树", "五菱项目场景树", "旗舰版平台树", "领先版平台树", "问题排查树"];
  const catalogs = {
    journey: [
      { id: "all", label: "所有内容" },
      { id: "safety", label: "安全接管", children: [
        { id: "brake", label: "跟车刹不住" },
        { id: "dodge", label: "危险绕行" },
        { id: "squeeze", label: "侧向挤压" }
      ] },
      { id: "violation", label: "违规接管", children: [
        { id: "red", label: "红灯越线" },
        { id: "line", label: "压实线变道" }
      ] },
      { id: "pilot", label: "领航接管", children: [
        { id: "merge", label: "匝道汇入" },
        { id: "nav", label: "导航变道" }
      ] },
      { id: "efficiency", label: "效率接管", children: [
        { id: "cutin", label: "强切入" },
        { id: "slow", label: "慢车绕行" },
        { id: "game", label: "路口博弈" }
      ] },
      { id: "comfort", label: "体验毛刺接管", children: [
        { id: "accel", label: "急加减速" },
        { id: "yaw", label: "横摆波动" }
      ] }
    ],
    road: [
      { id: "all", label: "所有内容" },
      { id: "highway", label: "高速" },
      { id: "urban", label: "城市路口" },
      { id: "ramp", label: "匝道" },
      { id: "express", label: "快速路" }
    ],
    drive: [
      { id: "all", label: "所有内容" },
      { id: "follow", label: "跟车" },
      { id: "lane", label: "变道" },
      { id: "join", label: "汇入" },
      { id: "rush", label: "抢行" }
    ]
  };
  const clips = [
    { id: "4qTGDWVU68", title: "雨夜高速 · 车辆突然强切入", origin: "量产回传", tags: ["雨夜", "高速", "强切入", "机动车"], view: "前视广角", time: "2026-08-07 12:08:49", city: "北京", camera: "CAM_FRONT", duration: 23, speed: 80, similarity: 92, direction: "front", sourceKind: "real", focus: ["领航-匝道口导航变道晚(江铃Demo问题)"], biz: ["Driving场景标签"], nodes: { journey: ["all", "efficiency", "cutin"], road: ["all", "highway"], drive: ["all", "lane"] } },
    { id: "ouziajmkc4", title: "傍晚快速路 · 相邻车道压线切入", origin: "路测车", tags: ["傍晚", "快速路", "压线", "近距离"], view: "前视窄角", time: "2026-08-07 12:05:42", city: "杭州", camera: "CAM_FRONT", duration: 12, speed: 60, similarity: 84, direction: "front", sourceKind: "real", focus: ["安全类-跟车刹不住"], biz: ["行车性能指标标签 (三期)"], nodes: { journey: ["all", "safety", "brake"], road: ["all", "express"], drive: ["all", "follow"] } },
    { id: "ozneikesSN", title: "匝道汇入 · 大车遮挡后切入", origin: "量产回传", tags: ["匝道", "汇入", "大车遮挡", "重交通"], view: "环视", time: "2026-08-07 11:05:51", city: "深圳", camera: "CAM_360", duration: 31, speed: 40, similarity: 77, direction: "left", sourceKind: "real", focus: ["领航-路口前导航变道晚(北汽Demo专项)"], biz: ["Driving场景标签"], nodes: { journey: ["all", "pilot", "merge"], road: ["all", "ramp"], drive: ["all", "join"] } },
    { id: "NnkSkEEPoV", title: "城市路口 · 两轮车连续抢行", origin: "量产回传", tags: ["城市路口", "两轮车", "抢行", "早高峰"], view: "前视广角", time: "2026-08-07 11:04:44", city: "成都", camera: "CAM_FRONT", duration: 27, speed: 20, similarity: 88, direction: "front", sourceKind: "real", focus: ["安全-无保护右转 (测试)"], biz: ["Driving场景标签"], nodes: { journey: ["all", "efficiency", "game"], road: ["all", "urban"], drive: ["all", "rush"] } },
    { id: "sim-a91k", title: "仿真 · 危险绕行失败", origin: "仿真合成", tags: ["仿真", "绕行", "危险"], view: "前视广角", time: "2026-08-06 18:12:03", city: "上海", camera: "CAM_FRONT", duration: 18, speed: 50, similarity: 69, direction: "right", sourceKind: "sim", focus: ["安全-无保护左转(测试)"], biz: ["泊车场景标签"], nodes: { journey: ["all", "safety", "dodge"], road: ["all", "urban"], drive: ["all", "lane"] } },
    { id: "sim-b22m", title: "仿真 · 红灯越线", origin: "仿真合成", tags: ["仿真", "红灯", "越线"], view: "前视窄角", time: "2026-08-06 16:40:11", city: "武汉", camera: "CAM_FRONT", duration: 9, speed: 15, similarity: 61, direction: "front", sourceKind: "sim", focus: [], biz: ["行车性能指标标签 (三期)"], nodes: { journey: ["all", "violation", "red"], road: ["all", "urban"], drive: ["all", "follow"] } },
    { id: "yaw-17c", title: "体验毛刺 · 横摆波动", origin: "路测车", tags: ["横摆", "波动", "体验"], view: "后视", time: "2026-08-05 09:22:18", city: "广州", camera: "CAM_BACK", duration: 14, speed: 70, similarity: 73, direction: "back", sourceKind: "real", focus: ["领航-匝道口导航变道晚(江铃Demo问题)"], biz: ["行车性能指标标签 (三期)"], nodes: { journey: ["all", "comfort", "yaw"], road: ["all", "highway"], drive: ["all", "follow"] } },
    { id: "slow-03q", title: "慢车绕行 · 实线旁借道", origin: "量产回传", tags: ["慢车", "绕行", "实线"], view: "左视", time: "2026-08-05 08:16:40", city: "南京", camera: "CAM_LEFT", duration: 21, speed: 35, similarity: 81, direction: "left", sourceKind: "real", focus: ["安全类-跟车刹不住"], biz: ["泊车场景标签"], nodes: { journey: ["all", "efficiency", "slow", "violation", "line"], road: ["all", "express"], drive: ["all", "lane"] } }
  ];
  const columns = [
    ["id", "原始资产 ID"],
    ["desc", "场景描述"],
    ["source", "数据来源"],
    ["tags", "标签"],
    ["view", "视角"],
    ["time", "创建时间"]
  ];
  const state = {
    tree: "主树",
    dimension: "journey",
    source: "real",
    node: "all",
    treeQuery: "",
    open: new Set(["safety", "violation", "pilot", "efficiency", "comfort"]),
    mode: "classic",
    query: "",
    aiQuery: "",
    aiApplied: "",
    aiView: "all",
    similarity: 50,
    speed: 0,
    duration: 0,
    view: "table",
    page: 1,
    pageSize: 4,
    selected: new Set(),
    focus: ["领航-匝道口导航变道晚(江铃Demo问题)", "领航-路口前导航变道晚(北汽Demo专项)", "安全类-跟车刹不住", "安全-无保护右转 (测试)", "安全-无保护左转(测试)"].map((label) => ({ label, on: false })),
    business: ["Driving场景标签", "行车性能指标标签 (三期)", "泊车场景标签"].map((label) => ({ label, on: false })),
    saved: [],
    conditions: [],
    columns: { id: true, desc: true, source: true, tags: true, view: true, time: true },
    focusOpen: false,
    filterField: "source",
    filterOp: "contains",
    detailId: null,
    lastTrigger: null
  };

  function descendants(id) {
    const ids = new Set();
    const walk = (nodes, take) => nodes.forEach((node) => {
      const hit = take || node.id === id;
      if (hit) ids.add(node.id);
      if (node.children) walk(node.children, hit);
    });
    walk(catalogs[state.dimension], false);
    return ids;
  }

  function activeConditions() {
    const enabled = new Set(state.saved.filter((item) => item.on).map((item) => item.conditionId));
    return state.conditions.filter((item) => !state.saved.some((saved) => saved.conditionId === item.id) || enabled.has(item.id));
  }

  function matchOp(value, op, expected) {
    const left = String(value).toLowerCase();
    const right = expected.toLowerCase();
    if (op === "equals") return left === right;
    if (op === "prefix") return left.startsWith(right);
    return left.includes(right);
  }

  function filtered() {
    const keyword = (state.mode === "ai" ? state.aiApplied : state.query).trim().toLowerCase();
    const focusOn = state.focus.filter((item) => item.on).map((item) => item.label);
    const bizOn = state.business.filter((item) => item.on).map((item) => item.label);
    const ids = descendants(state.node);
    return clips.filter((clip) => {
      if (clip.sourceKind !== state.source) return false;
      if (state.node !== "all" && !clip.nodes[state.dimension].some((id) => ids.has(id))) return false;
      if (keyword && !`${clip.id} ${clip.title} ${clip.tags.join(" ")}`.toLowerCase().includes(keyword)) return false;
      if (state.mode === "ai" && state.aiView !== "all" && clip.direction !== state.aiView) return false;
      if (state.mode === "ai" && clip.similarity < Number(state.similarity)) return false;
      if (state.mode === "ai" && clip.speed < Number(state.speed)) return false;
      if (state.mode === "ai" && clip.duration < Number(state.duration)) return false;
      if (focusOn.length && !focusOn.some((label) => clip.focus.includes(label))) return false;
      if (bizOn.length && !bizOn.some((label) => clip.biz.includes(label))) return false;
      return activeConditions().every((item) => {
        const value = item.field === "id" ? clip.id : item.field === "time" ? clip.time : clip.origin;
        return matchOp(value, item.op, item.value);
      });
    });
  }

  function countFor(id) {
    const previous = state.node;
    state.node = id;
    const total = filtered().length;
    state.node = previous;
    return total;
  }

  function resetPage() {
    state.page = 1;
    state.selected.clear();
  }

  function tagButton(item, group) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tte-tag gray is-selectable";
    button.setAttribute("aria-pressed", String(item.on));
    button.textContent = item.label;
    button.addEventListener("click", () => {
      item.on = !item.on;
      resetPage();
      render();
    });
    if (group === "saved") {
      const close = document.createElement("span");
      close.className = "tte-tag-close";
      close.setAttribute("aria-label", `移除${item.label}`);
      close.textContent = "×";
      close.addEventListener("click", (event) => {
        event.stopPropagation();
        state.saved = state.saved.filter((entry) => entry !== item);
        state.conditions = state.conditions.filter((entry) => entry.id !== item.conditionId);
        resetPage();
        render();
      });
      button.append(close);
    }
    return button;
  }

  function renderGroups() {
    const root = $("[data-groups]");
    root.replaceChildren();
    const groups = [
      ["常用筛选", state.saved, "saved", false],
      ["重点场景", state.focus, "focus", true],
      ["业务标签", state.business, "business", false]
    ];
    groups.forEach(([label, items, key, collapsible]) => {
      const row = document.createElement("div");
      row.className = "scene-group-head";
      const name = document.createElement("span");
      name.className = "scene-group-label";
      name.textContent = label;
      const tags = document.createElement("div");
      tags.className = "scene-group-tags";
      const visible = collapsible && !state.focusOpen ? items.slice(0, 4) : items;
      if (!items.length && key === "saved") {
        const hint = document.createElement("span");
        hint.className = "scene-foot";
        hint.textContent = "在「更多筛选」组合条件后可存为常用";
        tags.append(hint);
      }
      visible.forEach((item) => tags.append(tagButton(item, key)));
      if (collapsible && items.length > 4) {
        const more = document.createElement("button");
        more.type = "button";
        more.className = "tte-button tte-button-text tte-button-sm";
        more.textContent = state.focusOpen ? "收起" : `展开 · ${items.length - 4}`;
        more.addEventListener("click", () => { state.focusOpen = !state.focusOpen; render(); });
        tags.append(more);
      }
      row.append(name, tags);
      root.append(row);
    });
    const active = [
      ...state.focus.filter((item) => item.on),
      ...state.business.filter((item) => item.on),
      ...state.saved.filter((item) => item.on),
      ...state.conditions
    ];
    $("[data-foot]").textContent = active.length
      ? `已启用 ${active.length} 个筛选`
      : "未添加筛选条件 · 点上方标签或业务标签开始筛选";
  }

  function renderTree() {
    const list = $("[data-tree-list]");
    list.replaceChildren();
    const query = state.treeQuery.trim();
    const paint = (node, child) => {
      const kids = node.children || [];
      const selfMatch = !query || node.label.includes(query);
      const childMatch = kids.some((item) => item.label.includes(query));
      if (!selfMatch && !childMatch) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = child ? "scene-node-child" : "scene-node";
      if (state.node === node.id) button.setAttribute("aria-current", "true");
      if (kids.length) {
        const caret = document.createElement("span");
        caret.className = "scene-node-caret";
        caret.textContent = state.open.has(node.id) ? "▾" : "›";
        caret.addEventListener("click", (event) => {
          event.stopPropagation();
          if (state.open.has(node.id)) state.open.delete(node.id);
          else state.open.add(node.id);
          renderTree();
        });
        button.append(caret);
      }
      const label = document.createElement("span");
      label.className = "scene-node-label";
      label.textContent = node.label;
      const count = document.createElement("span");
      count.className = "scene-node-count";
      count.textContent = countFor(node.id).toLocaleString("zh-CN");
      button.append(label, count);
      button.addEventListener("click", () => { state.node = node.id; resetPage(); render(); });
      list.append(button);
      if (kids.length && (state.open.has(node.id) || query)) kids.forEach((item) => paint(item, true));
    };
    catalogs[state.dimension].forEach((node) => paint(node, false));
  }

  function clipActions(clip) {
    const wrap = document.createElement("div");
    wrap.className = "tte-table-actions";
    [["预览", () => openPreview(clip)], ["详情", () => openDetail(clip)], ["下载", () => notify(`已开始下载 ${clip.id}`)]].forEach(([label, action]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tte-button tte-button-link tte-button-sm";
      button.textContent = label;
      button.addEventListener("click", action);
      wrap.append(button);
    });
    return wrap;
  }

  function checkbox(checked, label, onChange) {
    const field = document.createElement("label");
    field.className = "tte-checkbox";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = checked;
    input.setAttribute("aria-label", label);
    input.addEventListener("change", () => onChange(input.checked, input));
    const box = document.createElement("span");
    box.className = "checkbox-box";
    box.setAttribute("aria-hidden", "true");
    field.append(input, box);
    return field;
  }

  function renderTable(rows) {
    const host = $("[data-result-table]");
    host.hidden = state.view !== "table";
    if (host.hidden) return;
    const scroll = document.createElement("div");
    scroll.className = "tte-table-scroll";
    const table = document.createElement("table");
    table.className = "tte-table";
    const caption = document.createElement("caption");
    caption.className = "tte-table-note";
    caption.textContent = "场景片段";
    const head = document.createElement("tr");
    const checkAll = document.createElement("th");
    checkAll.className = "is-check";
    checkAll.scope = "col";
    const pageIds = rows.map((clip) => clip.id);
    const selectedOnPage = pageIds.filter((id) => state.selected.has(id)).length;
    const all = checkbox(selectedOnPage === pageIds.length && pageIds.length > 0, "全选本页", (checked) => {
      pageIds.forEach((id) => { if (checked) state.selected.add(id); else state.selected.delete(id); });
      renderResults();
    });
    all.querySelector("input").indeterminate = selectedOnPage > 0 && selectedOnPage < pageIds.length;
    checkAll.append(all);
    head.append(checkAll);
    columns.forEach(([key, label]) => {
      if (!state.columns[key]) return;
      const cell = document.createElement("th");
      cell.scope = "col";
      cell.textContent = label;
      head.append(cell);
    });
    const actionHead = document.createElement("th");
    actionHead.scope = "col";
    actionHead.textContent = "操作";
    head.append(actionHead);
    const thead = document.createElement("thead");
    thead.append(head);
    const tbody = document.createElement("tbody");
    rows.forEach((clip) => {
      const row = document.createElement("tr");
      const check = document.createElement("td");
      check.className = "is-check";
      check.append(checkbox(state.selected.has(clip.id), clip.id, (checked) => {
        if (checked) state.selected.add(clip.id); else state.selected.delete(clip.id);
        renderResults();
      }));
      row.append(check);
      const cells = { id: clip.id, desc: clip.title, source: clip.origin, tags: clip.tags, view: clip.view, time: clip.time };
      columns.forEach(([key]) => {
        if (!state.columns[key]) return;
        const cell = document.createElement("td");
        if (key === "id" || key === "time") cell.className = "is-num";
        if (key === "desc") cell.className = "is-ellipsis";
        if (key === "tags") {
          const tags = document.createElement("span");
          tags.className = "tte-table-tags";
          clip.tags.slice(0, 3).forEach((tag) => {
            const item = document.createElement("span");
            item.className = "tte-tag gray";
            item.textContent = tag;
            tags.append(item);
          });
          cell.append(tags);
        } else cell.textContent = cells[key];
        row.append(cell);
      });
      const actions = document.createElement("td");
      actions.append(clipActions(clip));
      row.append(actions);
      tbody.append(row);
    });
    table.append(caption, thead, tbody);
    scroll.append(table);
    host.replaceChildren(scroll);
  }

  function renderCards(rows) {
    const host = $("[data-result-cards]");
    host.hidden = state.view !== "card";
    if (host.hidden) return;
    host.replaceChildren();
    rows.forEach((clip) => {
      const card = document.createElement("article");
      card.className = "scene-card";
      const top = document.createElement("div");
      top.className = "scene-card-top";
      top.append(checkbox(state.selected.has(clip.id), clip.id, (checked) => {
        if (checked) state.selected.add(clip.id); else state.selected.delete(clip.id);
        renderResults();
      }));
      const camera = document.createElement("span");
      camera.textContent = `${clip.camera} · ${clip.duration}s`;
      top.append(camera);
      const title = document.createElement("h3");
      title.textContent = clip.title;
      const id = document.createElement("p");
      id.textContent = clip.id;
      const tags = document.createElement("div");
      tags.className = "scene-card-tags";
      clip.tags.slice(0, 3).forEach((tag) => {
        const item = document.createElement("span");
        item.className = "tte-tag gray";
        item.textContent = tag;
        tags.append(item);
      });
      const meta = document.createElement("div");
      meta.className = "scene-card-meta";
      const place = document.createElement("span");
      place.textContent = `${clip.city} · ${clip.origin}`;
      meta.append(place, clipActions(clip));
      card.append(top, title, id, tags, meta);
      host.append(card);
    });
  }

  function renderInsight(rows) {
    const host = $("[data-result-insight]");
    host.hidden = state.view !== "insight";
    if (host.hidden) return;
    const cities = new Map();
    rows.forEach((clip) => cities.set(clip.city, (cities.get(clip.city) || 0) + 1));
    const ranked = [...cities.entries()].sort((a, b) => b[1] - a[1]);
    const max = ranked[0] ? ranked[0][1] : 1;
    host.replaceChildren();
    const metrics = document.createElement("div");
    metrics.className = "scene-metrics";
    [
      ["Case 总数", rows.length],
      ["涉及城市", cities.size],
      ["命中重点场景", rows.filter((clip) => clip.focus.length).length],
      ["当前相似度阈值", `${state.similarity}%`]
    ].forEach(([label, value]) => {
      const card = document.createElement("div");
      card.className = "scene-metric";
      const name = document.createElement("span");
      name.textContent = label;
      const strong = document.createElement("strong");
      strong.textContent = String(value);
      card.append(name, strong);
      metrics.append(card);
    });
    const rank = document.createElement("div");
    rank.className = "scene-rank";
    const title = document.createElement("h3");
    title.textContent = "热点城市";
    rank.append(title);
    ranked.forEach(([city, count], index) => {
      const row = document.createElement("div");
      row.className = "scene-rank-row";
      const order = document.createElement("span");
      order.textContent = String(index + 1);
      const name = document.createElement("span");
      name.textContent = city;
      const bar = document.createElement("div");
      bar.className = "scene-rank-bar";
      const fill = document.createElement("span");
      fill.style.width = `${Math.round(count / max * 100)}%`;
      bar.append(fill);
      const total = document.createElement("span");
      total.textContent = String(count);
      row.append(order, name, bar, total);
      rank.append(row);
    });
    host.append(metrics, rank);
  }

  function renderPager(total) {
    const nav = $("[data-result-pager]");
    const pages = Math.max(1, Math.ceil(total / state.pageSize));
    nav.hidden = state.view === "insight" || total === 0;
    if (nav.hidden) return;
    nav.replaceChildren();
    const summary = document.createElement("span");
    summary.className = "tte-page-total";
    summary.textContent = `共 ${total} 条`;
    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "tte-page";
    previous.textContent = "上一页";
    previous.disabled = state.page === 1;
    previous.addEventListener("click", () => { state.page -= 1; renderResults(); });
    nav.append(summary, previous);
    for (let page = 1; page <= pages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tte-page";
      button.textContent = String(page);
      if (page === state.page) button.setAttribute("aria-current", "page");
      button.addEventListener("click", () => { state.page = page; renderResults(); });
      nav.append(button);
    }
    const next = document.createElement("button");
    next.type = "button";
    next.className = "tte-page";
    next.textContent = "下一页";
    next.disabled = state.page === pages;
    next.addEventListener("click", () => { state.page += 1; renderResults(); });
    nav.append(next);
  }

  function renderResults() {
    const rows = filtered();
    const pages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    if (state.page > pages) state.page = pages;
    const start = (state.page - 1) * state.pageSize;
    const pageRows = state.view === "insight" ? rows : rows.slice(start, start + state.pageSize);
    const empty = $("[data-result-empty]");
    empty.hidden = rows.length > 0;
    $("[data-result-table]").hidden = rows.length === 0 || state.view !== "table";
    $("[data-result-cards]").hidden = rows.length === 0 || state.view !== "card";
    $("[data-result-insight]").hidden = rows.length === 0 || state.view !== "insight";
    if (!rows.length) {
      empty.replaceChildren();
      const box = document.createElement("div");
      box.className = "tte-empty";
      box.innerHTML = '<div class="tte-empty-header"><img class="tte-empty-art" src="../assets/empty/empty-search.svg" alt="" width="80" height="80"><h3 class="tte-empty-title">没有匹配的片段</h3><p class="tte-empty-description">换一个场景节点，或清空搜索和筛选后再试。</p></div>';
      const content = document.createElement("div");
      content.className = "tte-empty-content";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tte-button tte-button-secondary tte-button-md";
      button.textContent = "清空筛选";
      button.addEventListener("click", () => {
        state.query = "";
        state.aiQuery = "";
        state.aiApplied = "";
        state.node = "all";
        state.conditions = [];
        state.focus.forEach((item) => { item.on = false; });
        state.business.forEach((item) => { item.on = false; });
        state.saved.forEach((item) => { item.on = false; });
        $("[data-query]").value = "";
        $("[data-ai-query]").value = "";
        resetPage();
        render();
      });
      content.append(button);
      box.append(content);
      empty.append(box);
    } else {
      renderTable(pageRows);
      renderCards(pageRows);
      renderInsight(pageRows);
    }
    renderPager(rows.length);
    const batch = $("[data-batch-bar]");
    batch.hidden = state.selected.size === 0 || state.view === "insight";
    $("[data-batch-count]").textContent = `已选择 ${state.selected.size} 条`;
  }

  function renderChips() {
    const host = $("[data-tree-chips]");
    host.replaceChildren();
    trees.forEach((name) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tte-tag gray is-selectable";
      button.setAttribute("aria-pressed", String(state.tree === name));
      button.textContent = name;
      button.addEventListener("click", () => { state.tree = name; renderChrome(); });
      host.append(button);
    });
    const picker = $("[data-tree-picker]");
    picker.replaceChildren();
    trees.forEach((name) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tte-select-option";
      button.setAttribute("aria-selected", String(state.tree === name));
      button.textContent = name;
      button.addEventListener("click", () => { state.tree = name; closeOverlay(); renderChrome(); });
      picker.append(button);
    });
    $("[data-current-tree]").textContent = state.tree;
  }

  function renderColumns() {
    const menu = $("[data-columns-menu]");
    menu.replaceChildren();
    columns.forEach(([key, label]) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "dropdown-menu-item";
      item.setAttribute("role", "menuitemcheckbox");
      item.setAttribute("aria-checked", String(state.columns[key]));
      item.textContent = label;
      item.addEventListener("click", () => {
        state.columns[key] = !state.columns[key];
        renderColumns();
        renderResults();
      });
      menu.append(item);
    });
  }

  function renderChrome() {
    renderChips();
    renderGroups();
    renderTree();
  }

  function render() {
    renderChrome();
    renderResults();
  }

  function notify(text) {
    const viewport = $("[data-messages]");
    const message = document.createElement("div");
    message.className = "tte-message is-success";
    message.setAttribute("role", "status");
    const body = document.createElement("p");
    body.className = "tte-message-text";
    body.textContent = text;
    message.append(body);
    viewport.append(message);
    window.setTimeout(() => message.remove(), 3000);
  }

  function openOverlay(id, trigger) {
    state.lastTrigger = trigger || document.activeElement;
    const overlay = document.getElementById(id);
    overlay.hidden = false;
    overlay.querySelector("[role='dialog'], [role='alertdialog']")?.focus();
  }

  function closeOverlay() {
    document.querySelectorAll("[data-popup], [data-drawer]").forEach((item) => { item.hidden = true; });
    state.lastTrigger?.focus();
  }

  function openPreview(clip) {
    $("[data-preview-copy]").textContent = `${clip.title}。资产 ${clip.id}，${clip.origin}，${clip.view}，${clip.time}。`;
    openOverlay("popup-preview");
  }

  function openDetail(clip) {
    state.detailId = clip.id;
    const list = document.createElement("dl");
    [["原始资产 ID", clip.id], ["场景描述", clip.title], ["数据来源", clip.origin], ["标签", clip.tags.join("、")], ["视角", clip.view], ["创建时间", clip.time], ["城市", clip.city]].forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "scene-detail-row";
      const term = document.createElement("dt");
      term.textContent = label;
      const detail = document.createElement("dd");
      detail.textContent = value;
      row.append(term, detail);
      list.append(row);
    });
    $("[data-detail]").replaceChildren(list);
    openOverlay("drawer-detail");
  }

  function fieldValue() {
    const input = $("[data-filter-value]");
    const error = $("[data-filter-error]");
    const value = input.value.trim();
    error.hidden = Boolean(value);
    return value;
  }

  document.addEventListener("click", (event) => {
    const popup = event.target.closest("[data-popup-open]");
    if (popup) openOverlay(`popup-${popup.dataset.popupOpen}`, popup);
    if (event.target.closest("[data-popup-close], [data-drawer-close]")) closeOverlay();
    if (!event.target.closest("[data-select]")) {
      document.querySelectorAll("[data-select]").forEach((item) => {
        item.removeAttribute("data-open");
        item.querySelector("[data-select-trigger]")?.setAttribute("aria-expanded", "false");
        const menu = item.querySelector("[data-select-menu]");
        if (menu) menu.hidden = true;
      });
    }
    if (!event.target.closest(".scene-column-wrap")) $("[data-columns-menu]").hidden = true;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeOverlay();
  });

  document.querySelectorAll("[data-select-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const control = trigger.closest("[data-select]");
      const menu = control.querySelector("[data-select-menu]");
      const open = menu.hidden;
      document.querySelectorAll("[data-select-menu]").forEach((item) => { item.hidden = true; });
      menu.hidden = !open;
      control.toggleAttribute("data-open", open);
      trigger.setAttribute("aria-expanded", String(open));
    });
  });

  document.querySelectorAll("[data-dimension]").forEach((option) => {
    option.addEventListener("click", () => {
      state.dimension = option.dataset.dimension;
      state.node = "all";
      option.closest("[data-select]").querySelector("[data-select-value]").textContent = option.textContent;
      option.parentElement.querySelectorAll("[data-dimension]").forEach((item) => item.setAttribute("aria-selected", String(item === option)));
      resetPage();
      render();
    });
  });

  document.querySelectorAll("[data-filter-field], [data-filter-op]").forEach((option) => {
    option.addEventListener("click", () => {
      const key = option.dataset.filterField ? "filterField" : "filterOp";
      const attr = option.dataset.filterField ? "data-filter-field" : "data-filter-op";
      state[key] = option.dataset.filterField || option.dataset.filterOp;
      option.closest("[data-select]").querySelector("[data-select-value]").textContent = option.textContent;
      option.parentElement.querySelectorAll(`[${attr}]`).forEach((item) => item.setAttribute("aria-selected", String(item === option)));
    });
  });

  document.querySelectorAll(".tte-segmented").forEach((group) => {
    group.addEventListener("click", (event) => {
      const segment = event.target.closest(".tte-segment");
      if (!segment) return;
      group.querySelectorAll(".tte-segment").forEach((item) => item.setAttribute("aria-selected", String(item === segment)));
      if (segment.dataset.source) { state.source = segment.dataset.source; state.node = "all"; resetPage(); }
      if (segment.dataset.mode) state.mode = segment.dataset.mode;
      if (segment.dataset.aiView) state.aiView = segment.dataset.aiView;
      if (segment.dataset.view) state.view = segment.dataset.view;
      $("[data-classic]").hidden = state.mode !== "classic";
      $("[data-ai]").hidden = state.mode !== "ai";
      if (segment.dataset.source || segment.dataset.aiView || segment.dataset.view || segment.dataset.mode) render();
    });
  });

  $("[data-tree-query]").addEventListener("input", (event) => { state.treeQuery = event.target.value; renderTree(); });
  $("[data-query]").addEventListener("input", (event) => { state.query = event.target.value; resetPage(); renderResults(); renderGroups(); });
  $("[data-ai-go]").addEventListener("click", () => { state.aiApplied = $("[data-ai-query]").value; resetPage(); render(); });
  $("[data-similarity]").addEventListener("input", (event) => {
    state.similarity = event.target.value;
    $("[data-similarity-out]").textContent = `${state.similarity}%`;
    if (state.mode === "ai") { resetPage(); renderResults(); }
  });
  $("[data-apply-filter]").addEventListener("click", () => {
    const value = fieldValue();
    if (!value) return;
    state.conditions.push({ id: `c-${Date.now()}`, field: state.filterField, op: state.filterOp, value });
    $("[data-filter-value]").value = "";
    closeOverlay();
    resetPage();
    render();
  });
  $("[data-save-filter]").addEventListener("click", () => {
    const value = fieldValue();
    const name = $("[data-filter-name]").value.trim();
    if (!value || !name) {
      if (!name) $("[data-filter-name]").focus();
      return;
    }
    const conditionId = `c-${Date.now()}`;
    state.conditions.push({ id: conditionId, field: state.filterField, op: state.filterOp, value });
    state.saved.push({ label: name, on: true, conditionId });
    $("[data-filter-value]").value = "";
    $("[data-filter-name]").value = "";
    closeOverlay();
    resetPage();
    render();
    notify(`已保存常用筛选「${name}」`);
  });
  $("[data-apply-scalar]").addEventListener("click", () => {
    state.speed = Number($("[data-scalar-speed]").value) || 0;
    state.duration = Number($("[data-scalar-duration]").value) || 0;
    closeOverlay();
    resetPage();
    render();
  });
  $("[data-columns-toggle]").addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = $("[data-columns-menu]");
    menu.hidden = !menu.hidden;
    event.currentTarget.setAttribute("aria-expanded", String(!menu.hidden));
  });
  $("[data-batch-clear]").addEventListener("click", () => { state.selected.clear(); renderResults(); });
  document.querySelectorAll("[data-batch]").forEach((button) => {
    button.addEventListener("click", () => {
      const count = state.selected.size;
      const text = { join: `已将 ${count} 条加入子树`, eval: `已创建 ${count} 条的评测`, export: `已导出 ${count} 个资产 ID` }[button.dataset.batch];
      if (button.dataset.batch === "export") navigator.clipboard?.writeText([...state.selected].join("\n"));
      notify(text);
    });
  });
  $("[data-detail-download]").addEventListener("click", () => notify(`已开始下载 ${state.detailId}`));

  renderColumns();
  render();
})();
