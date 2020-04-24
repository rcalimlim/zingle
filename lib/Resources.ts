import Contacts from './resources/Contacts'

const Resources: Record<string, any> = {
  Contacts: require('./resources/Contacts') as Contacts
}

export default Resources
