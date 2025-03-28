export function switchToConcertTab () {
  const activeTab = document.querySelector('[role="tab"].gsc-refinementhActive')
  const activeLabel = activeTab?.querySelector('span')?.textContent?.trim()

  if (activeLabel !== 'すべての検索結果') {
    // console.log(`🛑 アクティブタブは「${activeLabel}」なので切り替えなし`)
    return
  }

  const tabs = document.querySelectorAll('[role="tab"]')
  tabs.forEach((tab) => {
    const label = tab.querySelector('span')?.textContent?.trim()
    if (label === '演奏会') {
      tab.click()
      // console.log('✅ 「すべての検索結果」だったので「演奏会」タブに自動切替')
    }
  })
}