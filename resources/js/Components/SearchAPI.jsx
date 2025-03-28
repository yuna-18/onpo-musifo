import { useEffect } from 'react'
import { switchToConcertTab } from '@/utils/switchToConcertTab'

const GoogleCSE = () => {
  useEffect(() => {
    const container = document.getElementById('google-cse-container')
    if (!container) return

    container.innerHTML = ''
    container.style.display = 'block'

    let observer = null

    const waitForGscResults = () => {
      const interval = setInterval(() => {
        const target = document.querySelector('.gsc-results')
        if (target) {
          clearInterval(interval)

          // ✅ 初期のタブをチェック（検索結果前でも動作する）
          switchToConcertTab()

          // ✅ 検索結果が表示された後にも再チェック
          observer = new MutationObserver(() => {
            switchToConcertTab()
          })

          observer.observe(target, { childList: true, subtree: true })
        }
      }, 300)
    }

    const render = () => {
      if (window.google?.search?.cse?.element) {
        window.google.search.cse.element.render({
          div: 'google-cse-container',
          tag: 'searchresults-only',
        })

        waitForGscResults()
      }
    }

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

    return () => {
      if (container) {
        container.innerHTML = ''
        container.style.display = 'none'
      }
      if (observer) observer.disconnect()
    }
  }, [])

  return null
}

export default GoogleCSE