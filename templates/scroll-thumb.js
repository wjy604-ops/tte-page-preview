window.TTEScrollThumb = {
  enable(thumb, { axis, metrics, setScroll, place, hold }) {
    thumb.dataset.axis = axis;
    thumb.classList.add("tte-scroll-grip");
    let dragging = false;
    let start = 0;
    let origin = 0;
    const busy = () => dragging || thumb.classList.contains("is-hot");
    thumb.addEventListener("pointerenter", () => {
      thumb.classList.add("is-hot");
      hold?.(true);
    });
    thumb.addEventListener("pointerleave", () => {
      if (dragging) return;
      thumb.classList.remove("is-hot");
      hold?.(false);
    });
    thumb.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      const box = metrics();
      if (box.overflow <= 1) return;
      dragging = true;
      thumb.classList.add("is-hot", "is-drag");
      start = axis === "x" ? event.clientX : event.clientY;
      origin = box.scroll;
      thumb.setPointerCapture(event.pointerId);
      event.preventDefault();
      event.stopPropagation();
      hold?.(true);
    });
    thumb.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      const box = metrics();
      const point = axis === "x" ? event.clientX : event.clientY;
      const next = origin + (point - start) * (box.overflow / box.travel);
      setScroll(Math.max(0, Math.min(box.overflow, next)));
      place?.();
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      thumb.classList.remove("is-drag");
      if (!thumb.matches(":hover")) {
        thumb.classList.remove("is-hot");
        hold?.(false);
      }
    };
    thumb.addEventListener("pointerup", end);
    thumb.addEventListener("pointercancel", end);
    return { busy };
  }
};
