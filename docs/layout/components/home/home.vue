<template>
  <div class="home">
    <div class="description">
      <aside class="aside">
        <h1>Fect</h1>
        <p>
          Fect is a Vue UI Library with beautifully handcrafted Vercel Component.No design skills required — everything
          you need to create amazing applications is at your fingertips.
        </p>
        <div class="actions">
          <fe-button auto size="small">开始</fe-button>
          <fe-spacer />
          <fe-button auto size="small">为什么是Fect</fe-button>
          <fe-spacer />
          <fe-button auto size="small">在GitHub查看</fe-button>
        </div>
      </aside>
      <article>
        <fe-image-browser>
          <fe-image
            src="https://user-images.githubusercontent.com/52351095/118687359-7e809480-b837-11eb-8083-b0504ec79652.png"
            width="500px"
            height="246px"
          ></fe-image>
        </fe-image-browser>
      </article>
    </div>
    <fe-spacer :y="2" />
    <fe-grid-group class="features" justify="space-around">
      <fe-grid class="card" v-for="(item, key) in cn" :key="key" :xs="24" :lg="7" :xl="7" :md="7" :sm="7">
        <fe-card shadow hoverable>
          <h4>
            <div class="icon">
              <component :is="item.icon" />
            </div>
            {{ key }}
          </h4>
          <p>{{ item.desc }}</p>
        </fe-card>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { cn } from '../../feature.json'
export default defineComponent({
  setup() {
    return {
      cn
    }
  }
})
</script>

<style lang="less" scoped>
.description {
  display: flex;
  width: 100%;
}

.aside {
  margin-right: 50px;
  h1 {
    font-weight: 500;
    font-size: 50px;
    line-height: 64px;
  }
  p {
    max-width: 576px;
    font-weight: 400;
    font-size: 20px;
    line-height: 44px;
  }
}

.actions {
  display: flex;
}

.features {
  margin: 0 auto;
  .fect-card {
    height: inherit;
    color: var(--primary-foreground);
    h4 {
      font-weight: 600;
      margin: 0;
      font-size: 1.25rem;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}

.card {
  min-height: 180px;
}
.icon {
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.625rem;
  margin-right: var(--fect-gap-half);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#3291ff, #0761d1);
  color: #fff;
  border-radius: 2rem;
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
