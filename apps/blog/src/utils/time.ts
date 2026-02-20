const { format: _timeFormat } = Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
})

const timeFormat = (time: string | Date) => {
  try {
    if (!(time instanceof Date)) {
      time = new Date(time)
    }
    return _timeFormat(time)
  } catch {
    return 'Invalid input'
  }
}

export { timeFormat }
