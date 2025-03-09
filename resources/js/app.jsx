import '../css/app.css';
import '../css/google-cse.css';
import './bootstrap';

import React, {useEffect} from 'react';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createRoot} from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => `${title}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup ({el, App, props}) {
    // Root コンポーネントで pageshow イベントを設定する
    const Root = () => {
      useEffect(() => {
        window.addEventListener('pageshow', (event) => {
          if (event.persisted) {
            window.location.reload();
          }
        });
      }, []);
      return <App {...props} />;
    };
    const root = createRoot(el);

    root.render(<Root />);
  },
  progress: {
    color: '#4B5563',
  },
});
