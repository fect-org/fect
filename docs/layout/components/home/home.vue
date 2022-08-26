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
          <template v-for="(action, i) in actions" :key="action.value">
            <fe-button auto size="small" @click="() => switchRouteHandler(action.value)">{{ action.name }}</fe-button>
            <fe-spacer v-if="i !== actions.length - 1" />
          </template>
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
      <fe-grid
        class="card"
        v-for="feature in features"
        :key="feature.name"
        :xs="24"
        :lg="7"
        :xl="7"
        :md="7"
        :sm="7"
        @click="() => switchRouteHandler(feature.value)"
      >
        <fe-card shadow hoverable>
          <h4>
            <div class="icon">
              <component :is="feature.icon" />
            </div>
            {{ feature.name }}
          </h4>
          <p>{{ feature.desc }}</p>
        </fe-card>
      </fe-grid>
    </fe-grid-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useLocale } from '../../composables'
import { cn, us } from '../../feature.json'
export default defineComponent({
  setup() {
    const { locale } = useLocale()

    const router = useRouter()
    const features = computed(() => (locale.value === 'zh-cn' ? cn.feature : us.feature))

    const actions = computed(() => (locale.value === 'zh-cn' ? cn.action : us.action))

    const switchRouteHandler = (value: string) => {
      if (value === 'github') {
        window.location.href = 'https://github.com/fect-org/fect'
      } else {
        const getPath = (value: string) => {
          switch (value) {
            case 'whyfect':
            case 'install':
            case 'guide':
              return `/${locale.value}/guide/${['whyfect', 'install'].includes(value) ? value : 'whyfect'}`
            case 'components':
              return `/${locale.value}/components/avatar`
          }
        }
        router.push({ path: getPath(value) })
      }
    }

    return {
      features,
      actions,
      switchRouteHandler
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  box-sizing: border-box;
  padding: var(--fect-gap) 0;
}
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
  cursor: pointer;
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

@media only screen and (max-width: 650px) {
  .home {
    width: 100%;
    padding: 0;
    max-width: 100%;
    padding-bottom: var(--fect-gap);
  }
  .description {
    padding: var(--fect-gap) var(--fect-gap-half) 0;
    box-sizing: border-box;
    text-align: center;
    flex-direction: column;
    aside {
      margin-top: var(--fect-gap);
      margin-right: 0;
      order: 2;
    }
    h1 {
      font-size: 40px;
    }
    p {
      line-height: 32px;
      font-size: 18px;
    }
    article {
      order: 1;
    }
  }
  .actions {
    justify-content: center;
  }
  .features {
    box-sizing: border-box;
    > div {
      padding: var(--fect-gap-half) 0;
    }
  }
}
</style>
