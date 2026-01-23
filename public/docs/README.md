# ZeroShare Gateway Documentation

This folder contains all the documentation for ZeroShare Gateway.

## Documentation Structure

```
public/docs/
├── index.json              # Documentation index with categories
├── getting-started.md      # Quick start guide
├── installation.md         # Deployment options
├── architecture.md         # Technical architecture
├── configuration.md        # Configuration overview
├── cursor.md               # Cursor IDE setup
├── claude-code.md          # Claude Code CLI setup
├── detection-patterns.md   # PII & secrets patterns
├── api-reference.md        # Admin API documentation
└── troubleshooting.md      # Common issues & solutions
```

## Categories

- **Overview**: Getting started, installation, architecture
- **Configuration**: Gateway setup, tool-specific guides
- **Reference**: API docs, detection patterns
- **Support**: Troubleshooting, FAQs

## Adding New Documentation

1. Create a new `.md` file in this directory
2. Add an entry to `index.json` with:
   - `title`: Display title
   - `path`: URL path (no spaces)
   - `file`: Filename
   - `category`: One of the categories above
   - `icon`: Icon name (rocket, download, settings, etc.)
   - `description`: Brief description

## Markdown Features Supported

- GitHub Flavored Markdown (GFM)
- Tables
- Code blocks with syntax highlighting
- Task lists
- Auto-linked URLs
