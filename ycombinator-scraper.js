const puppeteer = require('puppeteer')

function run() {
  return new Promise(async(resolve, reject) => {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto('https://news.ycombinator.com/')
      const urls = await page.evaluate(() => {
        const results = []
        const items = document.querySelectorAll('a.titlelink')
        items.forEach((item) => {
          results.push({
            url: item.getAttribute('href'),
            text: item.innerText
          })
        })

        return results
      })

      browser.close()
      return resolve(urls)
    } catch (error) {
      return reject(e)
    }
  })
}

run().then(console.log).catch(console.error)