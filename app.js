new Vue({
  el: '#app',
  data: {
    amount: null,
    currencies: {},
    from: 'INR',
    to: 'USD',
    result: null,
    loading: false
  },
  mounted(){
    this.getCurrencies();
  },
  computed: {
    formatedCurrencies() {
      return Object.values(this.currencies);
    },
    calculateResult() {
      return (Number(this.amount) * this.result).toFixed(3);
    },
    disabled() {
      return !this.amount || this.loading;
    },
    resultDisable() {
      return this.result === null || this.result === 0;
    }
  },
  methods: {

    getCurrencies() {
      const currencies = localStorage.getItem('currencies')

      if(currencies) {
        this.currencies = JSON.parse(currencies);

        return;
      }

      axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=62562ba4f903fa2214e4`)
        .then(response => {
          console.log(response);
          this.currencies = response.data.results;
          localStorage.setItem('currencies', JSON.stringify(response.data.results));
      });
    },
    convertCurrencies() {
      const key = `${this.from}_${this.to}`;
      this.loading = true;
      axios.get(`https://free.currconv.com/api/v7/convert?apiKey=62562ba4f903fa2214e4&q=${key}`)
        .then(response => {
          console.log(response);
          this.loading = false;
          this.result = response.data.results[key].val;
      });
    }
  },
  watch: {
    from() {
      this.result = 0;
    },
    to() {
      this.result = 0;
    }
  }
})
