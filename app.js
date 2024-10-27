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

app.readFolder = () => {
    rl.question("Masukan Nama Folder: ", (folderName) => {
      const folderPath = path.join(__dirname, folderName);
      fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
        if (err) return console.error("Gagal membaca folder:", err);
  
        const fileDetails = files.map((file) => {
            const stats = fs.statSync(path.join(folderPath, file.name));
            const ext = path.extname(file.name).slice(1); // Hilangkan titik dari ekstensi
          
            return {
              namaFile: file.name,
              ekstensi: ext,
              jenisFile: getJenisFile(ext),
              tanggalDibuat: stats.birthtime.toISOString().split("T")[0],
              ukuranFile: `${(stats.size / 1024).toFixed(2)} KB`,
            };
        });
  
        console.log(`Isi dari folder ${folderName}:`, fileDetails);
      });
      rl.close();
    });
};

const getJenisFile = (ext) => {
    const imageExt = ["jpg", "jpeg", "png", "gif"];
    const textExt = ["txt", "md"];
    const videoExt = ["mp4", "avi", "mkv"];
  
    if (imageExt.includes(ext)) return "gambar";
    if (textExt.includes(ext)) return "text";
    if (videoExt.includes(ext)) return "video";
    return "lainnya";
};

module.exports = app