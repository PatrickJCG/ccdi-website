# News & Updates Images Folder

Drop your image files for the **News & Updates** page directly into this folder:
`public/images/news/`

### How to use an image in `src/data/newsData.ts`:
1. Save your image in this folder (e.g., `public/images/news/my-new-project.jpg`).
2. In `src/data/newsData.ts`, reference it using `/images/news/my-new-project.jpg`:

```ts
imageUrl: '/images/news/my-new-project.jpg',
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`.
You can also use external image URLs (e.g., `https://...`).
