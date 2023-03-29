let storageMap = {}

const setItem = (key, value) => {
  storageMap[key] = value
}

const getItem = key => storageMap[key]

const storage = {
  setItem,
  getItem,
}

export default storage
