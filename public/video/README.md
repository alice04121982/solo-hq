# Ambient video

Licensed iStock lab footage, used as silent decorative loops via
`src/components/ambient-video.tsx`.

Each clip ships as three files, named `istock-<id>-<short-slug>.*`:

- `.mp4` — H.264, audio stripped, ≤1280px wide (the broadly supported source)
- `.webm` — VP9, same treatment (served first where supported)
- `-poster.webp` — first-frame still, used before playback and for
  reduced-motion viewers

Compression commands and the licence record live in
`docs/stock-imagery.md`; every clip needs a row there.
