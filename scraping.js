const cheerio = require('cheerio');
const fs = require('fs');
const { default: puppeteer } = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://bookstation.in/pages/search-results-page?q=books&page=3&rb_price=10%2C15480&tab=products");

    await page.waitForTimeout(10000);

    const Showdata = [];
    const $ = cheerio.load(await page.content());
    $(".snize-item").each((index,el) => {
        const title = $('.snize-title', el).text();
        const stationary = $('.snize-attribute', el).text();
        const price = $('.snize-price', el).text();
        const image = $(el).find('img').attr('src');

        Showdata.push({
            title: title,
            stationary: stationary,
            price: price,
            image: image,
        });
    });
    fs.writeFile("books.json", JSON.stringify(Showdata, null, 4), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("File saved successfully!");
        }
    });

    await browser.close();
    console.log(Showdata);
})();