# Documentation Site Setup

This documentation site reads markdown files from the `public/docs/` directory.

## Structure

```
public/docs/
├── index.json          # Documentation index/table of contents
├── getting-started.md
├── installation.md
├── configuration.md
├── api-reference.md
└── troubleshooting.md
```

## Adding Documentation

1. Add markdown files to `public/docs/`
2. Update `public/docs/index.json` with the new document entry
3. The site will automatically load and display the markdown

## Integration with Other Projects

To have another project (like a Cursor/Gemini project) generate MD files:

1. **Option A: Git Submodule**
   - Add the docs repo as a submodule
   - Point to `public/docs/` directory

2. **Option B: Build-time Sync**
   - Add a build step in `amplify.yml` that fetches docs from another repo
   - Or use a GitHub Action to sync docs on push

3. **Option C: API/Webhook**
   - Other project pushes MD files via API
   - Or webhook triggers a sync

## Markdown Rendering

The docs page uses `dangerouslySetInnerHTML` to render markdown. For production, consider:
- Using a markdown parser like `react-markdown` or `marked`
- Adding syntax highlighting for code blocks
- Adding table of contents generation

## Example Build Script

Add to `amplify.yml` preBuild phase:

```yaml
preBuild:
  commands:
    - |
      # Sync docs from another repo
      if [ -n "$DOCS_REPO_URL" ]; then
        git clone --depth 1 $DOCS_REPO_URL temp-docs
        cp -r temp-docs/* public/docs/
        rm -rf temp-docs
      fi
```
