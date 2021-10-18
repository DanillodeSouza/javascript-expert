const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;
(async() => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-valid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        // ​Date.prototype.getFullYear = () => 2020
        const filePath = './mocks/threeItems-valid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = await File.csvToJson(filePath)
        // const expected = await File.getFileContent(filePath)
        const expected = [
            {
              "id": 123,
              "name": "Barreto",
              "profession": "Software Engineer",
              "birthDay": 1989
            },
            {
              "id": 2131,
              "name": "asdadasa",
              "profession": "Baker",
              "birthDay": 1981
            },
            {
              "id": 32131,
              "name": "Asaiah",
              "profession": "Jogadô",
              "birthDay": 1976
            }
          ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()
