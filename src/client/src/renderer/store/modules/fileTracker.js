const fs = require('fs')
const state = {
  code: '',
  openedFile: '',
  filePaths: [],
  tabs: ['']
}

const mutations = {
  updateCode (state, newCode) {
    state.code = newCode
    console.log('State is: ' + state.code)
  },
  /** Updates the filepaths
   * @param {Object} state
   * @param {Object[]} filePaths
   */
  updateFiles (state, filePaths) {
    state.filePaths = filePaths
  }
}

const actions = {
  /** Opens a file from the root of the project, and updates the code.
   * Also changes the openedFile state.
   * @param {Object} state
   * @param {string} filePath
   */
  openFile (state, filePath) {
    state.openedFile = filePath
    fs.readFile(filePath.substring(0, filePath.length - 1), 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        state.commit('updateCode', `Something went wrong: ${err}`)
      }
      state.commit('updateCode', data)
    })
  },
  updateCodeAction (state, newCode) {
    state.commit('updateCode', newCode)
  },
  /** Updates the filepaths
   * @param {Object} state
   * @param {Object[]} filePaths
   */
  updateFilesAction (state, filePaths) {
    state.commit('updateFiles', filePaths)
  }
}

export default {
  state,
  mutations,
  actions
}
// readLocalDirTree (root) {
//   /* Loop over all files in current directory and add
//    * object to files array, storing the name and type
//    * (either directory or file) of the file.
//    * For sorting purposes, first push all directories
//    * and then all other files. */
//   fs.readdirSync(currFolder).forEach(file => {
//     if (fs.lstatSync(currFolder + file).isDirectory()) {
//       files.push({name: file, type: 'dir', path: `${currFolder}${file}/`})
//     }
//   })
//
//   fs.readdirSync(currFolder).forEach(file => {
//     if (!fs.lstatSync(currFolder + file).isDirectory()) {
//       files.push({name: file, type: 'file', path: `${currFolder}${file}/`})
//     }
//   })
// }
