const fs = require("fs");
const path = require("path");

/**
 * Função que recebe um path (caminho) e usando fs.mkdir(cria uma pasta nesta rota pré determinada)
 * @param {"/um caminho"} dirPath
 * @returns
 */
function createDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        reject(errorMonitor);
      } else {
        resolve(`Directory "${dirPath}" created successfully.`);
      }
    });
  });
}

/**
 * função que cria um doc. em uma pasta pré determinada e coloca algo neste documento.
 * @param {rota e a pasta de deve colocar o elemento} filePath
 * @param {conteúdo que irá constar no doc. criado} content
 * @returns
 */

function createFiles(filePath, content = "") {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`File '${filePath}' created successfully`);
      }
    });
  });
}

/**
 * Função que lista os arquivos existentes em uma pasta
 * @param {recebe a rota de uma diretorio e a pasta em questão} dirPath
 * @returns
 */
function listFiles(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

/**
 * Função que permite ler um arquivo
 * @param {recebe o nome de uma arquivo} filesPath
 * @returns
 */
function readFile(filesPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filesPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, "utf-8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("File written successfully.");
      }
    });
  });
}

function deleteFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("File deleted sucessfully");
      }
    });
  });
}

module.exports = {
  createDirectory,
  createFiles,
  listFiles,
  readFile,
  writeFile,
  deleteFile,
};
