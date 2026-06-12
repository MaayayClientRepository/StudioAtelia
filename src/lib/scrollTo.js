/**
 * scrollToProgress - Smooth, instant-feel navigation between sections.
 *
 * Strategy:
 * 1. Jump near (95%) of the target via native scrollTo (instant, no render lag through intermediate sections).
 * 2. Immediately hand off to Lenis for a short, smooth eased final approach.
 *
 * This eliminates the "rendering every intermediate section" problem that causes lag
 * during long-distance programmatic scrolls.
 */
export function scrollToProgress(target, options = {}) {
    const { duration = 0.8, onComplete } = options;

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetPx = target * totalHeight;
    const currentPx = window.scrollY;
    const delta = Math.abs(targetPx - currentPx);

    // For short distances (< 15% of total scroll height), animate directly with Lenis
    const shortJumpThreshold = totalHeight * 0.15;

    if (delta < shortJumpThreshold) {
        // Short jump: just use Lenis smooth scroll directly
        if (window.lenis) {
            window.lenis.scrollTo(targetPx, { duration, force: true, onComplete });
        } else {
            window.scrollTo({ top: targetPx, behavior: "smooth" });
        }
        return;
    }

    // Long jump: pre-position near the target, then let Lenis finish smoothly
    // Jump to 97% of the way there instantly
    const preJumpPx = targetPx > currentPx
        ? Math.max(currentPx, targetPx - window.innerHeight * 0.5)
        : Math.min(currentPx, targetPx + window.innerHeight * 0.5);

    if (window.lenis) {
        // Stop any existing Lenis scroll
        window.lenis.stop();

        // Pre-position without animation
        window.scrollTo({ top: preJumpPx });

        // Resume Lenis and then animate the final approach
        window.lenis.start();

        requestAnimationFrame(() => {
            window.lenis.scrollTo(targetPx, {
                duration: 0.6,
                force: true,
                onComplete
            });
        });
    } else {
        window.scrollTo({ top: targetPx, behavior: "smooth" });
    }
}
