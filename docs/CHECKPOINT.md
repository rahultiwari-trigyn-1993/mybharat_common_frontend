# Development checkpoint

**Initial checkpoint version:** `1.0.229` (git tag `v1.0.229`)

If you ask to **“revert to Initial Checkpoint”**, restore the repo to the state at **`v1.0.229`** — all header/footer/shell/feedback/login/font-size work completed **before** Phase 1 CSS bundling.

```bash
git checkout v1.0.229
# or reset branch to tag (only when you explicitly want a hard revert)
```

Phase 1 (bundled Bootstrap / icons / Font Awesome, no runtime CDN CSS inject) starts **after** this tag.
