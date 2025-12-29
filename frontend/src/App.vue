<template>
  <div class="container">
    <h1>Sum Calculator</h1>
    <form class="card" @submit.prevent="onSubmit">
      <div class="row">
        <label for="a">Number A</label>
        <input id="a" type="number" v-model="a" placeholder="Enter first number" />
      </div>
      <div class="row">
        <label for="b">Number B</label>
        <input id="b" type="number" v-model="b" placeholder="Enter second number" />
      </div>
      <button type="submit" :disabled="loading">Calculate</button>
    </form>
    <div v-if="result !== null" class="result">
      Result: <strong>{{ result }}</strong>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const a = ref('');
    const b = ref('');
    const result = ref(null);
    const error = ref('');
    const loading = ref(false);

    const toNumber = (v) => {
      if (v === '' || v === null || v === undefined) return NaN;
      const n = Number(v);
      return Number.isFinite(n) ? n : NaN;
    };

    const onSubmit = async () => {
      error.value = '';
      result.value = null;

      const aNum = toNumber(a.value);
      const bNum = toNumber(b.value);
      if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
        error.value = 'Please input two valid numbers.';
        return;
      }

      loading.value = true;
      try {
        const res = await fetch('/api/sum', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ a: aNum, b: bNum })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || 'Request failed');
        result.value = data.sum;
      } catch (e) {
        error.value = e.message || 'Something went wrong';
      } finally {
        loading.value = false;
      }
    };

    return { a, b, result, error, loading, onSubmit };
  }
};
</script>

<style lang="less" scoped>
@primary: #2c3e50;
@bg: #f5f7fa;
@accent: #42b983;
@danger: #e74c3c;

.container {
  max-width: 480px;
  margin: 3rem auto;
  padding: 1rem;
  background: @bg;

  h1 {
    color: @primary;
    font-weight: 600;
    margin-bottom: 1rem;
  }
}

.card {
  background: white;
  border: 1px solid #eaecef;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.75rem;

    label {
      font-size: 0.875rem;
      color: @primary;
      margin-bottom: 0.25rem;
    }

    input {
      border: 1px solid #cbd5e0;
      border-radius: 4px;
      padding: 0.5rem;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: @accent;
        box-shadow: 0 0 0 3px fade(@accent, 20%);
      }
    }
  }

  button {
    width: 100%;
    padding: 0.6rem 0.8rem;
    border: none;
    border-radius: 6px;
    background: @accent;
    color: white;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      background: lighten(@accent, 20%);
      cursor: not-allowed;
    }
  }
}

.result {
  margin-top: 1rem;
  background: fade(@accent, 10%);
  border: 1px solid fade(@accent, 30%);
  color: darken(@accent, 20%);
  padding: 0.75rem;
  border-radius: 6px;
}

.error {
  margin-top: 0.75rem;
  color: @danger;
}
</style>
