
## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/valenciias/project-x.git
cd project-x
npm install
```

2. Install dependencies:
```bash
npm install
npm run dev
The app will be available at http://localhost:3000
```
3. Configure Environment Variables
Required to connect to the character API:

cp .env.example .env
```
## Theme Customization

1. Locate the theme file: `theme.json`
2. Modify theme settings:
```typescript
{
  "variant": "vibrant",
  "primary": "hsl(144, 100%, 45%)",
  "appearance": "dark",
  "radius": 0.75
}
```
## Deployment
Local Production Build
```bash
npm run build
npm run preview
```
## Deploy to Fly.io
1. Install Fly CLI:
```bash
brew install flyctl
```
2. Initialize and deploy:

```bash
ffly auth login
fly launch
fly deploy
```
Your app will be available at: https://your-app-name.fly.dev


## Contributing
1. Fork the repository
2. Create feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit changes
```bash 
git commit -m 'Add amazing feature'
```
4. Push and create PR
```bash 
git push origin feature/amazing-feature
``` 

## License
MIT © Valencia Igiraneza

This project is licensed under the MIT License - see the LICENSE file for details