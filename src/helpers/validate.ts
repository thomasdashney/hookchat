const BANNED_WORDS = ['slack']

const validate = (text: string) => {
  return text
    .toLowerCase()
    .split(/\s/)
    .some(word => BANNED_WORDS.includes(word))
}

export default validate
