import type { Template } from "./types";

/**
 * シンプルな React テンプレート
 */
export const simpleTemplate: Template = {
  id: "simple",
  title: "Simple Starter",
  name: "Simple Starter",
  description: "シンプルな React プロジェクトのスターターテンプレート",
  thumb: "/thumbnails/simple-template.png",
  preview_path: "/templates/simple",
  category: "starter",
  features: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  tags: ["react", "starter", "simple"],
  industry: "web-dev",
  tone: "friendly",
  style: "minimal",
  rating: 4.5,
  reviewCount: 12,
  files: [
    {
      path: "package.json",
      content: JSON.stringify({
        name: "simple-react-starter",
        version: "1.0.0",
        description: "シンプルな React プロジェクトのスターターテンプレート",
        main: "src/index.tsx",
        scripts: {
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        },
        dependencies: {
          react: "^18.2.0",
          reactDom: "^18.2.0",
          reactRouterDom: "^6.20.0",
        },
        devDependencies: {
          "@types/react": "^18.2.0",
          "@types/reactDom": "^18.2.0",
          "@vitejs/plugin-react": "^4.2.0",
          typescript: "^5.0.0",
          vite: "^5.0.0",
        },
      }),
    },
    {
      path: "src/index.tsx",
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
    },
    {
      path: "src/App.tsx",
      content: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Simple React Starter
          </h1>
          <p className="text-gray-600">
            Vite + React + TypeScript のシンプルな構成
          </p>
        </header>

        <main className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-lg text-gray-700 mb-4">
              カウンターアプリケーションのデモ
            </p>

            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setCount(count - 1)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                -1
              </button>

              <div className="text-3xl font-bold text-indigo-600 w-20 text-center">
                {count}
              </div>

              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                +1
              </button>
            </div>

            <button
              onClick={() => setCount(0)}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              リセット
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>💡 Tip: このテンプレートは Vite でビルドできます</p>
            <p>npm install</p>
            <p>npm run dev</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
`,
    },
    {
      path: "src/styles.css",
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
`,
    },
    {
      path: "vite.config.ts",
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
`,
    },
    {
      path: "tsconfig.json",
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`,
    },
    {
      path: "tsconfig.node.json",
      content: `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`,
    },
    {
      path: "index.html",
      content: `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple React Starter</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
`,
    },
  ],
};

/**
 * Material Design テンプレート
 */
export const materialTemplate: Template = {
  id: "material",
  title: "Material Design",
  name: "Material Design",
  description:
    "Google Material Design のスタイリングを搭載した React テンプレート",
  thumb: "/thumbnails/material-template.png",
  preview_path: "/templates/material",
  category: "design",
  features: ["React", "Framer Motion", "Emotion", "Material Design"],
  tags: ["react", "material-design", "ui"],
  industry: "web-dev",
  tone: "professional",
  style: "modern",
  rating: 4.8,
  reviewCount: 24,
  files: [
    {
      path: "package.json",
      content: JSON.stringify({
        name: "material-design-react",
        version: "1.0.0",
        description:
          "Material Design のスタイリングを搭載した React テンプレート",
        main: "src/index.tsx",
        scripts: {
          dev: "vite",
          build: "vite build",
          preview: "vite preview",
        },
        dependencies: {
          react: "^18.2.0",
          reactDom: "^18.2.0",
          reactRouterDom: "^6.20.0",
          framerMotion: "^10.16.0",
          "@emotion/react": "^11.11.0",
          "@emotion/styled": "^11.11.0",
        },
        devDependencies: {
          "@types/react": "^18.2.0",
          "@types/reactDom": "^18.2.0",
          "@vitejs/plugin-react": "^4.2.0",
          typescript: "^5.0.0",
          vite: "^5.0.0",
          tailwindcss: "^3.3.0",
          autoprefixer: "^10.4.16",
          postcss: "^8.4.32",
        },
      }),
    },
    {
      path: "src/index.tsx",
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`,
    },
    {
      path: "src/App.tsx",
      content: `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const Container = styled.div\`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
\`;

const Card = styled(motion.div)\`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
\`;

const Title = styled.h1\`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
\`;

const Description = styled.p\`
  color: #666;
  text-align: center;
  margin-bottom: 32px;
\`;

const ButtonGroup = styled.div\`
  display: flex;
  gap: 12px;
  justify-content: center;
\`;

const Button = styled(motion.button)\`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
\`;

const PrimaryButton = styled(Button)\`
  background: #667eea;
  color: white;
\`;

const SecondaryButton = styled(Button)\`
  background: #f5f5f5;
  color: #333;
\`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Material Design</Title>
        <Description>Google Material Design のスタイリング</Description>

        <div className="mb-6 text-center">
          <p className="text-gray-600 mb-4">カウント</p>
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-bold text-indigo-600 mb-4"
          >
            {count}
          </motion.div>
        </div>

        <ButtonGroup>
          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCount(count - 1)}
          >
            -1
          </SecondaryButton>

          <PrimaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCount(count + 1)}
          >
            +1
          </PrimaryButton>

          <SecondaryButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCount(0)}
          >
            リセット
          </SecondaryButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
}

export default App;
`,
    },
    {
      path: "src/styles.css",
      content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: system-ui, -apple-system, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
`,
    },
    {
      path: "vite.config.ts",
      content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'postcss',
      config() {
        return {
          plugins: [tailwindcss(), autoprefixer()],
        };
      },
    },
  ],
  server: {
    port: 3000,
  },
});
`,
    },
    {
      path: "tsconfig.json",
      content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
`,
    },
    {
      path: "index.html",
      content: `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Material Design React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
`,
    },
  ],
};

/**
 * すべてのテンプレート
 */
export const templates: Template[] = [simpleTemplate, materialTemplate];
