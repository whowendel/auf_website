import fs from "fs";
import path from "path";
import https from "https";

const downloadDir = path.join(process.cwd(), "public", "assets", "sdgs");

// Ensure download directory exists
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (Status Code: ${response.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function downloadAll() {
  console.log("Downloading colorful SDG PNG icons to:", downloadDir);
  let successCount = 0;
  for (let i = 1; i <= 17; i++) {
    const url = `https://open-sdg.github.io/sdg-translations/assets/img/goals/en/${i}.png`;
    const dest = path.join(downloadDir, `${i}.png`);
    try {
      console.log(`Downloading SDG ${i} PNG...`);
      await downloadFile(url, dest);
      console.log(`Saved SDG ${i} PNG successfully.`);
      successCount++;
    } catch (err) {
      console.error(`Error downloading SDG ${i} PNG:`, err.message);
    }
  }
  console.log(`Finished downloading. Successful: ${successCount}/17`);
  if (successCount === 17) {
    console.log("All PNG icons downloaded successfully!");
  } else {
    console.warn("Some PNG icons failed to download.");
  }
}

downloadAll();
