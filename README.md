# DeployZeroShare.com

Marketing website for ZeroShare Gateway - an on-premise AI security gateway with PII redaction and secrets blocking.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **AWS Amplify** - Hosting and deployment

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm start
```

## Deployment

This site is deployed on AWS Amplify. The `amplify.yml` file configures the build process.

### Deploy via AWS CLI

```bash
aws amplify create-app --name deployzeroshare --repository https://github.com/zeroshare/deployzeroshare.com
aws amplify create-branch --app-id <app-id> --branch-name main
```

## License

MIT
