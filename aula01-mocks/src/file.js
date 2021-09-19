const { readFile } = require('fs/promises')
const { Module } = require('module')
const { join } = require('path')
const { error } = require('./constants')
const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if (!validation.valid) {
            throw new Error(validation.error)
        }
        return content
    }

    static async getFileContent(filePath) {
        return (await readFile(filePath)).toString("utf8")
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...rowsNotIncludingHeader] = csvString.split('\n')
        const isHeaderValid = header == options.fields.join(',')
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            rowsNotIncludingHeader.length > 0 &&
            rowsNotIncludingHeader.length <= options.maxLines
        )

        if (!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true }
    }
}

module.exports = File