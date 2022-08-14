import sha1 from 'sha1'

export const hash = (str: string) => {
  if (!str?.trim()) return ''
  return sha1(str)
}
