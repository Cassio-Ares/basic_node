const fileManager = require("./fileManager");
const path = require("path");
const readlineSync = require("readline-sync");
//npm install readline-sync (serve para criar algo como um input para o user interagir)

async function main() {
  //obs: __dir = C:\Users\User\Desktop\Projects\estudo nodejs\manipulacao_de_arquivos
  const baseDir = path.join(__dirname, "myFiles");

  while (true) {
    console.log("\n--- Gerenciador de Arquivos ---");
    console.log("1. Criar arquivo");
    console.log("2. Listar arquivo");
    console.log("3. Ler arquivo");
    console.log("4. Escrever no  arquivo");
    console.log("5. Deletar arquivo");
    console.log("6. Sair");
    console.log("--------------------------------");

    const choice = readlineSync.question("Escolha uma opcao: ");

    try {
      switch (choice) {
        case "1":
          const fileName = readlineSync.question("Digite o nome do arquivo: ");
          const fileContent = readlineSync.question(
            "Digite um conteúdo ou crie um arquivo em branco: "
          );

          const createFilesPath = path.join(baseDir, fileName);

          const fileMessage = await fileManager.createFiles(
            createFilesPath,
            fileContent
          );

          console.log(fileMessage);
          break;

        case "2":
          const files = await fileManager.listFiles(baseDir);

          console.log("Arquivos do diretório: ", files);
          break;

        case "3":
          const readlineName = readlineSync.question(
            "Digite o nome e extensão do arquivo: "
          );
          const readFilePath = path.join(baseDir, readlineName);
          const content = await fileManager.readFile(readFilePath);
          console.log("Conteúdo do arquivo: ", content);
          break;

        case "4":
          const writeFileName = readlineSync.question(
            "Digite o nome e extensão do arquivo: "
          );
          const writeFilePath =path.join(
            baseDir,
            writeFileName
          );
          const newContent = readlineSync.question(
            "Digite o conteúdo que quer escrever no arquivo: "
          );
          const message = await fileManager.writeFile(
            writeFilePath,
            newContent
          );
          console.log(message);
          break;

        case "5":
          const deleteFileName = readlineSync.question(
            "Qual o nome do arquivo que deve ser deletado: "
          );
          const deleteFilePath = path.join(
            baseDir,
            deleteFileName
          );
          const messageDelete = await fileManager.deleteFile(deleteFilePath);

          console.log(messageDelete);
          break;

        case "6":
          console.log("bye");
          return;
        default:
          console.log("opção invalida");
      }
    } catch (err) {
      console.log(err);
    }
  }
}

main();
