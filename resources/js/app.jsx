// app.jsx（AppWrapperなしのオリジナル）
import React from 'react'
import { createRoot } from 'react-dom/client'
import 'smarthr-ui/smarthr-ui.css'
import './bootstrap'
import '../css/app.css'
import '../css/google-cse.css'

import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

document.addEventListener('DOMContentLoaded', () => {
  createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
      resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
      createRoot(el).render(<App {...props} />)
    },
    progress: {
      color: '#4B5563',
    },
  })
})