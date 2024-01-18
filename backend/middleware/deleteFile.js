import fs from "fs";
import path from "path";

function deleteFile(filename) {
  const filePath = path.join(__dirname, "../uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });
}


export default deleteFile;
