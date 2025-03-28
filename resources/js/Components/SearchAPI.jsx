// SearchAPI.jsx
import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'

const GoogleCSE = () => {
  useEffect(() => {
    const isTopPage = () => {
      const path = window.location.pathname.replace(/\/$/, '')
      return path === '' || path === '/otosukui'
    }

    const container = document.getElementById('google-cse-container')
    if (!container || !isTopPage()) return

    // 検索コンテナの中を毎回クリア（無限増殖防止）
    container.innerHTML = ''
    container.style.display = 'block'

    const render = () => {
      if (window.google?.search?.cse?.element) {
        window.google.search.cse.element.render({
          div: 'google-cse-container',
          tag: 'searchresults-only',
        })
      }
    }

    // 初回読み込み
    if (!window.__gcse) {
      window.__gcse = {
        parsetags: 'explicit',
        callback: render,
      }
      const script = document.createElement('script')
      script.src = 'https://cse.google.com/cse.js?cx=349714df9516f4648'
      script.async = true
      document.body.appendChild(script)
    } else {
      render()
    }

    // ✅ ページ遷移時に検索コンテナを非表示＆中身をリセット
    return () => {
      if (container) {
        container.innerHTML = ''
        container.style.display = 'none'
      }
    }
  }, [])

  return null
}

export default GoogleCSE