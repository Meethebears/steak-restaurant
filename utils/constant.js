import config from '../config'

export const MESSAGE = {
  SUCCESS: "Save Success.",
  ERROR: "Something went wrong."
}

export const API_PATH = {
  AUTH: config.hostBackend + '/auth',
  ADMIN: config.hostBackend + '/admin',
  USER: config.hostBackend + '/user'
}
