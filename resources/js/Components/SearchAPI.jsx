import { useEffect } from 'react'
import { modifySearchLinkOpen } from '@/utils/modifySearchLinkOpen'

const GoogleCSE = () => {
  useEffect(() => {
    const isTopPage = () => {
      const path = window.location.pathname.replace(/\/$/, '')
      return path === '' || path === '/otosukui'
    }

    const container = document.getElementById('google-cse-container')
    if (!container || !isTopPage()) return

    container.innerHTML = ''
    container.style.display = 'block'

    let observer = null

    const waitForGscResults = () => {
      const interval = setInterval(() => {
        const target = document.querySelector('.gsc-results')
        if (target) {
          clearInterval(interval)

          // 初回表示でも属性追加
          modifySearchLinkOpen()

          // 検索結果変化を監視
          observer = new MutationObserver(() => {
            modifySearchLinkOpen()
          })
          observer.observe(target, { childList: true, subtree: true })

          // role="tab" を持つ要素（カスタムタブ切り替え）にも対応
          const tabs = document.querySelectorAll('[role="tab"]')
          tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
              setTimeout(() => {
                modifySearchLinkOpen()
              }, 300) // 切り替え後に待って実行
            })
          })
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
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return null
}

export default GoogleCSE