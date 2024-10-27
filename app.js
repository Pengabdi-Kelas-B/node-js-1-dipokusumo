const fs = require("node:fs")
const path = require("node:path");
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

app.makeFolder = () => {
    rl.question("Masukan Nama Folder: ", (folderName) => {
      const folderPath = path.join(__dirname, folderName);
      if (fs.existsSync(folderPath)) {
        console.log("Folder sudah ada.");
      } else {
        fs.mkdir(folderPath, (err) => {
          if (err) console.error(err);
          else console.log(`Berhasil membuat folder: ${folderName}`);
        });
      }
      rl.close();
    });
};

app.makeFile = () => {
    rl.question("Masukan Nama File (contoh: catatan.txt): ", (fileName) => {
      const filePath = path.join(__dirname, fileName);
      fs.writeFile(filePath, "", (err) => {
        if (err) console.error(err);
        else console.log(`Berhasil membuat file: ${fileName}`);
      });
      rl.close();
    });
};

app.extSorter = () => {
    const sourceFolder = path.join(__dirname, "unorganize_folder");
  
    fs.readdir(sourceFolder, (err, files) => {
      if (err) return console.error("Gagal membaca folder:", err);
  
      files.forEach((file) => {
        const ext = path.extname(file).slice(1);
        const destinationFolder = path.join(__dirname, ext);
  
        if (!fs.existsSync(destinationFolder)) {
          fs.mkdirSync(destinationFolder);
        }
  
        fs.rename(
          path.join(sourceFolder, file),
          path.join(destinationFolder, file),
          (err) => {
            if (err) console.error("Gagal memindahkan file:", err);
          }
        );
      });
  
      console.log("Berhasil merapikan file berdasarkan ekstensi.");
    });
};

module.exports = app