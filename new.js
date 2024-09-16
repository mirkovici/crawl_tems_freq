const res = [];

$(".items > tbody > tr").each((i, el) => {
  res.push(el.innerText.split("	"));
});
$(".next")[0].children[0].click();

// SELECT distinct concat('["',f.locator,'","', SUBSTRING_INDEX(`p`.`name`, '/', 1),'","',p.creation_date,'"],') FROM flights f
// inner join passengers p on p.locator = f.locator and p.creation_date = f.creation_date
// where f.departure_date >= '2024-09-05' and  f.departure_date < '2024-09-06';

// SELECT DISTINCT
//     CONCAT(
//         '["',
//         f.locator,
//         '","',
//         CASE
//             WHEN p.is_company = 0 THEN SUBSTRING_INDEX(p.name, '/', 1)
//             ELSE p.name
//         END,
//         '","',
//         p.creation_date,
//         '"],'
//     ) AS result
// FROM flights f
// INNER JOIN passengers p
//     ON p.locator = f.locator
//     AND p.creation_date = f.creation_date
// WHERE f.departure_date >= '2023-07-01'
//   AND f.departure_date < '2023-07-02';

const missing_res = [];
const missing_db = [];

temp_res.forEach((r) => {
  const pnr = db.find((d) => d[0] == r[0] && d[1] == r[1]);
  if (pnr) {
    console.log(pnr[2], r[3]);
  } else {
    missing_res.push(r);
  }
});

db.forEach((d) => {
  const pnr = temp_res.find((r) => d[0] == r[0] && d[1] == r[1]);
  if (pnr) {
    console.log(d[2], pnr[3]);
  } else {
    missing_db.push(d);
  }
});

(async function () {
  "use strict";

  const res = [];
  const MAX_ITEMS = 6194;

  function extractData() {
    document.querySelectorAll(".items > tbody > tr").forEach((row) => {
      res.push(row.innerText.split("\t"));
    });
    console.log("Data extracted from current page:", res);
  }

  async function handlePagination() {
    if (res.length >= MAX_ITEMS) {
      console.log("Maximum items reached, stopping script.");
      return;
    }

    extractData();

    if (res.length >= MAX_ITEMS) {
      console.log("Maximum items reached after extraction, stopping script.");
      return;
    }

    const nextButton = document.querySelector(".next")?.children[0];
    if (nextButton) {
      console.log("Clicking next button...");
      nextButton.click();

      await new Promise((resolve) => setTimeout(resolve, 2000));
      handlePagination();
    } else {
      console.log("Data extraction complete:", res);
    }
  }

  handlePagination();
})();
