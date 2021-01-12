export default {
  data() {
    return {
      configdateTimePicker: {
        enableTime: true,
        enableSeconds: true,
        dateFormat: 'Y:m:d H:i:S',
        time_24hr: true,
        defaultDate: new Date(),
      },
    }
  }
}